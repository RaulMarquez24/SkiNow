import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalClassInfoPageRoutingModule } from './modal-class-info-routing.module';

import { ModalClassInfoPage } from './modal-class-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalClassInfoPageRoutingModule
  ],
  declarations: [ModalClassInfoPage]
})
export class ModalClassInfoPageModule {}
