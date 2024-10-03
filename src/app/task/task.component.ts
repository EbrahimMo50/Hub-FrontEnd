import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {

  constructor(private _service:TaskService, public _authService:AuthService) { }

  ngOnInit(): void {
    this.GetAllTasks();
  }

  Tasks:any[] = []
  
  GetAllTasks(){
    this._service.GetTasks()
    .subscribe((data:any)=>{
      this.Tasks = data.$values;
    })
  }

  CreateTask(){
    let title = prompt("Enter title","")!;
    let descreption = prompt("Enter descreption","")!;

    if(title=="" || descreption==""){
      alert("fields can not be empty try again");
    }
    else{
      try{
        this._service.CreateTask(title,descreption).subscribe((data)=>{
        if(data !== null)
          throw data;
        this.GetAllTasks();     //to reduce traffic on the server we can add the task to the Task array instead of making a new call but it is good to refresh keeping data in sync
        })
      }

      catch(err){
        alert("an error occuered \n" + err);
      }
    }
  }

  DeleteTask(task:any){
    try{
      this._service.DeleteTask(task.id).subscribe((data)=>{
        if(data !== null)
          throw data;
        this.GetAllTasks();
      })
    }
    catch(err){
      alert("an error occuered\n" + err);
    }
  }
}
