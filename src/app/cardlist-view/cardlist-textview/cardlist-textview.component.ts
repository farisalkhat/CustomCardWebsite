import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardlist-textview',
  templateUrl: './cardlist-textview.component.html',
  styleUrls: ['./cardlist-textview.component.css']
})
export class CardlistTextviewComponent implements OnInit {
  @Input() cardlist: any[]=[]
  constructor(private _router:Router) { }

  ngOnInit(): void {
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
}
