import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAddPageRoutingModule } from './modal-add-ads-routing.module';

import { ModalAddPage } from './modal-add-ads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAddPageRoutingModule
  ],
  declarations: [ModalAddPage]
})
export class ModalAddPageModule {}
