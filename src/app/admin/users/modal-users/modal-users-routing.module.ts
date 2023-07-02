import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalUsersPage } from './modal-users.page';

const routes: Routes = [
  {
    path: '',
    component: ModalUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalUsersPageRoutingModule {}
