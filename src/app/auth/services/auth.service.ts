import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "https://mm8bitdm.herokuapp.com/api/register-yugioh"
  private _loginUrl = "https://mm8bitdm.herokuapp.com/api/loginyugioh"
  private _userUrl = "https://mm8bitdm.herokuapp.com/api/userdata"

  constructor(private http:HttpClient, private router:Router) { 
  }

  registerUser(user: any){


    return this.http.post<any>(this._registerUrl,user)
  }

  loginUser(user:any){
    console.log(user)
    return this.http.post<any>(this._loginUrl,user)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getUser(){  
      const token = {
        "token": localStorage.getItem('token')
      }
      return this.http.post<any>(this._userUrl, token)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }
  logoutUser(){
    localStorage.removeItem('token')
    location.reload();
    this.router.navigate(['/home'])
  }
}
 