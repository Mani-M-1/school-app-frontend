import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MProfPage } from './m-prof.page';

const routes: Routes = [
  {
    path: '',
    component: MProfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MProfPageRoutingModule {}
