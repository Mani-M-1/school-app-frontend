import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewWeekPageRoutingModule } from './add-new-week-routing.module';

import { AddNewWeekPage } from './add-new-week.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewWeekPageRoutingModule
  ],
  declarations: [AddNewWeekPage]
})
export class AddNewWeekPageModule {}
