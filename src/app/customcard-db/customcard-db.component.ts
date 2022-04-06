import { Component, DebugElement, OnInit } from '@angular/core';
import { CustomcardsService,Card } from '../customcards.service';

@Component({
  selector: 'app-customcard-db',
  templateUrl: './customcard-db.component.html',
  styleUrls: ['./customcard-db.component.css']
})
export class CustomcardDbComponent implements OnInit {
  cards!: Card[];
  currentPage = 1;
  currentCards!:Card[];

  card: Card | undefined;
  constructor(private customcardsService:CustomcardsService) { }

  filters = {
    'name':'',
    'desc':'',
    'creator':'',
    'attribute':'',
    'initial':'',
    'cardtype':'',
    'monstertype':'',
    'levellow':'',
    'levelhigh':'',
    'atklow':'',
    'atkhigh':'',
    'deflow':'',
    'defhigh':'',

  }



  ngOnInit(): void {
    this.customcardsService.getCustomCards().subscribe(
      res => {
        if(res){}
        this.cards = res;
        this.getCardNumbers(this.currentPage);
      }


    )
  }

  submitSearch(){
    console.log(this.filters)
    this.cards = [] 
    // this.customcardsService.getFilteredCards2().subscribe(
    //   res=>{
        
    //     console.log(res)
    //     this.cards = res;
    //     this.currentPage = 1
    //     this.getCardNumbers(this.currentPage);
    //   },
    //   err=>{console.log(err)}
    // )                                  

    this.customcardsService.getFilteredCards(this.filters).subscribe(
      res=>{
        
        console.log(res)
        this.cards = res;
        this.currentPage = 1
        this.getCardNumbers(this.currentPage);
      },
      err=>{console.log(err)}
    )

  }
  getCardNumbers(page:number){
    this.currentCards = [];
    const cardmin = (page-1)*20;
    const cardmax = (page * 20) - 1;

    for (let i = cardmin; i <= cardmax; i++) {
      console.log(cardmin,' ',cardmax);
      this.currentCards.push(this.cards[i]);
    }



  }

  nextPage(){
    this.currentPage +=1;
    this.getCardNumbers(this.currentPage);
  }

  prevPage(){
    this.currentPage -=1;
    this.getCardNumbers(this.currentPage);
  }


  showDetails(id:string){
    this.card = this.cards.find(x => x.id == id);
    console.log(this.card)
    
}


}
