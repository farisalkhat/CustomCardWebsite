import { Component, OnInit } from '@angular/core';
import { CustomcardsService,SiteData,Card, PackInfo, PackButton, Article } from '../customcards.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sitedata!:SiteData
  cotd!:Card
  latestpack!:PackButton
  cards!: Card[];
  articles:any[] = [];
  unused_articles:any[] = [];
  constructor(public datepipe:DatePipe, public _router:Router,public _customCardsService:CustomcardsService) { }

  ngOnInit(): void {
    this._customCardsService.getArticles().subscribe(
      res=>{this.unused_articles=res

        for(const article in this.unused_articles){
          if(this.unused_articles[article].creation_time!=null){
            this.datepipe.transform(this.unused_articles[article].creation_time,'MMM d, y')
            console.log(this.unused_articles[article].creation_time)
            // this.articles[article].creation_time = this.datepipe.transform(this.articles[article].creation_time,'MMM d, y')
          }

          if(this.unused_articles[article].modification_time!=null){
            this.datepipe.transform(this.unused_articles[article].modification_time,'MMM d, y')
          }


        }

        let i = 0;
        while(i!=4){
          let article = this.unused_articles.shift();
          this.articles.push(article);
          console.log(this.articles);
          i++;
        }
        console.log(this.unused_articles);




      },
      err=>{}
    )
    this._customCardsService.getRecentCards().subscribe(
      res=>{this.cards = res},
      err=>{}
    )
    this._customCardsService.getSiteData().subscribe(
      res=>{this.sitedata=res;

        this._customCardsService.getCustomCard(this.sitedata['cotd']).subscribe(
          res=>{this.cotd=res;
          console.log(this.cotd)},
          err=>{}
        )





      console.log(this.sitedata)},
      err=>{}
    )
    this._customCardsService.getLatestPack().subscribe(
      res=>{this.latestpack=res; console.log(this.latestpack)},
      err=>{}
    )
  }

  goToSealedDraft(){
    this._customCardsService.setSealedDraftMode(true)
    this._router.navigate(['/packs'])
  }
  goToLink(url: string){

    let new_url =''

    if(this._router['location']._platformLocation.location.origin=='http://localhost:4200'){
       new_url = this._router.serializeUrl(
        this._router.createUrlTree(['/cards/']));
    }
    else{
       new_url = this._router.serializeUrl(
      this._router.createUrlTree(['/cards/']));
    }



    window.open(new_url +'/'+url, '_blank');


    // const newurl = 'https://www.duelingbook.com/card?id='+url
    // window.open(newurl, "_blank");
  }


  loadMore(){
    let i = 0;
        while(i!=3){
          if(this.unused_articles.length==0){
            return;
          }
          let article = this.unused_articles.pop();
          this.articles.push(article);
          console.log(this.articles);
          i++;
        }
  }

}
