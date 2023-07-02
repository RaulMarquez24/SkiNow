import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAnuncioPage } from './modal-anuncio.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAnuncioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAnuncioPageRoutingModule {}
