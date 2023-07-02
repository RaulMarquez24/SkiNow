import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAddDiscountsPage } from './modal-add-discounts.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAddDiscountsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAddDiscountsPageRoutingModule {}
