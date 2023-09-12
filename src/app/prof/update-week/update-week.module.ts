import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateWeekPageRoutingModule } from './update-week-routing.module';

import { UpdateWeekPage } from './update-week.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateWeekPageRoutingModule
  ],
  declarations: [UpdateWeekPage]
})
export class UpdateWeekPageModule {}
