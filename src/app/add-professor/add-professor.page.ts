import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-professor',
  templateUrl: './add-professor.page.html',
  styleUrls: ['./add-professor.page.scss'],
})
export class AddProfessorPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  defaultImageUrl: string =
    'https://th.bing.com/th/id/R.0b511a64db3eb07e3249a1ec328532a9?rik=CQxxwGIccG%2bGxA&riu=http%3a%2f%2fphotos.demandstudios.com%2fgetty%2farticle%2f171%2f207%2f78036480.jpg&ehk=1r%2bN75USzR%2bu9tv0mDdE3TmsQN%2bm4S43ibi1MdptPjA%3d&risl=&pid=ImgRaw&r=0';
  professorForm!: FormGroup;

  firstName: string;
  lastName: string;
  gender: string;
  subjects: string;
  profile: string;
  email: string;
  password: string;
  mobileNo: string;
  emergency: string;
  address: string;

  schoolId: any;
  school: any;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private formbuilder: FormBuilder
  ) {
    this.schoolId = localStorage.getItem('schoolId'); // schoolId of "professor"
    this.school = localStorage.getItem('school'); // school of "professor"
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.professorForm = this.formbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      subjects: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      emergency: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      profile: [''], // Initialize profile as an empty string
      address: ['', Validators.required], // Address field
    });
  }

  submitForm() {
    // check if the form is valid
    if (this.professorForm.valid) {
      // get the form values
      const formValue = this.professorForm.value;

      // prepare the tequest body
      const body = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        gender: formValue.gender,
        subjects: formValue.subjects,
        email: formValue.email,
        password: formValue.password,
        mobileNo: formValue.mobileNo,
        emergency: formValue.emergency,
        address: formValue.address,
        school: this.school,
        schoolId: this.schoolId,
        role: 'professor',
        profile: formValue.profile || this.defaultImageUrl,
      };

      // send a post request to add professor data
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

          // Navigate to a specific route after successful submission
          this.navCtrl.navigateRoot(['/tabs/tab10']);
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
