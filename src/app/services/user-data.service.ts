import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, setDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';

export interface User {
  id?: string;
  imagen_perfil: string;
  datos_personales: {
    nombre: string;
    apellido: string;
    genero: string;
    fecha: string;
    direccion: string;
    codigoPostal: string;
    poblacion: string;
    provincia: string;
  };
  documentos: {
    tipo: string;
    documento: string;
  };
  contactos: {
    email: string;
    telefono: string;
  };
  password: string;
  rol: string;
  disponibilidad: any[];
}


@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private firestore: Firestore, private storage: Storage) { }

  getUsers(): Observable<User[]> {
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, { idField: 'id' }) as Observable<User[]>;
  }

  getUserById(id: any): Observable<User> {
    const userDocRef = doc(this.firestore, `users/${id}`);
    console.log(userDocRef)
    return docData(userDocRef, { idField: 'id' }) as Observable<User>;
  }

  addUser(user: User) {
    const usersRef = collection(this.firestore, 'users');
    return addDoc(usersRef, user);
  }

  deleteUser(user: User) {
    const userDocRef = doc(this.firestore, `users/${user.id}`);
    return deleteDoc(userDocRef);
  }

  updateUser(user: User) {
    const userDocRef = doc(this.firestore, `users/${user.id}`);
    return updateDoc(userDocRef, {
      imagen_perfil: user.imagen_perfil,
      datos_personales: {
        nombre: user.datos_personales.nombre,
        apellido: user.datos_personales.apellido,
        genero: user.datos_personales.genero,
        fecha: user.datos_personales.fecha,
        direccion: user.datos_personales.direccion,
        codigoPostal: user.datos_personales.codigoPostal,
        poblacion: user.datos_personales.poblacion,
        provincia: user.datos_personales.provincia,
      },
      documentos: {
        tipo: user.documentos.tipo,
        documento: user.documentos.documento,
      },
      contactos: {
        email: user.contactos.email,
        telefono: user.contactos.telefono,
      },
      password: user.password,
      rol: user.rol,
    });
  }

  updateProfile(user: User) {
    const userDocRef = doc(this.firestore, `users/${user.id}`);
    return updateDoc(userDocRef, {
      imagen_perfil: user.imagen_perfil,
      datos_personales: {
        nombre: user.datos_personales.nombre,
        apellido: user.datos_personales.apellido,
        genero: user.datos_personales.genero,
        fecha: user.datos_personales.fecha,
        direccion: user.datos_personales.direccion,
        codigoPostal: user.datos_personales.codigoPostal,
        poblacion: user.datos_personales.poblacion,
        provincia: user.datos_personales.provincia,
      },
      documentos: {
        tipo: user.documentos.tipo,
        documento: user.documentos.documento,
      },
      contactos: {
        email: user.contactos.email,
        telefono: user.contactos.telefono,
      },
    });
  }

  // updateProfile(user: User, type: String) {
  //   if (!user || !type) {
  //     return null;
  //   }

  //   try {
  //     const userDocRef = doc(this.firestore, `users/${user.id}`);
  //     console.log("Entro",user.datos_personales.codigoPostal);
  //     if (type === "persData") {
        
  //       return updateDoc(userDocRef, {
  //         datos_personales: {
  //           nombre: user.datos_personales.nombre,
  //           apellido: user.datos_personales.apellido,
  //           genero: user.datos_personales.genero,
  //           fecha: user.datos_personales.fecha,
  //           direccion: user.datos_personales.direccion,
  //           codigoPostal: user.datos_personales.codigoPostal,
  //           poblacion: user.datos_personales.poblacion,
  //           provincia: user.datos_personales.provincia,
  //         }
  //       });
  //     } else if (type === "doc") {
  //       return updateDoc(userDocRef, {
  //         documentos: {
  //           tipo: user.documentos.tipo,
  //           documento: user.documentos.documento,
  //         },
  //       });
  //     } else if (type === "contact") {
  //       return updateDoc(userDocRef, {
  //         contactos: {
  //           email: user.contactos.email,
  //           telefono: user.contactos.telefono,
  //         },
  //       });
  //     } else {
  //       return null;
  //     }
  //   } catch (e) {
  //     return null;
  //   }
  // }


  async uploadImage(user: User, cameraFile: Photo) {
    const val = user;
    if (val) {
      const path = `uploads/${user.id}/profile.webp`;
      const storageRef = ref(this.storage, path);

      try {
        if (cameraFile.base64String) { // Verificar si cameraFile.base64String tiene un valor
          await uploadString(storageRef, cameraFile.base64String, 'base64');

          const imagen_perfil = await getDownloadURL(storageRef);

          const userDocRef = doc(this.firestore, `users/${user.id}`);
          await setDoc(userDocRef, {
            imagen_perfil
          }, { merge: true });
          return true;
        } else {
          // Manejar el caso cuando cameraFile.base64String es undefined
          return null;
        }
      } catch (e) {
        return null;
      }
    } else {
      // Manejar el caso cuando `user` es nulo
      return null;
    }
  }

  async dellAvailability(user: User) {
    const userDocRef = doc(this.firestore, `users/${user.id}`);
    return updateDoc(userDocRef, {
      disponibilidad: ''
    });
  }

  async updateAvailability(user: User, selectedDates: Date[]) {
    const userDocRef = doc(this.firestore, `users/${user.id}`);

    // Obtener la disponibilidad actual del usuario
    const userDoc = await getDoc(userDocRef);
    const currentAvailability = userDoc.data()?.['disponibilidad'] || {};

    // Crear un nuevo objeto para almacenar la disponibilidad actualizada
    const updatedAvailability = { ...currentAvailability };

    // Recorrer las fechas seleccionadas
    let i = 1;
    selectedDates.forEach((date) => {
      const dateString = date.toString();

      // Verificar si la fecha ya existe en la disponibilidad actualizada
      if (updatedAvailability[dateString]) {
        // Si la fecha ya existe, no se realiza ninguna acción adicional
        return;
      }

      // Crear un nuevo objeto de horas vacío
      const hoursObj = {
        "9": "L",
        "10": "L",
        "11": "L",
        "12": "L",
        "13": "L",
        "14": "L",
        "15": "L"
      };

      // Agregar la fecha al objeto de disponibilidad con el objeto de horas correspondiente
      updatedAvailability[i] = { dia: dateString, horas: hoursObj };
      i++;
    });

    // Actualizar el documento con la nueva disponibilidad
    return updateDoc(userDocRef, {
      disponibilidad: updatedAvailability
    });
  }

  async updateAvailabilityForClass(id_prof: string, fechaReservada: Date, horas: number[]) {
    const userDocRef = doc(this.firestore, `users/${id_prof}`);

    // Obtener la disponibilidad actual del usuario
    const userDoc = await getDoc(userDocRef);
    const currentAvailability = userDoc.data()?.['disponibilidad'] || {};

    // Crear un nuevo objeto para almacenar la disponibilidad actualizada
    const updatedAvailability = { ...currentAvailability };

    const dateString = fechaReservada.toString();
    // Verificar si la fecha ya existe en la disponibilidad actualizada

    const originalDate = dateString;
    const parts = originalDate.split("/");
    const formattedDate = `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;

    // Recorrer todas las propiedades de updatedAvailability
    for (const prop in updatedAvailability) {
      if (updatedAvailability[prop].dia === formattedDate) {
        // Si la fecha coincide, actualizar el objeto hoursObj correspondiente
        const hoursObj = updatedAvailability[prop].horas;
        horas.forEach((hour) => {
          if (hoursObj[hour.toString()] === "L") {
            hoursObj[hour.toString()] = "R";
          }
        });
        break; // Salir del bucle una vez que se haya encontrado la fecha
      }
    }

    // Actualizar el documento con la nueva disponibilidad
    return updateDoc(userDocRef, {
      disponibilidad: updatedAvailability
    });
  }

  async updateAvailabilityForClassOnUpdate(id_prof: string, fechaReservada: Date, horas: number[]) {
    const userDocRef = doc(this.firestore, `users/${id_prof}`);

    // Obtener la disponibilidad actual del usuario
    const userDoc = await getDoc(userDocRef);
    const currentAvailability = userDoc.data()?.['disponibilidad'] || {};

    // Crear un nuevo objeto para almacenar la disponibilidad actualizada
    const updatedAvailability = { ...currentAvailability };

    const dateString = fechaReservada.toString();
    // Verificar si la fecha ya existe en la disponibilidad actualizada

    const originalDate = dateString;
    const parts = originalDate.split("/");
    const formattedDate = `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;

    // Recorrer todas las propiedades de updatedAvailability
    for (const prop in updatedAvailability) {
      if (updatedAvailability[prop].dia === formattedDate) {
        // Si la fecha coincide, actualizar el objeto hoursObj correspondiente
        const hoursObj = updatedAvailability[prop].horas;
        horas.forEach((hour) => {
          if (hoursObj[hour.toString()] === "R") {
            hoursObj[hour.toString()] = "L";
          }
        });
        break; // Salir del bucle una vez que se haya encontrado la fecha
      }
    }

    // Actualizar el documento con la nueva disponibilidad
    return updateDoc(userDocRef, {
      disponibilidad: updatedAvailability
    });
  }
}



