import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card, CustomcardsService } from '../customcards.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  constructor(public router:Router, public _authService:AuthService,public route:ActivatedRoute,public customcardService:CustomcardsService) { }

  cardid!:number;
  carddetails!:any;

  card!:Card;
  tags!:any;

  monster!:string;
  attribute!:string;
  stType!:string;
  mType!:string;


  creator!:string;
  creatorid!:string;

  banned:boolean = false;
  limited:boolean = false;
  semilimited:boolean = false;
  unlimited:boolean = true;

  ngOnInit(): void {
    const current = new Date();
    this.timestamp = current.getTime();
    this.route.paramMap.subscribe((paramMap)=>{
      this.cardid = Number(paramMap.get('cardid'));
      this.customcardService.getCardDetails(this.cardid).subscribe(
        (data:any)=>{
          this.customcardService.updateCardViews(this.cardid).subscribe()
          this.carddetails = data;
          this.card = this.carddetails['carddetails']
          this.tags = this.carddetails['tags']
          for(let tag in this.tags){
            if(this.tags[tag]['tag']=="Limited"){
                this.limited=true;
                this.unlimited=false;
                this.tags.splice(tag,1)
            }
            if(this.tags[tag]['tag']=="Semi-Limited"){
                this.semilimited=true;
                this.unlimited=false;
                this.tags.splice(tag,1)
            }
            if(this.tags[tag]['tag']=="Banned"){
                this.banned=true;
                this.unlimited=false;
                this.tags.splice(tag,1)
            }


            console.log(tag)
          }
          console.log(this.carddetails);
          this.showDetails()
        }
      )
    })


  }
  timestamp: number = 0;
  getTimeStamp(){
    return this.timestamp;
  }
  goToLink(url: string){
    const newurl = 'https://www.duelingbook.com/card?id='+url
    window.open(newurl, "_blank");
}

showDetails(){
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
confirmDelete(){
    if(this._authService.adminRole()){
        if(this.carddetails['packdetails'].length!=0){
            confirm("You cannot delete this card while it is in a pack!")
        }
        else{
            let text = "Are you sure you want to delete this card?";
            if (confirm(text) == true) {

                this.customcardService.deleteCard(this.card).subscribe(
                    res=>{this.router.navigate(['/deck-editor']);},
                    err=>{this.router.navigate(['/deck-editor']);}
                )
            } else {
                text = "You canceled!";
            }
        }
    }
}
}
