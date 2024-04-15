import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  categories = ['work', 'personal'];

  email: any;

  // task data
  taskTitle: any;
  dueDate: any;
  priority: any;
  category: any;

  constructor(
    public modalCtlr: ModalController,
    private http: HttpClient,
    private router: Router
  ) {
    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if (login_state == 'true') {
      console.log('log in is succesful');
      this.email = localStorage.getItem('email');
      console.log(this.email);
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  addTask() {
    const body = {
      task: this.taskTitle,
      email: this.email,
      priority: this.priority,
      date: this.dueDate,
      category: this.category,
    };

    console.log(body);
    this.http.post(`${this.apiUrl}/todo`, body).subscribe(
      (response) => {
        console.log(response);
        this.dismiss();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {}

  selectCategory(event: any, index: any) {
    this.category = this.categories[index];
    console.log(this.category);
    event.target.setAttribute('fill', 'primary');
  }

  async dismiss() {
    await this.modalCtlr.dismiss();
  }
}
