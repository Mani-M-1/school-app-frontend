import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogContentPage } from './blog-content.page';

const routes: Routes = [
  {
    path: '',
    component: BlogContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogContentPageRoutingModule {}
