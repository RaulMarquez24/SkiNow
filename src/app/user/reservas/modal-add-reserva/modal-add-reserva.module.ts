import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAddReservaPageRoutingModule } from './modal-add-reserva-routing.module';

import { ModalAddReservaPage } from './modal-add-reserva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAddReservaPageRoutingModule
  ],
  declarations: [ModalAddReservaPage]
})
export class ModalAddReservaPageModule {}
