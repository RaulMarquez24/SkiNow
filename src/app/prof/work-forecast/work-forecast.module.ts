import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkForecastPageRoutingModule } from './work-forecast-routing.module';

import { WorkForecastPage } from './work-forecast.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkForecastPageRoutingModule,
  ],
  declarations: [WorkForecastPage]
})
export class WorkForecastPageModule { }
