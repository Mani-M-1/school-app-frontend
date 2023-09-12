import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SamplepagePage } from './samplepage.page';

const routes: Routes = [
  {
    path: '',
    component: SamplepagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SamplepagePageRoutingModule {}
