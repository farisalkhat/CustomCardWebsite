import { Component, OnInit } from '@angular/core';
import { Card } from '../customcards.service';

@Component({
  selector: 'app-exportxml',
  templateUrl: './exportxml.component.html',
  styleUrls: ['./exportxml.component.css']
})
export class ExportxmlComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  xml_file:string=""
  cards: Card[] = [];
shuffleStyle:string = "nothing";
  exportList(list:Card[]){
    this.cards = list;

     this.xml_file = '<?xml version="1.0" encoding="utf-8" ?> <deck name="placeholder"><main>';

    for(var i=0; i<=this.cards.length-1,i++;){
      if(this.cards[i].cardtype!="Fusion Monster"){
        this.xml_file+='<card id=' + String(this.cards[i].id) +'passcode="">'+this.cards[i].name+'</card>'
      }
    }
    this.xml_file+="</main><side></side><extra>"
    for(var i=0; i<=this.cards.length-1,i++;){
      if(this.cards[i].cardtype=="Fusion Monster"){
        this.xml_file+='<card id=' + String(this.cards[i].id) +'passcode="">'+this.cards[i].name+'</card>'
      }
    }
    this.xml_file+="</extra></deck>"
    console.log(this.xml_file);



  }



}
