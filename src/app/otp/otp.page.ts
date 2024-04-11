import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  otp: any[] = [];

  resendOtp: boolean = false;

  seconds: number = 45;

  otpErr: any;

  email: any;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.email = localStorage.getItem('email');

    let interval: any;
    if (this.seconds > 0) {
      interval = setInterval(() => {
        this.seconds = this.seconds - 1;

        if (this.seconds <= 0) {
          clearInterval(interval);
        }
      }, 1000);
    }
  }

  gotoNextField(event: any, nextElement: any, previousElement: any) {
    if (event.key === 'Backspace') {
      previousElement.setFocus();
      event.target.value = '';
    } else {
      nextElement.setFocus();
    }
  }

  startFunction(event: any, nextElement: any) {
    if (event.key === 'Backspace') {
      event.target.value = '';
    } else {
      nextElement.setFocus();
    }

    console.log(this.otp);
  }

  finishFunction(event: any, previousElement: any) {
    if (event.key === 'Backspace') {
      event.target.value = '';
      previousElement.setFocus();
    } else {
      console.log(this.otp);
    }

    console.log(this.otp);
  }

  handleOnclickResendBtn() {}

  handleOnclickSubmitBtn() {
    if (this.otp.length === 4) {
      this.otpErr = false;
      console.log(this.otp.join(''));

      const body = {
        email: this.email,
        otp: this.otp.join(''),
      };

      this.http.post<any>(`${this.apiUrl}/user/confirm-otp`, body).subscribe(
        (response) => {
          console.log(response);
          localStorage.setItem('otp', response.otp);
          this.router.navigate(['/change-password']);
        },
        (err) => {
          console.log(err);
          this.otpErr = true;

          setTimeout(() => {
            this.otpErr = false;
          }, 2000);
        }
      );
    } else {
      this.otpErr = true;

      setTimeout(() => {
        this.otpErr = false;
      }, 2000);
    }
  }
}
