import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.page.html',
  styleUrls: ['./update-blog.page.scss'],
})
export class UpdateBlogPage implements OnInit {

  title: any;
  content: any;
  images: any
  Name: any;
  selectedblogId: any;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router)
   {
    this.route.params.subscribe(params =>{
      //Retriving the week id from the URL parameters
      console.log(params)
      this.selectedblogId = params['_id'];
      console.log(this.selectedblogId)

    });
    console.log("data")
    }


  ngOnInit() {
  }

updateBlog(){
  const data = {
    title: this.title,
    content: this.content,
    images: this.images,
    Name: this.Name,
  };
  this.http.put(`https://student-api-10-fbf8bbebe705.herokuapp.com/blog/${this.selectedblogId}`,data).subscribe(data => {
    console.log(data);
  });
  this.router.navigate(['/tabs/tab6'])
}
}