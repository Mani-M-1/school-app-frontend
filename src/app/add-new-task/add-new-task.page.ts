//import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';
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

  //[x: string]: any;
  categories = ['work', 'personal'];

  newTaskObj = {};
  itemName: any;
  itemDueDate: any;
  itemPriority: any;
  itemCategory: any;
  categorySelectedCategory: any;
  category: any;
  date: any;
  priority: any;
  task: any;
  username: any;

  constructor(
    public modalCtlr: ModalController,
    public todoService: TodoService,
    private http: HttpClient,
    private router: Router
  ) {
    //here we need to check if user is signed in and user role
    let login_state = localStorage.getItem('isLoggedIn');

    if (login_state == 'true') {
      console.log('log in is succesful');
      this.username = localStorage.getItem('username');
      console.log(this.username);
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  addNew() {
    console.log(this.itemName),
      console.log(this.username),
      console.log(this.itemPriority),
      console.log(this.itemDueDate),
      console.log(this.categorySelectedCategory);
    //console.log(this.itemDueDate)
    //now write post http call to push data to database
    const body = {
      task: this.itemName,
      username: this.username,
      priority: this.itemPriority,
      date: this.itemDueDate,
      category: this.categorySelectedCategory,
    };

    console.log(this.username);

    console.log(body);
    this.http.post(`${this.apiUrl}/todo`, body).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.categories.push();
    this.categories.push();
  }

  // this for adding task
  async add() {
    this.addNew();
    this.newTaskObj = {
      itemName: this.itemName,
      username: this.username,
      itemDueDate: this.itemDueDate,
      itemPriority: this.itemPriority,
      itemCategory: this.categorySelectedCategory,
    };
    console.log(this.newTaskObj);
    let uid = this.itemName + this.itemDueDate;

    if (uid) {
      await this.todoService.addTask(uid, this.newTaskObj);
    } else {
      console.log("can't save empty task");
    }

    this.dismis();
  }

  selectCategory(index: any) {
    this.categorySelectedCategory = this.categories[index];
    console.log(this.categorySelectedCategory);
  }

  async dismis() {
    await this.modalCtlr.dismiss(this.newTaskObj);
  }
}
