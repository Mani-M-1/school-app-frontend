import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  blogs: any[] = [];
  content: any;

  constructor(
    
    private http: HttpClient,
     private arouter: ActivatedRoute,
     private router: Router )
     { 
  
      //here we need to check if user is signed in and user role
      let login_state = localStorage.getItem('isLoggedIn');

      if(login_state == 'true'){
        console.log("log in is succesful");
      }else{
        this.router.navigate(['/sign-in']);
      }
     }

  ngOnInit() {
    this.blogcontent();
  }
    blogcontent(){
      this.http.get('http://localhost:3000/blog').subscribe((data: any) =>{
        console.log(data);
        this.blogs = data.posts;
    })
    //  this.content = localStorage.getItem('createblog');
    // let a = JSON.parse(this.content)
    // this.blogs.push(a)
    // console.log(a.content);
    };
    
  
// let a:any = localStorage.getItem('createblog');
// console.log(a);
// let b = JSON.parse(a);
// this.createblog.push(b);
// console.log(b.blogcontent)

cardClick(createblog:any){
  console.log(createblog);
  let a = createblog;
 
  localStorage.setItem("createblog", JSON.stringify(a));  // here i'm setting item in local storage
  console.log("cardClick");                               // and i'm getting this data in blog content page..
  this.router.navigate(['/blog-content', createblog])
 }

  }


  