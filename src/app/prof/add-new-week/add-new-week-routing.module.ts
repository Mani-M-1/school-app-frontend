import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewWeekPage } from './add-new-week.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewWeekPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewWeekPageRoutingModule {}
