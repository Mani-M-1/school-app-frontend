import { Component, OnInit } from '@angular/core';
import { ModalController, ModalOptions, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';
import OneSignal from 'onesignal-cordova-plugin'; // Import OneSignal
import { Platform } from '@ionic/angular';

//import { CourseContentPage } from '../course-content/course-content.page';

//importing  push notifications capacitor plugins
// import {
//   ActionPerformed,
//   PushNotificationSchema,
//   PushNotifications,
//   Token,
// } from '@capacitor/push-notifications';

// import data from '../../assets/Course.json';

@Component({
  selector: 'app-student-side-courses-page',
  templateUrl: 'student-side-courses-page.page.html',
  styleUrls: ['student-side-courses-page.page.scss'],
})
export class StudentSideCoursesPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  showAll = false;
  // searchTerm: string = '';
  //term = '';
  searchText = '';

  //showMe: boolean = true;
  // Course = data;
  taskForm: any;
  taskService: any;
  username: any;
  weeklyCourse: any;

  /* Course: any = [];
  get filteredCourse() {
    return this.Course.filter((course: { CourseName: string; ProfessorName: string; }) => {
      return course.CourseName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
             course.ProfessorName.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }*/

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private platform: Platform
  ) {
    //

    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if (login_state == 'true') {
      console.log('log in is succesful');

      // Only initialize OneSignal if the app is running on a mobile device
      if (this.platform.is('mobile')) {
        //   this.platform.ready().then(() => {
        //     // OneSignalInit();
        this.OneSignalInit();
      }
      // }
      // this.getCourseDetails(); // Call other necessary methods
    } else {
      this.router.navigate(['/sign-in']);
    }
    // this is for task form in todo-main
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
    });

    //this is for data
    //this.http.get('assets/Course.json').subscribe((data:any) => {
    //console.log(data);
    // this.Course = data;
    // });

    //this is for push notifications
    // this.getCourseDetails();
    //for push notifications
    // PushNotifications.register();
    // console.log("push startted")
  }

  ngOnInit() {
    console.log('Initializing Tab1Page');
    this.username = localStorage.getItem('username');
    console.log(this.username);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getCourseDetails(); // and we are calling this function
      }
    });
  }

  OneSignalInit(): void {
    console.log('OnsignalInit function triggered');
    //   // Uncomment to set OneSignal device logging to VERBOSE
    //   // OneSignal.setLogLevel(6, 0);
    //   //alert("notification started")
    //   // NOTE: Update the setAppId value below with your OneSignal AppId.
    //   // OneSignal.setAppId("d3feb1d4-dcd3-468f-826f-5481d02c64d3");
    OneSignal.setAppId('29817fd7-735e-487b-8b4f-cb8d408a8d97'); // my onesignal app id
    OneSignal.setNotificationOpenedHandler(function (jsonData: any) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      alert('message received');
    });

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
        const phoneNumAsString = localStorage.getItem('mobileNo');
        if (phoneNumAsString !== null) {
          const phoneNum = JSON.parse(phoneNumAsString);
          // console.log(phoneNum);
          OneSignal.setExternalUserId(phoneNum);
        }
      }
    });
  }

  // Seeall(){
  // this.showMe = !this.showMe
  // }

  //showAllCards() {
  //this.showAll = true;
  //}

  showAllCards() {
    if (this.searchText) {
      this.searchText = '';
    }
    this.showAll = !this.showAll;
  }

  //get course details api
  getCourseDetails() {
    this.http.get(`${this.apiUrl}/weeklycourse`).subscribe((data: any) => {
      console.log(data);
      this.weeklyCourse = data;
    });
  }

  cardClicked(item: any) {
    console.log(item);
    let a = item;

    localStorage.setItem('Coursedata', JSON.stringify(a));
    console.log('card clicked');
    this.router.navigate(['/course-content']);
    //this.navCtrl.navigateForward(CourseContentPage,{data: item})
  }

  addTask() {
    console.log('button clicked');
    this.navCtrl.navigateForward('/todo-home');

    if (this.taskForm.valid) {
      const task = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        dueDate: this.taskForm.value.dueDate,
      };

      this.taskService.addTask(task).subscribe(() => {
        this.navCtrl.back();
      });
    }
  }
}
