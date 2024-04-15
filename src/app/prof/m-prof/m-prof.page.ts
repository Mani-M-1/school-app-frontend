import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-m-prof',
  templateUrl: './m-prof.page.html',
  styleUrls: ['./m-prof.page.scss'],
})
export class MProfPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  searchText: any;
  showAll: boolean | undefined;
  weeklyCourse: any;

  constructor(private http: HttpClient, private router: Router) {
    this.http.get('assets/weeklyCourse.json').subscribe((data: any) => {
      console.log(data);
      this.weeklyCourse = data;
    });
    this.getCourseDetails();

    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if (login_state == 'true') {
      console.log('log in is succesful');
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  ngOnInit() {}

  showAllCards() {
    if (this.searchText) {
      this.searchText = '';
    }
    this.showAll = !this.showAll;
  }

  cardClicked(item: any) {
    console.log(item);
    let a = item;

    localStorage.setItem('weeklyCoursedata', JSON.stringify(a));
    console.log('card clicked');
    this.router.navigate(['/prof-course-content']);
  }

  getCourseDetails() {
    this.http.get(`${this.apiUrl}/weeklyCourse`).subscribe((data: any) => {
      console.log(data);
      this.weeklyCourse = data;
    });
  }
}
