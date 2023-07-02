import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInfoReservasPage } from './modal-info-reservas.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInfoReservasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInfoReservasPageRoutingModule {}
