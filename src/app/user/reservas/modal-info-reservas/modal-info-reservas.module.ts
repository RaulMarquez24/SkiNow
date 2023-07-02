import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInfoReservasPageRoutingModule } from './modal-info-reservas-routing.module';

import { ModalInfoReservasPage } from './modal-info-reservas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfoReservasPageRoutingModule
  ],
  declarations: [ModalInfoReservasPage]
})
export class ModalInfoReservasPageModule {}
