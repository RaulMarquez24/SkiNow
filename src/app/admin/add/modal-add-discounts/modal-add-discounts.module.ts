import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAddDiscountsPageRoutingModule } from './modal-add-discounts-routing.module';

import { ModalAddDiscountsPage } from './modal-add-discounts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAddDiscountsPageRoutingModule
  ],
  declarations: [ModalAddDiscountsPage]
})
export class ModalAddDiscountsPageModule {}
