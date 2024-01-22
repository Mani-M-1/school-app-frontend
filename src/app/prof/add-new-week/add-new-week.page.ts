import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-new-week',
  templateUrl: './add-new-week.page.html',
  styleUrls: ['./add-new-week.page.scss'],
})
export class AddNewWeekPage implements OnInit {
  showLoader = false; // Controls whether the loader should be shown
  loadingSpinner = 'crescent'; // Change this to 'lines', 'dots', etc. as per your preference
  loadingMessage = 'Uploading...'; // Customize the loading message

  //this is for buttons "upload and update"
  uploadInProgressFile = false; // Tracks if upload is currently in progress
  uploadInProgressImage = false;
  uploadInProgressVideo = false;

  //for upload status
  uploadStatusFile = false;
  uploadStatusImage = false;
  uploadStatusVideo = false;

  //variables
  CourseContent = {};
  _id: any;
  selectedWeek: any;
  Week: any;
  courseVideo: any;
  videoLink: any;
  pdf: any;
  Readingmeterial: any;
  Assignment: any;
  AdditionalContent: any;
  Announcement: any;
  StartDate: any;
  EndDate: any;
  data: any;

  // CourseContentdata: any;
  //for uploading files
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
    private router: Router,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private loadingController: LoadingController
  ) {
    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if (login_state == 'true') {
      console.log('log in is succesful');
    } else {
      this.router.navigate(['/sign-in']);
    }

    let data = this.route.snapshot.params;
    this._id = data['_id'];
    console.log(this._id);
    console.log(this.route.snapshot.params);
  }

  //this is for loading spinner and iam calling this
  //async function in uploading function
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'circles',
    });
    await loading.present();

    // Simulate an asynchronous process
    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }

  //for uploading files
  selectedFile: File;

  ngOnInit() {}

  async uploadFiles(fileType: any) {
    var currentFile;

    if (fileType == 'video') {
      currentFile = this.video;
      this.uploadInProgressVideo = true;
    } else if (fileType == 'file') {
      currentFile = this.file;
      this.uploadInProgressFile = true;
    }

    if (!currentFile) {
      console.log('No file selected.');
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
      formData.append('filename', currentFile, currentFile.name);
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

      const CLOUDFRONT_URL = 'https://d2ax4codf16e0h.cloudfront.net/';
      uploadedFileUrl = CLOUDFRONT_URL + currentFile.name;
      console.log(uploadedFileUrl);
      if (fileType == 'video') {
        this.videoUrl = uploadedFileUrl;
      } else if (fileType == 'file') {
        this.fileUrl = uploadedFileUrl;
      }

      // Set the corresponding upload status to true after successful upload
      //this is for uploading buttons you can find more about in html fle at upload buttons
      if (fileType == 'video') {
        this.uploadStatusVideo = true;
      } else if (fileType == 'file') {
        this.uploadStatusFile = true;
      }
    } catch (err) {
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

  addNew() {
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

    const postdata = {
      _id: this._id,
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
    console.log(postdata);
    this.http
      .post(`http://localhost:3000/weeklyCourse/addWeek`, postdata)
      .subscribe(
        (response) => {
          console.log(response);
          // Assuming successful signup
          this.router.navigate(['/prof-course-content', this._id]);
        },
        (error) => {
          console.log(error);
          this.toastService.presentToast('Please enter valid details');
        }
      );
  }
}
