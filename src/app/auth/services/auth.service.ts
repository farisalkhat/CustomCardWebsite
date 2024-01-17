import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "https://farisalkhat.com/theattic/api/register-yugioh"
  private _loginUrl = "https://farisalkhat.com/theattic/api/loginyugioh"
  private _userUrl = "https://farisalkhat.com/theattic/api/userdata"
  private _addUrl= "https://farisalkhat.com/theattic/api/userdata/addcurrency"
  private _subtractUrl = "https://farisalkhat.com/theattic/api/userdata/subtractcurrency"

  private _changeinfoUrl = "https://farisalkhat.com/theattic/api/changeaccountinfo"
  id:number | undefined;
  username:number| undefined;
  currency:number| undefined;
  role:string |undefined;
  constructor(private http:HttpClient, private router:Router) {
  }

  getID(){
    return this.id;
  }


  registerUser(user: any){


    return this.http.post<any>(this._registerUrl,user)
  }

  loginUser(user:any){
    return this.http.post<any>(this._loginUrl,user, )
  }
  changeInfo(user:any){return this.http.post<any>(this._changeinfoUrl,user)}

  getToken(){
    return localStorage.getItem('token')
  }

  getUser(){
      const token = {
        "token": localStorage.getItem('token')
      }
      this.http.post<any>(this._userUrl, token).subscribe(
        res=>{
          this.username = res['username']
          this.id = res['id']
          this.currency = res['currency']
          this.role = res['role']
        },
        err => {console.log(err)
          this.router.navigate(['/login'])})
      return this.http.post<any>(this._userUrl, token)
  }

  subtractCurrency(cost:number){
    const token = {
      "token": localStorage.getItem('token'),
      "cost":cost
    }
    this.http.post<any>(this._subtractUrl, token).subscribe(
      res=>{
        this.username = res['username']
        this.id = res['id']
        this.currency = res['currency']
      },
      err => {console.log(err)
        this.router.navigate(['/login'])})
    return this.http.post<any>(this._userUrl, token)

  }

  addCurrency(cost:number){
    const token = {
      "token": localStorage.getItem('token'),
      "cost":cost
    }
    this.http.post<any>(this._addUrl, token).subscribe(
      res=>{
        this.username = res['username']
        this.id = res['id']
        this.currency = res['currency']
      },
      err => {console.log(err)
        this.router.navigate(['/login'])})
    return this.http.post<any>(this._userUrl, token)

  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }
  logoutUser(){
    localStorage.removeItem('token')
    location.reload();
    this.router.navigate(['/home'])
    this.username =undefined;
    this.id = undefined;
    this.currency = undefined;
    this.role = undefined;
  }
  getUserData(){
    return(this.username,this.id,this.currency,this.role);
  }
  adminRole(){
    if(this.role=='admin'){return true;}
    return false;
  }
}
