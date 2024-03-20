import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnrolledStudentsPageRoutingModule } from './enrolled-students-routing.module';

import { EnrolledStudentsPage } from './enrolled-students.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnrolledStudentsPageRoutingModule
  ],
  declarations: [EnrolledStudentsPage]
})
export class EnrolledStudentsPageModule {}
