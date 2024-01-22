import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-course-register',
  templateUrl: './course-register.page.html',
  styleUrls: ['./course-register.page.scss'],
})
export class CourseRegisterPage implements OnInit {
  studentId: string = '';
  studentFirstName: string = '';
  username: any;
  // searchStudent: string = '';
  selectedCourses: string[] = []; // this array is used to store the selected courses
  courses: any[]; // available courses from "weeklyCourses"
  enrolledCoursesArr: any[];

  constructor(
    private navctrl: NavController,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.studentId = params['studentId'];
      this.studentFirstName = params['studentFirstName'];
      this.username = params['username'];
      console.log(this.studentFirstName);
    });
  }

  onSearchStudentChange(event: any) {
    // this.searchStudent = event.target.value;
    // console.log('Search term changed:', this.searchStudent);
  }

  getEnrolledCourses() {
    this.http
      .get<any>(
        `http://localhost:3000/enrollCourse/user-profile-details/${this.username}`
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
    this.http.get<any[]>('http://localhost:3000/weeklyCourse').subscribe(
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

  // addCourse(course: any) {
  //   // Check if the course is not already in the selectedCourses array
  //   if (!this.selectedCourses.includes(course.CourseName)) {
  //     this.selectedCourses.push(course.CourseName);
  //   }
  // }

  // Add a single course to the selectedCourses array
  // addCourse(course: any) {
  //   if (!this.selectedCourses.includes(course)) {
  //     this.selectedCourses.push(course);
  //   }
  //   console.log(this.selectedCourses);
  // }

  addCourse(course: any) {
    const body = {
      StudentId: this.studentId,
      CourseId: course._id,
      CourseName: course.CourseName,
    };
    console.log(body);
    this.http
      .post('http://localhost:3000/enrollCourse/enrollCourses', body)
      .subscribe(
        (response) => {
          // this.getCourses();
          console.log(response);

          // calling this function  to update the enrolled courses array
          this.getEnrolledCourses();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // Remove a single course from the selectedCourses array
  // removeCourse(course: any) {
  //   const index = this.selectedCourses.indexOf(course);
  //   if (index !== -1) {
  //     this.selectedCourses.splice(index, 1);
  //   }
  //   console.log(this.selectedCourses);
  // }

  removeCourse(course: any) {
    const body = {
      StudentId: this.studentId,
      CourseId: course._id,
    };
    console.log(body);
    this.http
      .post('http://localhost:3000/enrollCourse/removeCourses', body)
      .subscribe(
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
    this.navctrl.back();
  }
}
