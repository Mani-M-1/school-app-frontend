import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';




@Component({
  selector: 'app-createblog',
  templateUrl: './createblog.page.html',
  styleUrls: ['./createblog.page.scss'],
})
export class CreateblogPage implements OnInit {

  showLoader = false; // Controls whether the loader should be shown
  loadingSpinner = 'crescent'; // Change this to 'lines', 'dots', etc. as per your preference
  loadingMessage = 'Uploading...'; // Customize the loading message


  //this is for buttons upload update
  uploadInProgressImage = false;

  //for upload status
  uploadStatusImage = false;


  
  blogForm!: FormGroup; // Add the "!" symbol to indicate that it will be assigned later

   // variables
   title: any;
   content: any;
   Name: any;
   images: any;
  username: any;


  private image: File; // this is for file type for storing iamge event 


  //for saving s3 url's
  imageUrl: any; //for showing course image url in db
  filesFileUrl: any;
  simulateUploadProcess: any;
  uploadSuccessful: boolean;
  uploadedFileUrl: any;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private formBuilder: FormBuilder ,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController

    ) {
      //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if(login_state == 'true'){
      console.log("log in is succesful");
      this.username = localStorage.getItem('username');
      console.log(this.username);
    }else{
      this.router.navigate(['/sign-in']);
    }

   }

   //this is for loading spinner and iam calling this
   //async function in uploading function
   async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'circles'
    });
    await loading.present();

    // Simulate an asynchronous process
    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }
    

  selectedFile: File;


    ngOnInit() {
      this.initializeForm();
    }

    async uploadFiles(fileType: any) {
      var currentFile;
  
      if(fileType == 'image'){
        currentFile = this.image;
        this.uploadInProgressImage = true;
  
      }
  
  
      
      if (!currentFile) {
        console.log("No file selected.");
        return;
      }
        // this.uploadInProgressImage = true;
        // this.uploadInProgressVideo = true;
        // this.uploadInProgressFile = true
      
     
      this.showLoader = true;
  
      console.log(fileType);
     
      //here iam calling the presentLoading fun
      //from up there
      await this.presentLoading();
  
      try {
        let formData = new FormData();
  
      // Add the file that was just added to the form data
      formData.append("filename", currentFile, currentFile.name);
      console.log(currentFile);
  
        const response = await fetch('http://localhost:3000/uploadfile', {
          method: 'POST',
          body: formData,
        });
  
  
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        
        // Update the flag on successful upload
   
        //here iam storing this s3 url in "uploadedFileUrl"
        let uploadedFileUrl = (await response.json()) as string;
  
        const CLOUDFRONT_URL = 'https://d2ax4codf16e0h.cloudfront.net/'
        uploadedFileUrl = CLOUDFRONT_URL + currentFile.name
        console.log(uploadedFileUrl);
        if(fileType == 'image'){
          this.imageUrl = uploadedFileUrl;
        }
          
  
        // Set the corresponding upload status to true after successful upload
        //this is for uploading buttons you can find more about in html fle at upload buttons
        if (fileType == 'image') {
          this.uploadStatusImage = true;
        } 
      
      }catch (err) {
        console.log(err);
      } finally {
        if (fileType == 'image') {
          this.uploadInProgressImage = false;
        }
        
          this.showLoader = false;
      }
  
    }
    // this is for onchange event in html file
   
    onImageFileChange(event: any) {
      this.image = event.target.files[0];
  
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
      images: this.imageUrl,
      username: this.username // Include the username in the request body      
    };

    console.log(this.username);

this.http.post('http://localhost:3000/blog', bodydata).subscribe((response) =>{
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