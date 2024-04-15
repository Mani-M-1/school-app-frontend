import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  showLoader = false; // Controls whether the loader should be shown
  loadingSpinner = 'crescent'; // Change this to 'lines', 'dots', etc. as per your preference
  loadingMessage = 'Uploading...';

  //this is for buttons "upload and update"
  uploadInProgressImage = false;

  //for upload status
  uploadStatusImage = false;

  //variables
  uploadedImage: any;
  school: any;
  firstName: any;
  lastName: any;
  mobileNo: any;
  emergency: any;
  email: any;
  profile: any;

  //for uploading files
  private image: File; // this is for file type for storing iamge event

  // for saving  S3 urls
  imageUrl: any; //for showing course image url in db
  filesFileUrl: any;
  simulateUploadProcess: any;
  uploadSuccessful: boolean;
  uploadedFileUrl: any;

  userRole: any;

  ImageUrl: string;

  //for showing image in ion-avatar
  selectedProfileImage: string | null = null;
  file: any;

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router,
    private loadingController: LoadingController
  ) {
    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if (login_state == 'true') {
      console.log('log in is succesful');
    } else {
      this.router.navigate(['/sign-in']);
    }

    this.school = localStorage.getItem('school');
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.mobileNo = localStorage.getItem('mobileNo');
    this.emergency = localStorage.getItem('emergency');
    this.profile = localStorage.getItem('profile');

    console.log(this.school);
    console.log(this.firstName);
    console.log(this.lastName);
    console.log(this.mobileNo);
    console.log(this.emergency);
    console.log(this.profile);
  }

  //for uploading files
  selectedFile: File;

  ngOnInit() {}

  async uploadFiles(fileType: any) {
    var currentFile;

    if (fileType == 'image') {
      currentFile = this.image;
      this.uploadInProgressImage = true;
    }

    if (!currentFile) {
      console.log('No file selected.');
      return;
    }

    this.showLoader = true;

    console.log(fileType);

    //here iam calling the presentLoading fun
    //from up there

    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'circles',
    });

    await loading.present();

    try {
      let formData = new FormData();

      // Add the file that was just added to the form data
      formData.append('filename', currentFile, currentFile.name);
      console.log(currentFile);

      const response = await fetch(`${this.apiUrl}/uploadfile`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // Update the flag on successful upload

      //here iam storing this s3 url in "uploadedFileUrl"
      let uploadedFileUrl = (await response.json()) as string;

      const CLOUDFRONT_URL = 'https://d2ax4codf16e0h.cloudfront.net/';
      uploadedFileUrl = CLOUDFRONT_URL + currentFile.name;
      console.log(uploadedFileUrl);
      if (fileType == 'image') {
        this.imageUrl = uploadedFileUrl;
        localStorage.setItem('profile', uploadedFileUrl);
        this.profile = uploadedFileUrl;
      }

      // Set the corresponding upload status to true after successful upload
      //this is for uploading buttons you can find more about in html fle at upload buttons
      if (fileType == 'image') {
        this.uploadStatusImage = true;
        await loading.dismiss();
      }
    } catch (err) {
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
    this.uploadFiles('image');
  }

  update() {
    console.log(this.school);
    console.log(this.firstName);
    console.log(this.lastName);
    console.log(this.mobileNo);
    console.log(this.emergency);
    console.log(this.imageUrl);

    const updatedProfile = {
      school: this.school,
      firstName: this.firstName,
      lastName: this.lastName,
      mobileNo: this.mobileNo,
      emergency: this.emergency,
      profile: this.imageUrl,
    };

    const email = localStorage.getItem('email');
    const role = localStorage.getItem('userRole');

    console.log(email);
    console.log(role);

    this.http
      .put(`${this.apiUrl}/user/profile/${email}`, updatedProfile)
      .subscribe(
        (res) => {
          console.log(res);
          console.log(updatedProfile);

          //iam storing data for updation in tab4 page details
          //like school, firstname, lastname, mobileno, emergency
          localStorage.setItem('school', updatedProfile.school);
          localStorage.setItem('firstName', updatedProfile.firstName);
          localStorage.setItem('lastName', updatedProfile.lastName);
          localStorage.setItem('mobileNo', updatedProfile.mobileNo);
          localStorage.setItem('emergency', updatedProfile.emergency);

          switch (role) {
            case 'student':
              this.router.navigate(['/tabs/tab4']);
              this.toastService.presentToast('Profile updated successfully');
              break;

            case 'professor':
              this.router.navigate(['/tabs/tab8']);
              this.toastService.presentToast('Profile updated successfully');
              break;

            case 'principal':
              this.router.navigate(['/tabs/tab11']);
              this.toastService.presentToast('Profile updated successfully');
              break;

            default:
              this.toastService.presentToast('somethig went wrong');
              break;
          }
        },
        (error) => {
          err: error;
        }
      );
  }
}
