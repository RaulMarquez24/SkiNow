import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';

export interface Anuncio {
  id?: string;
  titulo: string;
  descripcion: string;
  img: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  constructor(private firestore: Firestore, private storage: Storage) { }

  getAds(): Observable<Anuncio[]> {
    const adsRef = collection(this.firestore, 'anuncios');
    return collectionData(adsRef, { idField: 'id' }) as Observable<Anuncio[]>;
  }

  getAdsById(id: any): Observable<Anuncio> {
    const adsDocRef = doc(this.firestore, `anuncios/${id}`);
    console.log(adsDocRef)
    return docData(adsDocRef, { idField: 'id' }) as Observable<Anuncio>;
  }

  addAds(ads: Anuncio) {
    const adsRef = collection(this.firestore, 'anuncios');
    return addDoc(adsRef, ads);
  }

  deleteAds(ads: Anuncio) {
    const adsDocRef = doc(this.firestore, `anuncios/${ads.id}`);
    return deleteDoc(adsDocRef);
  }

  updateAds(ads: Anuncio) {
    const adsDocRef = doc(this.firestore, `anuncios/${ads.id}`);
    return updateDoc(adsDocRef, {
      titulo:ads.titulo,
      descripcion:ads.descripcion,
      img:ads.img,
    });
  }

  async uploadImage(ads: Anuncio, cameraFile: Photo) {
    const val = ads;
    if (val) {
      const path = `uploads/${ads.id}/profile.webp`;
      const storageRef = ref(this.storage, path);

      try {
        if (cameraFile.base64String) { // Verificar si cameraFile.base64String tiene un valor
          await uploadString(storageRef, cameraFile.base64String, 'base64');

          const img = await getDownloadURL(storageRef);

          const adsDocRef = doc(this.firestore, `anuncios/${ads.id}`);
          await setDoc(adsDocRef, {
            img
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

}
