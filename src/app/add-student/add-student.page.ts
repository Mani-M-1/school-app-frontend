import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.page.html',
  styleUrls: ['./add-student.page.scss'],
})
export class AddStudentPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  studentForm!: FormGroup;

  firstName: any;
  lastName: any;
  yearOfStudy: string;
  group: string;
  gender: string;
  email: any;
  password: any;
  mobileNo: any;
  emergency: any;
  address: any;

  schoolId: any;
  school: any;

  defaultImageUrl: string =
    'https://i.pinimg.com/736x/b4/bb/ec/b4bbecdfa52f0c32f9d3dddca2d8e088--college-tips-college-student-discounts.jpg'; // Replace with your default image URL

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.schoolId = localStorage.getItem('schoolId'); // schoolId of "professor"
    this.school = localStorage.getItem('school'); // school of "professor"
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      yearOfStudy: ['', Validators.required],
      group: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      emergency: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required], // Address field
      // school: ['', Validators.required],
      // schoolId: ['', Validators.required],
      profile: [''], // Initialize images as an empty string
    });
  }

  submitForm() {
    // Create the student object to be sent in the POST request
    if (this.studentForm.valid) {
      const formValue = this.studentForm.value;
      const body = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        gender: formValue.gender,
        yearOfStudy: formValue.yearOfStudy,
        group: formValue.group,
        email: formValue.email,
        password: formValue.password,
        mobileNo: formValue.mobileNo,
        emergency: formValue.emergency,
        address: formValue.address,
        school: this.school,
        schoolId: this.schoolId,
        role: 'student',
        profile: formValue.profile || this.defaultImageUrl, // for default image url
      };
      // Make the POST request to the API endpoint
      this.http.post(`${this.apiUrl}/user/signup`, body).subscribe(
        (response) => {
          console.log(response);
          // extract email and password from the response
          // email,password
          let data: any = response;
          console.log(data.createdUser.email);
          console.log(data.createdUser.password);

          // call the sendEmail functon to send email with credentials
          this.sendEmail(data.createdUser.email, data.createdUser.password);
          this.route.navigate(['/tabs/tab9']);
        },
        (error) => {
          console.error('Error creating student:', error);
          // Handle error response here (e.g., show an error message)
        }
      );
    }
  }

  // this called function with variables
  // this function is used for sending emails
  sendEmail(email: any, password: any) {
    console.log('thisfunctions is triggaring');

    // Prepare the request body for sending an email
    const body = { email, password };
    // Send a POST request to send an email
    this.http
      .post(`${this.apiUrl}/user/send-email`, body)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
