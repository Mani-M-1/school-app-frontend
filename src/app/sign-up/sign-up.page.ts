import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  //variables
  firstName: any;
  lastName: any;
  phone: any;
  email: any;
  school: any;
  role: any;
  emergency: any;
  password: any;
  conformPassword: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  changeType() {}

  signUp() {
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
      school: this.school,
      role: this.role,
      emergency: this.emergency,
      password: this.password,
    };

    this.http.post(`${this.apiUrl}/user/signup`, postdata).subscribe(
      (response) => {
        console.log(response);

        this.router.navigate(['/sign-in']);
      },
      (error) => {
        console.log(error);
        this.toastService.presentToast('Please enter valid details');
      }
    );
  }
}
