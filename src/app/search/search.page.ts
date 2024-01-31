import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  query!: string;
  searchBtn: boolean = true;

  //i got this data from tab1 page.ts
  Course: any = [];

  constructor(private http: HttpClient) {
    this.http.get('assets/Course.json').subscribe((data: any) => {
      console.log(data);
      this.Course = data;
    });
    this.getCourseDetails();
  }
  getCourseDetails() {
    this.http.get(`${this.apiUrl}/course`).subscribe((data: any) => {
      console.log(data);
      this.Course = data;
    });
  }

  ngOnInit() {}

  updateSearch() {
    // for get the Course data
  }

  onInputQuery() {
    console.log('input query: ', this.query);
    //this if else condition for if we type more than "0" words it will tregger search button
    //else it will not trigger search button
    if (this.query.length > 0) {
      this.searchBtn = true;
    } else {
      this.searchBtn = false;
    }
  }
}
