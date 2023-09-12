import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateBlogPageRoutingModule } from './update-blog-routing.module';

import { UpdateBlogPage } from './update-blog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateBlogPageRoutingModule
  ],
  declarations: [UpdateBlogPage]
})
export class UpdateBlogPageModule {}
