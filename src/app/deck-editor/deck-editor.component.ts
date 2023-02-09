import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Card, CustomcardsService, Draft, Decklist } from 'src/app/customcards.service';
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

  mainOrSide:string = 'Main';


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

  isHovering: boolean = false;
  hoveredCard!:Card;
  hovermonster!:string;
  hoverattribute!:string;
  hoverstType!:string;
  hovermType!:string;
  leftPosition = 100
  rightPosition = 100


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

  deckname:string = "placeholder";
  deckdescription:string = "placeholder";

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


  creator!:string;
  creatorid!:string;

  





  ngOnInit(): void {
    this.customcardsService.getCustomCards().subscribe(
      res => {
        if(res){}
        this.cards = res;
        this.getCardNumbers(this.currentPage);
      }


    )

    this._authService.getUser().subscribe(
      res =>{
        console.log(res['username'])
        this.creator = res['username']
        this.creatorid = res['id']
      },
      err => {
        console.log(err)
        this.creator = ''
        this.creatorid = ''

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
    
    if(this.filters.levelhigh==null){this.filters.levelhigh=''}
    if(this.filters.levellow==null){this.filters.levellow=''}
    if(this.filters.atklow==null){this.filters.atklow=''}
    if(this.filters.atkhigh==null){this.filters.atkhigh=''}
    if(this.filters.deflow==null){this.filters.deflow=''}
    if(this.filters.defhigh==null){this.filters.defhigh=''}

    

                              
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

      if(this.filters['initial']=='Monster'){
        if(this.filters['cardtype']!="Effect Monster" &&
        this.filters['cardtype']!="Flip Monster"&&
        this.filters['cardtype']!="Fusion Monster"&&
        this.filters['cardtype']!="Ritual Monster"&&
        this.filters['cardtype']!="Union Monster" &&
        this.filters['cardtype']!="Synchro Monster" &&
        this.filters['cardtype']!="Xyz Monster"){
          this.filters['cardtype']=''
        }
      }

      if(this.filters['initial']=='Spell'){
        if(this.filters['cardtype']!="Normal Spell" &&
        this.filters['cardtype']!="Continuous Spell"&&
        this.filters['cardtype']!="Quick Spell"&&
        this.filters['cardtype']!="Ritual Spell"&&
        this.filters['cardtype']!="Equip Spell" &&
        this.filters['cardtype']!="Field Spell"){
          this.filters['cardtype']=''
        }
      }

      if(this.filters['initial']=='Trap'){
        if(this.filters['cardtype']!="Normal Trap" &&
        this.filters['cardtype']!="Continuous Trap"&&
        this.filters['cardtype']!="Counter Trap"){
          this.filters['cardtype']=''
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
    const cardmin = (page-1)*36;
    const cardmax = (page * 36) - 1;

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

    const new_url = this._router.serializeUrl(
      this._router.createUrlTree(['/CustomCardWebsite/cards/']));

    console.log(new_url)
 
    window.open(new_url +'/'+url, '_blank');


    // const newurl = 'https://www.duelingbook.com/card?id='+url
    // window.open(newurl, "_blank");
}


addTo(type:string){
  this.mainOrSide = type;
}

mouseHovering(card:Card,e:MouseEvent) {

console.log(e.clientX);
console.log(e.clientY);

  this.isHovering = true; 
  this.hoveredCard = card 

  if(e.clientX>=900){
    this.leftPosition = e.clientX-200;
  }

  else{
    this.leftPosition = e.clientX+2;
  }
  
  this.rightPosition =e.clientY-170;
  
  
  this.getHoveredCardDetails()
  
}
mouseLeft() {
    this.isHovering = false;
}
getHoveredCardDetails(){
  
  this.hoverattribute=''
  this.hoverstType =''
  this.hovermType= ''

  if(this.hoveredCard?.cardtype=="Normal Trap" || this.hoveredCard?.cardtype=="Counter Trap" || this.hoveredCard?.cardtype=="Continuous Trap"){
    this.hovermonster='False';
    this.hoverattribute="assets/cardstats/TRAP.png";
    
    switch (this.hoveredCard?.cardtype) {
      case "Normal Trap":
          this.hoverstType = "assets/cardstats/Normal.png";
          break;
      case "Continuous Trap":
          this.hoverstType = "assets/cardstats/Continuous.png";
          break;
      case "Counter Trap":
          this.hoverstType = "assets/cardstats/Counter.png";
          break;
      default:
          this.hoverstType
          break;
  }
  }

  else if(this.hoveredCard?.cardtype=="Normal Spell" || this.hoveredCard?.cardtype=="Quick Spell" || this.hoveredCard?.cardtype=="Continuous Spell" ||
  this.hoveredCard?.cardtype=="Ritual Spell" || this.hoveredCard?.cardtype=="Field Spell" || this.hoveredCard?.cardtype=="Equip Spell" ){
    this.hovermonster='False';
    this.hoverattribute="assets/cardstats/SPELL.png";
    
    switch (this.hoveredCard?.cardtype) {
      case "Normal Spell":
          this.hoverstType = "assets/cardstats/Normal.png";
          break;
      case "Quick Spell":
          this.hoverstType = "assets/cardstats/Quick.png";
          break;
      case "Field Spell":
          this.hoverstType = "assets/cardstats/Field.png";
          break;
      case "Continuous Spell":
          this.hoverstType = "assets/cardstats/Continuous.png";
          break;
      case "Equip Spell":
          this.hoverstType = "assets/cardstats/Equip.png";
          break;
      case "Ritual Spell":
          this.hoverstType = "assets/cardstats/Ritual.png";
          break;
      default:
          this.hoverstType
          break;
  }
  }


  
  else{
    this.hovermonster='True';
    switch(this.hoveredCard?.attribute){
      case "FIRE":
          this.hoverattribute = "assets/cardstats/FIRE.png";
          break;
      case "DARK":
          this.hoverattribute = "assets/cardstats/DARK.png";
          break;
      case "WIND":
          this.hoverattribute = "assets/cardstats/WIND.png";
          break;
      case "WATER":
          this.hoverattribute = "assets/cardstats/WATER.png";
          break;
      case "LIGHT":
          this.hoverattribute = "assets/cardstats/LIGHT.png";
          break;
      case "DIVINE":
          this.hoverattribute = "assets/cardstats/DIVINE.png";
          break;
      case "EARTH":
          this.hoverattribute = "assets/cardstats/EARTH.png";
          break;
      default:
          this.hoverattribute = "assets/cardstats/EARTH.png";
          break;
      
    
    }

    switch (this.hoveredCard?.type) {
      case "Aqua":
          this.hovermType = "assets/monstertypes/Aqua.png";
          break;
      case "Beast-Warrior":
          this.hovermType = "assets/monstertypes/Beast-Warrior.png";
          break;
      case "Beast":
          this.hovermType = "assets/monstertypes/Beast.png";
          break;
      case "Dinosaur":
          this.hovermType = "assets/monstertypes/Dinosaur.png";
          break;
      case "Divine-Beast":
          this.hovermType = "assets/monstertypes/Divine-Beast.png";
          break;
      case "Dragon":
          this.hovermType = "assets/monstertypes/Dragon.png";
          break;

      case "Fairy":
          this.hovermType = "assets/monstertypes/Fairy.png";
          break;
      case "Fiend":
          this.hovermType = "assets/monstertypes/Fiend.png";
          break;
      case "Fish":
          this.hovermType = "assets/monstertypes/Fish.png";
          break;
      case "Insect":
          this.hovermType = "assets/monstertypes/Insect.png";
          break;
      case "Machine":
          this.hovermType = "assets/monstertypes/Machine.png";
          break;
      case "Plant":
          this.hovermType = "assets/monstertypes/Plant.png";
          break;

      case "Psychic":
          this.hovermType = "assets/monstertypes/Psychic.png";
          break;
      case "Pyro":
          this.hovermType = "assets/monstertypes/Pyro.png";
          break;
      case "Reptile":
          this.hovermType = "assets/monstertypes/Reptile.png";
          break;
      case "Rock":
          this.hovermType = "assets/monstertypes/Rock.png";
          break;
      case "Sea Serpent":
          this.hovermType = "assets/monstertypes/Serpent.png";
          break;
      case "Spellcaster":
          this.hovermType = "assets/monstertypes/Spellcaster.png";
          break;

      case "Thunder":
          this.hovermType = "assets/monstertypes/Thunder.png";
          break;
      case "Warrior":
          this.hovermType = "assets/monstertypes/Warrior.png";
          break;
      case "Winged-Beast":
          this.hovermType = "assets/monstertypes/Winged-Beast.png";
          break;
      case "Zombie":
          this.hovermType = "assets/monstertypes/Zombie.png";
          break;
      
      default:
          this.hovermType = "assets/monstertypes/Zombie.png";
          break;
  }




  }
  
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
      if(card.cardtype=="Fusion Monster" || card.cardtype=="Xyz Monster" || card.cardtype=="Synchro Monster"){
        if(this.extraDeck.length==15){
          return;
        }
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
    console.log(card)
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
    this.card = card;

    if(this.mainOrSide=='Side'){
      this.addSideCard(this.card);
    }
    else{
      this.addCard(this.card);
    }
    

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
    if(this.mainDeck.length<40 || this.mainDeck.length>60){
      this.uploadCorrectly = false;
      return;
    }
    this.uploadCorrectly = true;


    const decklist = {} as Decklist;
    decklist.title = this.deckname;
    decklist.desc = this.deckdescription;

    this.xml_file = '<?xml version="1.0" encoding="utf-8" ?> <deck name=".TriType"><main>';
 
    const idList1:string[] = []
    const idList2:string[] = []
    const idList3:string[] = []



    for(const card of this.mainDeck){
        this.xml_file+='<card id="' + String(card.id) +'" passcode="">'+card.name+'</card>'
        idList1.push(card.id)
    }
    this.xml_file+="</main><side>"   
    for(const card of this.sideDeck){
     this.xml_file+='<card id="' + String(card.id) +'" passcode="">'+card.name+'</card>'
     idList2.push(card.id)
    }
    this.xml_file+="</side><extra>"   
    
    for(const card of this.extraDeck){
        this.xml_file+='<card id="' + String(card.id) +'" passcode="">'+card.name+'</card>'
        idList3.push(card.id)
    }
    this.xml_file+="</extra></deck>"

    decklist['mainDeck'] = idList1;
    decklist['sideDeck'] = idList2;
    decklist['extraDeck'] = idList3;

    decklist['decklist'] = this.xml_file;
    decklist['creator']=this.creator;
    decklist['creatorid']=Number(this.creatorid);
    console.log(decklist);





    this.customcardsService.submitDecklist(decklist)
    .subscribe(
      res=>{
        console.log("JOBS DONE");
        console.log(res);
      },
        
      err=>{console.log(err)}
    )
    this.submitfail = false;
    this._router.navigate(['/drafts']);
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
