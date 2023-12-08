import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseRegisterPage } from './course-register.page';

const routes: Routes = [
  {
    path: '',
    component: CourseRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRegisterPageRoutingModule {}
