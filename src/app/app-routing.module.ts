import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [

  ///////////////////////////
  ////      AUTH       /////
  //////////////////////////
  {
    path: '',
    loadChildren: () => import('./auth/login-fire/login-fire.module').then(m => m.LoginFirePageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'register-fire',
    loadChildren: () => import('./auth/register-fire/register-fire.module').then(m => m.RegisterFirePageModule),
  },
  {
    path: 'resetpass-fire',
    loadChildren: () => import('./auth/resetpass-fire/resetpass-fire.module').then(m => m.ResetpassFirePageModule)
  },
  ///////////////////////////
  ////      GLOBAL      /////
  //////////////////////////
  {
    path: 'home',
    loadChildren: () => import('./global/home/home.module').then((m) => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'modalAnuncio',
    loadChildren: () => import('./global/home/modal-anuncio/modal-anuncio.module').then(m => m.ModalAnuncioPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'mas',
    loadChildren: () => import('./global/mas/mas.module').then( m => m.MasPageModule),
    canActivate: [redirectUnauthorizedToLogin]
  },
  ///////////////////////////
  ////      USERS       /////
  //////////////////////////
  {
    path: 'reservas',
    loadChildren: () => import('./user/reservas/reservas.module').then(m => m.ReservasPageModule),
    canActivate: [redirectUnauthorizedToLogin]
  },
  {
    path: 'userData',
    loadChildren: () => import('./user/user-data/user-data.module').then( m => m.UserDataPageModule),
    canActivate: [redirectUnauthorizedToLogin]
  },
  {
    path: 'mas',
    loadChildren: () => import('./global/mas/mas.module').then( m => m.MasPageModule),
    canActivate: [redirectUnauthorizedToLogin]
  },
  ///////////////////////////
  ////      PROF        /////
  //////////////////////////
  {
    path: 'work-forecast',
    loadChildren: () => import('./prof/work-forecast/work-forecast.module').then(m => m.WorkForecastPageModule),
    canActivate: [redirectUnauthorizedToLogin]
  },
  {
    path: 'personalDataProf',
    loadChildren: () => import('./prof/personal-data/personal-data.module').then(m => m.PersonalDataPageModule),
    canActivate: [redirectUnauthorizedToLogin]
  },
  {
    path: 'infoProf',
    loadChildren: () => import('./prof/info/info.module').then(m => m.InfoPageModule),
    canActivate: [redirectUnauthorizedToLogin]
  },
  ///////////////////////////
  ////      ADMIN       /////
  //////////////////////////
  {
    path: 'users',
    loadChildren: () => import('./admin/users/users.module').then( m => m.UsersPageModule),
    canActivate: [redirectUnauthorizedToLogin]
  },
  {
    path: 'add',
    loadChildren: () => import('./admin/add/add.module').then( m => m.AddPageModule),
    canActivate: [redirectUnauthorizedToLogin]
  },
  {
    path: 'modalUsers',
    loadChildren: () => import('./admin/users/modal-users/modal-users.module').then(m => m.ModalUsersPageModule),
    canActivate: [redirectUnauthorizedToLogin]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
