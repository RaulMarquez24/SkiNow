import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, setDoc, getDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Code_discount{
  id?: string;
  nombre: string; 
  porcentaje: number;
}

@Injectable({
  providedIn: 'root'
})
export class DescuentoService {

  constructor(
    private firestore: Firestore
  ) { 

  }

  getCodesDiscounts(): Observable<Code_discount[]> {
    const codes_discountsRef = collection(this.firestore, 'codes_discounts');
    return collectionData(codes_discountsRef, { idField: 'id' }) as Observable<Code_discount[]>;
  }

  getCodeDiscountById(id: any): Observable<Code_discount> {
    const userDocRef = doc(this.firestore, `codes_discounts/${id}`);
    console.log(userDocRef)
    return docData(userDocRef, { idField: 'id' }) as Observable<Code_discount>;
  }

  addCodeDiscount(code: Code_discount) {
    const codes_discountsRef = collection(this.firestore, 'codes_discounts');
    return addDoc(codes_discountsRef, code);
  }

  deleteCodeDiscount(codes_discounts: Code_discount) {
    const codes_discountsDocRef = doc(this.firestore, `codes_discounts/${codes_discounts.id}`);
    return deleteDoc(codes_discountsDocRef);
  }

  updateCodeDiscount(codes_discounts: Code_discount) {
    const codes_discountsDocRef = doc(this.firestore, `codes_discounts/${codes_discounts.id}`);
    return updateDoc(codes_discountsDocRef, {
      nombre: codes_discounts.nombre,
      porcentaje: codes_discounts.porcentaje,
    });
  }

  getDiscountByNombre(nombre: string): Observable<Code_discount> {
    const codes_discountsRef = collection(this.firestore, 'codes_discounts');
    const queryRef = query(codes_discountsRef, where('nombre', '==', nombre));
    return collectionData(queryRef, { idField: 'id' }) as unknown as Observable<Code_discount>;
  }
  

}
