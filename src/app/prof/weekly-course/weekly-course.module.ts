import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { WeeklyCoursePageRoutingModule } from './weekly-course-routing.module';

import { WeeklyCoursePage } from './weekly-course.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WeeklyCoursePageRoutingModule
  ],
 
  declarations: [WeeklyCoursePage],
  
})
export class WeeklyCoursePageModule {}
