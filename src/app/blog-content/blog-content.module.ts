import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlogContentPageRoutingModule } from './blog-content-routing.module';

import { BlogContentPage } from './blog-content.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlogContentPageRoutingModule
  ],
  declarations: [BlogContentPage]
})
export class BlogContentPageModule {}
