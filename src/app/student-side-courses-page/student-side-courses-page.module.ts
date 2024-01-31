import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { HttpClientModule } from '@angular/common/http';

import { StudentSideCoursesPageRoutingModule } from './student-side-courses-page-routing.module';
import { StudentSideCoursesPage } from './student-side-courses-page.page';
//imported pipe which i create using io./student-side-courses-page-routing.module
//import { SearchFilterPipe } from '../search-filter.pipe';
//greeting component
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    StudentSideCoursesPageRoutingModule,
    HttpClientModule,
    SharedModule,
  ],
  declarations: [
    StudentSideCoursesPage,
    //SearchFilterPipe, //and declared here
    //GreetingComponent
  ],
})
export class StudentSideCoursesPageModule {}
