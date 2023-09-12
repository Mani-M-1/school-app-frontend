import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab7',
  templateUrl: 'tab7.page.html',
  styleUrls: ['tab7.page.scss']
})
export class Tab7Page {

  constructor(
    private router: Router
  ) {
    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if(login_state == 'true'){
      console.log("log in is succesful");
    }else{
      this.router.navigate(['/sign-in']);
    }
  }

}
