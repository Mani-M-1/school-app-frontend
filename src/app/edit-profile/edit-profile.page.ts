import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { response } from 'express';
//import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  uploadedImage: any;
  school: any;
  firstName: any;
  lastName: any;
  mobileNo: any;
  emergency: any;
  username: any;
  profile: any;

  //for camera functionality
  imageSource: any;
  picture: any;
  newImage: string | undefined;

  // role: any;
  userRole:any;
  professor: any;
  student:any;
  ImageUrl: string;
  
  image: any;
  uploadInProgressImage: boolean;
  uploadStatusImage: boolean;
  

  //for showing image in ion-avatar
  selectedProfileImage: string | null = null;

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router,
    private domSanitizer: DomSanitizer,
    ) {

      //here we need to check if user is signed in and user role
      let login_state = localStorage.getItem('isLoggedIn');

      if(login_state == 'true'){
        console.log("log in is succesful");
      }else{
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
  

  //for camera module ionic
  // takePicture = async () => {
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: true,
  //     resultType: CameraResultType.Uri,
  //     source:CameraSource.Prompt,
  //     saveToGallery: true
  //   });

  //   // this.imageSource = 'data:image/jpeg;base64,' + image.base64String;
  //   // console.log(this.imageSource);

  //   this.imageSource = this.domSanitizer.bypassSecurityTrustUrl(image.webPath ? image.webPath : "");
  // }

  // // the get photo function is shows the image where image tag is
  // getPhoto(){
  //   return this.imageSource
  // }

 // camera module capacitor
  async takePicture(){
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    this.picture = image.dataUrl;
  }
  ngOnInit() {
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
    
   
    console.log(fileType);
   
    //here iam calling the presentLoading fun
    //from up there

    try {
      let formData = new FormData();

    // Add the file that was just added to the form data
    formData.append("filename", currentFile, currentFile.name);
    console.log(currentFile);

      const response = await fetch('https://student-api-10-fbf8bbebe705.herokuapp.com/uploadfile', {
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
        this.ImageUrl = uploadedFileUrl;
      } 

      // Set the corresponding upload status to true after successful upload
      //this is for uploading buttons you can find more about in html fle at upload buttons
      if (fileType == 'image') {
        this.uploadStatusImage = true;
      } 
    
    }catch (err) {
      console.log(err);
    } 

  }
 // this is for onchange event in html file
 onFileChange(event: any) {
  this.image = event.target.files[0];

}



  update(){
      const updatedProfile = {
        school: this.school,
        firstName: this.firstName,
        lastName: this.lastName,
        mobileNo: this.mobileNo,
        emergency: this.emergency,
        profile: this.ImageUrl
      };
      const username = localStorage.getItem('username');  
      const role = localStorage.getItem('userRole')  
      // localStorage.setItem('userRole', response.role);
  
      // const username = 'venuazmeera69@gmail.com'
      console.log(username);
      console.log(role);


      this.http.put(`https://student-api-10-fbf8bbebe705.herokuapp.com/Signup/${username}`, updatedProfile)      
      .subscribe(res => {
          console.log(res);
          //after getting response now set the local storage agin with the updated values
          //as same as sign-in screen with setItem
          console.log(updatedProfile);
        
          //iam storing data for updation in tab4 page details
          //like school, firstname, lastname, mobileno, emergency
          localStorage.setItem('school', updatedProfile.school);
          localStorage.setItem('firstName', updatedProfile.firstName);
          localStorage.setItem('lastName', updatedProfile.lastName);
          localStorage.setItem('mobileNo', updatedProfile.mobileNo);
          localStorage.setItem('emergency', updatedProfile.emergency);
          
          // Do something with the response if needed
          // this.toastService.presentToast("Profile updated successfully");

          if(this.userRole === this.professor){
            this.router.navigate(['/tabs/tab8']);
            this.toastService.presentToast("Profile updated successfully");

          }
          if (this.userRole === this.student){
            this.router.navigate(['/tabs/tab4']);
            this.toastService.presentToast("Profile updated successfully");

          }else{
            this.toastService.presentToast("somethig went wrong")
          }
          
        },error =>{
          err: error
        });
    }
  
  

}
