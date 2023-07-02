import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginFirePage } from './login-fire.page';

const routes: Routes = [
  {
    path: '',
    component: LoginFirePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginFirePageRoutingModule {}
