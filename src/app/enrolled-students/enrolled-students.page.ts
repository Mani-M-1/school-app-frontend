import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-enrolled-students',
  templateUrl: './enrolled-students.page.html',
  styleUrls: ['./enrolled-students.page.scss'],
})
export class EnrolledStudentsPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  courseId: string = '';
  courseName: string = '';
  // searchStudent: string = '';
  // selectedCourses: string[] = []; // this array is used to store the selected courses
  students: any[]; // available courses from "weeklyCourses"
  // enrolledCoursesArr: any[];

  // schoolId: any;

  constructor(
    private navctrl: NavController,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.courseId = params['courseId'];
      this.courseName = params['courseName'];
      console.log(this.courseName);
    });
  }

  onSearchStudentChange(event: any) {
    // this.searchStudent = event.target.value;
    // console.log('Search term changed:', this.searchStudent);
  }

  // getEnrolledCourses() {
  //   this.http
  //     .get<any>(
  //       `${this.apiUrl}/enrollCourse/enrolled-students/${this.courseId}`
  //     )
  //     .subscribe(
  //       (response) => {
  //         console.log(response);
  //         this.enrolledCoursesArr = response.students;

  //         console.log(this.enrolledCoursesArr);

  //         // Update the isChecked status in this.courses based on enrollment
  //         this.updateCheckedStatus();
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }

  // updateCheckedStatus() {
  //   // Loop through each course and update isChecked based on enrollment status
  //   this.courses.forEach((course) => {
  //     course.isChecked = this.enrolledCoursesArr.some(
  //       (enrolledCourse) => enrolledCourse.CourseId === course._id
  //     );
  //   });
  // }

  getCourses() {
    this.http
      .get<any>(
        `${this.apiUrl}/enrollCourse/enrolled-students/${this.courseId}`
      )
      .subscribe(
        (response) => {
          // this.students = response.students;
          console.log(response);
          console.log(response.students);

          const filtered = response.students.map((student: any) => {
            return {
              _id: student._id,
              email: student.email,
              enrolledCourse: student.enrolledCourses.find((course: any) => {
                return course.CourseId === this.courseId;
                // console.log(course.CourseId, this.courseId);
              }),
            };
          });

          console.log(filtered);

          this.students = filtered;
          console.log(this.students);

          // this function is called to get the courses of particular student
          // this.getEnrolledCourses();
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
    // console.log(event.target.value);
    const searchCourseText = event.target.value.toLowerCase();
    console.log(this.students);
    if (searchCourseText.trim() !== '') {
      const filteredArr = this.students.filter((student) =>
        student.email.toLowerCase().includes(searchCourseText)
      );
      console.log(filteredArr);
      this.students = filteredArr;
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

  courseCompletedFunc(student: any) {
    console.log(`course complete func triggered: ${student}`);
    const body = {
      studentId: student._id,
      courseId: this.courseId,
      isChecked: true,
      isCompleted: true,
    };
    console.log(body);
    this.http
      .put<any>(
        `${this.apiUrl}/enrollCourse/enrolled-students/student/change-course-status`,
        body
      )
      .subscribe(
        (response) => {
          this.getCourses();
          console.log(response);

          // calling this function  to update the enrolled courses array
          // this.getEnrolledCourses();
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

  courseIncompleteFunc(student: any) {
    console.log(`course incomplete func triggered: ${student}`);
    const body = {
      studentId: student._id,
      courseId: this.courseId,
      isChecked: false,
      isCompleted: false,
    };
    console.log(body);
    this.http
      .put<any>(
        `${this.apiUrl}/enrollCourse/enrolled-students/student/change-course-status`,
        body
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.getCourses();

          // calling this function  to update the enrolled courses array
          // this.getEnrolledCourses();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // Handle changes in checkbox state
  checkboxChanged(event: any, student: any) {
    // if (!event.detail.checked) {
    //   // If the checkbox is unchecked, remove the course from the selectedCourses array
    //   this.removeCourse(course);
    // }
    if (event.detail.checked) {
      // Checkbox is checked, add the course to the selectedCourses array
      this.courseCompletedFunc(student);
    } else {
      // Checkbox is unchecked, remove the course from the selectedCourses array
      this.courseIncompleteFunc(student);
    }
  }

  // Add all selected courses to the array
  addAllCourses() {
    // Implement the logic to add all selected courses
    // console.log('Adding all selected courses:', this.selectedCourses);
  }

  submitForm(event: Event) {
    event.preventDefault();
    console.log('Form Submitted');
    // console.log(this.selectedCourses);
    this.navctrl.back();
  }
}
