import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import OneSignal from 'onesignal-cordova-plugin';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { v4 as uuidv4 } from 'uuid';

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
    // platform.ready().then(() => {
    //   OneSignalInit();
    // });
  }

  OnInit() {
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
// function OneSignalInit(): void {
//   //   // Uncomment to set OneSignal device logging to VERBOSE
//   //   // OneSignal.setLogLevel(6, 0);
//   //   //alert("notification started")
//   //   // NOTE: Update the setAppId value below with your OneSignal AppId.
//   //   // OneSignal.setAppId("d3feb1d4-dcd3-468f-826f-5481d02c64d3");
//   OneSignal.setAppId('29817fd7-735e-487b-8b4f-cb8d408a8d97'); // my onesignal app id
//   OneSignal.setNotificationOpenedHandler(function (jsonData: any) {
//     console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
//     alert('message receved');
//   });

//   // 'works on onesignal-cordova-plugin version: ^3.3.1';
//   // Prompts the user for notification permissions.
//   //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
//   OneSignal.promptForPushNotificationsWithUserResponse((accepted: any) => {
//     console.log('User accepted notifications: ' + accepted);
//     if (accepted) {
//       //we are using "uuid" for assigning the "externalId" for a user

//       const uniqueId = uuidv4();

//       console.log(`uniqueId: ${uniqueId}`);

//       OneSignal.setExternalUserId(uniqueId);

//       localStorage.setItem('onesignalExternalId', uniqueId);
//     }
//   });
// }

//I am removing onesignal-cordovaplugin
//cause i  got some error with that
//npm uninstall onesignal-cordovaplugin this the command

// function OneSignalInit(): void {
//   const apiUrl: string = environment.apiUrl;
//   // Uncomment to set OneSignal device logging to VERBOSE
//   // OneSignal.Debug.setLogLevel(6);

//   // Uncomment to set OneSignal visual logging to VERBOSE
//   // OneSignal.Debug.setAlertLevel(6);

//   // NOTE: Update the init value below with your OneSignal AppId.
//   // OneSignal.initialize('c264a712-97a2-428c-990e-5febc65f2796');
//   // 'works on onesignal-cordova-plugin version: "^5.0.0"';
//   OneSignal.initialize('29817fd7-735e-487b-8b4f-cb8d408a8d97');
//   document.addEventListener('OneSignal.ready', function () {
//     console.log('OneSignal.ready Event triggered');
//     // Prompts the user for notification permissions.
//     //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
//     OneSignal.Notifications.requestPermission(true).then(
//       (accepted: boolean) => {
//         console.log('User accepted notifications: ' + accepted);

//         // Get OneSignal Player ID
//         (OneSignal as any).getIds().then((ids: any) => {
//           const playerID = ids.userId;
//           console.log('OneSignal Player ID: ' + playerID);

//           console.log(`backend url: ${apiUrl}/notifications/onesignalPlayerId`);

//           // Send player ID to your backend
//           fetch(`${apiUrl}/notifications/onesignalPlayerId`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ playerID }),
//           })
//             .then((response) => {
//               console.log('Player ID sent to backend:', response);
//             })
//             .catch((error) => {
//               console.error('Error sending player ID to backend:', error);
//             });
//         });
//       }
//     );
//   });
// }
