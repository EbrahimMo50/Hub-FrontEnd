import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  Token:string = "";
  URL:string = "https://localhost:7084";

  constructor(private _httpClient:HttpClient) { }

  // FAF goes brrrr no observable returned
  Login(ForgmGroup:FormGroup){
    let email = ForgmGroup.get('email')!.value;
    let password = ForgmGroup.get('password')!.value;
    this._httpClient.post( this.URL + "/api/User/Login", { email, password }, { headers :{'Content-Type':'application/json'}, responseType: 'text' })
      .subscribe({
        next: (data) => {
          this.Token = data;
          localStorage.setItem('UserToken',this.Token);
        },
        error: (error) => {
          window.alert('Login failed: ' + error.message);
        }
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
}