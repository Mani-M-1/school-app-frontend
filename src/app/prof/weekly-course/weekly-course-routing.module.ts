import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeeklyCoursePage } from './weekly-course.page';

const routes: Routes = [
  {
    path: '',
    component: WeeklyCoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeeklyCoursePageRoutingModule {}
