import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab6',
  templateUrl: 'tab6.page.html',
  styleUrls: ['tab6.page.scss'],
})
export class Tab6Page implements OnInit {
  private apiUrl: string = environment.apiUrl;

  selectTabs: any;

  blogs: any = [];

  //this user name variable for shoeing
  //individual blog data based on prof email
  email: any;

  userBlogs: any = [];

  schoolId: any;

  constructor(
    private navcontroller: NavController,
    private router: Router,
    private http: HttpClient
  ) {
    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if (login_state == 'true') {
      console.log('log in is successful');
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.schoolId = localStorage.getItem('schoolId');
    console.log(this.email);

    this.selectTabs = localStorage.getItem('activeTabInBlogs') || 'allBlogs';

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getBlogs();
      }
    });
  }

  handleOnclickAllBlogs() {
    localStorage.setItem('activeTabInBlogs', 'allBlogs');
    this.selectTabs = 'allBlogs';
  }

  handleOnclickYourBlogs() {
    localStorage.setItem('activeTabInBlogs', 'yourBlogs');
    this.selectTabs = 'yourBlogs';
  }

  getBlogs() {
    this.http.get(`${this.apiUrl}/blog/school/${this.schoolId}`).subscribe(
      (data: any) => {
        console.log(data);
        this.blogs = data.posts;
        this.userBlogs = data.posts.filter(
          (post: any) => post.email === this.email
        );
        console.log(this.userBlogs);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // this blogPost function is original function ...and it's function works on navigate to anther page....
  blogPost() {
    this.navcontroller.navigateRoot('/createblog');
  }

  update(selectedblog: any) {
    this.router.navigate(['/update-blog', selectedblog]);
    console.log(selectedblog);
  }

  delete(key: any) {
    console.log('clickdeletebutton');
    console.log(key);
    this.http.delete(`${this.apiUrl}/blog/${key}`).subscribe((data) => {
      console.log(data);

      this.getBlogs();
    });
  }

  cardClick(blogId: any) {
    this.router.navigate(['/blog-content', blogId]);
  }
}
