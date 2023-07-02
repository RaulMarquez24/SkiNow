import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservasPage } from './reservas.page';

const routes: Routes = [
  {
    path: '',
    component: ReservasPage
  },
  {
    path: 'modal-info-reservas',
    loadChildren: () => import('./modal-info-reservas/modal-info-reservas.module').then( m => m.ModalInfoReservasPageModule)
  },  {
    path: 'modal-add-reserva',
    loadChildren: () => import('./modal-add-reserva/modal-add-reserva.module').then( m => m.ModalAddReservaPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservasPageRoutingModule {}
