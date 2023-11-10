import { Component, Input, OnInit } from '@angular/core';     // this lines import necessary component from the angular core library...
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';    //this line is custom file..
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  @Input()
  task!: {
    _id: any;
      task: any; date: any; priority: any; category: any;  key: any; 
};
  categories =[]
  categorySelectedCategory: any

  //These lines declare several new class properties that will be used to update a task. 
  newTaskObj = {}
  itemName: any
  itemDueDate: any 
  itemPriority: any
  itemCategory: any
  dataId: any

  constructor(
    public modalCtlr:ModalController, 
    public todoServive:TodoService, private http: HttpClient,
    private router: Router
    ) { 
      //here we need to check if user is signed in and user role
      let login_state = localStorage.getItem('isLoggedIn');

      if(login_state == 'true'){
        console.log("log in is succesful");
      }else{
        this.router.navigate(['/sign-in']);
      }
    console.log(this.task)
  }

  ngOnInit() {
    this.categories.push()
    this.categories.push()
    console.log(this.task)

    this.itemName = this.task.task
    this.itemDueDate = this.task.date
    this.itemPriority = this.task.priority
    this.categorySelectedCategory = this.task.category
    this.dataId = this.task._id
     //console.log(this.task);
    
    
  }
  selectCategory(index: string | number){
    this.categorySelectedCategory = this.categories
    console.log(this.categorySelectedCategory);
  }


//   patch(url: string, data: any) {
//     return this.http.patch(url, data);
//   }

//   updateTask() {
//     this.patch('https://localhost:3000/todos', { name: 'New name' }).subscribe(result => {
//   console.log(result);
// });


 
//   }
//   // patch(arg0: string, arg1: { name: string; }) {
//   //   throw new Error('Method not implemented.');
//   // }

updateTask() {
  //const url = ('https://localhost:3000/todosId') + this.task.key
  
  const data = {
    task: this.itemName,
    priority: this.itemPriority,
    date: this.itemDueDate,
    category: this.categorySelectedCategory
  }

  this.http.post('http://localhost:3000/todo/'+this.dataId, data).subscribe((data): void => {
    console.log(data);
  });
}


  async dismis(){
    await this.modalCtlr.dismiss()
  }

  async update(){
    this.updateTask();

    this.newTaskObj = ({itemName:this.itemName, itemDueDate:this.itemDueDate, itemPriority:this.itemPriority,itemCategory:this.categorySelectedCategory})
    let uid = this.task.key
    await this.todoServive.updateTask(uid,this.newTaskObj)
    this.dismis()
  }
}