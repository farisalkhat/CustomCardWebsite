import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _auth:AuthService, private _router:Router){}


  loginInfo = new FormGroup({
    email: new FormControl(undefined,[
      Validators.required,
      Validators.minLength(5)]),
    password: new FormControl(undefined,[
      Validators.required
    ])
  })


  submitVerified = false;
  submitted = false;
  submitfail: boolean = false;

  get f(){return this.loginInfo.controls;}

  ngOnInit(): void {
  }

  loginUser(){
    this.submitted=true;
    if(this.loginInfo.invalid){
      this.submitfail=true;
      return;
    }
    else{


      const userData = {
        "email": this.loginInfo.controls['email'].value,
        "password":this.loginInfo.controls['password'].value
      }


      this._auth.loginUser(userData)
        .subscribe(
          res => {

          localStorage.setItem('token',res['token'])
          this._router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        },
          err => console.log(err)
        )
      
    }
  }
}
