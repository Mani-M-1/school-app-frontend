import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { response } from 'express';
import { LoadingController } from '@ionic/angular';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-weekly-course',
  templateUrl: './weekly-course.page.html',
  styleUrls: ['./weekly-course.page.scss'],
})
export class WeeklyCoursePage implements OnInit {
  private apiUrl: string = environment.apiUrl;

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

  // for notification details
  profile: any;

  //variables
  CourseName: any;
  ProfessorName: any;
  username: any;
  CourseDate: any;
  Coursetimings: any;
  Accessclass: any;
  Discription: any;
  CourseImage: any;
  CourseContent: any[] = [
    {
      selectedWeek: '',
    },
  ];

  week: any;
  courseVideo: any;
  videoLink: any;
  pdf: any;
  readingmeterial: any;
  assignment: any;
  additionalContent: any;
  announcement: any;
  startDate: any;
  endDate: any;

  // CourseContentdata: any;
  private file: File; //this is for file type for storing file event
  private video: File; //this is for file type for storing video event
  private image: File; // this is for file type for storing iamge event

  // for saving  S3 urls
  imageUrl: any; //for showing course image url in db
  videoUrl: any; //for showing video url in db
  fileUrl: any; //for showing file url in db
  selectedWeek: any;
  filesFileUrl: any;
  simulateUploadProcess: any;
  uploadSuccessful: boolean;
  uploadedFileUrl: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    // private FormControl: FormControl
    private toastService: ToastService,
    private loadingController: LoadingController
  ) {
    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if (login_state == 'true') {
      console.log('log in is succesful');
      this.username = localStorage.getItem('username');
      this.profile = localStorage.getItem('profile');
    } else {
      this.router.navigate(['/sign-in']);
    }
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

  selectedFile: File;
  //for uploding images directly from computer
  // handleFileInput(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

  ngOnInit() {}

  // adding new course
  /*var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "CourseName": "hello10",
  "ProfessorName": "venu",
  "username": "rahul123@gmail.com",
  "CourseDate": "10-06-2023",
  "Coursetimings": "10:10",
  "Accessclass": "anyone",
  "Discription": "no dis",
  "CourseImage": "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
  "CourseContent": {
    "week": "week1",
    "readingmeterial": "no meterial",
    "assignment": "no assignment",
    "additionalContent": "no content",
    "announcement": "no annoucement",
    "startDate": "10-10-2023",
    "endDate": "11-10-2023"
  }
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("localhost:3000/weeklyCourse", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));*/

  async uploadFiles(fileType: any) {
    var currentFile;

    if (fileType == 'image') {
      currentFile = this.image;
      this.uploadInProgressImage = true;
    } else if (fileType == 'video') {
      currentFile = this.video;
      this.uploadInProgressVideo = true;
      this.CourseContent[0].videoLink = this.videoUrl;
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
      } else if (fileType == 'video') {
        this.videoUrl = uploadedFileUrl;
      } else if (fileType == 'file') {
        this.fileUrl = uploadedFileUrl;
      }

      // Set the corresponding upload status to true after successful upload
      //this is for uploading buttons you can find more about in html fle at upload buttons
      if (fileType == 'image') {
        this.uploadStatusImage = true;
      } else if (fileType == 'video') {
        this.uploadStatusVideo = true;
      } else if (fileType == 'file') {
        this.uploadStatusFile = true;
      }
    } catch (err) {
      console.log(err);
    } finally {
      if (fileType == 'image') {
        this.uploadInProgressImage = false;
      } else if (fileType == 'video') {
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
  onImageFileChange(event: any) {
    this.image = event.target.files[0];
  }

  SubmitCourse() {
    console.log(this.CourseName);
    console.log(this.ProfessorName);
    console.log(this.username);
    console.log(this.CourseDate);
    console.log(this.Coursetimings);
    console.log(this.Accessclass);
    console.log(this.Discription);
    // console.log(this.CourseImage);

    console.log(this.CourseContent);
    // console.log(this.Readingmeterial);
    // console.log(this.Assignment);
    // console.log(this.AdditionalContent);
    // console.log(this.Announcement);
    // console.log(this.StartDate);
    // console.log(this.EndDate);

    // Save the course content to the database
    // const courseContent = {
    //   selectedWeek: this.selectedWeek,
    //   videoFileUrl: this.videoUrl,
    //   filesFileUrl: this.filesFileUrl,
    //   readingmeterial: this.readingmeterial,
    //   assignment: this.assignment,
    //   additionalContent: this.additionalContent,
    //   annoncement: this.announcement,
    //   startDate: this.startDate,
    //   endDate: this.endDate,

    // calling upload files function
    // this.uploadFiles("course_files");

    //difining
    const postdata = {
      CourseName: this.CourseName,
      ProfessorName: this.ProfessorName,
      username: this.username,
      CourseDate: this.CourseDate,
      Coursetimings: this.Coursetimings,
      Accessclass: this.Accessclass,
      Discription: this.Discription,
      CourseImage: this.imageUrl,

      // "CourseContent":this.CourseContent[0]

      CourseContent: {
        week: this.CourseContent[0].week,
        courseVideo: this.videoUrl,
        videoLink: this.CourseContent[0].videoLink,
        pdf: this.fileUrl,
        readingmeterial: this.CourseContent[0].Readingmeterial,
        assignment: this.CourseContent[0].assignment,
        additionalContent: this.CourseContent[0].additionalContent,
        announcement: this.CourseContent[0].announcement,
        startDate: this.CourseContent[0].startDate,
        endDate: this.CourseContent[0].endDate,
      },

      NotificationDetails: {
        username: this.username,
        profile: this.profile,
      },
    };

    console.log(postdata);
    this.http.post(`${this.apiUrl}/weeklyCourse`, postdata).subscribe(
      (response) => {
        console.log(response);
        // Assuming successful signup
        //route this to tab5 page don't forget
        this.router.navigate(['/tabs/tab5']);
      },
      (error) => {
        console.log(error);
        this.toastService.presentToast(
          'Some thing went wrong please check all details'
        );
      }
    );
  }
}
