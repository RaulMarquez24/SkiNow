import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAddClassesPage } from './modal-add-classes.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAddClassesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAddClassesPageRoutingModule {}
