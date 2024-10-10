import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { GroupCheckPipe } from '../group-check.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    GroupCheckPipe,
    MatMenuModule,
    ReactiveFormsModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

  isMenuOpen: { [key: number]: boolean } = {};   //a menu map for each user id and a bool for it 
  Groups: any[] = [];
  Users: any[] = [];
  FormGroup: FormGroup = new FormGroup({
    groupName: new FormControl(null,[Validators.required]),
    get: new FormControl(null),
    post: new FormControl(null),
    put: new FormControl(null),
    delete: new FormControl(null),
  });

  constructor(private _service:UserService, public _authService:AuthService){ }

  ngOnInit(): void {
    this._service.GetUsers().subscribe((data)=>{
      this.Users = data.$values;
    });
    this._service.GetGroups().subscribe((data)=>{
      this.Groups = data.$values;
    });
    
  }

  OpenPopUp(){
    const shadOverLay = document.querySelector(".shaded-overlay") as HTMLElement;
    const popUpMenu = document.querySelector(".popup") as HTMLElement; 
    shadOverLay.style.visibility = "visible";
    popUpMenu.style.visibility = "visible";
  }
  
  ToggleMenu(Id:number){
    this.isMenuOpen[Id] = !this.isMenuOpen[Id];
  }

  ChangeRole(GroupId:number, UserId:number){
  //keep data in sync and get all users again, higher traffic but data stays in sync

   this._service.JoinGroup(UserId,GroupId).subscribe(()=>{
      this._service.GetUsers().subscribe((data)=>{
      this.Users = data.$values;
    })
   });
  }

  ClosePopUp(){
    const shadOverLay = document.querySelector(".shaded-overlay") as HTMLElement;
    const popUpMenu = document.querySelector(".popup") as HTMLElement; 
    shadOverLay.style.visibility = "hidden";
    popUpMenu.style.visibility = "hidden";
  }

  AddGroup(FormGroup:FormGroup){
    this._service.CreateGroup(FormGroup).subscribe(()=>{
      alert("group created succefully");
      this._service.GetGroups().subscribe((data)=>{
        this.Groups = data.$values;
      });
    })
  }

}


//TODO
//add mass insertion using a filter and check box