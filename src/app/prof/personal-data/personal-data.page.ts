import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { PuenteUserService } from 'src/app/services/puente-user.service';
import { User,UserDataService } from 'src/app/services/user-data.service';
@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.page.html',
  styleUrls: ['./personal-data.page.scss'],
})
export class PersonalDataPage implements OnInit {
  profile: any;
  date: any;
  image: any;
  selectedDates: Date[] = [];
  weekDays: string[] = [];
  weekendDays: string[] = [];
  allDays: string[] = [];

  fechasActuales: any[] = [];

  dSAVisible:boolean=false;
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


    this.userDataService.getUserById(this.profile.id).subscribe(res => {
      const datos = res;
      console.log("Diponibilidad: ",datos.disponibilidad);
      if (datos.disponibilidad) {
        this.fechasActuales = Object.values(datos.disponibilidad).map(item => item.dia);     
      } else {
        this.fechasActuales = []; // Asignar un array vacío si no es un array válido
      }
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
  

  getMinDateNov(): string {
    const currentYear = new Date().getFullYear();
    return `${currentYear}-11-01`;
  }
  getMaxDateNov(): string {
    const currentYear = new Date().getFullYear();
    return `${currentYear}-11-30`;
  }
  getMinDateDic(): string {
    const currentYear = new Date().getFullYear();
    return `${currentYear}-12-01`;
  }
  getMaxDateDic(): string {
    const currentYear = new Date().getFullYear();
    return `${currentYear}-12-31`;
  }
  getMinDateEne(): string {
    const nextYear = new Date().getFullYear() + 1;
    return `${nextYear}-01-01`;
  }
  getMaxDateEne(): string {
    const nextYear = new Date().getFullYear() + 1;
    return `${nextYear}-01-31`;
  }
  getMinDateFeb(): string {
    const nextYear = new Date().getFullYear() + 1;
    return `${nextYear}-02-01`;
  }
  getMaxDateFeb(): string {
    const nextYear = new Date().getFullYear() + 1;
    return `${nextYear}-02-31`;
  }
  getMinDateMar(): string {
    const nextYear = new Date().getFullYear() + 1;
    return `${nextYear}-03-01`;
  }  
  getMaxDateMar(): string {
    const nextYear = new Date().getFullYear() + 1;
    return `${nextYear}-03-31`;
  }
  getMinDateAbr(): string {
    const nextYear = new Date().getFullYear() + 1;
    return `${nextYear}-04-01`;
  }
  getMaxDateAbr(): string {
    const nextYear = new Date().getFullYear() + 1;
    return `${nextYear}-04-31`;
  }

  dSAChangeVisible(){
    if (this.dSAVisible) {
			this.dSAVisible = false;
		} else {
			this.dSAVisible = true;
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

  async guardarFechas() {
    console.log("Fechas seleccionadas: " + this.selectedDates);
    this.userDataService.dellAvailability(this.profile);
    let groupDates: Date[]=[];
    for (const dates of this.selectedDates as unknown as Date[][]) {
      dates.forEach(d => {
        groupDates.push(d);
      });
    }
    await this.userDataService.updateAvailability(this.profile, groupDates);
  }

}