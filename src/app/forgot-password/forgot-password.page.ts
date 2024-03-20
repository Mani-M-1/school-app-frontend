import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  currentPassword: string;
  newPassword: string;
  updatedPassword: any;
  email: string;
  isStudent: any;
  isProfessor: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController
  ) {}

  async presentToast(message: string, isSuccess: boolean) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // show for 2 seconds
      position: 'bottom', // you can change the position if needed
      cssClass: isSuccess ? 'success-toast' : 'error-toast', // Apply the appropriate CSS class
    });
    toast.present();
  }

  ngOnInit() {
    // Retrieve the student data from the state passed by the previous page
    this.route.params.subscribe((abc) => {
      //Retriving the student id from the URL parameters
      console.log(abc);
      console.log(JSON.stringify(abc));
      this.updatedPassword = abc;
      console.log(this.updatedPassword);
    });
  }

  updatePassword() {
    const apiUrl = `${this.apiUrl}/user/update-password`;
    // let apiUrl: string;
    // if (this.isStudent) {
    //   apiUrl = 'http://localhost:3000/addingStudents/update-password';
    // } else if (this.isProfessor) {
    //   apiUrl = 'http://localhost:3000/addingProfessors/update-password';
    // } else {
    //   // Handle the case if the user type is not recognized
    //   console.error('User type not recognized');
    //   return;
    // }

    const Data = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      email: this.email,
    };
    console.log(Data);

    // inside your updatePassword method
    this.http.put<any>(apiUrl, Data).subscribe(
      (response) => {
        console.log(response);
        this.presentToast('Password updated successfully', true);
        // You can redirect to another page or show a success message
        this.router.navigate(['/tab9']); // Navigate after successful update
      },
      (error: any) => {
        console.error('Password update failed', error);
        this.presentToast('Password update failed', false);
        // You can show an error message to the user
      }
    );
  }
}
