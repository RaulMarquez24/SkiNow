import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkForecastPage } from './work-forecast.page';

const routes: Routes = [
  {
    path: '',
    component: WorkForecastPage
  },
  {
    path: 'modal-class-info',
    loadChildren: () => import('./modal-class-info/modal-class-info.module').then(m => m.ModalClassInfoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkForecastPageRoutingModule { }
