import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
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
    this.isLoggedIn();
  }

  //this is for routing porpose if the user is loggedin then he should navigate to tab1 page
  isLoggedIn() {
    const email = localStorage.getItem('email');
    if (email) {
      this.router.navigate(['tab1']);
    } else {
      this.router.navigate(['login']);
    }
  }

  OneSignalInit(): void {
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
    });
  }
}
