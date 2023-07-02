import { Component, Input, OnInit } from '@angular/core';
import { User, UserDataService } from '../../../services/user-data.service';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { Auth } from '@angular/fire/auth';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';
import { Clase, ClassesService } from 'src/app/services/classes.service';
@Component({
  selector: 'app-modal-class-info',
  templateUrl: './modal-class-info.page.html',
  styleUrls: ['./modal-class-info.page.scss'],
})
export class ModalClassInfoPage implements OnInit {
  @Input() id: number | undefined;
  @Input() title: string | undefined;
  class: Clase = {
    id_prof: '',
    datos_titular: {
      id_titular: '',
      nombre: '',
      apellido: '',
      dni: '',
      email: '',
      telefono: '',
      telefono2: '',
    },
    fecha: '',
    hora: '',
    duracion: 0,
    modalidad: '',
    nivel: '',
    punto_encuentro: '',
    alumnos: [],
  }

  durationText: string | undefined;
  dTVisible: boolean = false;

  constructor(
    private userDataService: UserDataService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private auth: Auth,
    private classesService: ClassesService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.id) {
      this.classesService.getClassesById(this.id).subscribe(res => {
        this.class = res;
      });
    }
  }

  updateDurationText(duration: number): string {
    return `${duration} Horas`;
  }

  dismiss() {
    this.modalCtrl.dismiss();
    // window.location.reload();
  }

  dTChangeVisible() {
    if (this.dTVisible) {
      this.dTVisible = false;
    } else {
      this.dTVisible = true;
    }
  }
}