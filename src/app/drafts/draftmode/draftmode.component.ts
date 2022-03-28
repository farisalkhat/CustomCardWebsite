import { Component, OnInit } from '@angular/core';
import { Card, CustomcardsService } from 'src/app/customcards.service';

@Component({
  selector: 'app-draftmode',
  templateUrl: './draftmode.component.html',
  styleUrls: ['./draftmode.component.css']
})
export class DraftmodeComponent implements OnInit {

  cards!: Card[];
  card: Card | undefined;

  p1CardList!: Card[];
  p2CardList!: Card[];

  p1SelectableCards: Card[] = new Array();
  p2SelectableCards: Card[] = new Array();

  CurrentTurn = 1;
  TurnPlayer = 1;




  constructor(private customcardsService:CustomcardsService) { }

  ngOnInit(): void {
    this.customcardsService.getCustomCards().subscribe(
      res => {
        if(res){}
        this.cards = res;
        console.log(this.cards)
        this.shuffleCards()
    
        
    
    }
      


    )
  }

    showDetails(card:Card){
      this.card = card
      console.log(this.card)
    }

    getRandomInt(max:number) {
      return Math.floor(Math.random() *max);
    }

    shuffleCards(){
      let cardCounter = 0
      while(cardCounter<8){
        const randID = this.getRandomInt(this.cards.length)-1
        const newCard = this.cards[randID]
        this.p1SelectableCards.push(newCard)
        this.cards.splice(randID,1)
        cardCounter++;
      }
  
      // cardCounter= 0 
      // while(cardCounter<8){
      //   const randID = this.getRandomInt(this.cards.length)-1
      //   const newCard = this.cards[randID]
      //   this.p2SelectableCards.push(newCard)
      //   this.cards.splice(randID,1)
      //   cardCounter++;
      // }
  
      console.log(this.p1SelectableCards)
    }


}

