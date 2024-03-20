// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-tab6',
// //   templateUrl: 'tab6.page.html',
// //   styleUrls: ['tab6.page.scss']
// // })
// // export class Tab6Page {

// //   constructor() {}

// // }

// import { Component, OnInit } from '@angular/core';
// import { NavController } from '@ionic/angular';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// @Component({
//     selector: 'app-tab6',
//     templateUrl: 'tab6.page.html',
//     styleUrls: ['tab6.page.scss']
//   })
// export class Tab6Page implements OnInit {

//   blogs: any;

//   constructor(
//     private navcontroller: NavController,
//     private Activatedroute: ActivatedRoute,
//     private router: Router,
//     private http: HttpClient
//   ) {
//     //here we need to check if user is signed in and user role
//     let login_state = localStorage.getItem('isLoggedIn');

//     if(login_state == 'true'){
//       console.log("log in is succesful");
//     }else{
//       this.router.navigate(['/sign-in']);
//     }
//     // this.http.get('assets/blogs.json').subscribe((data: any) =>{
//     //   console.log(data);
//     //   this.Blogs = data;
//     // });
//     // this.getAllBlogs();
//    }

//   ngOnInit() {
//     this.blogPosta();
//   }

// // blogPost is button function in blogpost,page file .....
// //once you write a function in any html file then you must declare the function in ts file...you not declare the function you getting error...
// //this function is duplicate function ...and aslo declare in blogPost function....
//   blogPosta(){
//    this.http.get<any>('https://nice-gold-pike-shoe.cyclic.app/blog').subscribe((data) =>{
//     console.log(data);
//     this.blogs = data.posts;

//   }, (error) => {
//     console.log(error)
//      });
//   }

//   // this blogPost function is original function ...and it's function works on navigate to anther page....
//   blogPost() {
//     this.blogPosta();
//    this.navcontroller.navigateRoot('/createblog');
//   //  this.img(['assets/images/pexels-photo-jpg..webp'])
//   }

//   update(selectedblog: any){
//     this.router.navigate(['/update-blog', selectedblog])
//     console.log(selectedblog)

//   }

// delete(key: any){
// console.log(key);
// this.http.delete('https://nice-gold-pike-shoe.cyclic.app/blog/'+key).subscribe((data) =>
// console.log(data)
// )
// }

// cardClick(createblog:any){
//  console.log(createblog);
//  let a = createblog;

//  localStorage.setItem("createblog", JSON.stringify(a));
//  console.log("cardClick");
//  this.router.navigate(['/blog-content', createblog])
// }

// }

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-tab6',
//   templateUrl: 'tab6.page.html',
//   styleUrls: ['tab6.page.scss']
// })
// export class Tab6Page {

//   constructor() {}

// }

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab6',
  templateUrl: 'tab6.page.html',
  styleUrls: ['tab6.page.scss'],
})
export class Tab6Page implements OnInit {
  private apiUrl: string = environment.apiUrl;

  // selectTabs: 'allBlogs';
  selectTabs: any;

  blogs: any = [];

  //this user name variable for shoeing
  //individual blog data based on prof email
  email: any;

  userBlogs: any = [];

  schoolId: any;

  constructor(
    private navcontroller: NavController,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    let email = localStorage.getItem('isLoggedIn');
    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if (login_state == 'true') {
      console.log('log in is successful');
    } else {
      this.router.navigate(['/sign-in']);
    }

    // this.http.get('assets/blogs.json').subscribe((data: any) =>{
    //   console.log(data);
    //   this.Blogs = data;
    // });
    // this.getAllBlogs();

    //here we are getting item email from sign-in page
    //for showing individual data
    //here we are getting item email from sign-in page
    //for showing individual data
    // this.email = localStorage.getItem('email');
    // console.log(this.email);
    // and we are calling this function
    // this.getBlogs();
  }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.schoolId = localStorage.getItem('schoolId');
    console.log(this.email);

    this.selectTabs = localStorage.getItem('activeTabInBlogs');

    if (!this.selectTabs) {
      this.selectTabs = 'allBlogs';
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // this.getBlogs();

        this.blogPosta();
      }
    });
  }

  handleOnclickAllBlogs() {
    localStorage.setItem('activeTabInBlogs', 'allBlogs');
    this.selectTabs = 'allBlogs';
  }

  handleOnclickYourBlogs() {
    localStorage.setItem('activeTabInBlogs', 'yourBlogs');
    this.selectTabs = 'yourBlogs';
  }

  // blogPost is button function in blogpost,page file .....
  //once you write a function in any html file then you must declare the function in ts file...you not declare the function you getting error...
  //this function is duplicate function ...and aslo declare in blogPost function....
  blogPosta() {
    this.http.get(`${this.apiUrl}/blog/school/${this.schoolId}`).subscribe(
      (data: any) => {
        // after posting data from createblog page i'm getting data here.
        console.log(data); // and setting item in local storage, you can find it below of this file as setItem
        this.blogs = data.posts;
        this.userBlogs = data.posts.filter(
          (post: any) => post.email === this.email
        );
        console.log(this.userBlogs);
        // if (this.userBlogs.includes(data.posts)) {
        // }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //get blog posted by user
  // getBlogs() {
  //   this.http.get(`${this.apiUrl}/blog/${this.email}`).subscribe(
  //     (data: any) => {
  //       // after posting data from createblog page i'm getting data here.
  //       console.log(data); // and setting item in local storage, you can find it below of this file as setItem
  //       //  console.log(this.email);
  //       this.userBlogs = [...data];

  //       // this.blogPosta();
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  // this blogPost function is original function ...and it's function works on navigate to anther page....
  blogPost() {
    this.blogPosta();
    this.navcontroller.navigateRoot('/createblog');
    //  this.router.navigate(['/createblog'])

    //  this.img(['assets/images/pexels-photo-jpg..webp'])
  }

  update(selectedblog: any) {
    this.router.navigate(['/update-blog', selectedblog]);
    console.log(selectedblog);
  }

  delete(key: any) {
    console.log('clickdeletebutton');
    console.log(key);
    this.http.delete(`${this.apiUrl}/blog/${key}`).subscribe((data) => {
      console.log(data);

      // this.getBlogs();
      this.blogPosta();
    });
  }

  cardClick(createblog: any) {
    console.log(createblog);
    let a = createblog;
    localStorage.setItem('createblog', JSON.stringify(a)); // here i'm setting item in local storage

    console.log('cardClick'); // and i'm getting this data in blog content page..

    //  localStorage.setItem("_id", JSON.stringify(a));

    this.router.navigate(['/blog-content', createblog]);
  }
}

function stopEventPropagation(
  event: Event | undefined,
  Event: {
    new (type: string, eventInitDict?: EventInit | undefined): Event;
    prototype: Event;
    readonly NONE: 0;
    readonly CAPTURING_PHASE: 1;
    readonly AT_TARGET: 2;
    readonly BUBBLING_PHASE: 3;
  }
) {
  throw new Error('Function not implemented.');
}
