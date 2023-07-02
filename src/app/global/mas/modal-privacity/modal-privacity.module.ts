import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPrivacityPageRoutingModule } from './modal-privacity-routing.module';

import { ModalPrivacityPage } from './modal-privacity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPrivacityPageRoutingModule
  ],
  declarations: [ModalPrivacityPage]
})
export class ModalPrivacityPageModule {}
