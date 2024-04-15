import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab9',
  templateUrl: './tab9.page.html',
  styleUrls: ['./tab9.page.scss'],
})
export class Tab9Page implements OnInit {
  private apiUrl: string = environment.apiUrl;

  schoolId: any; // school name of "principal" who loged in

  students: any[];
  allStudents: any[]; // A copy of the original students array
  searchText: string = '';

  constructor(
    private navctrl: NavController,
    private http: HttpClient,
    private router: Router
  ) {
    this.schoolId = localStorage.getItem('schoolId');
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getStudents();
      }
    });
  }

  //duplecate function
  getStudents() {
    console.log(`${this.apiUrl}/user/same-school/${this.schoolId}/student`);
    this.http
      .get<any[]>(`${this.apiUrl}/user/same-school/${this.schoolId}/student`)
      .subscribe(
        (response) => {
          this.students = response;
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // Custom filter function to filter students based on the searchText
  searchStudents() {
    if (this.searchText.trim() !== '') {
      this.http
        .get<any[]>(
          `${this.apiUrl}/user/student/search/${this.searchText}/${this.schoolId}`
        )
        .subscribe(
          (response) => {
            this.students = response; //This will update the UI to display the filtered list of students based on the search text.
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.getStudents();
    }
  }

  addstudent() {
    this.getStudents();
    this.navctrl.navigateRoot(['/add-student']);
  }

  // Function to navigate to the studentProfile page with the selected student data
  navigateToProfile(student: any) {
    console.log(student);
    this.router.navigate(['/student-profile', student._id]); // Assuming you have a unique identifier for each student like 'id'
  }

  trackByFunction(index: number, student: any): number {
    return student._id; // Assuming each item has a unique 'id' property
  }
}
