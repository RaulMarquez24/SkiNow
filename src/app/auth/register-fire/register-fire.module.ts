import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterFirePageRoutingModule } from './register-fire-routing.module';

import { RegisterFirePage } from './register-fire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterFirePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterFirePage]
})
export class RegisterFirePageModule {}
