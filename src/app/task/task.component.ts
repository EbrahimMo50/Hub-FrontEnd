import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {

  constructor(private _service:TaskService) { }

  ngOnInit(): void {
    this.GetAllTasks();
  }

  Tasks:any[] = []
  
  GetAllTasks(){
    this._service.GetTasks()
    .subscribe((data:any)=>{
      data.$values.forEach((element: any) => {
        console.log(element);
      });
    })
  }
}
