import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.page.html',
  styleUrls: ['./course-content.page.scss'],
})
export class CourseContentPage implements OnInit {
  Course: any[] = [];

  email: any;

  constructor(public activatedRoute: ActivatedRoute, private router: Router) {
    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');
    this.email = localStorage.getItem('email');

    if (login_state == 'true') {
      console.log('log in is succesful');
    } else {
      this.router.navigate(['/sign-in']);
    }

    let a: any = localStorage.getItem('Coursedata');
    console.log(a);
    let b = JSON.parse(a);
    this.Course.push(b);
    console.log(b.CourseContent);
  }

  ngOnInit() {}

  linkify(text: string): string {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
  }

  ionViewDidLoad() {
    var player = fluidPlayer('fp_docs_player_0', {
      layoutControls: {
        primaryColor: '#28B8ED',
        posterImage: 'https://docs.fluidplayer.com/player/video-thumbnail.jpg',
      },
    });
  }
}

function fluidPlayer(
  arg0: string,
  arg1: { layoutControls: { primaryColor: string; posterImage: string } }
) {
  throw new Error('Function not implemented.');
}
