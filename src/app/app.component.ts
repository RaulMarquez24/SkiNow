import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Auth } from '@angular/fire/auth'
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import { PuenteUserService } from './services/puente-user.service';
import { User, UserDataService } from './services/user-data.service';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  listaUsuario: User[] = [];
  savePage: any;
  currentPage: string = "home";
  profile: any;
  tabs=[
    // USERS
    { title: 'Reservas', url: 'reservas', icon: 'calendar' }, // Nueva entrada
    { title: 'Mis Datos', url: 'userData', icon: 'people' },
    // PROFESORES
    { title: 'Mis Datos', url: 'personalDataProf', icon: 'calendar' },
    { title: 'Info Prof', url: 'infoProf', icon: 'calendar' },
    { title: 'Prevision', url: 'work-forecast', icon: 'calendar' },
    // ADMIN
    { title: 'Usuarios', url: 'users', icon: 'people' },
    { title: 'Añadir', url: 'add', icon: 'duplicate' },
  ];
  categorias = [
    // GLOBAL
    { title: 'Inicio', url: '/home', icon: 'home' },
    // USERS
    { title: 'Reservas User', url: '/reservas', icon: 'calendar' }, // Nueva entrada
    { title: 'Mas', url: '/mas', icon: 'ellipsis-horizontal' },
    { title: 'Mis Datos', url: '/userData', icon: 'people' },
    // PROFESORES
    { title: 'Mis Datos', url: '/personalDataProf', icon: 'calendar' },
    { title: 'Info Prof', url: '/infoProf', icon: 'calendar' },
    { title: 'Prevision', url: '/work-forecast', icon: 'calendar' },
    // ADMIN
    { title: 'Usuarios Admin', url: '/users', icon: 'people' },
    { title: 'Añadir', url: '/add', icon: 'duplicate' },
  ];

  labels = [];

  constructor(private router: Router,
    public puente: PuenteUserService,
    private userDataService: UserDataService,
    private auth: Auth,
    private authService: AuthService,
    private platform: Platform) { 

    }

  ngOnInit() {
    const storedProfile = localStorage.getItem('profile');
    if (!storedProfile) {
      localStorage.removeItem('profile');
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } else {
      this.profile = JSON.parse(storedProfile);
    }
    this.getPermisos();

    const savedPage = localStorage.getItem('page');
		if (savedPage) {
			this.currentPage = JSON.parse(savedPage);
		}
  }

  isAuthPage() {
    const currentUrl = this.router.url;
    return currentUrl === '/' || currentUrl === '/register-fire' || currentUrl === '/resetpass-fire';
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
    localStorage.removeItem('page');
    localStorage.removeItem('profile');
  }

  getPermisos() {
    if (this.profile.rol == "adm") {
      this.vistaAdmin();
    } else if (this.profile.rol == "prof") {
      this.vistaProf();
    } else {
      this.vistaUser();
    }
  }

  vistaAdmin() {
    this.categorias = [
      
    ];
    this.tabs = [
      // USERS
      { title: 'Reservas', url: 'reservas', icon: 'calendar' },
      // ADMIN
      { title: 'Usuarios', url: 'users', icon: 'people' },
      { title: 'Añadir', url: 'add', icon: 'duplicate' },
    ]
  }
  vistaProf() {
    this.categorias = [
    
    ];
    this.tabs=[
      // PROFESORES
      { title: 'Informacion', url: 'infoProf', icon: 'calendar' },
      { title: 'Prevision', url: 'work-forecast', icon: 'calendar' },
      { title: 'Mis Datos', url: 'personalDataProf', icon: 'people' },
    ]
  }
  vistaUser() {
    this.categorias = [
      
    ];
    this.tabs=[
      // USERS
      { title: 'Reservas', url: 'reservas', icon: 'calendar' },
      { title: 'Mis Datos', url: 'userData', icon: 'people' },
    ]
  }

  navigate(page: any) {
    this.router.navigate([page]);
    // this.menu.close();
    this.currentPage = page;
    localStorage.setItem('page', JSON.stringify(page));
  }
}
