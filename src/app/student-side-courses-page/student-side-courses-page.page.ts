import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-side-courses-page',
  templateUrl: 'student-side-courses-page.page.html',
  styleUrls: ['student-side-courses-page.page.scss'],
})
export class StudentSideCoursesPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  showAll = false;

  searchText = '';

  taskForm: any;
  taskService: any;
  email: any;
  weeklyCourse: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private navCtrl: NavController // private platform: Platform
  ) {
    //

    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');
    console.log(`tab1 login_state: ${login_state}`);

    if (login_state == 'true') {
      console.log('log in is succesful');
    } else {
      this.router.navigate(['/sign-in']);
    }

    // this is for task form in todo-main
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
    });

    this.getCourseDetails();
  }

  ngOnInit() {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.getCourseDetails(); // and we are calling this function
    //   }
    // });
  }

  //get course details api
  getCourseDetails() {
    this.email = localStorage.getItem('email');
    console.log(this.email);
    this.http
      .get(`${this.apiUrl}/enrollCourse/user-profile-details/${this.email}`)
      .subscribe((data: any) => {
        console.log(data);
        this.weeklyCourse = data.userProfile.enrolledCourses;
        console.log(this.weeklyCourse);
      });
  }

  cardClicked(item: any) {
    console.log(item);

    localStorage.setItem('Coursedata', JSON.stringify(item.CourseDetails));
    console.log('card clicked');
    this.router.navigate(['/course-content']);
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
