import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { FormGroup } from '@angular/forms';

//all methods will get an interception check to see if the token if expired thus forcing a logout
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _httpClient:HttpClient, private _authService:AuthService) { }

  URL:string = "https://localhost:7084";

  GetTasks():Observable<any>{
    return this._httpClient.get(this.URL + '/api/tasks/GetTasks', {headers: {'Authorization':'Bearer ' + this._authService.Token}})
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

  CreateTask(title:string, description:string):Observable<any>{
    return this._httpClient.post(this.URL + '/api/tasks/CreateTask',{title,description}, {headers: {'Authorization':'Bearer ' + this._authService.Token}})
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

  DeleteTask(Id:number):Observable<any>{
    return this._httpClient.delete(this.URL + `/api/tasks/DeleteTask?Id=${Id}`, {headers: {'Authorization':'Bearer ' + this._authService.Token}})    
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

  UpdateTask(title:string,description:string,Id:number){
    console.log("blayyyyttsyha")
    return this._httpClient.put(this.URL + `/api/tasks/UpdateTask?Id=${Id}`, {title,description} ,{headers: {'Authorization':'Bearer ' + this._authService.Token}})    
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