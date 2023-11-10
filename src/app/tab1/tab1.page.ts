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

// import data from '../../assets/Course.json';

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
      // this.Course = data;
   // });

    //this is for push notifications
    this.getCourseDetails();
//for push notifications
    // PushNotifications.register();
    // console.log("push startted")
  }
  ngOnInit() {
    console.log('Initializing Tab1Page');
    this.username = localStorage.getItem('username');
    console.log(this.username);
    this.getCourseDetails(); // and we are calling this function
    
    
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
  this.http.get(`http://localhost:3000/weeklycourse`).subscribe((data:any) => {
    console.log(data);
    this.weeklyCourse = data;
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
