import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterFirePage } from './register-fire.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterFirePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterFirePageRoutingModule {}
