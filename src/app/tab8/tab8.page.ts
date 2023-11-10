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
import { Router } from '@angular/router';

@Component({
    selector: 'app-tab8',
    templateUrl: 'tab8.page.html',
    styleUrls: ['tab8.page.scss']
  })
  export class Tab8Page {
  school: any;
  firstName: any;
  lastName: any;
  mobileNo: any;
  emergency: any;
  username: any;
  profile: any;


  updateProfile: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if(login_state == 'true'){
      console.log("log in is succesful");
    }else{
      this.router.navigate(['/sign-in']);
    }

    

    this.school = localStorage.getItem('school');
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.mobileNo = localStorage.getItem('mobileNo');
    this.emergency = localStorage.getItem('emergency');
    this.username = localStorage.getItem('username');
    this.profile = localStorage.getItem('profile');


    console.log(this.school);
    console.log(this.firstName);
    console.log(this.lastName);
    console.log(this.mobileNo);
    console.log(this.emergency);
    console.log(this.profile);
    //var school = localStorage.getItem('School');
    // this.firstName = localStorage.getItem('firstName');
    // this.mobileNo = localStorage.getItem('mobileNo');
    // this.emergency = localStorage.getItem('emergency');
    // console.log(this.emergency);
  }
  // this.http.get(`http://localhost:3000/Signup`).subscribe((data:any) => {
  //   console.log(data);
  //   this.Course = data;
  // });
  

  logOut() {

    // Step 1: Update the login_state in localStorage to false
    localStorage.setItem('isLoggedIn', 'false');

    console.log("log-out successful");
  
    // Step 2: Navigate the user to the sign-in page
    this.router.navigate(['/sign-in']);
  }

  getProfileData() {
    this.http.get(`http://localhost:3000/Signup/${this.username}`).subscribe((data: any) => {
      console.log(data);
      this.school = data.school;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.mobileNo = data.mobileNo;
      this.emergency = data.emergency;
      this.profile = data.profile;
    });

}
}
