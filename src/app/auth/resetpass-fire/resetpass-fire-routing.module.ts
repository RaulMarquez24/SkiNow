import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetpassFirePage } from './resetpass-fire.page';

const routes: Routes = [
  {
    path: '',
    component: ResetpassFirePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetpassFirePageRoutingModule {}
