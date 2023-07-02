import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { PuenteUserService } from 'src/app/services/puente-user.service';
import { User, UserDataService } from '../../services/user-data.service';
import { reload } from '@angular/fire/auth';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.page.html',
  styleUrls: ['./user-data.page.scss'],
})
export class UserDataPage implements OnInit {
  profile: any;
  date: any;
  image: any;
  weekDays: string[] = [];
  weekendDays: string[] = [];
  allDays: string[] = [];
  isDarkMode: boolean =false;
	isIos:boolean=false;
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

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      location.reload();
    }, 2000);
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    public puente: PuenteUserService,
    private userDataService: UserDataService,
    private platform: Platform,
  ) {
    
  }

  ngOnInit() {

    const storedProfile = localStorage.getItem('profile');
		if (!storedProfile) {
			localStorage.removeItem('profile');
			this.router.navigateByUrl('/login', { replaceUrl: true });
		} else {
			this.profile = JSON.parse(storedProfile);
		}

    this.userDataService.getUserById(this.profile.id).subscribe(res => {
      this.user = res;
    });

    this.detectThemePreference();

  }

  detectThemePreference() {
		this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		if(this.platform.is('ios')){
			this.isIos=true
		}else{
			this.isIos=false
		}
	}

dateSelected(event: Event) {
    const datetime = event.target as HTMLIonDatetimeElement;
    if (datetime?.value) {
      const date = new Date('' + datetime?.value);
      this.profile.datos_personales.fecha = date.toLocaleDateString();
    }
  }

  async onSubmit() {
      console.log('Formulario válido');
      this.changeImage();
      await this.userDataService.updateProfile(this.profile);
      localStorage.setItem('profile', JSON.stringify(this.profile));
      console.log(this.profile);
      setTimeout(() => {
        location.reload();
      }, 500);
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  //funciones para guardar en bd
  async saveImage() {
    this.image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos // Camera, Photos or Prompt!
    });

    if (this.image) {
      this.profile.imagen_perfil = 'data:image/jpeg;base64,' + this.image.base64String;
      console.log(this.profile.imagen_perfil)
    }
  }

  async changeImage() {
    if (this.image) {
      const loading = await this.loadingController.create();
      await loading.present();

      console.log(this.image);
      const result = await this.userDataService.uploadImage(this.profile, this.image);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }

  private isPersonalDataValid() {
    if (this.profile.datos_personales.nombre && this.profile.datos_personales.apellido && this.profile.datos_personales.genero && this.profile.datos_personales.fecha && this.profile.datos_personales.direccion && this.profile.datos_personales.codigoPostal && this.profile.datos_personales.poblacion && this.profile.datos_personales.provincia) {
      return true;
    }
    return false;
  }
}
