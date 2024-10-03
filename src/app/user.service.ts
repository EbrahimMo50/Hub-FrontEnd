import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private _httpClient:HttpClient, private _authService:AuthService) { }

  URL:string = "https://localhost:7084";

  GetUsers():Observable<any>{
    return this._httpClient.get(this.URL + '/api/User/GetUsers', {headers: {'Authorization':'Bearer ' + this._authService.Token}})
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          alert("token expired");
          this._authService.LogOut();
        }
        return throwError(()=>error);
      })
    );
  }


}