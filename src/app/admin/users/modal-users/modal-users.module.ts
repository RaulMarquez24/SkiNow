import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalUsersPageRoutingModule } from './modal-users-routing.module';

import { ModalUsersPage } from './modal-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalUsersPageRoutingModule
  ],
  declarations: [ModalUsersPage]
})
export class ModalUsersPageModule {}
