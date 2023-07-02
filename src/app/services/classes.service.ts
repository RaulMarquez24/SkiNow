import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, deleteDoc, updateDoc, setDoc, getDocs, orderBy, limit, query, where, or } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { combineLatest, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


export interface Clase {
  id?: number;
  id_prof: string;
  datos_titular: {
    id_titular: string;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    telefono: string;
    telefono2: string;
  };
  fecha: string;
  hora: string;
  duracion: number;
  modalidad: string;
  nivel: string;
  punto_encuentro: string;
  alumnos: string[];
}
@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private firestore: Firestore, private storage: Storage) { }

  getClasses(): Observable<Clase[]> {
    const ClaseRef = collection(this.firestore, 'clases');
    return collectionData(ClaseRef, { idField: 'id' }) as Observable<Clase[]>;
  }

  getClassesById(id: any): Observable<Clase> {
    const ClaseDocRef = doc(this.firestore, `clases/${id}`);
    console.log(ClaseDocRef)
    return docData(ClaseDocRef, { idField: 'id' }) as Observable<Clase>;
  }

  getClassesByMonthAndIdProf(year: number, month: number, idProf: string): Observable<Clase[]> {
    const ClaseRef = collection(this.firestore, 'clases');

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const datesArray: string[] = [];

    for (let i = startDate.getDate() + 1; i <= endDate.getDate(); i++) {
      datesArray.push(`${i}/${month}/${year}`);
    }

    const query1 = query(
      ClaseRef,
      where('id_prof', '==', idProf),
      where('fecha', '==', `1/${month}/${year}`)
    );

    const query2 = query(
      ClaseRef,
      where('id_prof', '==', idProf),
      where('fecha', 'in', datesArray)
    );

    return combineLatest([
      collectionData(query1, { idField: 'id' }),
      collectionData(query2, { idField: 'id' })
    ]).pipe(
      switchMap(([result1, result2]: [any[], any[]]) => {
        const combinedResult = [...result1, ...result2];
        return of(combinedResult);
      })
    );
  }

  addClass(clase: Clase) {
    const objRef = collection(this.firestore, 'clases');
    return getDocs(query(objRef, orderBy('id', 'desc'), limit(1)))
      .then((snapshot) => {
        var newIdClass = 1; // Valor inicial para el nuevo ID numérico

        if (!snapshot.empty) {
          // Si existen documentos, obtener el último ID numérico y agregar 1
          const lastObj = snapshot.docs[0].data() as Clase;
          newIdClass = Number(lastObj.id) + 1;
        }

        clase.id = newIdClass; // Asignar el nuevo ID numérico a idClase

        const newDocRef = doc(objRef, clase.id.toString()); // Utilizar el nuevo ID como nombre de documento
        return setDoc(newDocRef, clase);
      });
  }

  deleteClass(clase: Clase) {
    const claseDocRef = doc(this.firestore, `clases/${clase.id}`);
    return deleteDoc(claseDocRef);
  }

  updateClass(clase: Clase) {
    const claseDocRef = doc(this.firestore, `clases/${clase.id}`);
    return updateDoc(claseDocRef, {
      id_prof: clase.id_prof,
      datos_titular: {
        id_titular: clase.datos_titular.id_titular,
        nombre: clase.datos_titular.nombre,
        apellido: clase.datos_titular.apellido,
        dni: clase.datos_titular.dni,
        email: clase.datos_titular.email,
        telefono: clase.datos_titular.telefono,
        telefono2: clase.datos_titular.telefono2,
      },
      fecha: clase.fecha,
      hora: clase.hora,
      duracion: clase.duracion,
      modalidad: clase.modalidad,
      nivel: clase.nivel,
      punto_encuentro: clase.punto_encuentro,
      alumnos: clase.alumnos,
    });
  }

  getClassesByTitularId(id: any): Observable<Clase[]> {
    const ClaseRef = collection(this.firestore, 'clases');
    const queryRef = query(ClaseRef, where('datos_titular.id_titular', '==', id));
    return collectionData(queryRef, { idField: 'id' }) as unknown as Observable<Clase[]>;
  }

}
