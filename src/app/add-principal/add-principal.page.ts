import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-principal',
  templateUrl: './add-principal.page.html',
  styleUrls: ['./add-principal.page.scss'],
})
export class AddPrincipalPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  //variables
  firstName: any;
  lastName: any;
  phone: any;
  email: any;
  gender: any;
  role: any = 'principal';
  emergency: any;
  password: any;
  address: any;

  // school details
  school: any; // school name is common for "principal" also because we need to store that school name in "UserProfile" Schema
  schoolCode: any;
  schoolAddress: any;
  schoolPhoneNumber: any;

  // this is for changing type of "password"
  type: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  changeType() {
    this.type = !this.type;
  }

  addPrincipal() {
    console.log(this.firstName);
    console.log(this.lastName);
    console.log(this.phone);
    console.log(this.email);
    console.log(this.school);
    console.log(this.role);
    console.log(this.emergency);
    console.log(this.password);

    //now write a post http call to push data to database

    const postdata = {
      firstName: this.firstName,
      lastName: this.lastName,
      mobileNo: this.phone,
      email: this.email,
      gender: this.gender,
      role: this.role,
      emergency: this.emergency,
      password: this.password,
      address: this.address,
      school: this.school,
      schoolCode: this.schoolCode,
      schoolAddress: this.schoolAddress,
      schoolPhoneNumber: this.schoolPhoneNumber,
    };

    this.http.post(`${this.apiUrl}/user/add/principal`, postdata).subscribe(
      (response) => {
        console.log(response);

        this.router.navigate(['/admin-panel']);
      },
      (error) => {
        console.log(error);
        this.toastService.presentToast('Please enter valid details');
      }
    );
  }
}
