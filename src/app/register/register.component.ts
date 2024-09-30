import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private _router:Router, private _authService:AuthService){ }

  FormGroup:FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });
  
  Register(Form:FormGroup){
    (this._authService.Register(Form))
    .subscribe({
      next: () =>{
        this._router.navigate(['/login']);
        alert("Registration succeful please login");
      },
      error: (err) =>{
        alert("an error occuered: \n" + err.message + "\n email used or server down")
      }
    })
  }
}
