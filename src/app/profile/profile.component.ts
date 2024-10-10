import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  CurrentUser:any;
  FormGroup:FormGroup;

  constructor(private _authService:AuthService, private _service:UserService) {

    this.CurrentUser = {
      id: this._authService.GetTokenDecoded()!.id,
      name: this._authService.GetTokenDecoded()!.unique_name,
      email: this._authService.GetTokenDecoded()!.email,
      password: this._authService.GetTokenDecoded()!.password,
    }

    this.FormGroup = new FormGroup({
      name: new FormControl(this.CurrentUser.name,[Validators.required]),
      email: new FormControl(this.CurrentUser.email,[Validators.required,Validators.email]),
      password: new FormControl(this.CurrentUser.password,[Validators.required]),
    })
   }

  ChangesMade(FormGroup:FormGroup):boolean{
    if(
      this.CurrentUser.name != FormGroup.value.name ||
      this.CurrentUser.email != FormGroup.value.email ||
      this.CurrentUser.password != FormGroup.value.password 
    )
      return true;  

    return false;
  }

  UpdateUser(FormGroup:FormGroup){
    let confirmed = confirm("are you sure you want to save changes?");
    if(confirmed)
      this._service.UpdateUser(this.CurrentUser.id, FormGroup).subscribe(()=>{
        alert("update succeful please relog");
        this._authService.LogOut();
      });
  }
}
