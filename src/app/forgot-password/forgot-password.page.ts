import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  email: any;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {}

  handleOnchangeEmail(event: any) {
    this.email = event.target.value;
  }

  handleOnclickSubmitBtn() {
    const body = {
      email: this.email,
    };

    this.http.post<any>(`${this.apiUrl}/user/send-otp`, body).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('email', this.email);
        this.router.navigate(['/otp']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
