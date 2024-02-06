import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../shared/auth.service';
import { RoleService } from '../role.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  //Variables
  email: any;
  password: any;
  role: any;
  username: any;
  school: any;
  firstName: any;
  lastName: any;
  mobileNo: any;
  emergency: any;
  loggedInUsername: any;
  profile: any;

  student: any;
  professor: any;

  form!: FormGroup;
  type: boolean = true;

  constructor(
    private http: HttpClient,
    //to navigate one page to anothor page
    private router: Router,
    //for showing toast massages i used it for log in fail
    //don't forgot to use it is good one
    private toastService: ToastService,
    private authService: AuthService,
    private roleService: RoleService
  ) {}

  ngOnInit() {}

  changeType() {
    this.type = !this.type;
  }

  logIn() {
    console.log(this.email);
    console.log(this.password);
    // console.log(this.role)

    //From here we will post data the data base
    const postdata = {
      username: this.email,
      password: this.password,
      // "role": this.role
    };
    console.log(postdata);

    //here we are hitting to the data base link
    this.http.post(`${this.apiUrl}/Signup/login`, postdata).subscribe(
      (response: any) => {
        console.log(response);

        // Save the user role in local storage
        //here you setItem for local storage and you call
        //that data with get item where ever you want
        // localStorage.setItem('userRole', response.role);
        localStorage.setItem('username', response.username);
        localStorage.setItem('school', response.school);
        localStorage.setItem('firstName', response.firstName);
        localStorage.setItem('lastName', response.lastName);
        localStorage.setItem('mobileNo', response.mobileNo);
        localStorage.setItem('emergency', response.emergency);
        localStorage.setItem('profile', response.profile);

        //localStorage.setItem('school', response.school);
        // localStorage.setItem('firstName', response.firstName);
        // localStorage.setItem('mobileNo', response.mobileNo || '');
        // localStorage.setItem('emergency', response.emergency || '');

        localStorage.setItem('isLoggedIn', 'true');

        console.log(response.role);
        console.log(response.school);
        console.log(response.firstName);
        console.log(response.lastName);
        console.log(response.mobileNo);
        console.log(response.emergency);
        // console.log(response.profile);

        this.roleService.setUserRole(response.role); // Set the user's role

        // Redirect to the appropriate page based on the user role
        switch (response.role as string) {
          case 'student':
            this.router.navigate(['/tabs/student-side-courses-page']);
            break;

          case 'professor':
            this.router.navigate(['/tabs/tab5']);
            break;

          case 'principal':
            this.router.navigate(['/tabs/tab9']);
            break;
          default:
            // Handle other roles or invalid role values
            break;
        }

        // Assuming successful login with 'role' returned from the server
        // const role = 'student'; // Replace this with the actual role received from the server

        // // Store the authentication status and role in localStorage
        // localStorage.setItem('token', 'dummy_token'); // Replace 'dummy_token' with your actual authentication token received from the server
        // localStorage.setItem('role', role);

        // // Navigate based on the user's role
        // if (role === 'student') {
        //   this.router.navigate(['/tabs/tab1']);
        // } else if (role === 'professor') {
        //   this.router.navigate(['/tab/tab5']);
        // } else {
        //   // Handle unknown role or error
        // }

        //hangle the response from the server here
      },
      (error) => {
        this.toastService.presentToast('incorrect username or password');
      }
    );
  }
}
