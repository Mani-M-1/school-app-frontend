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

  students: any[];
  allStudents: any[]; // A copy of the original students array
  searchText: string = '';
  // filteredStudents: any[];
  // showAll: boolean;

  constructor(
    private navctrl: NavController,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getStudents();
        // this.getStudentss();
      }
    });
  }

  //duplecate function
  getStudents() {
    this.http.get<any[]>(`${this.apiUrl}/addingStudents/student`).subscribe(
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
      // This condition checks if the search bar is not empty.
      // trim() function is used to remove leading and trailing spaces

      // If the search bar is not empty (searchText has some content), perform the search
      // Make an HTTP GET request to the search API endpoint with the search text as a parameter
      this.http
        .get<any[]>(`${this.apiUrl}/addingStudents/search/${this.searchText}`)
        .subscribe(
          (response) => {
            // Handle the successful response from the API
            // Update the 'students' array with the search results received from the server
            this.students = response; //This will update the UI to display the filtered list of students based on the search text.
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      // If the search bar is empty, fetch all students again
      // Call the 'getStudentss()' method to fetch all students from the server
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
