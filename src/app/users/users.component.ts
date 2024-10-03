import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { GroupCheckPipe } from '../group-check.pipe';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    GroupCheckPipe
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  
  Users: any[] = [];

  constructor(private _service:UserService){ }
  ngOnInit(): void {
    this._service.GetUsers().subscribe((data)=>{
      this.Users = data.$values;
    });
  }

  openPopUp(){
    const shadOverLay = document.querySelector(".shaded-overlay") as HTMLElement;
    const popUpMenu = document.querySelector(".popup") as HTMLElement; 
    shadOverLay.style.visibility = "visible";
    popUpMenu.style.visibility = "visible";
  }
}
