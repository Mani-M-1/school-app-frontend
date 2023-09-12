import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateWeekPage } from './update-week.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateWeekPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateWeekPageRoutingModule {}
