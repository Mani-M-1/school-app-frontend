import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import Plyr from 'plyr';
// import linkifyStr from 'linkifyjs/string';

import { environment } from 'src/environments/environment';

// for video player in this page and i need to
//write same code in course-content page
//import { VideoPlayer, VideoOptions } from '@ionic-native/video-player/ngx';

@Component({
  selector: 'app-prof-course-content',
  templateUrl: './prof-course-content.page.html',
  styleUrls: ['./prof-course-content.page.scss'],
})
export class ProfCourseContentPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  courseId: string;
  weeklyCourse: any[] = [];
  modalCtrl: any;
  private player: Plyr;

  //this is for video player
  //videoOptions: VideoOptions;

  constructor(
    private http: HttpClient,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController // private videoPlayer: VideoPlayer //also placed on constructer
  ) {
    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if (login_state == 'true') {
      console.log('log in is succesful');
    } else {
      this.router.navigate(['/sign-in']);
    }

    // this.http.get('assets/weeklyCourse.json').subscribe((data:any) => {
    //   console.log(data);
    // });
    // this.Course = data;
    //this.getCourseDetails();

    //this pases the the weekly course data to the course content page
    //i am getting this data from tab5 page
    //  let a:any = localStorage.getItem("weeklyCoursedata");
    //  console.log(a);
    //  let b = JSON.parse(a);
    //  this.weeklyCourse.push(b);
    //  console.log(b.CourseContent);

    //video player
    //  this.videoOptions = {
    //   volume: 0.7,
    // };
  }

  linkify(text: string): string {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
  }

  fetchTheCourseDeatails() {
    // getting the course id from the "url"
    this.activatedRoute.params.subscribe((params) => {
      this.courseId = params['courseId'];
    });

    // added by "manikanta"
    this.http
      .get<any>(`${this.apiUrl}/weeklyCourse/getCourse/${this.courseId}`)
      .subscribe(
        (data) => {
          // const { assignment, ...rest } = data;
          // const modifiedAssignmentValue = linkifyStr(assignment);
          // this.weeklyCourse = [{ modifiedAssignmentValue, ...rest }];
          this.weeklyCourse = [{ ...data }];
          console.log(this.weeklyCourse);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngAfterViewInit() {
    this.player = new Plyr('#video-player', {
      controls: ['play', 'progress', 'fullscreen'],
    });
  }
  //the functions which is resposible for playing videos
  // playOfflineVideo() {
  //   this.videoPlayer
  //     .play('file:///android_asset/www/movie.mp4')
  //     .then(() => {
  //       console.log('video finished');
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // }

  // playOnlineVideo() {
  //   this.videoPlayer
  //     .play('http://static.videogular.com/assets/videos/elephants-dream.mp4')
  //     .then(() => {
  //       console.log('video finished');
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // }
  // closeVideoPlayer() {
  //   this.videoPlayer.close();
  // }

  // viewCourseContent(item){

  // }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.fetchTheCourseDeatails();
      }
    });
  }

  addNewWeek(data: any) {
    console.log(data);
    this.router.navigate(['/add-new-week', data]);
  }

  update(data: any) {
    console.log(data);
    this.router.navigate(['/update-week', data]);
  }
  deleteWeek(weekId: any) {
    console.log('weekId', weekId);
    console.log(weekId._id);
    // Alert message and buttons
    this.alertCtrl
      .create({
        header: 'Are you sure?',
        message: 'Do you want to delete this Week.',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Delete',
            handler: () => {
              // Make DELETE request to API endpoint
              this.http
                .delete(
                  `${this.apiUrl}/weeklyCourse/deleteWeeklyCourse/${weekId._id}/${this.courseId}`
                )
                .subscribe(
                  (response) => {
                    console.log(response);
                    this.fetchTheCourseDeatails();
                    // Handle success case here you can show TOAST message
                  },
                  (error) => {
                    console.log(error);
                    // Handle error case also you can show TOAST message
                  }
                );
            },
          },
        ],
      })
      .then((alerElem) => {
        alerElem.present();
      });
  }
}
