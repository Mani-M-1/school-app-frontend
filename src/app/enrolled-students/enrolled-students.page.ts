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
  students: any[];

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

  getCourses() {
    this.http
      .get<any>(
        `${this.apiUrl}/enrollCourse/enrolled-students/${this.courseId}`
      )
      .subscribe(
        (response) => {
          console.log(response);
          console.log(response.students);

          const filtered = response.students.map((student: any) => {
            return {
              _id: student._id,
              email: student.email,
              enrolledCourse: student.enrolledCourses.find((course: any) => {
                return course.CourseId === this.courseId;
              }),
            };
          });

          console.log(filtered);

          this.students = filtered;
          console.log(this.students);
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
        },
        (error) => {
          console.log(error);
        }
      );
  }

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
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // Handle changes in checkbox state
  checkboxChanged(event: any, student: any) {
    if (event.detail.checked) {
      // Checkbox is checked, add the course to the selectedCourses array
      this.courseCompletedFunc(student);
    } else {
      // Checkbox is unchecked, remove the course from the selectedCourses array
      this.courseIncompleteFunc(student);
    }
  }

  submitForm(event: Event) {
    event.preventDefault();
    console.log('Form Submitted');
    // console.log(this.selectedCourses);
    this.navctrl.back();
  }
}
