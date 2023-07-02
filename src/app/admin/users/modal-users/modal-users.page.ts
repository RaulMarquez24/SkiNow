import { Component, Input, OnInit } from '@angular/core';
import { User, UserDataService } from '../../../services/user-data.service';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { Auth, reload } from '@angular/fire/auth';

@Component({
  selector: 'app-modal-users',
  templateUrl: './modal-users.page.html',
  styleUrls: ['./modal-users.page.scss'],
})
export class ModalUsersPage implements OnInit {
  @Input() id: string | undefined;
  previousEmail: string="";
  user: User = {
    imagen_perfil: '',
    datos_personales: {
      nombre: '',
      apellido: '',
      genero: '',
      fecha: '',
      direccion: '',
      codigoPostal: '',
      poblacion: '',
      provincia: ''
    },
    documentos: {
      tipo: '',
      documento: ''
    },
    contactos: {
      email: '',
      telefono: ''
    },
    password: '',
    rol: '',
    disponibilidad: [],
  };


  constructor(
    private userDataService: UserDataService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private auth: Auth,
  ) { }

  ngOnInit() {
    this.userDataService.getUserById(this.id).subscribe(res => {
      this.user = res;
      this.previousEmail = this.user.contactos.email;
    });
  }

  async deleteUser() {
    await this.userDataService.deleteUser(this.user);
    await this.authService.deleteUser();
    this.modalCtrl.dismiss();
    window.location.reload();
  }

  async updateUser() {
    await this.userDataService.updateUser(this.user);
    await this.authService.changePassword(this.user.password);
    await this.authService.changeName(this.user.datos_personales.nombre);
    if (this.user.contactos.email !== this.previousEmail){
      await this.authService.changeEmail(this.user.contactos.email);
    }

    const toast = await this.toastCtrl.create({
      message: '¡Usuario Actualizado!.',
      duration: 2000
    });
    toast.present();
  }

  dismiss() {
    this.modalCtrl.dismiss();
    window.location.reload();
  }

}
