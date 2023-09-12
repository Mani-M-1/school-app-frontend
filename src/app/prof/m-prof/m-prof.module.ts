import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MProfPageRoutingModule } from './m-prof-routing.module';
import { SharedModule } from '../../shared/shared.module'
//import { GreetingComponent } from '../greeting/greeting.component';


import { MProfPage } from './m-prof.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MProfPageRoutingModule,
    SharedModule,

  ],
  declarations: [
    MProfPage
  ]
})
export class MProfPageModule {}
