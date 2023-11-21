import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Forgotpassword1Page } from './forgotpassword1.page';

const routes: Routes = [
  {
    path: '',
    component: Forgotpassword1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Forgotpassword1PageRoutingModule {}
