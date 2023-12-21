import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab11',
  templateUrl: './tab11.page.html',
  styleUrls: ['./tab11.page.scss'],
})
export class Tab11Page implements OnInit {
  selectedStudent: any = '';

  // data = [
  //   'Amsterdam',
  //   'Buenos Aires',
  //   'Cairo',
  //   'Geneva',
  //   'Hong Kong',
  //   'Istanbul',
  //   'London',
  //   'Madrid',
  //   'New York',
  //   'Panama City',
  // ];
  // results = [...this.data];
  allStudents: any[];
  results: any[];
  isSearching = false;

  constructor(
    private navctrl: NavController,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.getStudent();
  }

  getStudent() {
    this.http
      .get<any[]>('http://localhost:3000/addingStudents/student')
      .subscribe(
        (response) => {
          this.results = [...response];
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.isSearching = query.length > 0; // Set to true only if there is a search query
    this.results = this.allStudents.filter((d) =>
      d.toLowerCase().includes(query)
    );
  }

  selectItem(selectedItem: any) {
    console.log('Selected Item:', selectedItem);
    this.selectedStudent = selectedItem.firstName;
    this.isSearching = false; // Hide the list when an item is selected
    // Do whatever you need with the selected item
  }

  onSearchFocus() {
    this.isSearching = true;
    console.log('focus triggered');
  }

  onSearchBlur() {
    console.log('blur triggered');
    // Delay hiding the list to allow click events to be processed first
    setTimeout(() => {
      this.isSearching = false;
    }, 200);
  }

  onSearchCancel(event: any) {
    console.log('cancel triggered');
    // event.stopPropagation(); // Stop the propagation to prevent hiding the list
    // this.isSearching = true;
    // Reset the results to show all items
    this.results = [...this.allStudents];
    // this.isSearching = false;
  }
}
