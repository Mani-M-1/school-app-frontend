import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
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

  // reactiveForm: FormGroup;
  // signedup:boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {
    // this.reactiveForm = this.formBuilder.group({
    //   firstname : new FormControl(null,[Validators.required])
    // })
  }

  //get f (){return this.reactiveForm.controls}

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

    //signed up for error massage
    // this.signedup = true;
    // if(this.reactiveForm.invalid){
    //   return;
    // }

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
        // Assuming successful signup
        // if (this.password === this.conformPassword){

        this.router.navigate(['/sign-in']);
        //}else{
        // this.toastService.presentToast('Your passsword does not match')
        // }
      },
      (error) => {
        console.log(error);
        this.toastService.presentToast('Please enter valid details');
      }
    );
  }
}
