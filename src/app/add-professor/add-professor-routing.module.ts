import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProfessorPage } from './add-professor.page';

const routes: Routes = [
  {
    path: '',
    component: AddProfessorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddProfessorPageRoutingModule {}
