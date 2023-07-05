import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { Card, CustomcardsService } from '../customcards.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {


  
  page="Profile"

  creator!:string;
  creatorid!:string;




  aboutMe= new FormGroup({
    about: new FormControl(' ',[
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(500)

    ]),
  })

  submitVerified = false;
  submitted = false;
  submitfail: boolean = false;
  done: boolean = false;
  get f(){return this.aboutMe.controls;}

  constructor(public _authService:AuthService, public customcardsService:CustomcardsService, public _router:Router) { }

  ngOnInit(): void {
    this.page="Profile"

    this._authService.getUser().subscribe(
      res =>{
        console.log(res['username'])
        this.creator = res['username']
        this.creatorid = res['id']

        
      },
      err => {
        console.log(err)
        this.creator = ''
        this.creatorid = ''

      }
    )



  }

  setPage(page:string){
    this.page=page;
    console.log(this.page)
  }
  

}
