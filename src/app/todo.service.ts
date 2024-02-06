import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl: string = environment.apiUrl;

  category: any;
  date: any;
  priority: any;
  task: any;

  constructor(private storage: Storage, private http: HttpClient) {
    this.init();
  }

  addNewTask() {
    console.log(this.task),
      console.log(this.priority),
      console.log(this.date),
      console.log(this.category);

    //now write post http call to push data to database

    const postdata = {
      task: this.task,
      priority: this.priority,
      date: this.date,
      category: this.category,
    };

    this.http.post(`${this.apiUrl}/todos`, postdata).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addTask(key: string, value: any) {
    this.storage.set(key, value);
  }

  deleteTask(key: string) {
    this.storage.remove(key);
  }

  updateTask(key: string, newValue: {}) {
    console.log(key, newValue);
    console.log(key);
    this.storage.set(key, newValue);
    // this.getAllTasks();
  }

  getAllTasks() {
    let tasks: any = [];
    this.storage.forEach((key, value) => {
      tasks.push({ key: value, value: key });
    });
    return tasks;
  }

  async init() {
    await this.storage.create();
  }
}
