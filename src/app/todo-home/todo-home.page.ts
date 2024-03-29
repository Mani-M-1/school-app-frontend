import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { TodoService } from '../todo.service';
import { UpdateTaskPage } from '../update-task/update-task.page';
import { HttpClient } from '@angular/common/http';
import { constants } from 'buffer';
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
  task: any;
  priority: any;
  date: any;
  category: any;
  email: any;
  userRole: any;
  student: any;
  professor: any;
  userrole: string | null;

  constructor(
    public modalCtlr: ModalController,
    public todoService: TodoService,
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
    // this.getAllTask();

    this.email = localStorage.getItem('email');
    console.log(this.email);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getAllTask();
        console.log(`this.getAllTask(); triggered in todo-home`);
      }
    });
    // this.getAllTask();

    this.userrole = localStorage.getItem('userRole');
    console.log(this.userrole);
  }

  // ngOnInit() {
  //   throw new Error('Method not implemented.');

  // }

  // getAllItem() {
  //   this.http.get(`${this.apiUrl}/todo`).subscribe(
  //     (data: any) => {
  //       console.log(data);
  //       let list = JSON.stringify(data);
  //       this.todoList = [...data];
  //       console.log(this.todoList.tasks);
  //       //this.todoList.push()
  //     },
  //     (err: any) => {
  //       console.log(err);
  //     }
  //   );
  // }

  //  map(){
  //   fetch('${this.apiUrl}/todos')
  //   .then(response => response.json())
  //   .then(data => {
  //     const mappedData = data.map((item: { itemTask: any; itemPriority: any; itemdueDate: any; itemCategory: any; }) => {
  //       return {
  //         task:this.task,
  //         priority: this.priority,
  //         date: this.date,
  //         category: this.category,
  //         // ...
  //       };
  //     });
  //     console.log(mappedData);
  //   })
  //   .catch(error => console.error(error));

  //  }

  // backButton(){
  //   console.log("button clicked");

  //   if(this.userRole === this.professor){
  //     this.router.navigate(['/tabs/tab5']);
  //   }
  //   if(this.userRole === this.student){
  //     this.router.navigate(['/tabs/tab1']);
  //   }else{
  //     console.log("something went wrong");
  //     this.toastService.presentToast("Something went wrong");
  //   }
  // }

  backButton() {
    console.log('button clicked');
    console.log('User role:', this.userrole);

    if (this.userrole === 'professor') {
      this.router.navigate(['/tabs/tab5']);
    } else if (this.userrole === 'student') {
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
      this.getAllTask();
      console.log('modal dismmissed');
    });
    return await modal.present();
  }

  // getAllTask(){
  //   this.getAllItem()
  //   //this.todoList = this.todoService.getAllTasks()
  //   console.log(this.todoService.getAllTasks());
  //   //write http code to getall task
  // }

  //new code
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

  delete(key: any) {
    console.log(key);
    this.http.delete(`${this.apiUrl}/todo/${key}`).subscribe((data) => {
      console.log(data);
      this.getAllTask();
    });
    //this.todoService.deleteTask(key)
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
  // backbutton(){
  //   console.log("button clicked");
  // }
  goToTab1Page() {
    this.navCtrl.navigateBack('/tabs/student-side-courses-page');
  }
}
