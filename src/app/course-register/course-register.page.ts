import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-course-register',
  templateUrl: './course-register.page.html',
  styleUrls: ['./course-register.page.scss'],
})
export class CourseRegisterPage implements OnInit {
  selectedCourses: string[] = []; // this array is used to store the selected courses
  courses: any[]; // available courses from "weeklyCourses"


  constructor(
    private navctrl: NavController,
    private http: HttpClient,
    private router: Router
  ) {}

  getCourses() {
    this.http.get<any[]>('http://localhost:3000/weeklyCourse').subscribe(
      (response) => {
        this.courses = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.getCourses();
  }

  // addCourse(course: any) {
  //   // Check if the course is not already in the selectedCourses array
  //   if (!this.selectedCourses.includes(course.CourseName)) {
  //     this.selectedCourses.push(course.CourseName);
  //   }
  // }

  // Add a single course to the selectedCourses array
  addCourse(course: any) {
    if (!this.selectedCourses.includes(course)) {
      this.selectedCourses.push(course);
    }
    console.log(this.selectedCourses);
  }

  // Remove a single course from the selectedCourses array
  removeCourse(course: any) {
    const index = this.selectedCourses.indexOf(course);
    if (index !== -1) {
      this.selectedCourses.splice(index, 1);
    }
    console.log(this.selectedCourses);
  }

  // Handle changes in checkbox state
  checkboxChanged(event: any, course: any) {
    // if (!event.detail.checked) {
    //   // If the checkbox is unchecked, remove the course from the selectedCourses array
    //   this.removeCourse(course);
    // }
    if (event.detail.checked) {
      // Checkbox is checked, add the course to the selectedCourses array
      this.addCourse(course);
    } else {
      // Checkbox is unchecked, remove the course from the selectedCourses array
      this.removeCourse(course);
    }
  }

  // Add all selected courses to the array
  addAllCourses() {
    // Implement the logic to add all selected courses
    console.log('Adding all selected courses:', this.selectedCourses);
  }

  submitForm(event: Event) {
    event.preventDefault();
    console.log('Form Submitted');
    console.log(this.selectedCourses);
  }
}