import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAddClassesPageRoutingModule } from './modal-add-classes-routing.module';

import { ModalAddClassesPage } from './modal-add-classes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAddClassesPageRoutingModule
  ],
  declarations: [ModalAddClassesPage]
})
export class ModalAddClassesPageModule {}
