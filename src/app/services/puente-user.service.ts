import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class PuenteUserService {
  userSubject: BehaviorSubject<User>;

  initBoton: boolean = true;
  mostMenu: boolean = false;

  constructor() {
    this.userSubject = new BehaviorSubject<any>('');
  } 

  setUsuario(usuario: User){

    this.userSubject.next(usuario);
  }

  getUsuario(){

    return this.userSubject.asObservable();
  }
}
