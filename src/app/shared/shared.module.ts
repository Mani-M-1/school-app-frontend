import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterPipe } from '../search-filter.pipe';
import { GreetingComponent } from '../greeting/greeting.component';


@NgModule({
  declarations: [
    SearchFilterPipe,
    GreetingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchFilterPipe,
    GreetingComponent
  ],
})
export class SharedModule { }
