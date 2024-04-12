import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { UpdateTaskPage } from '../update-task/update-task.page';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-todo-home',
  templateUrl: './todo-home.page.html',
  styleUrls: ['./todo-home.page.scss'],
})
export class TodoHomePage {
  private apiUrl: string = environment.apiUrl;

  todoList: any;

  today: number = Date.now();

  // for todos
  task: any;
  priority: any;
  date: any;
  category: any;

  // user related data
  email: any;
  userRole: any;
  student: any;
  professor: any;

  constructor(
    public modalCtlr: ModalController,
    private http: HttpClient,
    private router: Router,
    private navCtrl: NavController,
    private toastService: ToastService
  ) {
    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if (login_state == 'true') {
      console.log('log in is succesful');
    } else {
      this.router.navigate(['/sign-in']);
    }

    this.email = localStorage.getItem('email');
    console.log(this.email);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getAllTask();
        console.log(`this.getAllTask(); triggered in todo-home`);
      }
    });

    this.userRole = localStorage.getItem('userRole');
    console.log(this.userRole);
  }

  covertDateFormat(dateString: any) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    // return date;
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = months[dateObj.getMonth()];
    const date = dateObj.getDate();
    const day = days[dateObj.getDay()];

    let hours: any = dateObj.getHours();
    let minutes: any = dateObj.getMinutes();
    // const year = dateObj.getFullYear();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${day}, ${month} ${date}, ${year}, ${hours}:${minutes}`;
  }

  backButton() {
    console.log('button clicked');
    console.log('User role:', this.userRole);

    if (this.userRole === 'professor') {
      this.router.navigate(['/tabs/tab5']);
    } else if (this.userRole === 'student') {
      this.router.navigate(['/tabs/student-side-courses-page']);
    } else {
      console.log('something went wrong');
      this.toastService.presentToast('Something went wrong');
    }
  }

  async addNewItem() {
    const modal = await this.modalCtlr.create({
      component: AddNewTaskPage,
    });
    modal.onDidDismiss().then((newTask) => {
      console.log(`task added: ${newTask}`);
      this.getAllTask();
    });
    return await modal.present();
  }

  getAllTask() {
    this.http.get(`${this.apiUrl}/todo/${this.email}`).subscribe(
      (data: any) => {
        console.log(data);
        this.todoList = [...data.tasks];
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  delete(taskId: any) {
    console.log(taskId);
    this.http.delete(`${this.apiUrl}/todo/${taskId}`).subscribe(
      (data) => {
        console.log(data);
        this.getAllTask();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async update(selectedTask: any) {
    console.log(selectedTask);
    const modal = await this.modalCtlr.create({
      component: UpdateTaskPage,
      componentProps: { task: selectedTask },
    });

    modal.onDidDismiss().then((data) => {
      console.log(`data from modal: ${data}`);
      this.getAllTask();
    });

    return await modal.present();
  }

  goToTab1Page() {
    this.navCtrl.navigateBack('/tabs/student-side-courses-page');
  }
}
