import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Card, CustomcardsService, Draft } from 'src/app/customcards.service';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import * as FileSaver from 'file-saver';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-deck-editor',
  templateUrl: './deck-editor.component.html',
  styleUrls: ['./deck-editor.component.css']
})
export class DeckEditorComponent implements OnInit {
  xml_file: string = "";
  cards!: Card[];
  currentPage = 1;
  currentCards!:Card[];
  currentID!:string;


  draftName!:string;


  currentDraft: Card[] = [];

  mainDeck:Card[]=[];
  extraDeck:Card[]=[];
  sideDeck:Card[]=[];

  monsterCounter = 0;
  spellCounter = 0;
  trapCounter =0;
  edCounter = 0;
  sideCounter = 0;


  uploadCorrectly: boolean = true;


  draftCard!:Card ;


  draftData= new FormGroup({
    draftTitle: new FormControl(' ',[
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100)

    ])
  })


  submitVerified = false;
  submitted = false;
  submitfail: boolean = false;

  get f(){return this.draftData.controls;}


  constructor(public _authService:AuthService,private customcardsService:CustomcardsService,private _router:Router) { }

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
    'tag':'',
    'sort':'c.name ASC',

  }

  card!: Card;
  monster!:string;
  attribute!:string;
  stType!:string;
  mType!:string;



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
    this.attribute ='';
    this.stType=''
    this.mType='';
    this.monster='None';
    // this.customcardsService.getFilteredCards2().subscribe(
    //   res=>{
        
    //     console.log(res)
    //     this.cards = res;
    //     this.currentPage = 1
    //     this.getCardNumbers(this.currentPage);
    //   },
    //   err=>{console.log(err)}
    // )                                  
    if(this.filters['initial']==''){
        this.filters['cardtype']=='';
        this.filters['defhigh']=='';
        this.filters['deflow']=='';
        this.filters['levelhigh']=='';
        this.filters['levellow']=='';
        this.filters['monstertype']=='';
        this.filters['atkhigh']=='';
        this.filters['atklow']=='';
      }
      if(this.filters['initial']!='Monster'){
        if(this.filters['sort']=='c.level ASC' || this.filters['sort']=='c.level DESC' || 
        this.filters['sort']=='c.ATK ASC' || this.filters['sort']=='c.ATK DESC' || 
        this.filters['sort']=='c.DEF ASC' || this.filters['sort']=='c.DEF DESC'){
          this.filters['sort'] = 'c.name ASC';
        }
      }

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
    const cardmin = (page-1)*21;
    const cardmax = (page * 21) - 1;

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

  goToLink(url: string){
    const newurl = 'https://www.duelingbook.com/card?id='+url
    window.open(newurl, "_blank");
}


  showDetails(card:Card){
    this.card = card;
    console.log(this.card)
    this.attribute=''
    this.stType =''
    this.mType= ''

    if(this.card?.cardtype=="Normal Trap" || this.card?.cardtype=="Counter Trap" || this.card?.cardtype=="Continuous Trap"){
      this.monster='False';
      this.attribute="assets/cardstats/TRAP.png";
      
      switch (this.card?.cardtype) {
        case "Normal Trap":
            this.stType = "assets/cardstats/Normal.png";
            break;
        case "Continuous Trap":
            this.stType = "assets/cardstats/Continuous.png";
            break;
        case "Counter Trap":
            this.stType = "assets/cardstats/Counter.png";
            break;
        default:
            this.stType
            break;
    }
    }

    else if(this.card?.cardtype=="Normal Spell" || this.card?.cardtype=="Quick Spell" || this.card?.cardtype=="Continuous Spell" ||
    this.card?.cardtype=="Ritual Spell" || this.card?.cardtype=="Field Spell" || this.card?.cardtype=="Equip Spell" ){
      this.monster='False';
      this.attribute="assets/cardstats/SPELL.png";
      
      switch (this.card?.cardtype) {
        case "Normal Spell":
            this.stType = "assets/cardstats/Normal.png";
            break;
        case "Quick Spell":
            this.stType = "assets/cardstats/Quick.png";
            break;
        case "Field Spell":
            this.stType = "assets/cardstats/Field.png";
            break;
        case "Continuous Spell":
            this.stType = "assets/cardstats/Continuous.png";
            break;
        case "Equip Spell":
            this.stType = "assets/cardstats/Equip.png";
            break;
        case "Ritual Spell":
            this.stType = "assets/cardstats/Ritual.png";
            break;
        default:
            this.stType
            break;
    }
    }


    
    else{
      this.monster='True';
      switch(this.card?.attribute){
        case "FIRE":
            this.attribute = "assets/cardstats/FIRE.png";
            break;
        case "DARK":
            this.attribute = "assets/cardstats/DARK.png";
            break;
        case "WIND":
            this.attribute = "assets/cardstats/WIND.png";
            break;
        case "WATER":
            this.attribute = "assets/cardstats/WATER.png";
            break;
        case "LIGHT":
            this.attribute = "assets/cardstats/LIGHT.png";
            break;
        case "DIVINE":
            this.attribute = "assets/cardstats/DIVINE.png";
            break;
        case "EARTH":
            this.attribute = "assets/cardstats/EARTH.png";
            break;
        default:
            this.attribute = "assets/cardstats/EARTH.png";
            break;
        
      
      }

      switch (this.card?.type) {
        case "Aqua":
            this.mType = "assets/monstertypes/Aqua.png";
            break;
        case "Beast-Warrior":
            this.mType = "assets/monstertypes/Beast-Warrior.png";
            break;
        case "Beast":
            this.mType = "assets/monstertypes/Beast.png";
            break;
        case "Dinosaur":
            this.mType = "assets/monstertypes/Dinosaur.png";
            break;
        case "Divine-Beast":
            this.mType = "assets/monstertypes/Divine-Beast.png";
            break;
        case "Dragon":
            this.mType = "assets/monstertypes/Dragon.png";
            break;

        case "Fairy":
            this.mType = "assets/monstertypes/Fairy.png";
            break;
        case "Fiend":
            this.mType = "assets/monstertypes/Fiend.png";
            break;
        case "Fish":
            this.mType = "assets/monstertypes/Fish.png";
            break;
        case "Insect":
            this.mType = "assets/monstertypes/Insect.png";
            break;
        case "Machine":
            this.mType = "assets/monstertypes/Machine.png";
            break;
        case "Plant":
            this.mType = "assets/monstertypes/Plant.png";
            break;

        case "Psychic":
            this.mType = "assets/monstertypes/Psychic.png";
            break;
        case "Pyro":
            this.mType = "assets/monstertypes/Pyro.png";
            break;
        case "Reptile":
            this.mType = "assets/monstertypes/Reptile.png";
            break;
        case "Rock":
            this.mType = "assets/monstertypes/Rock.png";
            break;
        case "Sea Serpent":
            this.mType = "assets/monstertypes/Serpent.png";
            break;
        case "Spellcaster":
            this.mType = "assets/monstertypes/Spellcaster.png";
            break;

        case "Thunder":
            this.mType = "assets/monstertypes/Thunder.png";
            break;
        case "Warrior":
            this.mType = "assets/monstertypes/Warrior.png";
            break;
        case "Winged-Beast":
            this.mType = "assets/monstertypes/Winged-Beast.png";
            break;
        case "Zombie":
            this.mType = "assets/monstertypes/Zombie.png";
            break;
        
        default:
            this.mType = "assets/monstertypes/Zombie.png";
            break;
    }




    }
    
}
  
  addCard(card:Card){
    if(card!=undefined){
      if((card.cardtype=="Fusion Monster" || card.cardtype=="Xyz Monster") && this.extraDeck.length!=15){
        var duplicates= 0;
        for(const cardFrom of this.extraDeck){
          if(card.name== cardFrom.name){
            duplicates+=1;
            if(duplicates==3){
              return;
            } 
          }
        }
        this.extraDeck.push(card)
        this.edCounter++;
      }
      else if(this.mainDeck.length!=60){

        var duplicates= 0;
        for(const cardFrom of this.mainDeck){
          if(card.name== cardFrom.name){
            duplicates+=1;
            if(duplicates==3){
              return;
            } 
          }
        }
        this.mainDeck.push(card);
        if(card.cardtype.includes("Spell")){
          this.spellCounter++;
        }
        if(card.cardtype.includes("Monster")){
          this.monsterCounter++;
        }
        if(card.cardtype.includes("Trap")){
          this.trapCounter++;
        }
        
      }

    }
    
  }


  addSideCard(card:Card){
    if(card!=undefined){
      if(card.cardtype=="Fusion Monster" || card.cardtype=="Xyz Monster"){
        var duplicates= 0;
        for(const cardFrom of this.extraDeck){
          if(card.name== cardFrom.name){
            duplicates+=1;
            if(duplicates==3){
              return;
            } 
          }
        }
      }
      else{

        var duplicates= 0;
        for(const cardFrom of this.mainDeck){
          if(card.name== cardFrom.name){
            duplicates+=1;
            if(duplicates==3){
              return;
            } 
          }
        }
        for(const cardFrom of this.sideDeck){
          if(card.name== cardFrom.name){
            duplicates+=1;
            if(duplicates==3){
              return;
            } 
          }
        }
        this.sideDeck.push(card);
        this.sideCounter++;
        
      }

    }
  }

  selectDraftCard(card:Card){
    // this.draftCard = this.currentDraft.find(x => x.id == id);
    this.draftCard = card;
    
  }




  rightAddDraftCard($event: { preventDefault: () => void; },card:Card){
    
    $event.preventDefault();
    console.log(card.name);
    this.addCard(card);

  }
  leftAddDraftCard(){
    console.log(this.card);
    this.addCard(this.card);
  }

  leftAddSideCard(){
    console.log(this.card);
    this.addSideCard(this.card);
  }


  rightDeleteDraftCard($event: { preventDefault: () => void; },card:Card){
    $event.preventDefault();
    this.deleteDraftCard(card);

  }


  rightDeleteSideCard($event: { preventDefault: () => void; },card:Card){
    $event.preventDefault();
    const index = this.sideDeck.findIndex(obj => obj.id === card?.id)
    if (index > -1) {
      this.sideDeck.splice(index, 1);
      this.sideCounter--;
    }


  }

  deleteDraftCard(card:Card){
    console.log("in deleteDraftCard!")
    if(card!=undefined){

      if(card.cardtype=="Fusion Monster" || card.cardtype=="Xyz Monster"){
        const index = this.extraDeck.findIndex(obj => obj.id === card?.id)
        if (index > -1) {
          this.extraDeck.splice(index, 1);
          this.edCounter--;
        }
      }
      else{
        console.log("Trying to delete!")
        const index = this.mainDeck.findIndex(obj => obj.id === card?.id)
        if (index > -1) {
          this.mainDeck.splice(index, 1);
        }
        if(card.cardtype.includes("Spell")){
          this.spellCounter--;
        }
        if(card.cardtype.includes("Monster")){
          this.monsterCounter--;
        }
        if(card.cardtype.includes("Trap")){
          this.trapCounter--;
        }

      }

      


      // var draftCardID: number = +this.draftCard.id;
      // this.currentDraft.splice(draftCardID,1);
      
    }
  }



  uploadList(){
    if(this.mainDeck.length!=60){
      this.uploadCorrectly = false;
      return;
    }
    this.uploadCorrectly = true;
  }

  exportList(){

    this.xml_file = '<?xml version="1.0" encoding="utf-8" ?> <deck name=".TriType"><main>';
 
   for(const card of this.mainDeck){
       this.xml_file+='<card id="' + String(card.id) +'" passcode="">'+card.name+'</card>'
   }
   this.xml_file+="</main><side>"   
   for(const card of this.sideDeck){
    this.xml_file+='<card id="' + String(card.id) +'" passcode="">'+card.name+'</card>'
   }
   this.xml_file+="</side><extra>"   
   
   for(const card of this.extraDeck){
       this.xml_file+='<card id="' + String(card.id) +'" passcode="">'+card.name+'</card>'
   }
   this.xml_file+="</extra></deck>"
   console.log(this.xml_file);
 
   let blob = new Blob([this.xml_file], {type: "text/xml"});
 
   FileSaver.saveAs(blob, "cardlist.xml");
 
 
   
   
 
 
 
   }

}
