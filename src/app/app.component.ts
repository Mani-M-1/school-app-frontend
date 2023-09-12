import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import OneSignal from 'onesignal-cordova-plugin';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  searchText!: string;


  constructor(
    platform: Platform,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {
    platform.ready().then(() => {
      OneSignalInit();
    });
  }

  OnInit(){
    this.isLoggedIn();

  }

  //this is for routing porpose if the user is loggedin then he should navigate to tab1 page
  isLoggedIn() {
    const username = localStorage.getItem('username');
    if (username) {
      this.router.navigate(['tab1']);
    } else {
      this.router.navigate(['login']);
    }
  }

}
// Call this function when your app starts
function OneSignalInit(): void {
  // Uncomment to set OneSignal device logging to VERBOSE  
  // OneSignal.setLogLevel(6, 0);
//alert("notification started")
  // NOTE: Update the setAppId value below with your OneSignal AppId.
  OneSignal.setAppId("d3feb1d4-dcd3-468f-826f-5481d02c64d3");
  OneSignal.setNotificationOpenedHandler(function(jsonData: any) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      alert("message receved")
  });

  // Prompts the user for notification permissions.
  //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
  OneSignal.promptForPushNotificationsWithUserResponse(function(accepted: any) {
      console.log("User accepted notifications: " + accepted);
  });
}
//I am removing onesignal-cordovaplugin
//cause i  got some error with that
//npm uninstall onesignal-cordovaplugin this the command