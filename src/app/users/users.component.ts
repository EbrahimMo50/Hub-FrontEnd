import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { GroupCheckPipe } from '../group-check.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    GroupCheckPipe,
    MatMenuModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
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
    users:new FormControl([]),
    get: new FormControl(null),
    post: new FormControl(null),
    put: new FormControl(null),
    delete: new FormControl(null),
  });

  constructor(private _service:UserService, public _authService:AuthService){ }

  ngOnInit(): void {
    this.GetUsers();
    this.GetGroups();
  }

  GetUsers(){
    this._service.GetUsers().subscribe((data)=>{
      this.Users = data.$values;
    });
  }

  GetGroups(){
    this._service.GetGroups().subscribe((data)=>{
      this.Groups = data.$values;
    });
  }

  TogglePopUp(){
    const shadOverLay = document.querySelector(".shaded-overlay") as HTMLElement;
    const popUpMenu = document.querySelector(".popup") as HTMLElement; 
    shadOverLay.style.visibility = shadOverLay.style.visibility === "visible" ? "hidden" : "visible";
    popUpMenu.style.visibility = popUpMenu.style.visibility === "visible" ? "hidden" : "visible";
  }
  
  ToggleMenu(Id:number){
    this.isMenuOpen[Id] = !this.isMenuOpen[Id];
  }

  ChangeRole(GroupId:number, UserId:number){
  //keep data in sync and get all users again, higher traffic but data stays in sync

   this._service.JoinGroup(UserId,GroupId).subscribe(()=>{
      this.GetUsers();
   });
  }

  AddGroup(FormGroup:FormGroup){
    this._service.CreateGroup(FormGroup).subscribe(()=>{
      alert("group created succefully");
      this._service.GetGroups().subscribe(()=>{
        this.GetUsers();
        this.GetGroups();
      })
    })
  }
}


//TODO
//add mass insertion using a filter and check box i can not bru this shit is diabolical