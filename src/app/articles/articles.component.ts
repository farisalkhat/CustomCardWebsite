import { Component, OnInit } from '@angular/core';
import { Article, CustomcardsService } from '../customcards.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(public _customCardsService:CustomcardsService, public datepipe:DatePipe) { }

  articles!:Article[];


  ngOnInit(): void {
    this._customCardsService.getArticles().subscribe(
      res=>{this.articles=res
        for(const article in this.articles){
          if(this.articles[article].creation_time!=null){
            this.datepipe.transform(this.articles[article].creation_time,'MMM d, y')
            console.log(this.articles[article].creation_time)
            // this.articles[article].creation_time = this.datepipe.transform(this.articles[article].creation_time,'MMM d, y')
          }

          if(this.articles[article].modification_time!=null){
            this.datepipe.transform(this.articles[article].modification_time,'MMM d, y')
          }


        }},
      err=>{}
    )

  }

}
