import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Card, CustomcardsService, DeckListCard, importDecklist } from 'src/app/customcards.service';

@Component({
  selector: 'app-decklist-details',
  templateUrl: './decklist-details.component.html',
  styleUrls: ['./decklist-details.component.css']
})
export class DecklistDetailsComponent implements OnInit {

  decklist!:DeckListCard[];
  deckid!:number;
  decklistinfo!:importDecklist;
  xml_file: string = "";
  username!:string;
  id!:number;

  

  constructor(private _router:Router, private _authService:AuthService, private route: ActivatedRoute, private customcardService: CustomcardsService) { }

  ngOnInit(): void {

    if (this._authService.loggedIn()){

      this._authService.getUser().subscribe(
        res =>{
          console.log(res['username'])
          this.username = res['username']
          this.id = res['id']
        },
        err => {console.log(err)
        this.username = ''
        this.id = -99999
      }
      )

    }



    this.route.paramMap.subscribe((paramMap)=>{
      this.deckid = Number(paramMap.get('deckid'));
      this.customcardService.getDecklist(this.deckid).subscribe(
        (data:any)=>{this.decklist=data;}
      )

      this.customcardService.getDecklistInfo(this.deckid).subscribe(
        (data:any)=>{this.decklistinfo=data;
        console.log(this.decklistinfo);}
      )

    })


  }


  goToLink(url: string){
    const newurl = 'https://www.duelingbook.com/card?id='+url
    window.open(newurl, "_blank");
}

download(){

  this.xml_file = '<?xml version="1.0" encoding="utf-8" ?> <deck name=".TriType"><main>';

 for(const card of this.decklist){
    if(card.deck=='maindeck'){
      this.xml_file+='<card id="' + String(card.id) +'" passcode="">'+card.name+'</card>'
    }

     
 }
 this.xml_file+="</main><side>"   
 for(const card of this.decklist){
  if(card.deck=='sidedeck'){
    this.xml_file+='<card id="' + String(card.id) +'" passcode="">'+card.name+'</card>'
  }
  
 }
 this.xml_file+="</side><extra>"   
 
 for(const card of this.decklist){
  if(card.deck=='extradeck'){
    this.xml_file+='<card id="' + String(card.id) +'" passcode="">'+card.name+'</card>'
  }
     
 }
 this.xml_file+="</extra></deck>"
 console.log(this.xml_file);

 let blob = new Blob([this.xml_file], {type: "text/xml"});

 FileSaver.saveAs(blob, "cardlist.xml");


 
 



 }

 delete(){
  this.customcardService.deleteDecklists(this.deckid).subscribe(
    res =>{
      this._router.navigate(['/decklists']);
    },
    err => {
      console.log(err)
    }
  )
 }

}
