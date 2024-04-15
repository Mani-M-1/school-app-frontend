import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.page.html',
  styleUrls: ['./blog-content.page.scss'],
})
export class BlogContentPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  blog: any;

  isBlogLiked: any;

  comments = {};

  userId: any;
  email: any;
  firstName: any;
  comment: any;
  timeStamp: any;

  content: any;

  // Declare variables
  showCommentSection: boolean = false;
  commentText: any;
  likeCount: number = 0;
  blogId: any;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if (login_state == 'true') {
      console.log('log in is succesful');
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  getBlogDetails() {
    this.activatedRoute.params.subscribe((params) => {
      this.blogId = params['blogId'];
      console.log(this.blogId);
    });

    this.http
      .get<any>(`${this.apiUrl}/blog/getSpecificBlog/${this.blogId}`)
      .subscribe(
        (data) => {
          console.log(data.blogDetails);
          this.blog = data.blogDetails;
          const emailInData = data.blogDetails.likedBy.filter(
            (blog: { email: any }) => blog.email === this.email
          );

          if (emailInData.length > 0) {
            this.isBlogLiked = true;
          } else {
            this.isBlogLiked = false;
          }
          console.log(emailInData);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  ngOnInit() {
    this.getBlogDetails();

    this.userId = localStorage.getItem('userId');
    this.email = localStorage.getItem('email');
    this.firstName = localStorage.getItem('firstName');
    console.log(this.email);
  }

  likeBlog() {
    this.http
      .post<any>(`${this.apiUrl}/blog/likeblog/${this.blogId}`, {
        email: this.email,
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.getBlogDetails();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  dislikeBlog() {
    this.http
      .post<any>(`${this.apiUrl}/blog/dislikeblog/${this.blogId}`, {
        email: this.email,
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.getBlogDetails();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  toggleCommentSection() {
    this.showCommentSection = !this.showCommentSection;
  }

  postComment() {
    console.log(this.email);
    console.log(this.commentText);

    const comment = {
      blogId: this.blog._id,
      userId: this.userId,
      email: this.email,
      firstName: this.firstName,
      comment: this.commentText,
    };

    console.log(comment);
    this.http.post(`${this.apiUrl}/blog/comment`, comment).subscribe(
      (response) => {
        console.log(response);

        this.commentText = '';

        // triggering reload of the blog data
        this.getBlogDetails();
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
