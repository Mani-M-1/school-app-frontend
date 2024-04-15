import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course-register',
  templateUrl: './course-register.page.html',
  styleUrls: ['./course-register.page.scss'],
})
export class CourseRegisterPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  studentId: string = '';
  studentFirstName: string = '';
  email: any;
  selectedCourses: string[] = []; // this array is used to store the selected courses
  courses: any[]; // available courses from "weeklyCourses"
  enrolledCoursesArr: any[];

  schoolId: any;

  constructor(
    private navctrl: NavController,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.schoolId = localStorage.getItem('schoolId');
  }

  getEnrolledCourses() {
    this.route.params.subscribe((params) => {
      this.studentId = params['studentId'];
      this.studentFirstName = params['studentFirstName'];
      this.email = params['email'];
      console.log(this.studentFirstName);
    });

    this.http
      .get<any>(
        `${this.apiUrl}/enrollCourse/user-profile-details/${this.email}`
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.enrolledCoursesArr = response.userProfile.enrolledCourses;

          console.log(this.enrolledCoursesArr);

          // Update the isChecked status in this.courses based on enrollment
          this.updateCheckedStatus();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  updateCheckedStatus() {
    // Loop through each course and update isChecked based on enrollment status
    this.courses.forEach((course) => {
      course.isChecked = this.enrolledCoursesArr.some(
        (enrolledCourse) => enrolledCourse.CourseId === course._id
      );
    });
  }

  getCourses() {
    this.http
      .get<any[]>(`${this.apiUrl}/weeklyCourse/${this.schoolId}`)
      .subscribe(
        (response) => {
          this.courses = response;
          console.log(response);

          // this function is called to get the courses of particular student
          this.getEnrolledCourses();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnInit() {
    this.getCourses();
  }

  searchCourseFunc(event: any) {
    console.log(event.target.value);
    const searchCourseText = event.target.value.toLowerCase();
    console.log(this.courses);

    if (searchCourseText.trim() !== '') {
      const filteredArr = this.courses.filter((course) =>
        course.CourseName.toLowerCase().includes(searchCourseText)
      );
      console.log(filteredArr);
      this.courses = filteredArr;
    } else {
      this.getCourses();
    }
  }

  addCourse(course: any) {
    const body = {
      StudentId: this.studentId,
      CourseId: course._id,
      CourseName: course.CourseName,
    };
    console.log(body);
    this.http.post(`${this.apiUrl}/enrollCourse/enrollCourses`, body).subscribe(
      (response) => {
        console.log(response);

        // calling this function  to update the enrolled courses array
        this.getEnrolledCourses();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeCourse(course: any) {
    const body = {
      StudentId: this.studentId,
      CourseId: course._id,
    };
    console.log(body);
    this.http.post(`${this.apiUrl}/enrollCourse/removeCourses`, body).subscribe(
      (response) => {
        console.log(response);

        // calling this function  to update the enrolled courses array
        this.getEnrolledCourses();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Handle changes in checkbox state
  checkboxChanged(event: any, course: any) {
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
    this.navctrl.back();
  }
}
