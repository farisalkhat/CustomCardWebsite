import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card, CustomcardsService, HoveredCardDetails } from 'src/app/customcards.service';

@Component({
  selector: 'app-cardlist-imageview',
  templateUrl: './cardlist-imageview.component.html',
  styleUrls: ['./cardlist-imageview.component.css']
})
export class CardlistImageviewComponent implements OnInit {
  @Input() cardlist: any[]=[]
  constructor(private _router: Router,private customcardsService: CustomcardsService) { }
  effectCards!:Card[];
  xyzCards!:Card[];
  fusionCards!:Card[];
  ritualCards!:Card[];
  synchroCards!:Card[];
  spellCards!:Card[];
  trapCards!:Card[];
  ngOnInit(): void {
    const current = new Date();
    this.timestamp = current.getTime();
    this.FilterCards();
  }

  mouseHovering(card: Card, e: MouseEvent) {
    const final = {} as HoveredCardDetails;
    if (e.clientX >= 900) { final.leftPosition = e.clientX - 200; }
    else { final.leftPosition = e.clientX + 2; }
    final.rightPosition = e.clientY - 170;
    final.card = card;
    final.isHovering = true;
    this.customcardsService.HoveredCard(final);
  }
  mouseLeft() {
    this.customcardsService.DisableHoveredCard();
  }

  goToLink(id: string | undefined) {
    const url = this._router.serializeUrl(
      this._router.createUrlTree([`/cards/${id}`])
    );

    window.open(url, '_blank');
  }
  timestamp: number = 0;
  getTimeStamp(){
    return this.timestamp;
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
