import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  otp: any;
  email: any;
  newPassword: any;
  confirmPassword: any;

  // show or hide status for both new and confirm passwords
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  // password unmatch
  passwordMatched: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
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
    this.email = localStorage.getItem('email');
    this.otp = localStorage.getItem('otp');
  }

  onclickNewPasswordEyeIcon() {
    this.showNewPassword = !this.showNewPassword;
  }

  onclickConfirmPasswordEyeIcon() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  updatePassword() {
    if (this.newPassword === this.confirmPassword) {
      this.passwordMatched = true;

      const apiUrl = `${this.apiUrl}/user/update-password`;
      const Data = {
        email: this.email,
        otp: this.otp,
        password: this.confirmPassword,
      };
      console.log(Data);

      // inside your updatePassword method
      this.http.put<any>(apiUrl, Data).subscribe(
        (response) => {
          console.log(response);
          this.presentToast('Password updated successfully', true);

          // clearing otp stored in local storage
          localStorage.removeItem('otp');

          // You can redirect to another page or show a success message
          this.router.navigate(['/sign-in']); // Navigate after successful update
        },
        (error: any) => {
          console.error('Password update failed', error);
          this.presentToast('Password update failed', false);
          // You can show an error message to the user
        }
      );
    } else {
      this.passwordMatched = false;

      setTimeout(() => {
        this.passwordMatched = true;
      }, 2000);
    }
  }
}
