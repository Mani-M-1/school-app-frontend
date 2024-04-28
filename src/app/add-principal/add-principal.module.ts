import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPrincipalPageRoutingModule } from './add-principal-routing.module';

import { AddPrincipalPage } from './add-principal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPrincipalPageRoutingModule
  ],
  declarations: [AddPrincipalPage]
})
export class AddPrincipalPageModule {}
