import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/services/user-data.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { PuenteUserService } from 'src/app/services/puente-user.service';

@Component({
	selector: 'app-login-fire',
	templateUrl: './login-fire.page.html',
	styleUrls: ['./login-fire.page.scss'],
})

export class LoginFirePage implements OnInit {
	credentials: FormGroup;
	rememberMe: boolean = false;
	listaUsuario: User[] = [];
	pass: string = '';
	correo: string = '';
	constructor(
		private fb: FormBuilder,
		private loadingController: LoadingController,
		private alertController: AlertController,
		private authService: AuthService,
		private router: Router,
		private menuController: MenuController,
		private userDataSevice: UserDataService,
		private puente: PuenteUserService,
	) {

		this.credentials = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			rememberMe: [false]  // Agrega esta línea para definir el control rememberMe
		});
	}

	// Easy access for form fields
	get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}

	ngOnInit() {
		const savedCredentials = localStorage.getItem('credentials');
		if (savedCredentials) {
			this.credentials.setValue(JSON.parse(savedCredentials));
			this.correo = JSON.parse(savedCredentials).email;
			this.pass = JSON.parse(savedCredentials).password;
		}

	}

	async register() {
		await this.router.navigate(['/register-fire']);
	}

	async login() {
		//guardar datos del usuario en servicio para el uso de la app
		this.userDataSevice.getUsers().subscribe(result => {
			this.listaUsuario = result;
			result.forEach(n => {
				if (n.contactos.email.includes(this.correo)) {
					this.puente.setUsuario(n);
					localStorage.setItem('profile', JSON.stringify(n));
				}
			})
		});

		const loading = await this.loadingController.create();
		await loading.present();

		const user = await this.authService.login(this.credentials.value);
		await loading.dismiss();
		if (user) {
			if (this.credentials.get('rememberMe')?.value) {
				console.log(JSON.stringify(this.credentials.value))
				localStorage.setItem('credentials', JSON.stringify(this.credentials.value));
			} else {
				localStorage.removeItem('credentials');
			}
			window.location.reload();
			this.router.navigateByUrl('/home', { replaceUrl: true });
		} else {
			this.showAlert('Registration failed', 'El usuario no existe');
		}
	}

	async showAlert(header: string, message: string) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ['OK']
		});
		await alert.present();
	}

	async resetPass() {
		await this.router.navigate(['/resetpass-fire']);
	}

	ionViewWillEnter() {
		this.menuController.enable(false); // Deshabilita el menú
	}

	ionViewDidLeave() {
		this.menuController.enable(true); // Habilita el menú
	}
}
