import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoHomePageRoutingModule } from './todo-home-routing.module';

import { TodoHomePage } from './todo-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoHomePageRoutingModule
  ],
  declarations: [TodoHomePage]
})
export class TodoHomePageModule {}
