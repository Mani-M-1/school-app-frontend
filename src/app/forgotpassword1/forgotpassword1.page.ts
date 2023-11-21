import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-forgotpassword1',
  templateUrl: './forgotpassword1.page.html',
  styleUrls: ['./forgotpassword1.page.scss'],
})
export class Forgotpassword1Page implements OnInit {

  currentPassword: string;
  newPassword: string;
  updatedPassword: any;
  email: string;

  constructor(private http: HttpClient,
    private router: Router,
     private route:ActivatedRoute,
     private toastController: ToastController
     ) { }

     async presentToast(message: string, isSuccess: boolean) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000, // show for 2 seconds
        position: 'bottom', // you can change the position if needed
        cssClass: isSuccess ? 'success-toast' : 'error-toast' // Apply the appropriate CSS class
      });
     await toast.present();
    }

  ngOnInit() {
     // Retrieve the professor data from the state passed by the previous page
     this.route.params.subscribe(abc => {
      //Retriving the student id from the URL parameters
      console.log(abc);
      console.log(JSON.stringify(abc))
      this.updatedPassword = abc;
      console.log(this.updatedPassword);
     
    });
  }

  updatePassword() {
    const apiUrl = 'http://localhost:3000/addingProfessors/update-password';
  
    const Data = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      email: this.email
    };
    console.log(Data);
  
    // inside your updatePassword method
    this.http.put<any>(apiUrl, Data).subscribe(
      (response) => {
        console.log(response);
        this.presentToast('Password updated successfully', true);
        // You can redirect to another page or show a success message
        this.router.navigate(['/tab10']); // Navigate after successful update
      },
      (error: any) => {
        console.error('Password update failed', error);
        this.presentToast('Password update failed', false);
        // You can show an error message to the user
      }
    );
  }

}