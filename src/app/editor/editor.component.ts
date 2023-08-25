import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { AuthService } from '../auth/services/auth.service';
import { CustomcardsService } from '../customcards.service';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit, OnDestroy {
  username:string | undefined;
  id:number | undefined
  currency!:number;
  editor!: Editor;
  html!: '';
  articleInfo = new FormGroup({
    title: new FormControl(undefined,[
      Validators.required,
      Validators.minLength(5)]),
    about: new FormControl(undefined,[
      Validators.required
    ])
  }) 

  submitVerified = false;
  submitted = false;
  submitfail: boolean = false;
  get f(){return this.articleInfo.controls;}
  ngOnInit(): void {
    this.editor = new Editor();
    if (this._authService.loggedIn() && this._authService.adminRole()){

      this._authService.getUser().subscribe(
        res =>{
          console.log(res['username'])
          this.username = res['username']
          this.id = res['id']
          this.currency = res['currency']
        },
        err => {console.log(err)
        this.username = undefined
        this.id = undefined
        this.router.navigate(['/home'])
      }
      )

    }
    else{
      this.username = undefined
      this.id = undefined
      this.router.navigate(['/home'])
    }
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  submitArticle(){
    return
  }

  constructor(public _ccService:CustomcardsService, public _authService:AuthService,public router:Router) { }
}
