import { Component, Input, OnInit } from '@angular/core';
import { BinderCard } from 'src/app/customcards.service';

@Component({
  selector: 'app-dusting-collection',
  templateUrl: './dusting-collection.component.html',
  styleUrls: ['./dusting-collection.component.css']
})
export class DustingCollectionComponent implements OnInit {

  @Input() originalCards: BinderCard[] = []
  dustableCards: BinderCard[] = []
  calculating:boolean = false;
  dustValue:number = 0;
  constructor() { }

  ngOnInit(): void {
    this.showcards();
  }

  showcards(){
    console.log(this.originalCards);
    this.gatherDust();
  }


  gatherDust(){
    this.calculating=true;
    this.dustableCards=this.originalCards.filter((card)=>card.copies>3)

    let dustValue = 0;
    for(let cardIndex in this.dustableCards){
      let card = this.dustableCards[cardIndex]
      let x = card.copies;
      while(x>3){
        switch(card.rarity){
          case "common":
            dustValue+=4;
            break;
          case "rare":
            dustValue+=10;
            break;
          case "super":
            dustValue+=4;
            break;
          case "ultra":
            dustValue+=4;
            break;
          case "secret":
            dustValue+=4;
            break;
          
          default:
            break;

        }
        x--
      }

    }
    this.dustValue = dustValue;
    console.log("Total Dust Value: "+ dustValue);
    console.log(this.dustableCards)
  }

  dustCards(){}
}
