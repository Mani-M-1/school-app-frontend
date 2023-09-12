import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoHomePage } from './todo-home.page';

const routes: Routes = [
  {
    path: '',
    component: TodoHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoHomePageRoutingModule {}
