import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfCourseContentPage } from './prof-course-content.page';

const routes: Routes = [
  {
    path: '',
    component: ProfCourseContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfCourseContentPageRoutingModule {}
