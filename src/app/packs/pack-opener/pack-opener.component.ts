import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card, CustomcardsService, Pack, PackCard } from 'src/app/customcards.service';

@Component({
  selector: 'app-pack-opener',
  templateUrl: './pack-opener.component.html',
  styleUrls: ['./pack-opener.component.css'],
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
export class PackOpenerComponent implements OnInit {

  constructor(private customcardsService:CustomcardsService,private route: ActivatedRoute) { }
  cards!: PackCard[];
  card: PackCard | undefined;
  monster!:string;
  attribute!:string;
  stType!:string;
  mType!:string;

  randomCards: PackCard[] = [];

  commonCards: PackCard[] = [];
  rareCards: PackCard[] = [];
  superCards: PackCard[] = [];
  ultraCards: PackCard[] = [];
  secretCards: PackCard[] = [];

  packsOpened = 0; //Total Packs opened since starting the pack simulator
  packAmount = 0; //Total amount of packs that need to be opened
  packID:number = 1;

  cardsRemaining = 9; //Amount of cards in each pack
  currentOpened: PackCard[] = []; //List of cards received

  revealed:boolean = false;

  state: string = 'default';
  rotate(){
    if (this.state === "default") {
        this.state = "flipped";
      } else {
        this.state = "default";
      }
  }










  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap)=>{
      this.packID= Number(paramMap.get('packid'));
      this.customcardsService.getCustomCardsByPack(this.packID).subscribe(
        res => {
          this.cards = res;
          console.log(this.cards)

          let counter = 0;
          for(counter; counter!=10;counter++){
            this.ultraCards.push(this.cards[counter])
          }

          for(counter; counter!=25;counter++){
            this.superCards.push(this.cards[counter])
          }

          for(counter; counter!=27;counter++){
            this.secretCards.push(this.cards[counter])
          }

          for(counter; counter!=52;counter++){
            this.rareCards.push(this.cards[counter])
          }

          for(counter; counter!=100;counter++){
            this.commonCards.push(this.cards[counter])
          }



          this.shuffleCards();
        }
      )
      this.packAmount = this.customcardsService.getPackAmount();
  
      
    })


      console.log(this.cards);
  }

  goToLink(url: string){
    const newurl = 'https://www.duelingbook.com/card?id='+url
    window.open(newurl, "_blank");
}
  shuffleCards(){
    if (this.state === "flipped") {
        this.state = "default";
      }

    this.randomCards=[]
    let cardCounter = 0
    console.log(this.cards.length)
    while(cardCounter<this.cardsRemaining){

      if(cardCounter<=6){
        const randID = this.randomIntFromInterval(0,this.commonCards.length-1)
        let newCard = this.commonCards[randID]

        while(this.randomCards.findIndex(obj => obj.id === newCard?.id)>-1){
          const randID = this.randomIntFromInterval(0,this.commonCards.length-1)
          newCard = this.commonCards[randID]
        }

        this.randomCards.push(newCard)
      }
      if(cardCounter==7){
        const randID = this.randomIntFromInterval(0,this.rareCards.length-1)
        const newCard = this.rareCards[randID]

        
        this.randomCards.push(newCard)
      }
      if(cardCounter==8){
        const randID1 = this.randomIntFromInterval(0,5)
        const randID2 = this.randomIntFromInterval(0,11)
        const randID3 = this.randomIntFromInterval(0,30)
        const randID = this.randomIntFromInterval(0,this.commonCards.length-1)
        let newCard = this.commonCards[randID]
        while(this.randomCards.findIndex(obj => obj.id === newCard?.id)>-1){
          const randID = this.randomIntFromInterval(0,this.commonCards.length-1)
          newCard = this.commonCards[randID]
        }
        console.log(randID1,randID2,randID3)
        if(randID1==0){
          const randID = this.randomIntFromInterval(0,this.superCards.length-1)
          newCard = this.superCards[randID]
          
        }
        if(randID2==0){
          const randID = this.randomIntFromInterval(0,this.ultraCards.length-1)
           newCard = this.ultraCards[randID]
          
        }
        if(randID3==0){
          const randID = this.randomIntFromInterval(0,this.secretCards.length-1)
          newCard = this.secretCards[randID]
        }

        this.randomCards.push(newCard)
      
        
      }
      cardCounter++;

    }

    this.packsOpened++;
    console.log(this.randomCards);
  }
  randomIntFromInterval(min:number, max:number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  revealCards(){
    this.rotate();
    this.revealed=true;
    for(const card of this.randomCards){
      this.currentOpened.push(card)
    }
    this.currentOpened.sort((a, b) => a.name.localeCompare(b.name))
    this.currentOpened.sort((a, b) => a.creator.localeCompare(b.creator))
  }

  openNextPack(){
    this.rotate();
    this.shuffleCards();
    this.revealed = false;
    this.card = undefined;
  }

  showDetails(card:PackCard){
    if(this.state=="default"){
      return;
    }

    this.card = card;
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

}
