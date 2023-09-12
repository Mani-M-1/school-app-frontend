import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-update-week',
  templateUrl: './update-week.page.html',
  styleUrls: ['./update-week.page.scss'],
})
export class UpdateWeekPage implements OnInit {

  showLoader = false; // Controls whether the loader should be shown
  loadingSpinner = 'crescent'; // Change this to 'lines', 'dots', etc. as per your preference
  loadingMessage = 'Uploading...'; // Customize the loading message

  //this is for buttons "upload and update"
  uploadInProgressFile = false; // Tracks if upload is currently in progress
  uploadInProgressImage = false;
  uploadInProgressVideo =false

  //for upload status
  uploadStatusFile = false;
  uploadStatusImage = false;
  uploadStatusVideo = false;


  Week: any;
  videoLink: any;
  Readingmeterial: any;
  Assignment: any;
  AdditionalContent: any;
  Announcement: any;
  StartDate: any;
  EndDate: any;
  selectedWeekId: any;

  //for uploading file
   private file: File; //this is for file type for storing file event
  private video: File; //this is for file type for storing video event


   // for saving  S3 urls
   imageUrl: any; //for showing course image url in db
   videoUrl: any; //for showing video url in db
   fileUrl: any; //for showing file url in db
   filesFileUrl: any;
   simulateUploadProcess: any;
   uploadSuccessful: boolean;
   uploadedFileUrl: any;

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController


  ) {
    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if(login_state == 'true'){
      console.log("log in is succesful");
    }else{
      this.router.navigate(['/sign-in']);
    }
    
    this.route.params.subscribe(params =>{
      //Retriving the week id from the URL parameters
      console.log(params)
      this.selectedWeekId = params['_id'];
      console.log(this.selectedWeekId)

    });
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

   //for uploading files
selectedFile: File;


  ngOnInit() {
  }

  
  async uploadFiles(fileType: any) {
    var currentFile;

    if(fileType == 'video'){
      currentFile = this.video;
      this.uploadInProgressVideo = true;

    } else if(fileType == 'file'){
      currentFile = this.file;
      this.uploadInProgressFile = true

  
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
      if(fileType == 'video'){
        this.videoUrl = uploadedFileUrl;
      } else if(fileType == 'file'){
        this.fileUrl = uploadedFileUrl;
     }

      // Set the corresponding upload status to true after successful upload
      //this is for uploading buttons you can find more about in html fle at upload buttons
      if (fileType == 'video') {
        this.uploadStatusVideo = true;
      } else if (fileType == 'file') {
        this.uploadStatusFile = true;
      }
    
    }catch (err) {
      console.log(err);
    } finally {
      if (fileType == 'video') {
        this.uploadInProgressVideo = false;
      } else if (fileType == 'file') {
        this.uploadInProgressFile = false;
      }
      
        this.showLoader = false;
    }

  }
 // this is for onchange event in html file
 onFileChange(event: any) {
  this.file = event.target.files[0];

}
onVideoFileChange(event: any) {
  this.video = event.target.files[0];

}


  updateCourse() {
    console.log(this.Week);
    console.log(this.videoUrl);
    console.log(this.videoLink);
    console.log(this.fileUrl);
    console.log(this.Readingmeterial);
    console.log(this.Assignment);
    console.log(this.AdditionalContent);
    console.log(this.Announcement);
    console.log(this.StartDate);
    console.log(this.EndDate);


    const updateData = {
      week: this.Week,
      courseVideo: this.videoUrl,
      videoLink: this.videoLink,
      pdf: this.fileUrl,
      readingmeterial: this.Readingmeterial,
      assignment: this.Assignment,
      additionalContent: this.AdditionalContent,
      announcement: this.Announcement,
      startDate: this.StartDate,
      endDate: this.EndDate,
    };
   this.http.post(`https://student-api-10-fbf8bbebe705.herokuapp.com/weeklyCourse/updateWeek/${this.selectedWeekId}`, updateData)   
   // this.http.post(`http://localhost:3000/weeklyCourse/updateWeek/${this.selectedWeekId}`, updateData)      
   
    .subscribe(res => {
        console.log(res);
        // Do something with the response if needed
        this.router.navigate(['/prof-course-content']);
      },error =>{
        err: error
      });
  }

}
