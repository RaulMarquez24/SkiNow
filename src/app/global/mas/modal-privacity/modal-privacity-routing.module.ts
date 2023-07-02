import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPrivacityPage } from './modal-privacity.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPrivacityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPrivacityPageRoutingModule {}
