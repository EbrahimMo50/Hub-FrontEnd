import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _httpClient:HttpClient, private _authService:AuthService) { }

  URL:string = "https://localhost:7084";

  GetTasks():Observable<any>{
    return this._httpClient.get(this.URL + '/api/tasks/GetTasks', {headers: {'Authorization':'Bearer ' + this._authService.Token}})
  }
}
