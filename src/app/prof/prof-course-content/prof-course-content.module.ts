import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { ProfCourseContentPageRoutingModule } from './prof-course-content-routing.module';

import { ProfCourseContentPage } from './prof-course-content.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfCourseContentPageRoutingModule
  ],
  declarations: [ProfCourseContentPage]
})
export class ProfCourseContentPageModule {}
