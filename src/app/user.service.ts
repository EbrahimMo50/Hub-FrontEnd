import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private _httpClient:HttpClient, private _authService:AuthService) { }

  URL:string = "https://localhost:7084";

  //should have used interceptors instead of fluently putting a pipe on all requests :/

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

  GetGroups():Observable<any>{
    return this._httpClient.get(this.URL + '/api/User/GetGroups', {headers: {'Authorization':'Bearer ' + this._authService.Token}})
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

  //FAF?
  JoinGroup(UserId:number,GroupId:number):Observable<any>{
    return this._httpClient.put(this.URL + `/api/User/UpdateUserGroup?UserId=${UserId}&GroupId=${GroupId}`, {} , {headers: {'Authorization':'Bearer ' + this._authService.Token}})    
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          alert("token expired");
          this._authService.LogOut();
        }
        else{
          alert(error.message);
        }
        return throwError(()=>error);
      })
    );
  }

  CreateGroup(FormGroup:FormGroup):Observable<any>{
    let name = FormGroup.value.groupName;

    let validations = [];
    if(FormGroup.value.get == true)
      validations.push("get");
    if(FormGroup.value.post == true)
      validations.push("post");
    if(FormGroup.value.put == true)
      validations.push("put");
    if(FormGroup.value.delete == true)
      validations.push("delete");

    return this._httpClient.post(this.URL + `/api/User/CreateGroup`, {name,validations} , {headers: {'Authorization':'Bearer ' + this._authService.Token}})    
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          alert("token expired");
          this._authService.LogOut();
        }
        else{
          alert(error.message);
        }
        return throwError(()=>error);
      })
    );
  }
}