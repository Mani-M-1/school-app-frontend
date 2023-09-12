import { IonicModule } from '@ionic/angular';
import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';

@Injectable({
  providedIn: 'root'
})

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {
  userRole: 'student'

  // constructor(){
  //   //read the user role from local storage
  //   this.userRole = localStorage.getItem('userRole');
  // }
}

export class RoleService{
  // getUserRole(): any {
  //   return localStorage.getItem('userRole');
  // }
}
