import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { register } from 'node:module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{

  constructor(private _authService:AuthService, private _router:Router){ }

  FormGroup:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required]),
    password:new FormControl(null,[Validators.required])
  });

  async Login(FormGroup:FormGroup){
    await this._authService.Login(FormGroup);
    this._router.navigate(['/tasks']);
  }
}