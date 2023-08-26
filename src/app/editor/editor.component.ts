import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { AuthService } from '../auth/services/auth.service';
import { CustomcardsService } from '../customcards.service';
import { toHTML } from 'ngx-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit, OnDestroy {
  htmlContent!:any;
  username:string | undefined;
  id:number | undefined
  currency!:number;
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  html!: 'asdasd';
  articleInfo = new FormGroup({
    title: new FormControl(undefined,[
      Validators.required,
      Validators.minLength(5)]),
    about: new FormControl(undefined,[
      Validators.required
    ]),
    editorContent: new FormControl(null, [Validators.required]),
  }) 
  theInnerHTML!:any;
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
    this.theInnerHTML =  toHTML(this.articleInfo.controls['editorContent'].value);
  }

  constructor(public _ccService:CustomcardsService, public _authService:AuthService,public router:Router) { }
}
