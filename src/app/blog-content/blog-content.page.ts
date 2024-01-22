import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.page.html',
  styleUrls: ['./blog-content.page.scss'],
})
export class BlogContentPage implements OnInit {
  blogs: any[] = [];

  comments = {};
  _id: any;
  username: any;
  comment: any;
  timeStamp: any;

  content: any;

  // Declare variables
  showCommentSection: boolean = true;
  commentText: any;
  likeCount: number = 0;

  constructor(
    private http: HttpClient,
    private Arouter: ActivatedRoute,
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

  ngOnInit() {
    this.blogcontent();

    //here we are getting item username from sign-in page
    //for showing individual data
    // this._id = localStorage.getItem('_id')
    this.username = localStorage.getItem('username');
    console.log(this.username);
    this.postComment(); // and we are calling this function
  }

  blogcontent() {
    //   this.http.get('http://localhost:3000/blogs').subscribe((data: any) =>{
    //     console.log(data);
    //     this.blogs = data.posts;
    // }

    //i'm getting item from blog-post-page..
    this.content = localStorage.getItem('createblog');

    let a = JSON.parse(this.content);
    console.log(a);
    this.blogs.push(a);
    console.log(a.content);
    console.log(a._id);
    // console.log(a.timeStamp);
    console.log(a.comment);
    // this._id = this.a.content._id
  }

  toggleCommentSection() {
    this.showCommentSection = !this.showCommentSection;
  }

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

  likePost() {}

  postComment() {
    //this user name is for showing user who posted the comment
    console.log(this.blogs[0]._id);
    console.log(this.username);
    console.log(this.commentText);
    //console.log(this.timeStamp);

    const comment = {
      // "_id": this._id,
      _id: this.blogs[0]._id,
      username: this.username,
      comment: this.commentText,
      // "timeStamp": this.timeStamp
    };

    console.log(comment);
    this.http.post('http://localhost:3000/blog/comment', comment).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
        this.toastService.presentToast(
          'Some thing went wrong please check all details'
        );
      }
    );
  }

  // postComment() {
  //   // Handle post comment button click
  //   const requestBody = {
  //     userID: 'user-id',
  //     message: this.commentText,
  //     date: new Date(),
  //     //postId: 'post-id'
  //   };

  //   this.http.post('http://localhost:3000/blog/comment', requestBody)
  //     .subscribe((response: any) => {
  //       // Handle the API response
  //       console.log(response);

  //       // Reset the comment text
  //       this.commentText = '';
  //     }, (error) => {
  //       // Handle error
  //       console.error(error);
  //     });
  //   console.log('Comment posted:', this.commentText);
  // }

  // let a:any = localStorage.getItem('createblog');
  // console.log(a);
  // let b = JSON.parse(a);
  // this.createblog.push(b);
  // console.log(b.blogcontent)
}
