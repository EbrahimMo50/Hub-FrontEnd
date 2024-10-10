import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    DatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {

  Tasks:any[] = [];
  FormGroup: FormGroup = new FormGroup({
    title: new FormControl(null,[Validators.required]),
    description: new FormControl(null,[Validators.required]),
  });

  UpdateFormGroup: FormGroup = new FormGroup({
    title: new FormControl(null,[Validators.required]),
    description: new FormControl(null,[Validators.required]),
  });
  UpdatedTaskId:number = -1;

  constructor(private _service:TaskService, public _authService:AuthService) { }

  ngOnInit(): void {
    this.GetAllTasks();
  }
  
  GetAllTasks(){
    this._service.GetTasks()
    .subscribe((data:any)=>{
      this.Tasks = data.$values;
    })
  }

  CreateTask(FormGroup:FormGroup){
    let title = FormGroup.value.title;
    let descreption = FormGroup.value.description;
    
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
    this.ClosePopUp();
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
  
  UpdateTask(FormGroup:FormGroup){
    console.log(FormGroup);
    this._service.UpdateTask(FormGroup.value.title,FormGroup.value.description,this.UpdatedTaskId).subscribe(()=>{
      this._service.GetTasks().subscribe(()=>{
        this.GetAllTasks();
      })
    })
    this.CloseUpdatePopUp();
  }

  OpenUpdatePopUp(taskId:number){
    const shadOverLay = document.querySelector(".shaded-overlay") as HTMLElement;
    const popUpMenu = document.querySelector(".update-popup") as HTMLElement; 
    shadOverLay.style.visibility = "visible";
    popUpMenu.style.visibility = "visible";

    this.UpdatedTaskId = taskId;
    //could not send a value to the form group the value resets on every update on other controls :/
    // this.UpdateFormGroup.value.id = taskId;
    // this.UpdateFormGroup.setValue({
    //   id : taskId
    // })
    // this.UpdateFormGroup.patchValue({
    //   id: taskId
    // });
    
  }

  CloseUpdatePopUp(){
    const shadOverLay = document.querySelector(".shaded-overlay") as HTMLElement;
    const popUpMenu = document.querySelector(".update-popup") as HTMLElement; 
    shadOverLay.style.visibility = "hidden";
    popUpMenu.style.visibility = "hidden";

    const idField = document.querySelector("#idField") as HTMLInputElement;
    idField.value = "";
  }

  //these are for group creating pop up the two up are for the update pop up
  OpenPopUp(){
    const shadOverLay = document.querySelector(".shaded-overlay") as HTMLElement;
    const popUpMenu = document.querySelector(".popup") as HTMLElement; 
    shadOverLay.style.visibility = "visible";
    popUpMenu.style.visibility = "visible";
  }

  ClosePopUp(){
    const shadOverLay = document.querySelector(".shaded-overlay") as HTMLElement;
    const popUpMenu = document.querySelector(".popup") as HTMLElement; 
    shadOverLay.style.visibility = "hidden";
    popUpMenu.style.visibility = "hidden";

    const titleField = document.querySelector("#titleField") as HTMLInputElement;
    const descreptionField = document.querySelector("#description") as HTMLInputElement;

    titleField.value = '';
    descreptionField.value = '';
  }
}
