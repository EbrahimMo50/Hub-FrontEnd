import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import * as JWT from 'jwt-decode'; //why when i imported all it worked? missing method or name mix up issue occuered ig

export interface CustomJwtPayload {
  iat:number;
  nbf:number;
  exp:number;
  //custom claims
  email:string;
  unique_name:string;
  groupId:number;
  deletePermission:string;
  getPermission:string;
  postPermission:string;
  putPermission:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  Token:string = "";
  URL:string = "https://localhost:7084";

  constructor(private _httpClient:HttpClient) { }

  //removed the FAF to navigate the user when the trip finishes
  async Login(ForgmGroup: FormGroup): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let email = ForgmGroup.get('email')!.value;
      let password = ForgmGroup.get('password')!.value;
  
      this._httpClient.post(this.URL + "/api/User/Login", { email, password }, { headers: { 'Content-Type': 'application/json' }, responseType: 'text' })
        .subscribe({
          next: (data) => {
            this.Token = data;
            localStorage.setItem('UserToken', this.Token);
            resolve(true); // Resolve the promise with true on success
          },
          error: (error) => {
            window.alert('Login failed: ' + error.message);
            reject(false); // Reject the promise with false on error
          }
        });
    });
  }

  //created an observable here because i will want to know the result back at the callers
  Register(FormGroup:FormGroup): Observable<object>{
    return this._httpClient.post(this.URL + "/api/User/Register",FormGroup.value, { headers :{'Content-Type':'application/json'}});
  }

  LogOut(){
    this.Token = '';
    localStorage.removeItem("UserToken");
  }

  //method to look for the token to see if the user had session
  LookForToken():boolean{
    if(this.Token != '')
      return false;

    try{
      let tokenClaim = localStorage.getItem("UserToken")
      if(tokenClaim != null){
        this.Token = tokenClaim;
        return true;
      }
    }
    catch(err:any){
      console.log(err.message);
      console.log(this.Token);
    }
    return false;
  }

  GetTokenDecoded(): CustomJwtPayload | null{
    try{
      return JWT.jwtDecode<CustomJwtPayload>(this.Token);
    }
    catch(e){
      alert(e);
      return null;
    }
  }
}