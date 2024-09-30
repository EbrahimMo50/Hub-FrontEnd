import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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

  constructor(public _authService:AuthService, private _router:Router){ }

  ngOnInit(): void {
    if(this._authService.LookForToken() && this._router.getCurrentNavigation())
      this._router.navigate(['/tasks']);
  }

  LogOut(){
    console.log(this._router.getCurrentNavigation())
    this._authService.LogOut();
    alert("logged out succefully");
    this._router.navigate(['/login']);
  }
}
