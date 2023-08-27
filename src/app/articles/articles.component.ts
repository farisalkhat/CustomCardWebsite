import { Component, OnInit } from '@angular/core';
import { Article, CustomcardsService } from '../customcards.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(public _customCardsService:CustomcardsService) { }

  articles!:Article[];


  ngOnInit(): void {
    this._customCardsService.getArticles().subscribe(
      res=>{this.articles=res
      console.log(this.articles)},
      err=>{}
    )

  }

}
