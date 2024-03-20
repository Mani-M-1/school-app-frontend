import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab10',
  templateUrl: './tab10.page.html',
  styleUrls: ['./tab10.page.scss'],
})
export class Tab10Page implements OnInit {
  private apiUrl: string = environment.apiUrl;

  schoolId: any; // schoolId name of "principal" who loged in

  professors: any[];
  searchText: any;

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private http: HttpClient
  ) {
    this.schoolId = localStorage.getItem('schoolId');
  }

  ngOnInit() {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getProfessors();
      }
    });
  }
  // duplicate function
  getProfessors() {
    this.http
      .get<any[]>(`${this.apiUrl}/user/same-school/${this.schoolId}/professor`)
      .subscribe(
        (response) => {
          this.professors = response;
        },
        (error) => {
          console.error('Error retrieving professors:', error);
        }
      );
  }

  addProfessor() {
    this.getProfessors();
    this.route.navigate(['/add-professor']);
  }

  cardClick(professor: any) {
    console.log(professor);
    this.route.navigate(['/professor-profile', professor._id]);
  }

  // Custom filter function to filter students based on the searchText
  searchStudents() {
    if (this.searchText.trim() !== '') {
      this.http
        .get<any[]>(
          `${this.apiUrl}/user/professor/search/${this.searchText}/${this.schoolId}`
        )
        .subscribe(
          (response) => {
            this.professors = response;
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      // If the search bar is empty, fetch all students again
      this.getProfessors();
    }
  }

  trackByFunction(index: number, professor: any): number {
    return professor._id; // Assuming each item has a unique 'id' property
  }
}
