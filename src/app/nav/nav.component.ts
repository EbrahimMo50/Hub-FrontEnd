import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(public _authService:AuthService){ }

  LogOut(){
    this._authService.Token = '';
    localStorage.removeItem("UserToken");
    alert("logged out succefully");
  }
}
