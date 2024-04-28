import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPrincipalPage } from './add-principal.page';

const routes: Routes = [
  {
    path: '',
    component: AddPrincipalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPrincipalPageRoutingModule {}
