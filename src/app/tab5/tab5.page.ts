import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  private apiUrl: string = environment.apiUrl;

  isDeletePopupActive: any; // for delete course popup

  isUpdatePopupActive: any; // for update course popup

  isOptionsVisible: boolean[]; // for options

  searchText: any;
  showAll: boolean | undefined;
  weeklyCourse: any;
  //navCtrl: any;
  taskForm: any;
  taskService: any;
  //this user name variable for shoeing
  //individual data based on prof email
  email: any;

  // for course content update
  courseId: any;

  // CourseContentdata: any;
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

  CourseName: any;
  ProfessorName: any;
  CourseDate: any;
  Coursetimings: any;
  Accessclass: any;
  Discription: any;
  CourseImage: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private toastService: ToastService,
    private loadingController: LoadingController
  ) {
    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if (login_state == 'true') {
      console.log('log in is succesful');
      // console.log(login_state);
    } else {
      this.router.navigate(['/sign-in']);
    }
    //this.http.get('assets/weeklyCourse.json').subscribe((data:any) => {
    //console.log(data);
    //this.weeklyCourse = data;
    //});
    // this.getCourseDetails();

    // this is for task form in todo-main
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
    });
    // this.isUpdatePopupActive = true;

    this.isOptionsVisible = [];
  }

  handleOnclickEnrolledStudentsBtn(course: any) {
    this.router.navigate(['enrolled-students', course._id, course.CourseName]);
  }

  deleteCourse(courseId: any) {
    this.isDeletePopupActive = true;
    this.courseId = courseId;
  }

  acceptDeletingCourse() {
    this.http
      .delete<any>(
        `${this.apiUrl}/weeklyCourse/deleteMainCourse/${this.courseId}`
      )
      .subscribe(
        (data) => {
          this.isDeletePopupActive = false;
          console.log(data.message);

          // getting new data after deletion
          this.getCourseDetails();
        },
        (err) => {
          console.log(err.err_msg);
          this.toastService.presentToast(
            'Some thing went wrong please check all details'
          );
        }
      );
  }

  rejectDeletingCourse() {
    this.isDeletePopupActive = false;
  }

  closeUpdateModal() {
    this.isUpdatePopupActive = false;
  }

  updateCourseDetails(courseDetails: any) {
    this.isUpdatePopupActive = true;

    this.courseId = courseDetails._id;
    this.CourseName = courseDetails.CourseName;
    this.ProfessorName = courseDetails.ProfessorName;
    this.email = courseDetails.email;
    this.CourseDate = courseDetails.CourseDate;
    this.Coursetimings = courseDetails.Coursetimings;
    this.Accessclass = courseDetails.Accessclass;
    this.Discription = courseDetails.Discription;
    this.CourseImage = courseDetails.CourseImage;
  }

  saveChanges() {
    const body = {
      CourseName: this.CourseName,
      ProfessorName: this.ProfessorName,
      email: this.email,
      CourseDate: this.CourseDate,
      Coursetimings: this.Coursetimings,
      Accessclass: this.Accessclass,
      Discription: this.Discription,
      CourseImage: this.imageUrl,
    };

    this.http
      .put(
        `${this.apiUrl}/weeklyCourse/updateMainCourseDetails/${this.courseId}`,
        body
      )
      .subscribe(
        (response) => {
          console.log(response);
          // Assuming successful signup
          //route this to tab5 page don't forget
          // this.router.navigate(['/tabs/tab5']);
          this.isUpdatePopupActive = false;

          // getting new data after updation
          this.getCourseDetails();
        },
        (error) => {
          console.log(error);
          this.toastService.presentToast(
            'Some thing went wrong please check all details'
          );
        }
      );
  }

  optionsFunc(index: number) {
    // this.isOptionsVisible = true;
    // Toggle visibility for the clicked item
    this.isOptionsVisible[index] = !this.isOptionsVisible[index];
    console.log(index);
  }

  // user(user: any) {
  //   throw new Error('Method not implemented.');
  // }

  // this is for onchange event in html file
  // onFileChange(event: any) {
  //   this.file = event.target.files[0];
  // }
  // onVideoFileChange(event: any) {
  //   this.video = event.target.files[0];
  // }
  onImageFileChange(event: any) {
    this.image = event.target.files[0];
  }

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
      }

      // Set the corresponding upload status to true after successful upload
      //this is for uploading buttons you can find more about in html fle at upload buttons
      if (fileType == 'image') {
        this.uploadStatusImage = true;
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

  ngOnInit() {
    //here we are getting item email from sign-in page
    //for showing individual data

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.email = localStorage.getItem('email');
        console.log(this.email);
        this.getCourseDetails(); // and we are calling this function
      }
    });
  }

  addTask() {
    console.log('button clicked');
    this.navCtrl.navigateForward('/todo-home');
    if (this.taskForm.valid) {
      const task = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        dueDate: this.taskForm.value.dueDate,
      };

      this.taskService.addTask(task).subscribe(() => {
        this.navCtrl.back();
      });
    }
  }

  showAllCards() {
    if (this.searchText) {
      this.searchText = '';
    }
    this.showAll = !this.showAll;
  }

  cardClicked(item: any) {
    console.log(item);
    let a = item;

    //this data is going to prof-course.content page
    // localStorage.setItem("weeklyCoursedata",JSON.stringify(a)) "removed by manikanta"
    console.log('card clicked');
    this.router.navigate(['/prof-course-content', a._id]);
    //this.navCtrl.navigateForward(CourseContentPage,{data: item})
  }

  // here is the function we are calling in
  //ngOnInit
  getCourseDetails() {
    console.log(`url: ${this.apiUrl}/weeklycourse/professor/${this.email}`);
    this.http
      .get(`${this.apiUrl}/weeklycourse/professor/${this.email}`)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.weeklyCourse = data;
          // Initialize visibility state for each item
          this.isOptionsVisible = new Array(this.weeklyCourse.length).fill(
            false
          );
          console.log(this.isOptionsVisible);
        },
        (err) => {
          console.log(err.message);
          this.toastService.presentToast(
            'Some thing went wrong please check all details'
          );
        }
      );
  }
}
