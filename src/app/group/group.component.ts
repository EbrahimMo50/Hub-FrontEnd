import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    MatMenuModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent {

  Groups:any[] = [];
  
  FormGroup: FormGroup = new FormGroup({
    groupName: new FormControl(null,[Validators.required]),
    users:new FormControl([]),
    get: new FormControl(null),
    post: new FormControl(null),
    put: new FormControl(null),
    delete: new FormControl(null),
  });

  UpdateFormGroup: FormGroup = new FormGroup({
    groupName: new FormControl(null,[Validators.required]),
    users:new FormControl([]),
    get: new FormControl(null),
    post: new FormControl(null),
    put: new FormControl(null),
    delete: new FormControl(null),
  });

  UpdatedGroup:any = {users:[]};
  ActiveGroupUsers:any[] = [];
  FilteredUsers:any[] = [];
  AllUsers:any[] = [];
  ActiveUsersId:any[] = [];

  constructor(private _service:GroupService, public _authService:AuthService,private _userService:UserService) { }

  ngOnInit(): void {
    this.GetAllGroups();
    this._userService.GetUsers().subscribe((data)=>{
      this.AllUsers = data.$values;
      this.FilteredUsers = data.$values;
    });
  }
  
  FilterUsers(event:any){
      this.FilteredUsers = this.AllUsers.filter(x => x.name.toLowerCase().includes(event.target!.value.toLowerCase()));
  }

  GetAllGroups(){
    this._service.GetGroups()
    .subscribe((data:any)=>{
      this.Groups = data.$values;
    })
  }

  // CreateGroup(FormGroup:FormGroup){
  //   let title = FormGroup.value.title;
  //   let descreption = FormGroup.value.description;
    
  //   try{
  //     this._service.CreateGroup(title,descreption).subscribe((data)=>{
  //     if(data !== null)
  //       throw data;
  //     this.GetAllGroups();     //to reduce traffic on the server we can add the Group to the Group array instead of making a new call but it is good to refresh keeping data in sync
  //     })
  //   }
  //   catch(err){
  //     alert("an error occuered \n" + err);
  //   }
  //   this.ClosePopUp();
  // }

  DeleteGroup(Group:any){
    try{
      this._service.DeleteGroup(Group.id).subscribe((data)=>{
        if(data !== null)
          throw data;
        this.GetAllGroups();
      })
    }
    catch(err){
      alert("an error occuered\n" + err);
    }
  }
  
  UpdateGroup(FormGroup:FormGroup){
    this._service.UpdateGroup(this.UpdatedGroup.id,FormGroup).subscribe(()=>{
      this._service.GetGroups().subscribe(()=>{
        this.GetAllGroups();
      })
    })
    this.CloseUpdatePopUp();
  }

  OpenUpdatePopUp(Group:any){
    const shadOverLay = document.querySelector(".shaded-overlay") as HTMLElement;
    const popUpMenu = document.querySelector(".update-popup") as HTMLElement; 
    shadOverLay.style.visibility = "visible";
    popUpMenu.style.visibility = "visible";

    this.UpdatedGroup = Group;
    this.ActiveGroupUsers = this.UpdatedGroup.users.$values;
    this.ActiveGroupUsers.forEach((value)=>{
      this.ActiveUsersId.push(value.id);
    });
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
