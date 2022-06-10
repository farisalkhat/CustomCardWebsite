import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _auth:AuthService, private _router:Router){}

  registerInfo = new FormGroup({
    email: new FormControl(undefined,[
      Validators.required,
      Validators.minLength(5)]),
    username:new FormControl(undefined,[
      Validators.required,
      Validators.minLength(5)]),
    password: new FormControl(undefined,[
      Validators.required,
      Validators.minLength(8)
    ])
  })


  submitVerified = false;
  submitted = false;
  submitfail: boolean = false;

  get f(){return this.registerInfo.controls;}

  ngOnInit(): void {
  }

  registerUser(){
    this.submitted=true;
    if(this.registerInfo.invalid){
      this.submitfail=true;
      return;
    }
    else{
      console.log(this.registerInfo.controls['username'].value);
      console.log(this.registerInfo.controls['email'].value);
      console.log(this.registerInfo.controls['password'].value);

      const userData = {
        "username": this.registerInfo.controls['username'].value,
        "email":this.registerInfo.controls['email'].value,
        "password":this.registerInfo.controls['password'].value
      }

      this._auth.registerUser(userData)
        .subscribe(
          res =>{
            console.log(res['token'])
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
