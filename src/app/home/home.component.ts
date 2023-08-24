import { Component, OnInit } from '@angular/core';
import { CustomcardsService,SiteData,Card, PackInfo, PackButton } from '../customcards.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sitedata!:SiteData
  cotd!:Card
  latestpack!:PackButton
  constructor(public _router:Router,public _customCardsService:CustomcardsService) { }

  ngOnInit(): void {
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


  goToLink(url: string){

    let new_url =''
  
    if(this._router['location']._platformLocation.location.origin=='http://localhost:4200'){
       new_url = this._router.serializeUrl(
        this._router.createUrlTree(['/cards/']));
    }
    else{
       new_url = this._router.serializeUrl(
      this._router.createUrlTree(['/CustomCardWebsite/cards/']));
    }
    
  
  
    window.open(new_url +'/'+url, '_blank');
  
  
    // const newurl = 'https://www.duelingbook.com/card?id='+url
    // window.open(newurl, "_blank");
  }

}
