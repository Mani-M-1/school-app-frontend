import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseRegisterPageRoutingModule } from './course-register-routing.module';

import { CourseRegisterPage } from './course-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseRegisterPageRoutingModule,
  ],
  declarations: [CourseRegisterPage],
})
export class CourseRegisterPageModule {}
