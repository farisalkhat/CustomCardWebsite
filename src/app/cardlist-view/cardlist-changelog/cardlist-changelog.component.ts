import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardlist-changelog',
  templateUrl: './cardlist-changelog.component.html',
  styleUrls: ['./cardlist-changelog.component.css']
})
export class CardlistChangelogComponent implements OnInit {
getModificationKeys(): any {
  return Object.keys(this.sorted_modifications);
  throw new Error('Method not implemented.');
}
  @Input() cardlist: any[]=[]
  @Input() modifications: any[]=[]

  sorted_modifications: { [key: string]: any[] } = {}
  constructor(private _router:Router,public datepipe:DatePipe) { }

  ngOnInit(): void {

    for(let card of this.modifications){
        card.modificationdate = this.datepipe.transform(card.modificationdate,'MMM d, y')
        
      }

    for (let card of this.modifications){
      if(card){
        if(card.modificationdate in this.sorted_modifications){
          this.sorted_modifications[card.modificationdate].push(card)
        }
        else{
          this.sorted_modifications[card.modificationdate] = [card]
        }
      }

    }
    console.log(this.sorted_modifications)


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
