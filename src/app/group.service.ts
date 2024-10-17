import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private _httpClient:HttpClient, private _authService:AuthService) { }

  URL:string = "https://localhost:7084";

  GetGroups():Observable<any>{
    return this._httpClient.get(this.URL + '/api/Group/GetAllGroups', {headers: {'Authorization':'Bearer ' + this._authService.Token}})
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

  CreateGroup(FormGroup:any):Observable<any>{
    let name = FormGroup.value.groupName;
    let usersId = FormGroup.value.users;
    
    //the backend gets the name of the method the user will have not a boolean for the method not optimal should redesign and make 4 columns type bit for each method
    let validations = [];
    if(FormGroup.value.get == true)
      validations.push("get");
    if(FormGroup.value.post == true)
      validations.push("post");
    if(FormGroup.value.put == true)
      validations.push("put");
    if(FormGroup.value.delete == true)
      validations.push("delete");

    return this._httpClient.post(this.URL + `/api/Group/CreateGroup`, {name,validations,usersId} , {headers: {'Authorization':'Bearer ' + this._authService.Token}})    
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

  DeleteGroup(Id:number):Observable<any>{
    return this._httpClient.delete(this.URL + `/api/Group/DeleteGroup?Id=${Id}`, {headers: {'Authorization':'Bearer ' + this._authService.Token}})    
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

  UpdateGroup(Id:number,FormGroup:FormGroup){

    let Name = FormGroup.value.groupName;
    let UsersId:any = [];

    console.log(FormGroup.value);

    let validations = [];

    if(FormGroup.value.get == true)
      validations.push("get");
    if(FormGroup.value.post == true)
      validations.push("post");
    if(FormGroup.value.put == true)
      validations.push("put");
    if(FormGroup.value.delete == true)
      validations.push("delete");

    return this._httpClient.put(this.URL + `/api/Group/UpdateGroup?Id=${Id}`, {Name,validations,UsersId} ,{headers: {'Authorization':'Bearer ' + this._authService.Token}})    
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
