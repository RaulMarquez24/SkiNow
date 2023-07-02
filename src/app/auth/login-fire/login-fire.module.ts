import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginFirePageRoutingModule } from './login-fire-routing.module';

import { LoginFirePage } from './login-fire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginFirePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginFirePage]
})
export class LoginFirePageModule {}
