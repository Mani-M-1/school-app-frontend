import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Plyr from 'plyr';

import { environment } from 'src/environments/environment';

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

  private player: any;

  constructor(
    private http: HttpClient,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if (login_state == 'true') {
      console.log('log in is succesful');
    } else {
      this.router.navigate(['/sign-in']);
    }
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
          this.weeklyCourse = [{ ...data }];
          console.log(this.weeklyCourse);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.fetchTheCourseDeatails();
        this.player = new Plyr('#video-player', {
          controls: ['play', 'progress', 'fullscreen'],
        });
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
