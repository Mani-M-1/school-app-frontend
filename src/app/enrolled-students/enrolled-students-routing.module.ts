import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnrolledStudentsPage } from './enrolled-students.page';

const routes: Routes = [
  {
    path: '',
    component: EnrolledStudentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnrolledStudentsPageRoutingModule {}
