import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Clase, ClassesService } from 'src/app/services/classes.service';
import { User, UserDataService } from '../../services/user-data.service';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { ModalClassInfoPage } from './modal-class-info/modal-class-info.page';

@Component({
  selector: 'app-work-forecast',
  templateUrl: './work-forecast.page.html',
  styleUrls: ['./work-forecast.page.scss'],
})
export class WorkForecastPage implements OnInit {

  classes: Clase[] = [];
  listClass: any[] = [];
  fechaSeleccionada: any;
  idProf: any;
  date: Date;

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      location.reload();
    }, 2000);
  }

  constructor(
    private userDataService: UserDataService,
    private classesService: ClassesService,
    private cd: ChangeDetectorRef,
    private modalCtrl: ModalController,
  ) {
    this.date = new Date();

    this.classesService.getClasses().subscribe(res => {
      this.classes = res;
      this.classes.forEach(n => {
        this.listClass.push(n);
      })
      this.cd.detectChanges();
    });

  }

  ngOnInit() {
    // Get profile from localStorage (if exist)
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      this.idProf = profile.id;
    }
    console.log(this.idProf);
    this.fechaSeleccionada = document.getElementById('selected-date');
    console.log(this.fechaSeleccionada)
    if (this.fechaSeleccionada) {
      this.fechaSeleccionada = this.date.toLocaleDateString();
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
  
  transformTimestamp(timestamp: any): string {
    const date = timestamp.toDate(); // Convierte el objeto Timestamp a una fecha
    const hours = date.getHours().toString().padStart(2, '0'); // Obtiene las horas y las convierte a cadena con formato de dos dígitos
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Obtiene los minutos y los convierte a cadena con formato de dos dígitos

    return hours + ':' + minutes; // Retorna la hora y los minutos en el formato deseado
  }

  openDatetime() {
    const datetime = document.getElementById('datetime');
    datetime?.dispatchEvent(new MouseEvent('click'));
  }

  dateSelected(event: Event) {
    const datetime = event.target as HTMLIonDatetimeElement;
    if (datetime?.value) {
      const date = new Date('' + datetime?.value);
      this.date = date;
      this.fechaSeleccionada = document.getElementById("selected-date");
      if (this.fechaSeleccionada) {
        this.fechaSeleccionada = this.date.toLocaleDateString();
      }
    }
  }

  nextDay() {
    const tomorrow = new Date(this.date.getTime() + 24 * 60 * 60 * 1000);
    this.date = tomorrow;
    this.fechaSeleccionada = document.getElementById("selected-date");
    if (this.fechaSeleccionada) {
      this.fechaSeleccionada = this.date.toLocaleDateString();
    }
  }

  previousDay() {
    const yesterday = new Date(this.date.getTime() - 24 * 60 * 60 * 1000); // Resta un día en milisegundos
    this.date = yesterday;
    this.fechaSeleccionada = document.getElementById("selected-date");
    if (this.fechaSeleccionada) {
      this.fechaSeleccionada = this.date.toLocaleDateString();
    }
  }

  calculateEndTime(startTime: string, duration: number): string {
    const [hours, minutes] = startTime.split(':').map(Number); // Convertir la hora en formato de texto a números
    const startTimeObj = new Date();
    startTimeObj.setHours(hours, minutes); // Establecer la hora de inicio

    const endTimeObj = new Date(startTimeObj.getTime() + duration * 60 * 60 * 1000); // Sumar la duración en milisegundos

    const endTime = `${endTimeObj.getHours()}:${endTimeObj.getMinutes().toString().padStart(2, '0')}`; // Formatear la hora de fin como texto

    return endTime;
  }


  async openClasses(clase: Clase, title: string) {
    const modal = await this.modalCtrl.create({
      component: ModalClassInfoPage,
      componentProps: { id: clase.id, title },
    });
    await modal.present();
  }
}





