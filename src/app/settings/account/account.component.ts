import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Card, CustomcardsService } from '../../customcards.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  creator!:string;
  creatorid!:string;
  email!:string;

  submitVerified = false;
  submitted = false;
  submitfail: boolean = false;
  done: boolean = false;

  accountInfo = new FormGroup({
    email: new FormControl(undefined,[
      Validators.required,
      Validators.minLength(5)]),
    newpassword:new FormControl(undefined,[
      Validators.required,
      Validators.minLength(5)]),
    password: new FormControl(undefined,[
      Validators.required,
      Validators.minLength(8)
    ])
  })
  get f(){return this.accountInfo.controls;}



  constructor(public _authService:AuthService, public customcardsService:CustomcardsService, public _router:Router) { }

  ngOnInit(): void {

    this._authService.getUser().subscribe(
      res =>{
        console.log(res)
        this.creator = res['username']
        this.creatorid = res['id']
        this.email = res['email']
        this.accountInfo.controls['email'].setValue(this.email)
        
      },
      err => {
        console.log(err)
        this.creator = ''
        this.creatorid = ''

      }
    )



  }

  changeInfo(){
    this.submitted = true;
    if(this.accountInfo.invalid){
      this.submitfail=true;
      return;
    }
    else{
      const userData = {
        "user":this.creatorid,
        "email":this.email,
        "newemail":this.accountInfo.controls['email'].value,
        "password":this.accountInfo.controls['password'].value,
        "newpassword":this.accountInfo.controls['newpassword'].value
      }

      this._authService.changeInfo(userData)
        .subscribe(
          res =>{
            localStorage.setItem('token',res['token'])
            this._router.navigate(['/home']).then(() => {
              window.location.reload();
            });
            //this._auth.
            //https://www.youtube.com/watch?v=qML_nlIEnRQ&list=PLC3y8-rFHvwg2RBz6UplKTGIXREj9dV0G&index=23
          },
          err => console.log(err)
        )
    }
  }

}
