// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { NavController } from '@ionic/angular';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-createblog',
//   templateUrl: './createblog.page.html',
//   styleUrls: ['./createblog.page.scss'],
// })
// export class CreateblogPage implements OnInit {
  
//    // variables
//    title: any;
//    content: any;
//    Name: any;
//    images: any;

//   constructor(private http: HttpClient,
//     private navCtrl: NavController,
//     private router: Router
//     ) {
//       //here we need to check if user is signed in and user role
//       let login_state = localStorage.getItem('isLoggedIn');

//       if(login_state == 'true'){
//         console.log("log in is succesful");
//       }else{
//         this.router.navigate(['/sign-in']);
//       }
//      }

//   ngOnInit() {
//   }

// add() {
// const bodydata = {
//   title: this.title,
//   content: this.content,
//   Name: this.Name,
//   images: this.images
// };
// this.http.post('https://nice-gold-pike-shoe.cyclic.app/blog', bodydata).subscribe((response) =>{
//   console.log(response);
// });
// console.log(bodydata);

// this.navCtrl.navigateRoot('/blog-post')
// };
// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-createblog',
  templateUrl: './createblog.page.html',
  styleUrls: ['./createblog.page.scss'],
})
export class CreateblogPage implements OnInit {
  
  blogForm!: FormGroup; // Add the "!" symbol to indicate that it will be assigned later

   // variables
   title: any;
   content: any;
   Name: any;
   images: any;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private formBuilder: FormBuilder ,
    private alertController: AlertController
    ) {}

    ngOnInit() {
      this.initializeForm();
    }
  
    initializeForm() {
      this.blogForm = this.formBuilder.group({
        title: ['', Validators.required],
        content: ['', Validators.required],
        images: ['', Validators.required],
        professorName: ['', Validators.required],
      });
    }
  

    // initializeForm() {
    //   this.blogForm = this.formBuilder.group({
    //     title: ['', Validators.required],
    //     content: ['', Validators.required],
    //     images: ['', Validators.required],
    //     professorName: ['', Validators.required]
    //   });
    // }

add() {
  if (this.blogForm.valid) {
    const formValue = this.blogForm.value;
    const bodydata = {
      title: formValue.title,
      content: formValue.content,
      Name: formValue.professorName,
      images: formValue.images,
    };

this.http.post('https://student-api-10-fbf8bbebe705.herokuapp.com/blog', bodydata).subscribe((response) =>{
  console.log(response);
  this.presentSuccessAlert();
  this.navCtrl.navigateRoot('/tabs/tab6')

});
console.log(bodydata);

// this.navCtrl.navigateRoot('/blog-post')
} else {
  this.presentErrorAlert();
}
}

async presentSuccessAlert() {
const alert = await this.alertController.create({
  header: 'Success',
  message: 'Blog added successfully',
  buttons: ['OK'],
  cssClass: 'success-alert' //add a css to customize the style
});

await alert.present();
}

async presentErrorAlert() {
const alert = await this.alertController.create({
  header: 'Error',
  message: 'Please fill in all the required fields',
  buttons: ['OK'],
  cssClass: 'error-alert' //add a css class to customize the
});

await alert.present();
}
}