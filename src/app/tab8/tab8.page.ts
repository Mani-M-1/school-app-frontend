// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-tab8',
//   templateUrl: 'tab8.page.html',
//   styleUrls: ['tab8.page.scss']
// })
// export class Tab8Page {

//   constructor() {}

// }

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-tab8',
  templateUrl: 'tab8.page.html',
  styleUrls: ['tab8.page.scss'],
})
export class Tab8Page {
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
    private navctrl: NavController,
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
    this.school = localStorage.getItem('school');
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.mobileNo = localStorage.getItem('mobileNo');
    this.emergency = localStorage.getItem('emergency');
    this.profile = localStorage.getItem('profile');

    console.log('ngOnInit triggered in tab11');
    // this.ionViewDidEnter();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getProfileData();
      }
    });
  }

  logOut() {
    // Step 1: Update the login_state in localStorage to false
    // localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('isLoggedIn'); // written by "manikanta"

    console.log('log-out successful');

    this.roleService.clearUserRole(); // clear role in "role service"

    // Step 2: Navigate the user to the sign-in page
    this.router.navigate(['/sign-in']);
  }

  // ionViewDidEnter() {
  //   this.school = localStorage.getItem('school');
  //   this.firstName = localStorage.getItem('firstName');
  //   this.lastName = localStorage.getItem('lastName');
  //   this.mobileNo = localStorage.getItem('mobileNo');
  //   this.emergency = localStorage.getItem('emergency');
  //   this.email = localStorage.getItem('email');
  //   console.log(this.email);
  //   this.profile = localStorage.getItem('profile');
  // }

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
    // this.http.get(`${this.apiUrl}/Signup`).subscribe((data:any) => {
    //   console.log(data);
    //   this.Course = data;
    // });
  }
}
