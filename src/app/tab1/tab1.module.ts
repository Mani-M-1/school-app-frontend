import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { HttpClientModule } from '@angular/common/http';


import { Tab1PageRoutingModule } from './tab1-routing.module';
//imported pipe which i create using ionic generate
//import { SearchFilterPipe } from '../search-filter.pipe';
//greeting component
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    HttpClientModule,
    SharedModule

    
  ],
  declarations: [
    Tab1Page,
    //SearchFilterPipe, //and declared here
    //GreetingComponent
  ]
})
export class Tab1PageModule {}
