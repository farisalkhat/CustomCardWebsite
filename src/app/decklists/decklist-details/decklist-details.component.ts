import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Card, CustomcardsService, DeckListCard, HoveredCardDetails, importDecklist } from 'src/app/customcards.service';

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

  isHovering: boolean = false;
  hoveredCard!:any;
  hovermonster!:string;
  hoverattribute!:string;
  hoverstType!:string;
  hovermType!:string;
  leftPosition = 100
  rightPosition = 100

  constructor(private _router:Router, private _authService:AuthService, private route: ActivatedRoute, private customcardService: CustomcardsService) { }




  mouseHoverDrafted(card:Card,e:MouseEvent){
  this.isHovering = true;
  this.hoveredCard = card

  if(e.clientX>=900){
    this.leftPosition = e.clientX-200;
  }

  else{
    this.leftPosition = e.clientX+2;
  }

  this.rightPosition =e.clientY-170;


  this.getHoveredCardDetails()}


  mouseHovering(card: Card, e: MouseEvent) {
    const final = {} as HoveredCardDetails;
    if (e.clientX >= 900) { final.leftPosition = e.clientX - 200; }
    else { final.leftPosition = e.clientX + 2; }
    final.rightPosition = e.clientY - 170;
    final.card = card;
    final.isHovering = true;
    this.customcardService.HoveredCard(final);
  }
  mouseLeft() {
    this.customcardService.DisableHoveredCard();
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


  ngOnInit(): void {
    const current = new Date();
    this.timestamp = current.getTime();
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
        (data:any)=>{

          this.customcardService.updateDecklistViews(this.deckid).subscribe()
          this.decklist=data;

          this.decklist.sort((a, b) =>

          {
            if(a.cardtype.includes('Monster')){
                if(b.cardtype.includes('Spell') || b.cardtype.includes('Trap')){
                    return -1
                }
                else{
                    if(a.name > b.name){
                        return 1
                    }
                    else{
                        return -1
                    }

                }
            }
            if(a.cardtype.includes('Spell')){
                if(b.cardtype.includes('Monster')){
                    return 1
                }
                else if(b.cardtype.includes('Trap')){
                    return -1
                }
                else{
                    if(a.name > b.name){
                        return 1
                    }
                    else{
                        return -1
                    }
                }

            }
            if(a.cardtype.includes('Trap')){
                if(b.cardtype.includes('Monster') || b.cardtype.includes('Spell')){
                    return 1
                }
                else{
                    if(a.name > b.name){
                        return 1
                    }
                    else{
                        return -1
                    }
                }
            }

            return 1}





          )
          console.log(this.decklist);
        }

      )

      this.customcardService.getDecklistInfo(this.deckid).subscribe(
        (data:any)=>{this.decklistinfo=data;
        }
      )

    })


  }
  timestamp: number = 0;
  getTimeStamp(){
    return this.timestamp;
  }

  goToLink(url: string){

    let new_url =''

    if(this._router['location']._platformLocation.location.origin=='http://localhost:4200'){
       new_url = this._router.serializeUrl(
        this._router.createUrlTree(['/cards/']));
    }
    else{
       new_url = this._router.serializeUrl(
      this._router.createUrlTree(['/cards/']));
    }



    window.open(new_url +'/'+url, '_blank');


    // const newurl = 'https://www.duelingbook.com/card?id='+url
    // window.open(newurl, "_blank");
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

 edit(){
  this.customcardService.editDeck(true);
  this.customcardService.setEditDeckID(this.deckid);
  this.customcardService.setEditDeckName(this.decklistinfo.name)

  let mainDeck = this.decklist.filter((card)=>card.deck==='maindeck')
  let extraDeck = this.decklist.filter((card)=>card.deck==='extradeck')
  let sidedeck = this.decklist.filter((card)=>card.deck==='sidedeck')



  this.customcardService.uploadDecklist(mainDeck,sidedeck,extraDeck);
  this._router.navigate(['/deck-editor']);
}
}
