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
  selectedYear: string;
  selectedGroup: string;
  selectedGender: string;
  email: any;
  password: any;
  mobileNumber: any;
  address: any;

  defaultImageUrl: string =
    'https://i.pinimg.com/736x/b4/bb/ec/b4bbecdfa52f0c32f9d3dddca2d8e088--college-tips-college-student-discounts.jpg'; // Replace with your default image URL

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      selectedGender: ['', Validators.required],
      selectedYear: ['', Validators.required],
      selectedGroup: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      address: ['', Validators.required], // Address field
      schoolname: ['', Validators.required],
      schoolcode: ['', Validators.required],
      images: [''], // Initialize images as an empty string
    });
  }

  submitForm() {
    // Create the student object to be sent in the POST request
    if (this.studentForm.valid) {
      const formValue = this.studentForm.value;
      const body = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        gender: formValue.selectedGender,
        yearOfStudy: formValue.selectedYear,
        group: formValue.selectedGroup,
        email: formValue.email,
        password: formValue.password,
        mobileNumber: formValue.mobileNumber,
        address: formValue.address,
        schoolname: formValue.schoolname,
        schoolcode: formValue.schoolcode,
        images: formValue.images || this.defaultImageUrl, // for default image url
      };
      // Make the POST request to the API endpoint
      this.http.post(`${this.apiUrl}/addingStudents/student`, body).subscribe(
        (response) => {
          console.log(response);
          // extract email and password from the response
          // email,password
          let data: any = response;
          console.log(data.createdStudent.email);
          console.log(data.createdStudent.password);

          // call the sendEmail functon to send email with credentials
          this.sendEmail(
            data.createdStudent.email,
            'your credencials',
            data.createdStudent.password
          );
          this.route.navigate(['/tab9']);
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
  sendEmail(toEmail: any, subject: any, text: any) {
    console.log('thisfunctions is triggaring');

    // Prepare the request body for sending an email
    const body = {
      toEmail: toEmail,
      subject: subject,
      text: text,
    };
    // Send a POST request to send an email
    this.http
      .post(`${this.apiUrl}/addingProfessors/send-email`, body)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
