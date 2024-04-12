import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../shared/auth.service';
import { RoleService } from '../role.service';
import { NotificationService } from '../notification.service';

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

  form!: FormGroup;
  type: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService,
    private roleService: RoleService,
    private platform: Platform,
    private notificationService: NotificationService
  ) {}

  platformFun(mobileNum: any) {
    if (this.platform.is('mobileweb') || this.platform.is('desktop')) {
      console.log('Platform is not mobile. OneSignal initialization skipped.');
    } else {
      console.log("this.platform.is('mobile') triggered");
      this.OneSignalInit(mobileNum);
    }
  }

  // will be implemented version 2 of applicaton development

  OneSignalInit(phoneNum: any): void {
    console.log('OnsignalInit function triggered');
    OneSignal.setAppId('29817fd7-735e-487b-8b4f-cb8d408a8d97'); // my onesignal app id
    OneSignal.setNotificationOpenedHandler((jsonData: any) => {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));

      // Store notification locally
      const { additionalData, title, body, notificationId } =
        jsonData.notification;
      // storeNotification({ additionalData, title, body });
      // storeNotification(jsonData.notification);
      this.notificationService.storeNotification({
        notificationId,
        additionalData,
        title,
        body,
      });

      // triggering "getNotifications" function in "Notification Service" to get new nootifications immediately after aclicking on notification alert
      // this.notificationService.getNotifications();
    });

    // 'works on onesignal-cordova-plugin version: ^3.3.1';
    OneSignal.promptForPushNotificationsWithUserResponse((accepted: any) => {
      console.log('User accepted notifications: ' + accepted);
      if (accepted) {
        //we are using "uuid" for assigning the "externalId" for a user
        // const uniqueId = uuidv4();
        // console.log(`uniqueId: ${uniqueId}`);
        // OneSignal.setExternalUserId(uniqueId);
        // localStorage.setItem('onesignalExternalId', uniqueId);
        // const phoneNumAsString = localStorage.getItem('mobileNo');
        // if (phoneNumAsString !== null) {
        //   const phoneNum = JSON.parse(phoneNumAsString);
        //   // console.log(phoneNum);
        //   OneSignal.setExternalUserId(phoneNum);
        // }
        if (phoneNum !== null) {
          // console.log(phoneNum);
          OneSignal.setExternalUserId(phoneNum);
        }
      }
    });
  }

  ngOnInit() {}

  changeType() {
    this.type = !this.type;
  }

  logIn() {
    console.log(this.email);
    console.log(this.password);
    // console.log(this.role)

    //From here we will post data the data base
    const postdata = {
      email: this.email,
      password: this.password,
      // "role": this.role
    };
    console.log(postdata);

    //here we are hitting to the data base link
    this.http.post(`${this.apiUrl}/user/login`, postdata).subscribe(
      (response: any) => {
        console.log(response);

        // Save the user role in local storage
        //here you setItem for local storage and you call
        //that data with get item where ever you want
        // localStorage.setItem('userRole', response.role);
        localStorage.setItem('email', response.userData.email);
        localStorage.setItem('school', response.userData.school);
        localStorage.setItem('schoolId', response.userData.schoolId);
        localStorage.setItem('firstName', response.userData.firstName);
        localStorage.setItem('lastName', response.userData.lastName);
        localStorage.setItem('mobileNo', response.userData.mobileNo);
        localStorage.setItem('emergency', response.userData.emergency);
        localStorage.setItem('profile', response.userData.profile);

        //localStorage.setItem('school', response.school);
        // localStorage.setItem('firstName', response.firstName);
        // localStorage.setItem('mobileNo', response.mobileNo || '');
        // localStorage.setItem('emergency', response.emergency || '');

        localStorage.setItem('isLoggedIn', 'true');

        console.log(response.userData.role);
        console.log(response.userData.school);
        console.log(response.userData.firstName);
        console.log(response.userData.lastName);
        console.log(response.userData.mobileNo);
        console.log(response.userData.emergency);
        console.log(response.userData.role);

        // invoking platform function to trigger onesignal
        this.platformFun(response.userData.mobileNo);

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
      },
      (error) => {
        this.toastService.presentToast('incorrect email or password');
      }
    );
  }
}
