import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})

export class Tab5Page implements OnInit {
  searchText: any;
  showAll: boolean | undefined;
  weeklyCourse: any;
  //navCtrl: any;
  taskForm: any;
  taskService: any;
  //this user name variable for shoeing 
  //individual data based on prof username
  username: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,

  ) {
    
    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if(login_state == 'true'){
      console.log("log in is succesful");
     // console.log(login_state);
    }else{
      this.router.navigate(['/sign-in']);
    }
    //this.http.get('assets/weeklyCourse.json').subscribe((data:any) => {
    //console.log(data);
    //this.weeklyCourse = data;
  //});
  this.getCourseDetails(); 

  // this is for task form in todo-main
  this.taskForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    dueDate: ['', Validators.required]
  });
}
  user(user: any) {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    //here we are getting item username from sign-in page
    //for showing individual data
    this.username = localStorage.getItem('username');
    console.log(this.username);
    this.getCourseDetails(); // and we are calling this function
    
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

  showAllCards() {
    if (this.searchText) {
      this.searchText = '';
    }
    this.showAll = !this.showAll;
  }

  cardClicked(item:any){
    console.log(item);
    let a = item;
  
    //this data is going to prof-course.content page
    localStorage.setItem("weeklyCoursedata",JSON.stringify(a))
    console.log("card clicked");
    this.router.navigate(['/prof-course-content']);
    //this.navCtrl.navigateForward(CourseContentPage,{data: item})
  
  }
  
  

  // here is the function we are calling in 
  //ngOnInit
  getCourseDetails(){ 

    this.http.get(`https://student-api-10-fbf8bbebe705.herokuapp.com/weeklycourse/${this.username}`).subscribe((data:any) => {
      console.log(data);
      this.weeklyCourse = data;
    });
  }
 
}
