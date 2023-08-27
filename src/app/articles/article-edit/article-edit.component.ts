import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Article, ArticleSubmit, ArticleUpdate, CustomcardsService } from 'src/app/customcards.service';
import { toHTML,toDoc } from 'ngx-editor';
@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit, OnDestroy {

  constructor( public route:ActivatedRoute, public _ccService:CustomcardsService, public _authService:AuthService,public router:Router) { }

  article!:Article;
  articleid!:number;

  initialBody!:any;

  htmlContent!:any;
  username:string | undefined;
  id!:number;
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
    header_img: new FormControl(undefined,[
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

          this.route.paramMap.subscribe((paramMap)=>{
            this.articleid = Number(paramMap.get('articleid'));
            this._ccService.getArticle(this.articleid).subscribe(
              (data:any)=>{
                this.article = data;
                if(this.article['author']!=this.id){
                  this.router.navigate(['/home']);
                }
                this.initialBody=this.article['body']
                this.editor.setContent(this.initialBody);

                this.articleInfo.setValue({
                  title:this.article['title'],
                  about:this.article['header'],
                  header_img:this.article['header_img'],
                  editorContent:this.initialBody
                });


              } 
            )
          })

        },
        err => {console.log(err)

        this.router.navigate(['/home'])
      }
      )

    }
    else{

      this.router.navigate(['/home'])
    }




  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }


  submitArticle(){
    const final = {} as ArticleUpdate
    this.theInnerHTML =  this.articleInfo.controls['editorContent'].value;
    console.log(this.theInnerHTML)

    final.article_id=this.articleid;
    final.author= this.id;
    final.header_img = this.articleInfo.controls['header_img'].value;
    final.title = this.articleInfo.controls['title'].value;
    final.header = this.articleInfo.controls['about'].value;
    final.article = this.theInnerHTML;
    this._ccService.updateArticle(final).subscribe(
      res=>{
        console.log(res);
        let navigation = '/articles/'+ this.articleid.toString()
        this.router.navigate([navigation])},
      err=>{}
    )
  }

}
