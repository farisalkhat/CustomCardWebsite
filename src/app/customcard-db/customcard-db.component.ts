import { Component, DebugElement, OnInit } from '@angular/core';
import { CustomcardsService,Card } from '../customcards.service';

@Component({
  selector: 'app-customcard-db',
  templateUrl: './customcard-db.component.html',
  styleUrls: ['./customcard-db.component.css']
})
export class CustomcardDbComponent implements OnInit {
  cards!: Card[];
  card: Card | undefined;
  constructor(private customcardsService:CustomcardsService) { }

  ngOnInit(): void {
    this.customcardsService.getCustomCards().subscribe(
      res => {
        if(res){}
        this.cards = res;
      console.log(this.card?.level)}


    )
  }

  showDetails(id:string){
    this.card = this.cards.find(x => x.id == id);
    console.log(this.card)
    
}


}
