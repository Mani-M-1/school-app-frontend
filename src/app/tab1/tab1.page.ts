import { Component, OnInit } from '@angular/core';
import { ModalController, ModalOptions, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { CourseContentPage } from '../course-content/course-content.page';

//importing  push notifications capacitor plugins
// import {
//   ActionPerformed,
//   PushNotificationSchema,
//   PushNotifications,
//   Token,
// } from '@capacitor/push-notifications';

import data from '../../assets/Course.json';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],

})
export class Tab1Page implements OnInit{


  showAll = false;
 // searchTerm: string = '';
  //term = '';
  searchText = '';

 //showMe: boolean = true;
Course = data;
  taskForm: any;
  taskService: any;


 
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
    ) {//

      //here we need to check if user is signed in and user role
      let login_state = localStorage.getItem('isLoggedIn');

      if(login_state == 'true'){
        console.log("log in is succesful");
      }else{
        this.router.navigate(['/sign-in']);
      }
      // this is for task form in todo-main
      this.taskForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        dueDate: ['', Validators.required]
      });
  
    
      //this is for data
    //this.http.get('assets/Course.json').subscribe((data:any) => {
      //console.log(data);
      this.Course = data;
   // });

    //this is for push notifications
    this.getCourseDetails();
//for push notifications
    // PushNotifications.register();
    // console.log("push startted")
  }
  ngOnInit() {
    console.log('Initializing Tab1Page');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    // PushNotifications.requestPermissions().then(result => {
    //   if (result.receive === 'granted') {
    //     // Register with Apple / Google to receive push via APNS/FCM
    //     PushNotifications.register();
    //   } else {
    //     // Show some error
    //   }
    // });

    // On success, we should be able to receive notifications
    // PushNotifications.addListener('registration',
    //   (token: Token) => {
    //     //alert('Push registration success, token: ' + token.value);
    //   }
    // );

    // Some issue with our setup and push will not work
    // PushNotifications.addListener('registrationError',
    //   (error: any) => {
    //     alert('Error on registration: ' + JSON.stringify(error));
    //   }
    // );

    // Show us the notification payload if the app is open on our device
    // PushNotifications.addListener('pushNotificationReceived',
    //   (notification: PushNotificationSchema) => {
    //     alert('Push received: ' + JSON.stringify(notification));
    //   }
    // );

    // Method called when tapping on a notification
    // PushNotifications.addListener('pushNotificationActionPerformed',
    //   (notification: ActionPerformed) => {
    //     alert('Push action performed: ' + JSON.stringify(notification));
    //   }
    // );
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
getCourseDetails(){
  this.http.get(`https://student-api-10-fbf8bbebe705.herokuapp.com/weeklycourse`).subscribe((data:any) => {
    console.log(data);
    this.Course = data;
  });
}

cardClicked(item:any){
  console.log(item);
  let a = item;

  localStorage.setItem("Coursedata",JSON.stringify(a))
  console.log("card clicked");
  this.router.navigate(['/course-content']);
  //this.navCtrl.navigateForward(CourseContentPage,{data: item})

}

addTask(){
  console.log("button clicked");
  this.navCtrl.navigateForward('/todo-home');

  if (this.taskForm.valid) {
    const task = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      dueDate: this.taskForm.value.dueDate
    };

    this.taskService.addTask(task).subscribe(() => {
      this.navCtrl.back();
    });
  }
}




}
