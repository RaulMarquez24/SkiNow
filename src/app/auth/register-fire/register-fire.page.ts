import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { UserDataService } from '../../services/user-data.service';
import { PuenteUserService } from 'src/app/services/puente-user.service';
import { User } from '../../services/user-data.service';


@Component({
  selector: 'app-register-fire',
  templateUrl: './register-fire.page.html',
  styleUrls: ['./register-fire.page.scss'],
})
export class RegisterFirePage implements OnInit {
  credentials: FormGroup;
  listaUsuario: User[] = [];
  correo: string = '';

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private userDataService: UserDataService,
    private puente: PuenteUserService,
    private userDataSevice: UserDataService,
    // private menuController: MenuController,
  ) {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      checkPassword: ['', Validators.required]
    });
  }

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  get name() {
    return this.credentials.get('email');
  }

  get checkPassword() {
    return this.credentials.get('checkPassword');
  }

  ngOnInit() {

  }

  // Esta función se llamará cuando necesites verificar las contraseñas
  async checkPass() {
    if (this.credentials.valid) {
      const passwordControl = this.credentials.get('password');
      const checkPasswordControl = this.credentials.get('checkPassword');

      if (passwordControl && checkPasswordControl) {
        const password = passwordControl.value;
        const checkPassword = checkPasswordControl.value;

        if (password === checkPassword) {
          // Las contraseñas coinciden
          this.register();
        } else {
          // Las contraseñas no coinciden, mostrar alerta
          this.showAlert('Registration failed', 'Las contraseñas no coinciden');
        }
      }
    }
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    await this.userDataService.addUser({
      imagen_perfil: '',
      datos_personales: {
        nombre: this.credentials.value.name,
        apellido: '',
        genero: '',
        fecha: '',
        direccion: '',
        codigoPostal: '',
        poblacion: '',
        provincia: '',
      },
      documentos: {
        tipo: '',
        documento: '',
      },
      contactos: {
        email: this.credentials.value.email,
        telefono: '',
      },
      password: this.credentials.value.password,
      rol: 'user',
      disponibilidad: [],
    });
    await loading.dismiss();

    //guardar datos del usuario en servicio para el uso de la app
    this.userDataSevice.getUsers().subscribe(result => {
      this.listaUsuario = result;
      result.forEach(n => {
        if (n.contactos.email.includes(this.correo)) {
          this.puente.setUsuario(n);
          localStorage.setItem('profile', JSON.stringify(n));
          console.log("Guardado correctamente")
        }
      })
    });

    console.log(localStorage.getItem('profile'))
    if (user) {
      setTimeout(() => {
        this.router.navigateByUrl('/home', { replaceUrl: true });
      }, 1000);
    } else {
      this.showAlert('Registration failed', 'El correo o la contraseña no son correctos');
    }
  }

  async login() {
    await this.router.navigate(['/login-fire']);
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
