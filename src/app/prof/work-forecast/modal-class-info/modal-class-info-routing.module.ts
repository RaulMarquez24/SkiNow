import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalClassInfoPage } from './modal-class-info.page';

const routes: Routes = [
  {
    path: '',
    component: ModalClassInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalClassInfoPageRoutingModule {}
