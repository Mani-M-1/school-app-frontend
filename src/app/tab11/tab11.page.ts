import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RoleService } from '../role.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab11',
  templateUrl: './tab11.page.html',
  styleUrls: ['./tab11.page.scss'],
})
export class Tab11Page implements OnInit {
  private apiUrl: string = environment.apiUrl;

  school: any;
  firstName: any;
  lastName: any;
  mobileNo: any;
  emergency: any;
  email: any;
  profile: any;

  updateProfile: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private roleService: RoleService
  ) {
    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if (login_state == 'true') {
      console.log('log in is succesful');
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  ngOnInit() {
    console.log('ngOnInit triggered in tab11');
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.school = localStorage.getItem('school');
        this.firstName = localStorage.getItem('firstName');
        this.lastName = localStorage.getItem('lastName');
        this.mobileNo = localStorage.getItem('mobileNo');
        this.emergency = localStorage.getItem('emergency');
        this.profile = localStorage.getItem('profile');

        this.getProfileData();
      }
    });
  }

  logOut() {
    localStorage.removeItem('isLoggedIn'); // written by "manikanta"

    this.roleService.clearUserRole();

    console.log('log-out successful');

    // Step 2: Navigate the user to the sign-in page
    this.router.navigate(['/sign-in']);
  }

  getProfileData() {
    this.email = localStorage.getItem('email');
    console.log(this.email);
    this.http
      .get(`${this.apiUrl}/user/profile/${this.email}`)
      .subscribe((data: any) => {
        console.log(data);
        this.school = data.school;
        this.firstName = data.FirstName;
        this.lastName = data.lastName;
        this.mobileNo = data.mobileno;
        this.emergency = data.emergency;
        this.profile = data.profile;
      });
  }
}
