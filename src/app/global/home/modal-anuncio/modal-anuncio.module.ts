import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAnuncioPageRoutingModule } from './modal-anuncio-routing.module';

import { ModalAnuncioPage } from './modal-anuncio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAnuncioPageRoutingModule
  ],
  declarations: [ModalAnuncioPage]
})
export class ModalAnuncioPageModule {}
