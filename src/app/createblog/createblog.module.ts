import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateblogPageRoutingModule } from './createblog-routing.module';

import { CreateblogPage } from './createblog.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreateblogPageRoutingModule
  ],
  declarations: [CreateblogPage]
})
export class CreateblogPageModule {}