import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetpassFirePageRoutingModule } from './resetpass-fire-routing.module';

import { ResetpassFirePage } from './resetpass-fire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ResetpassFirePageRoutingModule
  ],
  declarations: [ResetpassFirePage]
})
export class ResetpassFirePageModule {}
