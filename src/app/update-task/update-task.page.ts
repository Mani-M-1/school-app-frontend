import { Component, OnInit } from '@angular/core'; // this lines import necessary component from the angular core library...
import { ModalController, NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  categories = ['work', 'personal'];

  // task data
  taskId: any;
  taskTitle: any;
  dueDate: any;
  priority: any;
  category: any;

  constructor(
    public modalCtlr: ModalController,
    private http: HttpClient,
    private router: Router,
    private navParams: NavParams // Inject NavParams
  ) {
    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if (login_state == 'true') {
      console.log('log in is succesful');
    } else {
      this.router.navigate(['/sign-in']);
    }

    // Retrieve the task data from NavParams
    const { _id, task, priority, email, date, category } =
      this.navParams.get('task');
    console.log({ _id, task, priority, email, date, category });

    this.taskId = _id;
    this.taskTitle = task;
    this.dueDate = date;
    this.priority = priority;
    this.category = category;
  }

  ngOnInit() {}
  selectCategory(index: number) {
    this.category = this.categories[index];
    console.log(this.category);
  }

  updateTask() {
    const data = {
      task: this.taskTitle,
      priority: this.priority,
      date: this.dueDate,
      category: this.category,
    };

    this.http.put<any>(`${this.apiUrl}/todo/${this.taskId}`, data).subscribe(
      (data) => {
        console.log(data);
        this.dismiss();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async dismiss() {
    await this.modalCtlr.dismiss();
  }
}
