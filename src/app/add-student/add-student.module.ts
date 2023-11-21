import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddStudentPageRoutingModule } from './add-student-routing.module';

import { AddStudentPage } from './add-student.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddStudentPageRoutingModule,
    ReactiveFormsModule,

  ],
  declarations: [AddStudentPage]
})
export class AddStudentPageModule {}