import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPage } from './add.page';

const routes: Routes = [
  {
    path: '',
    component: AddPage
  },
  {
    path: 'modal-add-ads',
    loadChildren: () => import('./modal-add-ads/modal-add-ads.module').then( m => m.ModalAddPageModule)
  },
  {
    path: 'modal-add-classes',
    loadChildren: () => import('./modal-add-classes/modal-add-classes.module').then( m => m.ModalAddClassesPageModule)
  },  {
    path: 'modal-add-discounts',
    loadChildren: () => import('./modal-add-discounts/modal-add-discounts.module').then( m => m.ModalAddDiscountsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPageRoutingModule {}
