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
    //to navigate one page to anothor page
    private router: Router,
    //for showing toast massages i used it for log in fail
    //don't forgot to use it is good one
    private toastService: ToastService,
    private authService: AuthService,
    private roleService: RoleService,
    private platform: Platform,
    private notificationService: NotificationService
  ) {}

  platformFun(mobileNum: any) {
    // this.platform.ready().then(() => {
    //   if (this.platform.is('mobile')) {
    //     // this.platform.ready().then(() => {
    //     //   console.log(
    //     //     'Platform ready in mobile view and triggering this.OnSignalInit()'
    //     //   );
    //     //   this.OneSignalInit();
    //     // });
    //     console.log("this.platform.is('mobile') triggered");
    //     this.OneSignalInit(mobileNum);
    //   } else {
    //     console.log(
    //       'Platform is not mobile. OneSignal initialization skipped.'
    //     );
    //   }
    // });
    if (this.platform.is('mobile')) {
      // this.platform.ready().then(() => {
      //   console.log(
      //     'Platform ready in mobile view and triggering this.OnSignalInit()'
      //   );
      //   this.OneSignalInit();
      // });
      console.log("this.platform.is('mobile') triggered");
      this.OneSignalInit(mobileNum);
    } else {
      console.log('Platform is not mobile. OneSignal initialization skipped.');
    }
  }

  // will be implemented version 2 of applicaton development

  OneSignalInit(phoneNum: any): void {
    console.log('OnsignalInit function triggered');
    //   // Uncomment to set OneSignal device logging to VERBOSE
    //   // OneSignal.setLogLevel(6, 0);
    //   //alert("notification started")
    //   // NOTE: Update the setAppId value below with your OneSignal AppId.
    //   // OneSignal.setAppId("d3feb1d4-dcd3-468f-826f-5481d02c64d3");
    OneSignal.setAppId('29817fd7-735e-487b-8b4f-cb8d408a8d97'); // my onesignal app id
    OneSignal.setNotificationOpenedHandler((jsonData: any) => {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      alert('message received');

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

    // Handle notification received event
    // document.addEventListener('notificationReceived', (event: any) => {
    //   // Handle notification received event
    //   // This event is triggered when a notification is received, even if the app is in the background
    //   const notification = event.data.notification;

    //   console.log('notificationReceived triggered');

    //   // Store notification locally
    //   // storeNotification(notification);
    // });

    // 'works on onesignal-cordova-plugin version: ^3.3.1';
    // Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
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

        // Assuming successful login with 'role' returned from the server
        // const role = 'student'; // Replace this with the actual role received from the server

        // // Store the authentication status and role in localStorage
        // localStorage.setItem('token', 'dummy_token'); // Replace 'dummy_token' with your actual authentication token received from the server
        // localStorage.setItem('role', role);

        // // Navigate based on the user's role
        // if (role === 'student') {
        //   this.router.navigate(['/tabs/tab1']);
        // } else if (role === 'professor') {
        //   this.router.navigate(['/tab/tab5']);
        // } else {
        //   // Handle unknown role or error
        // }

        //hangle the response from the server here
      },
      (error) => {
        this.toastService.presentToast('incorrect email or password');
      }
    );
  }
}

// function storeNotification(notification: any) {
//   // Implement your logic to store the notification locally
//   // For example, you can store it in local storage
//   console.log('storeNotifications function triggered');
//   let notifications: any[] = JSON.parse(
//     localStorage.getItem('notifications') || '[]'
//   );
//   notifications.push(notification);
//   localStorage.setItem('notifications', JSON.stringify(notifications));
// }
