import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import OneSignal from 'onesignal-cordova-plugin';
import { NotificationService } from '../app/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  searchText!: string;

  constructor(
    private router: Router,
    private platform: Platform,
    private notificationService: NotificationService
  ) {
    if (this.platform.is('mobileweb') || this.platform.is('desktop')) {
      console.log('Platform is not mobile. OneSignal initialization skipped.');
    } else {
      console.log("this.platform.is('mobile') triggered");
      this.OneSignalInit();
    }
  }

  OnInit() {
    // this.isLoggedIn();
  }

  //this is for routing porpose if the user is loggedin then he should navigate to tab1 page
  // isLoggedIn() {
  //   const email = localStorage.getItem('email');
  //   if (email) {
  //     this.router.navigate(['student-side-courses-page']);
  //   } else {
  //     this.router.navigate(['sign-in']);
  //   }
  // }

  OneSignalInit(): void {
    console.log('OnsignalInit function triggered');
    OneSignal.setAppId('29817fd7-735e-487b-8b4f-cb8d408a8d97'); // my onesignal app id
    OneSignal.setNotificationOpenedHandler((jsonData: any) => {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));

      // Store notification locally
      const { additionalData, title, body, notificationId } =
        jsonData.notification;

      this.notificationService.storeNotification({
        notificationId,
        additionalData,
        title,
        body,
      });
    });
  }
}
