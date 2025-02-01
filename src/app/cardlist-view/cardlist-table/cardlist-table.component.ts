import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/customcards.service';

@Component({
  selector: 'app-cardlist-table',
  templateUrl: './cardlist-table.component.html',
  styleUrls: ['./cardlist-table.component.css']
})
export class CardlistTableComponent implements OnInit {
  @Input() cardlist: any[]=[]
  constructor(private _router:Router) { }
  effectCards!:Card[];
  xyzCards!:Card[];
  fusionCards!:Card[];
  ritualCards!:Card[];
  synchroCards!:Card[];
  spellCards!:Card[];
  trapCards!:Card[];
  ngOnInit(): void {
    this.FilterCards();
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

  FilterCards(){
    this.effectCards = this.cardlist.filter((card)=>card.cardtype.includes('Effect'));
    this.xyzCards = this.cardlist.filter((card)=>card.cardtype.includes('Xyz'));
    this.ritualCards = this.cardlist.filter((card)=>card.cardtype.includes('Ritual Monster'));
    this.synchroCards = this.cardlist.filter((card)=>card.cardtype.includes('Synchro'));
    this.fusionCards = this.cardlist.filter((card)=>card.cardtype.includes('Fusion'));
    this.spellCards = this.cardlist.filter((card)=>card.cardtype.includes('Spell'));
    this.trapCards = this.cardlist.filter((card)=>card.cardtype.includes('Trap'));
    this.SortCards()

  }
  SortCards(){
    this.xyzCards.sort((a, b) => a.type.localeCompare(b.type)  || a.attribute.localeCompare(b.attribute)|| a.name.localeCompare(b.name))
    this.spellCards.sort((a, b) => a.cardtype.localeCompare(b.cardtype)  || a.name.localeCompare(b.name))
    this.effectCards.sort((a, b) => a.type.localeCompare(b.type)  || a.attribute.localeCompare(b.attribute)|| a.name.localeCompare(b.name))
    
    this.ritualCards.sort((a, b) => a.type.localeCompare(b.type)  || a.attribute.localeCompare(b.attribute)|| a.name.localeCompare(b.name))
    this.synchroCards.sort((a, b) => a.type.localeCompare(b.type)  || a.attribute.localeCompare(b.attribute)|| a.name.localeCompare(b.name))
    this.fusionCards.sort((a, b) => a.type.localeCompare(b.type)  || a.attribute.localeCompare(b.attribute)|| a.name.localeCompare(b.name))
    
    this.trapCards.sort((a, b) => a.cardtype.localeCompare(b.cardtype)  || a.name.localeCompare(b.name))
  }
}
