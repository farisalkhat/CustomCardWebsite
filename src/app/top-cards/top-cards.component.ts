import { Component, OnInit } from '@angular/core';
import { Card, CustomcardsService, HoveredCardDetails } from '../customcards.service';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html',
  styleUrls: ['./top-cards.component.css']
})
export class TopCardsComponent implements OnInit {

  constructor(private customcardService: CustomcardsService) { }

  top_cards: any[] = []
  ngOnInit(): void {
    const current = new Date();
    this.timestamp = current.getTime();
    this.customcardService.getTopCards().subscribe(res=>{
      this.top_cards = res
    })
  }

  mouseHovering(card: Card, e: MouseEvent) {
    const final = {} as HoveredCardDetails;
    if (e.clientX >= 900) { final.leftPosition = e.clientX - 200; }
    else { final.leftPosition = e.clientX + 2; }
    final.rightPosition = e.clientY - 170;
    final.card = card;
    final.isHovering = true;
    this.customcardService.HoveredCard(final);
  }
  mouseLeft() {
    this.customcardService.DisableHoveredCard();
  }
  timestamp: number = 0;
  getTimeStamp(){
    return this.timestamp;
  }

}
