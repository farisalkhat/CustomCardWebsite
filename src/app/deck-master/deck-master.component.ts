import { Component, OnInit } from '@angular/core';
import { CustomcardsService,Card } from '../customcards.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-deck-master',
  templateUrl: './deck-master.component.html',
  styleUrls: ['./deck-master.component.css'],
  animations: [
    trigger("cardFlip", [
      state(
        "default",
        style({
          transform: "none"
        })
      ),
      state(
        "flipped",
        style({
          transform: "rotateY(180deg)"
        })
      ),
      transition("default => flipped", [animate("400ms")]),
      transition("flipped => default", [animate("0ms")]),
    ])
  ]
})
export class DeckMasterComponent implements OnInit {

  constructor(public customcardsService:CustomcardsService) { }

  cards:Card[]=[]
  state:string='default'
  randomCards:Card[]=[]
  DMCount = 0 

  ngOnInit(): void {
    this.customcardsService.getDeckMasters().subscribe(
      res => {
        if(res){}
        this.cards = res;
        console.log(this.cards)
        this.shuffleCards()
      }
    )
    
  }


  shuffleCards(){
    if (this.state === "flipped") {
        this.state = "default";
      }
    let cardCounter=0;
    this.randomCards=[]
    while(cardCounter!=3){

      const randID = this.randomIntFromInterval(0,this.cards.length-1)
      let newCard = this.cards[randID]
      console.log(newCard)

      while(this.randomCards.findIndex(obj => obj.id === newCard?.id)>-1){
        const randID = this.randomIntFromInterval(0,this.cards.length-1)
        newCard = this.cards[randID]
      }

      this.randomCards.push(newCard)
      cardCounter++;
    }
  }

  rotate(){
    if (this.state === "default") {
        this.state = "flipped";
      } else {
        this.state = "default";
      }
  }

    randomIntFromInterval(min:number, max:number) { // min and max included 
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  


    goToLink(url: string){
      const newurl = 'https://www.duelingbook.com/card?id='+url
      window.open(newurl, "_blank");
  }

}
