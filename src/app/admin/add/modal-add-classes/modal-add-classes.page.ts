import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { User, UserDataService } from '../../../services/user-data.service';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { Auth } from '@angular/fire/auth';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';
import { Clase, ClassesService } from 'src/app/services/classes.service';

@Component({
  selector: 'app-modal-add-classes',
  templateUrl: './modal-add-classes.page.html',
  styleUrls: ['./modal-add-classes.page.scss'],
})
export class ModalAddClassesPage implements OnInit {
  @Input() id: string | undefined;
  @Input() title: string | undefined;
  class: any;
  users: User[] = [];
  listProf: User[] = [];
  listProfFiltrada: User[] = [];
  horasReservadas: number[] = [];
  currentDate: string;
  zonaSeleccionada: any;
  dTVisible: boolean = false;

  idPActual: string = '';
  pActual: User = {
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

    profesorAntiguo: string = '';
    fechaAntigua: any;
    horasReservadasAntigua: any[]=[];
    duracionAntigua: string = '';

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
    private cd: ChangeDetectorRef,
  ) {

    this.currentDate = this.getCurrentDate();

    this.class = {
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
  }

  ngOnInit() {

    if (this.id) {
      this.classesService.getClassesById(this.id).subscribe(res => {
        this.class = res;
        this.class.hora = res.hora.slice(0, -3);
      });
    }

    this.userDataService.getUsers().subscribe(res => {
      this.users = res;
      this.users.forEach(n => {
        if (n.rol === 'prof') {
          this.listProf.push(n);
        }
      })
      this.cd.detectChanges();
    });

    setTimeout(() => {
      this.getProfActual();
    }, 500);

    this.idPActual = this.class.id_prof;

    setTimeout(() => {
      this.calcHorasAntiguas()
    }, 500);
    
  }

  calcHorasAntiguas(){
    this.profesorAntiguo = this.class.id_prof;
    this.fechaAntigua = this.class.fecha;
    const horaAntigua = this.class.hora;
    this.duracionAntigua = this.class.duracion;

    const sumaAT = parseInt(horaAntigua) + parseInt(this.duracionAntigua);
    this.horasReservadas=[];
    for (let i = horaAntigua; i < sumaAT; i++) {
        this.horasReservadasAntigua.push(i);
    }
  }

  getMinDate(): string {
    const currentYear = new Date().getFullYear();
    return `${currentYear}-01-01`;
  }
  getMaxDate(): string {
    const currentYear = new Date().getFullYear()+1;
    return `${currentYear}-12-31`;
  }

  dTChangeVisible() {
    if (this.dTVisible) {
      this.dTVisible = false;
    } else {
      this.dTVisible = true;
    }
  }

  getProfActual() {
    this.userDataService.getUserById(this.class.id_prof).subscribe(res => {
      this.pActual = res;
    });
  }

  getCurrentDate(): string {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  asignarNumeroAleatorio(zona: string) {
    let numero: number;

    if (zona === "1") {
      numero = Math.floor(Math.random() * 30) + 1; // Genera un número aleatorio entre 1 y 30
    } else if (zona === "2") {
      numero = Math.floor(Math.random() * 20) + 31; // Genera un número aleatorio entre 31 y 50
    } else {
      numero = 0;
    }

    return numero;
  }

  async deleteClass() {
    await this.classesService.deleteClass(this.class);
    await this.userDataService.updateAvailabilityForClassOnUpdate(this.profesorAntiguo, this.fechaAntigua, this.horasReservadasAntigua);

    window.location.reload();
    this.router.navigate(['add']);
  }

  async updateClass() {
    if (this.class.id_prof === null || this.class.id_prof === "" || this.class.id_prof === undefined || this.class.id_prof === " ") {
      this.class.id_prof = this.idPActual;
    }
    await this.classesService.updateClass(this.class);
    await this.userDataService.updateAvailabilityForClass(this.class.id_prof, this.class.fecha, this.horasReservadas);
    await this.userDataService.updateAvailabilityForClassOnUpdate(this.profesorAntiguo, this.fechaAntigua, this.horasReservadasAntigua);

    const toast = await this.toastCtrl.create({
      message: '¡Clase Actualizada!.',
      duration: 2000
    });
    toast.present();
    window.location.reload();
    this.router.navigate(['add']);
  }

  async addClass() {
    this.class.hora = this.class.hora + ":30";
    await this.classesService.addClass(this.class);

    await this.userDataService.updateAvailabilityForClass(this.class.id_prof, this.class.fecha, this.horasReservadas);

    const toast = await this.toastCtrl.create({
      message: '¡Clase Creada!',
      duration: 2000
    });
    toast.present();
    window.location.reload();
    this.router.navigate(['add']);
  }

  dismiss() {
    this.modalCtrl.dismiss();
    // window.location.reload();
  }

  dateSelected(event: Event) {
    const datetime = event.target as HTMLIonDatetimeElement;
    if (datetime?.value) {
      const date = new Date('' + datetime?.value);

      this.class.fecha = date.toLocaleDateString();
      this.durationSelected();
    }
  }

  durationSelected() {
    this.listProfFiltrada = [];
    this.listProf.forEach((user: User) => {
      const disponibilidadKeys = Object.keys(user.disponibilidad);
      disponibilidadKeys.forEach((key: any) => {
        const disponibilidadItem = user.disponibilidad[key];
        const fecha = disponibilidadItem.dia;
        const horas = disponibilidadItem.horas;
        let cont = 0;
        const fecha1 = new Date(fecha);
        if (fecha1.toLocaleDateString() === this.class.fecha) {
          const suma = parseInt(this.class.hora) + parseInt(this.class.duracion);
          this.horasReservadas=[];
          for (let i = this.class.hora; i < suma; i++) {
            if (disponibilidadItem.horas[i] === "L") {
              this.horasReservadas.push(i);
              cont++;
            }
            if (cont === parseInt(this.class.duracion)) {
              this.listProfFiltrada.push(user);
            }
          }
        }
      });
    });
  }
}