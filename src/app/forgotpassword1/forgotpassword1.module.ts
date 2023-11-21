import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Forgotpassword1PageRoutingModule } from './forgotpassword1-routing.module';

import { Forgotpassword1Page } from './forgotpassword1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Forgotpassword1PageRoutingModule
  ],
  declarations: [Forgotpassword1Page]
})
export class Forgotpassword1PageModule {}
