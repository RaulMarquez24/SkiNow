import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { UserDataService, User } from 'src/app/services/user-data.service';
import { ClassesService, Clase } from 'src/app/services/classes.service';
import { Code_discount, DescuentoService } from 'src/app/services/descuento.service';
@Component({
  selector: 'app-modal-add-reserva',
  templateUrl: './modal-add-reserva.page.html',
  styleUrls: ['./modal-add-reserva.page.scss'],
})
export class ModalAddReservaPage implements OnInit {
  user: any;
  class: any;
  currentDate: string;
  telefono2: number | undefined;
  pagina: number = 1;
  listProf: User[] = [];
  listProfFiltrada: User[] = [];
  nAlumnos: number = 1;
  alumnos: string[] = [];
  isIos: boolean = false;
  isDarkMode: boolean = false;
  zonaSeleccionada: any;
  horasPosibles:any[]=[];
  discountInvalid: string='';
  code_discount: Code_discount;
  total: number = 0;
  codigoDescuento: string = '';
  mPago: any;

  tarjeta: any;
  nbizum: string = '';

  loading: any;
  horasReservadas: number[] = [];

  constructor(
    private modalCtrl: ModalController,
    private userDataService: UserDataService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private alertController: AlertController,
    private platform: Platform,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private classesService: ClassesService,
    private descuentoService: DescuentoService,
    private userDataServices: UserDataService,
  ) {
    const storedProfile = localStorage.getItem('profile');
    if (!storedProfile) {
      localStorage.removeItem('profile');
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } else {
      this.user = JSON.parse(storedProfile);
    }

    if (this.user.rol === 'user') {
      this.class = {
        id_prof: '',
        datos_titular: {
          id_titular: this.user.id,
          nombre: this.user.datos_personales.nombre,
          apellido: this.user.datos_personales.apellido,
          dni: this.user.documentos.documento,
          email: this.user.contactos.email,
          telefono: this.user.contactos.telefono,
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
    } else {
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

    this.code_discount = {
      nombre: '',
      porcentaje: 0,
    }

    this.tarjeta = {
      titular: '',
      numero: '',
      fecha: '',
      ccv: '',
    }

    this.currentDate = this.getCurrentDate();

    this.userDataService.getUsers().subscribe(res => {
      const users = res;
      users.forEach(n => {
        if (n.rol === 'prof') {
          this.listProf.push(n);
        }
      })
      this.cd.detectChanges();
    });
  }

  ngOnInit() {
    this.detectThemePreference();
  }

  getMinDate(): string {
    const currentYear = new Date().getFullYear();
    return `${currentYear}-01-01`;
  }
  getMaxDate(): string {
    const currentYear = new Date().getFullYear()+1;
    return `${currentYear}-12-31`;
  }

  detectThemePreference() {
    this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (this.platform.is('ios')) {
      this.isIos = true
    } else {
      this.isIos = false
    }
  }


  dismiss() {
    this.modalCtrl.dismiss();
    // window.location.reload();
  }

  nextStep() {
    if (this.validarForm()) {
      this.pagina++;
      if (this.pagina === 4) {
        this.calcTotal();
      }
    }
  }

  backStep() {
    if (this.pagina != 1) {
      this.pagina--;
    } else {
      this.dismiss();
    }
  }

  getCurrentDate(): string {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  onChangeNAlumnos() {
    this.alumnos = Array(this.nAlumnos).fill('');
  }

  getAlumnosArray() {
    return Array.from({ length: this.nAlumnos }, (_, i) => i);
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
    this.horasPosibles=[];
    switch (this.class.hora) {
      case "15":this.horasPosibles.push("1");break;
      case "14":this.horasPosibles.push("1","2");break;
      case "13":this.horasPosibles.push("1","2","3");break;
      case "12":this.horasPosibles.push("1","2","3","4");break;
      case "11":this.horasPosibles.push("1","2","3","4","5");break;
      case "10":this.horasPosibles.push("1","2","3","4","5","6");break;
      case "9":this.horasPosibles.push("1","2","3","4","5","6","7");break;
      default:this.horasPosibles=[];break;
    }
  }

  calcTotal() {
    const subtotal = 30 * this.class.duracion + 5 * (this.nAlumnos - 1);
    const descuentoFactor = 1 - this.code_discount.porcentaje / 100; // Calcular el factor de descuento
    this.total = subtotal * descuentoFactor;
  }


  validarForm(): any {
    let mensaje = "Estos campos son obligatorios: ";
    let errorCampos = false;

    if (this.pagina === 1) {
      let camposValidar = ["nombre", "apellido", "dni", "email", "telefono"];
      let nombreCampos: any = { nombre: "Nombre ", apellido: "Apellido ", dni: "DNI ", email: "Email ", telefono: "Movil " };

      for (let i = 0; i < camposValidar.length; i++) {
        if (this.class.datos_titular[camposValidar[i]] == ""
          || this.class.datos_titular[camposValidar[i]] == ""
          || this.class.datos_titular[camposValidar[i]] == ""
          || this.class.datos_titular[camposValidar[i]] == ""
          || this.class.datos_titular[camposValidar[i]] == ""
        ) {
          mensaje += nombreCampos[camposValidar[i]] + ",";
          errorCampos = true;
        }
      }
    } else if (this.pagina === 2) {
      let camposValidar = ["fecha", "hora", "duracion", "modalidad", "nivel", "punto_encuentro", "id_prof"];
      let nombreCampos: any = { fecha: "Fecha", hora: "Hora", duracion: "Duración", modalidad: "Modalidad", nivel: "Nivel", punto_encuentro: "Punto de encuentro", id_prof: "Profesor" };
      for (let i = 0; i < camposValidar.length; i++) {
        if (this.class[camposValidar[i]] == ""
          || this.class[camposValidar[i]] == ""
          || this.class[camposValidar[i]] == ""
          || this.class[camposValidar[i]] == ""
          || this.class[camposValidar[i]] == ""
          || this.class[camposValidar[i]] == ""
          || this.class[camposValidar[i]] == ""
        ) {
          mensaje += nombreCampos[camposValidar[i]] + ",";
          errorCampos = true;
        }
      }
    } else if (this.pagina === 3) {
      for (let i = 0; i < this.nAlumnos; i++) {
        if (this.class.alumnos[i] === undefined || this.class.alumnos[i] === null || this.class.alumnos[i] === '' || this.class.alumnos[i] === ' ') {
          mensaje += "Alumno " + (i + 1) + ", ";
          errorCampos = true;
        }
      }
    } else if (this.pagina === 5) {
      if (this.mPago === "tarjeta") {
        let camposValidar = ["nombre", "numero", "fecha", "cvv"];
        let nombreCampos: any = { nombre: "Nombre del titular", numero: "Numero de tarjeta", fecha: "Fecha de vencimiento", cvv: "Codigo de seguridad" };
        for (let i = 0; i < camposValidar.length; i++) {
          if (this.tarjeta[camposValidar[i]] == ""
            || this.tarjeta[camposValidar[i]] == !/^\d{16}$/.test(this.nbizum.trim())
            || this.tarjeta[camposValidar[i]] == ""
            || this.tarjeta[camposValidar[i]] == !/^\d{3}$/.test(this.nbizum.trim())
          ) {
            mensaje += nombreCampos[camposValidar[i]] + ",";
            errorCampos = true;
          }
        }

      } else if (this.mPago === "paypal") {
        mensaje = "Este metodo de pago esta desactivado";
        errorCampos = true;

      } else if (this.mPago === "bizum") {
        if (this.nbizum.trim() === "" || !/^\d{9}$/.test(this.nbizum.trim())) {
          mensaje += "Número de teléfono de Bizum (debe tener 9 dígitos), ";
          errorCampos = true;
        }
      }
    }

    if (!errorCampos) {
      return true;
    } else {
      if (errorCampos) {
        mensaje = mensaje.substring(0, (mensaje.length - 1));
        if (this.pagina === 1) {
          this.presentAlert("Datos del titular", mensaje);
        } else if (this.pagina === 2) {
          this.presentAlert("Datos de la clase", mensaje);
        } else if (this.pagina === 3) {
          this.presentAlert("Selección de alumnos", mensaje);
        } else if (this.pagina === 5) {
          this.presentAlert("Metodo de pago", mensaje);
        }

        return false;
      }
    }
  }

  async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  pay() {
    if (this.validarForm()) {
      this.showLoading();
      this.addClass();

      setTimeout(async () => {
        this.hideLoading();

        const alert = await this.alertController.create({
          header: 'Pago Realizado',
          message: 'El pago se ha realizado correctamente.',
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                this.router.navigate(['/reservas']);
                location.reload();
              }
            }
          ]
        });

        await alert.present();
      }, 5000);
    }
  }


  showPaypalToast() {
    this.presentToast('El método de pago de PayPal no está disponible por el momento.');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async showLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await this.loading.present();
  }

  async hideLoading() {
    await this.loading.dismiss();
  }

  async addClass() {
    this.class.punto_encuentro = this.zonaSeleccionada;

    this.class.hora = this.class.hora + ":30";
    await this.classesService.addClass(this.class);

    await this.userDataService.updateAvailabilityForClass(this.class.id_prof, this.class.fecha, this.horasReservadas);
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

  onSeleccionarZona() {
    this.zonaSeleccionada = this.asignarNumeroAleatorio(this.class.punto_encuentro);
    console.log(this.zonaSeleccionada);
  }

  aplyDiscount() {
    this.descuentoService.getDiscountByNombre(this.codigoDescuento).subscribe(res => {
      let aux: any = res;
      if (this.codigoDescuento != '' && this.codigoDescuento != null && this.codigoDescuento != undefined) {
        if (aux[0]) {
          this.code_discount = aux[0];
          this.calcTotal();
          this.codigoDescuento = '';
          this.discountInvalid = 'no';
        } else {
          this.discountInvalid = 'si';
        }
      }
    });
  }
}
