import { Component, OnInit } from '@angular/core';
import { Card, CustomcardsService } from 'src/app/customcards.service';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-draftmode',
  templateUrl: './draftmode.component.html',
  styleUrls: ['./draftmode.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
        state('default', style({ transform: 'rotate(0)' })),
        state('rotated', style({ transform: 'rotate(-180deg)' })),
        transition('rotated => default', animate('400ms ease-out')),
        transition('default => rotated', animate('400ms ease-in'))
  ])]

})
export class DraftmodeComponent implements OnInit {

  state: string = 'default';
  cards!: Card[];
  card: Card | undefined;

  p1CardList: Card[] = new Array();
  p2CardList: Card[] = new Array();

  p1SelectableCards: Card[] = new Array();
  p2SelectableCards: Card[] = new Array();

  CurrentTurn = 1;
  TurnPlayer = 1;


  cardsRevealed:boolean=false;



  constructor(private customcardsService:CustomcardsService) { }

  ngOnInit(): void {
    this.customcardsService.getCustomCards().subscribe(
      res => {
        if(res){}
        this.cards = res;
        this.shuffleCards()
    
        
    
    }
      


    )
  }

    showDetails(card:Card){
      this.card = card
    }



     randomIntFromInterval(min:number, max:number) { // min and max included 
      return Math.floor(Math.random() * (max - min + 1) + min)
    }

    revealCards(){
      this.state = (this.state === 'default' ? 'rotated' : 'default');
      this.cardsRevealed = true
    }

    selectCard(){
      if(this.card!=undefined){
          if(this.TurnPlayer==1){
            this.p1CardList.push(this.card)
          }  
          else{
            this.p2CardList.push(this.card)
          }
          this.removeCardFromList(this.card.id)
          this.card= undefined
      }
      

    }

    removeCardFromList(id:string){
      if(this.TurnPlayer==1){
        this.p1SelectableCards = this.p1SelectableCards.filter((item) => item.id != id)
        if(this.p1SelectableCards.length==0){
          this.shuffleCards();
        }
      }
      // else{
      //   this.p2SelectableCards.forEach((element,index)=>{
      //     if(element.id==this.card?.id) this.cards.splice(index,1);
      //  });
      // }

  

    }

    shuffleCards(){
      let cardCounter = 0
      console.log(this.cards.length)
      while(cardCounter<3){

        const randID = this.randomIntFromInterval(0,this.cards.length-1)
        console.log(randID)
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

