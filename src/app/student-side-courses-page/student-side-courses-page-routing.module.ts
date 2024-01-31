import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentSideCoursesPage } from './student-side-courses-page.page';

const routes: Routes = [
  {
    path: '',
    component: StudentSideCoursesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentSideCoursesPageRoutingModule {}
