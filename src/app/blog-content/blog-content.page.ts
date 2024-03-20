import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { ToastService } from '../services/toast.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.page.html',
  styleUrls: ['./blog-content.page.scss'],
})
export class BlogContentPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  blogs: any[] = [];

  isBlogLiked: any;

  comments = {};
  _id: any;
  email: any;
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

    //iam getting this data from tab6  page
    //   let a:any = localStorage.getItem("createblog");
    //  console.log(a);
    //  let b = JSON.parse(a);
    //  this.blogs.push(b);
    //  console.log(b.CourseContent);
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
          this.blogs = [{ ...data.blogDetails }];
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
    // this.isBlogLiked = false;
    this.getBlogDetails();
    // this.blogcontent();

    //here we are getting item email from sign-in page
    //for showing individual data
    // this._id = localStorage.getItem('_id')
    this.email = localStorage.getItem('email');
    console.log(this.email);
  }

  // blogcontent() {
  //   //   this.http.get('${this.apiUrl}/blogs').subscribe((data: any) =>{
  //   //     console.log(data);
  //   //     this.blogs = data.posts;
  //   // }

  //   //i'm getting item from blog-post-page..
  //   this.content = localStorage.getItem('createblog');

  //   let a = JSON.parse(this.content);
  //   console.log(a);
  //   this.blogs.push(a);
  //   console.log(a.content);
  //   console.log(a._id);
  //   // console.log(a.timeStamp);
  //   console.log(a.comment);
  //   // this._id = this.a.content._id
  // }

  // likePost(blogId: any) {
  //   console.log('blogId', blogId);
  //   console.log(blogId._id);
  //  console.log("button clicked");

  //  this.http.post(`https://nice-gold-pike-shoe.cyclic.app/blog/${blogId._id}/like`)
  //  .subscribe((response: any)=>{
  //   console.log(response);
  //  },(error) => {

  //   console.log(error);

  //  });

  // }

  // likePost() {}

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
    //this user name is for showing user who posted the comment
    console.log(this.blogs[0]._id);
    console.log(this.email);
    console.log(this.commentText);
    //console.log(this.timeStamp);

    const comment = {
      // "_id": this._id,
      _id: this.blogs[0]._id,
      email: this.email,
      comment: this.commentText,
      // "timeStamp": this.timeStamp
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

// blogcontent(){

//     //i'm getting item from blog-post-page..
//      this.content = localStorage.getItem('createblog');

//     // let a = JSON.parse(this.content)
//     const {likes,...rest} = JSON.parse(this.content);
//     const likedArr = likes.filter((like: { isLiked: boolean; }) => like.isLiked === true);

//     const a = {likes:likedArr, ...rest};
//     console.log(a);
//     this.blogs.push(a)
//     console.log(a.content);
//     console.log(a._id);
//     // console.log(a.timeStamp);
//     console.log(a.comment);
//     // this._id = this.a.content._id

//   };

//   toggleLikeDislike(blogId: string): void {
//     if (this.isLikedMap.get(blogId)) {
//       this.unlikeButton(blogId);
//     } else {
//       this.likebutton(blogId);
//     }
//   }

//   // like button functionality
//   likebut…
