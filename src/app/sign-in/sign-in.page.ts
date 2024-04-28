import { Component, OnInit } from '@angular/core';
// import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { RoleService } from '../role.service';

import { environment } from 'src/environments/environment';
import OneSignal from 'onesignal-cordova-plugin'; // Import OneSignal
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  //Variables
  email: any;
  password: any;
  role: any;
  school: any;
  firstName: any;
  lastName: any;
  mobileNo: any;
  emergency: any;
  loggedInemail: any;
  profile: any;

  student: any;
  professor: any;

  // form!: FormGroup;
  type: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService,
    private roleService: RoleService,
    private platform: Platform
  ) {}

  // will be implemented version 2 of applicaton development

  OneSignalInit(phoneNum: any): void {
    console.log('OnsignalInit function triggered');
    OneSignal.setAppId('29817fd7-735e-487b-8b4f-cb8d408a8d97'); // my onesignal app id

    // 'works on onesignal-cordova-plugin version: ^3.3.1';
    OneSignal.promptForPushNotificationsWithUserResponse((accepted: any) => {
      console.log('User accepted notifications: ' + accepted);
      if (accepted) {
        if (phoneNum !== null) {
          OneSignal.setExternalUserId(phoneNum);
        }
      }
    });
  }

  ngOnInit() {}

  changeType() {
    this.type = !this.type;
  }

  hadleOnclickForgotPassword() {
    console.log('sign-in page forgot password navigate function');
    this.router.navigate(['/forgot-password']);
  }

  logIn() {
    console.log(this.email);
    console.log(this.password);

    //From here we will post data the data base
    const postdata = {
      email: this.email,
      password: this.password,
    };
    console.log(postdata);

    //here we are hitting to the data base link
    this.http.post(`${this.apiUrl}/user/login`, postdata).subscribe(
      (response: any) => {
        console.log(response);

        localStorage.setItem('userId', response.userData._id);
        localStorage.setItem('email', response.userData.email);
        localStorage.setItem('school', response.userData.school);
        localStorage.setItem('schoolId', response.userData.schoolId);
        localStorage.setItem('firstName', response.userData.firstName);
        localStorage.setItem('lastName', response.userData.lastName);
        localStorage.setItem('mobileNo', response.userData.mobileNo);
        localStorage.setItem('emergency', response.userData.emergency);
        localStorage.setItem('profile', response.userData.profile);

        localStorage.setItem('isLoggedIn', 'true');

        console.log(response.userData.school);
        console.log(response.userData.firstName);
        console.log(response.userData.lastName);
        console.log(response.userData.mobileNo);
        console.log(response.userData.emergency);
        console.log(response.userData.role);

        this.roleService.setUserRole(response.userData.role); // Set the user's role

        // Redirect to the appropriate page based on the user role
        switch (response.userData.role as string) {
          case 'student':
            this.router.navigate(['/tabs/student-side-courses-page']);
            break;

          case 'professor':
            this.router.navigate(['/tabs/tab5']);
            break;

          case 'principal':
            this.router.navigate(['/tabs/tab9']);
            break;

          default:
            // Handle other roles or invalid role values
            break;
        }

        // invoking platform function to trigger onesignal
        if (this.platform.is('mobileweb') || this.platform.is('desktop')) {
          console.log(
            'Platform is not mobile. OneSignal initialization skipped.'
          );
        } else {
          console.log("this.platform.is('mobile') triggered");
          this.OneSignalInit(response.userData.mobileNo);
        }
      },
      (error) => {
        this.toastService.presentToast('incorrect email or password');
      }
    );
  }
}
