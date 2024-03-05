import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  notificationArr: any[];

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {
    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if (login_state == 'true') {
      console.log('log in is succesful');

      // getting notifications
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.refreshNotifications();
        }
      });
      // this.refreshNotifications();
    } else {
      this.router.navigate(['/sign-in']);
    }
    // this.notificationArr = [
    //   {
    //     additionalData: {
    //       profile:
    //         'https://d2ax4codf16e0h.cloudfront.net/error-404-vector-img-cropped.jpg',
    //       username: 'newprofessor@gmail.com',
    //     },
    //     body: 'This is a test notification message.',
    //     notificationId: 'bffa38d7-0f45-48d4-9158-27b63c7ec992',
    //     title: 'School App',
    //   },
    // ];
  }

  // getNotifications() {
  //   const notifications = localStorage.getItem('notifications');
  //   console.log(`tab3 notifications: ${notifications}}`);

  //   if (notifications !== null) {
  //     this.notificationArr = [...JSON.parse(notifications)];
  //   }
  // }
  refreshNotifications() {
    this.notificationArr = this.notificationService.getNotifications();
  }

  handleOnclickDeleteBtn(notification: any) {
    console.log(`tab3 handleOnclickDeleteBtn(notification): ${notification}`);
    this.notificationArr =
      this.notificationService.deleteNotification(notification);
  }

  handleOnclickClearAllBtn() {
    this.notificationArr = this.notificationService.deleteAllNotification();
  }
}
