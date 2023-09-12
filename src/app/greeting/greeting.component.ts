import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-greeting',
  template: '<h1>Hello, {{greeting}}</h1>',

  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss'],
})
export class GreetingComponent  implements OnInit {
  greeting: string;

  constructor() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      this.greeting = 'Good morning';
    } else if (hour >= 12 && hour < 17) {
      this.greeting = 'Good afternoon';
    } else {
      this.greeting = 'Good evening';
    }
  }


  ngOnInit() {}

}
