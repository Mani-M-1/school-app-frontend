import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SamplepagePageRoutingModule } from './samplepage-routing.module';

import { SamplepagePage } from './samplepage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SamplepagePageRoutingModule
  ],
  declarations: [SamplepagePage]
})
export class SamplepagePageModule {}
