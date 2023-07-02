import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { user, Auth } from '@angular/fire/auth';
import { User } from '../../services/user-data.service';
import { UserDataService } from 'src/app/services/user-data.service';

import { ModalController, AlertController, LoadingController, Platform } from '@ionic/angular';
import { ModalUsersPage } from '../../admin/users/modal-users/modal-users.page';
@Component({
	selector: 'app-users',
	templateUrl: './users.page.html',
	styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
	profile: any = null;
	users: User[] = [];
	searchTerm: string = '';

	listAdm: User[] = [];
	listProf: User[] = [];
	listUser: User[] = [];

	filteredAdm: any[] = [];
	filteredProf: any[] = [];
	filteredUser: any[] = [];

	isDarkMode: boolean =false;
	isIos:boolean=false;

	handleRefresh(event: any) {
		setTimeout(() => {
			// Any calls to load data go here
			event.target.complete();
			location.reload();
		}, 2000);
	}

	constructor(
		private authService: AuthService,
		private router: Router,
		private loadingController: LoadingController,
		private alertController: AlertController,
		private userDataService: UserDataService,
		private cd: ChangeDetectorRef,
		private modalCtrl: ModalController,
		private platform: Platform,

	) {

		this.userDataService.getUsers().subscribe(res => {
			this.users = res;
			this.users.forEach(n => {
				if (n.rol.includes("adm")) {
					this.listAdm.push(n);
				} else if (n.rol.includes("prof")) {
					this.listProf.push(n);
				} else if (n.rol.includes("user")) {
					this.listUser.push(n);
				}
			})
			this.cd.detectChanges();
		});

		this.filteredAdm = this.listAdm;
		this.filteredProf = this.listProf;
		this.filteredUser = this.listUser;
	}
	ngOnInit(){
		this.detectThemePreference();
	}

	detectThemePreference() {
		this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		if (this.platform.is('ios')) {
			this.isIos = true
		} else {
			this.isIos = false
		}
	}

	filterUsers() {

		this.filteredAdm = [];
		this.filteredProf = [];
		this.filteredUser = [];

		this.filteredAdm = this.listAdm.filter(user => {
			return user.contactos.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
				user.datos_personales.nombre.toLowerCase().includes(this.searchTerm.toLowerCase());
		});

		this.filteredProf = this.listProf.filter(user => {

			return user.contactos.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
				user.datos_personales.nombre.toLowerCase().includes(this.searchTerm.toLowerCase());
		});

		this.filteredUser = this.listUser.filter(user => {
			return user.contactos.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
				user.datos_personales.nombre.toLowerCase().includes(this.searchTerm.toLowerCase());
		});

	}

	clearSearch() {
		this.filteredAdm = this.listAdm;
		this.filteredProf = this.listProf;
		this.filteredUser = this.listUser;
	}

	async logout() {
		await this.authService.logout();
		this.router.navigateByUrl('/', { replaceUrl: true });
	}

	async addUser() {
		const alert = await this.alertController.create({
			header: 'Nuevo Usuario',
			inputs: [
				{
					name: 'nombre',
					placeholder: 'Nombre del usuario',
					type: 'text'
				},
				{
					name: 'apellidos',
					placeholder: 'Apellidos del usuario',
					type: 'text'
				},
				{
					name: 'email',
					placeholder: 'Correo electrónico',
					type: 'email'
				},
				{
					name: 'contraseña',
					placeholder: 'Contraseña',
					type: 'text'
				},
				{
					name: 'rol',
					placeholder: 'Rol del usuario (user, prof, adm)',
					type: 'text'
				}
			],
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel'
				}, {
					text: 'Añadir',
					handler: res => {
						this.authService.register({
							name: res.name,
							email: res.email,
							password: res.contraseña,
						});
						this.userDataService.addUser({
							imagen_perfil: '',
							datos_personales: {
								nombre: res.nombre,
								apellido: res.apellidos,
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
								email: res.email,
								telefono: '',
							},
							password: res.contraseña,
							rol: res.rol,
							disponibilidad: [],
						});
						setTimeout(() => {
							window.location.reload();
						}, 500);
					}
				}
			]
		});

		await alert.present();
	}

	async openUser(user: User) {
		const modal = await this.modalCtrl.create({
			component: ModalUsersPage,
			componentProps: { id: user.id },
		});
		await modal.present();
	}
}