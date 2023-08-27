import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Article, CustomcardsService } from 'src/app/customcards.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  constructor(public router:Router, public route:ActivatedRoute, public _customCardsService: CustomcardsService, private _authService:AuthService) { }
  article!:Article;
  articleid!:number;

  username:string | undefined;
  id:number | undefined
  currency!:number;

  ngOnInit(): void {
    if (this._authService.loggedIn()){

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
      }
      )

    }
    else{
      this.username = undefined
      this.id = undefined
      
    }
    console.log(this.id)
    this.route.paramMap.subscribe((paramMap)=>{
      this.articleid = Number(paramMap.get('articleid'));
      this._customCardsService.getArticle(this.articleid).subscribe(
        (data:any)=>{
          this.article = data;
          console.log(this.article);
        } 
      )
    })
  }


  confirmDelete(){
    if(this._authService.adminRole() && this.id == this.article['author']){


            let text = "Are you sure you want to delete this article?";
            if (confirm(text) == true) {
    
                this._customCardsService.deleteArticle(this.article).subscribe(
                    res=>{this.router.navigate(['/articles']);},
                    err=>{},
                )
                this.router.navigate(['/articles']);
            } else {
                text = "You canceled!";
            }
        
    }
}
  edit(){

  }
}
