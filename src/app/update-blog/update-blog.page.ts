import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.page.html',
  styleUrls: ['./update-blog.page.scss'],
})
export class UpdateBlogPage implements OnInit {

  showLoader = false; // Controls whether the loader should be shown
  loadingSpinner = 'crescent'; // Change this to 'lines', 'dots', etc. as per your preference
  loadingMessage = 'Uploading...'; // Customize the loading message


  //this is for buttons upload update
  uploadInProgressImage = false;

  //for upload status
  uploadStatusImage = false;

  title: any;
  content: any;
  images: any
  Name: any;
  selectedblogId: any;

  private image: File; // this is for file type for storing iamge event 

  //for saving s3 url's
  imageUrl: any; //for showing course image url in db
  filesFileUrl: any;
  simulateUploadProcess: any;
  uploadSuccessful: boolean;
  uploadedFileUrl: any;
  username: string | null;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController

    )
   {
    this.route.params.subscribe(params =>{
      //Retriving the week id from the URL parameters
      console.log(params)
      this.selectedblogId = params['_id'];
      console.log(this.selectedblogId)

    });
    console.log("data")

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


updateBlog(){
  const data = {
    title: this.title,
    content: this.content,
    images: this.imageUrl,
    Name: this.Name,
  };
  this.http.put(`https://student-api-10-fbf8bbebe705.herokuapp.com/blog/${this.selectedblogId}`,data).subscribe(data => {
    console.log(data);
  });
  this.router.navigate(['/tabs/tab6'])
}
}