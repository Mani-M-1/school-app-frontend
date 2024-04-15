import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  private apiUrl: string = environment.apiUrl;

  blogs: any[] = [];
  content: any;

  schoolId: any;

  constructor(private http: HttpClient, private router: Router) {
    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    this.schoolId = localStorage.getItem('schoolId');

    if (login_state == 'true') {
      console.log('log in is succesful');
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  ngOnInit() {
    this.blogcontent();
  }

  blogcontent() {
    this.http
      .get(`${this.apiUrl}/blog/school/${this.schoolId}`)
      .subscribe((data: any) => {
        console.log(data);
        this.blogs = data.posts;
      });
  }

  cardClick(createblog: any) {
    this.router.navigate(['/blog-content', createblog._id]);
  }
}
