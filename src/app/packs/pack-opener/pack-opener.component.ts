import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AddToBinder, Binder, BinderInfo, Card, CustomcardsService, HoveredCardDetails, Pack, PackCard, PackInfo, PackSelectedData } from 'src/app/customcards.service';
import { CanComponentDeactivate } from 'src/app/deactivate-component.guard';

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
export class PackOpenerComponent implements OnInit,CanComponentDeactivate {

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    
    console.log("Packs opened: " + this.packsOpened)
    return confirm('You have unsaved changes. Do you want to leave?');
    return true;
  }



   
  constructor(public authService:AuthService, private customcardsService:CustomcardsService,private route: ActivatedRoute, private router:Router) { }
  cards!: PackCard[];
  card: PackCard | undefined;
  monster!:string;
  attribute!:string;
  stType!:string;
  mType!:string;

  packInfo!: PackInfo;
  randomCards: PackCard[] = [];

  commonCards: PackCard[] = [];
  rareCards: PackCard[] = [];
  superCards: PackCard[] = [];
  ultraCards: PackCard[] = [];
  secretCards: PackCard[] = [];
  @Output() packsopened = new EventEmitter<any[]>();
  packsOpened = 0; //Total Packs opened since starting the pack simulator
  packAmount = 0; //Total amount of packs that need to be opened
  packID!:number;

  cardsRemaining = 9; //Amount of cards in each pack
  currentOpened: PackCard[] = []; //List of cards received
  openedPack:PackCard[] = [];

  revealed:boolean = false;

  username!:string;
  id!:number;
  state: string = 'default';

  binderName!:string;
  submitted:boolean = false;
  submitfail:boolean = false;
  binderID!:number;

  sealedmode:boolean = false;

  @Input() packQueue!:PackSelectedData[];

  currentPack!:PackSelectedData;

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    this.queueNextPack()
  }


  get f(){return this.binderData.controls;}

  rotate(){
    if (this.state === "default") {
        this.state = "flipped";
      } else {
        this.state = "default";
      }
  }



  binders:Binder [] = [];


  binderData= new FormGroup({
    binderName: new FormControl(' ',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)

    ])
  })

  isHovering: boolean = false;
  hoveredCard!:Card;
  hovermonster!:string;
  hoverattribute!:string;
  hoverstType!:string;
  hovermType!:string;
  leftPosition = 100
  rightPosition = 100

  finishedPacks:boolean=false;



  queueNextPack(){



    this.currentPack=this.packQueue[0]!;
    this.packQueue = this.packQueue.slice(1)
    console.log(this.packQueue)

      let packID= this.currentPack?.packid
      this.packID = packID;

      forkJoin(
        this.customcardsService.getPackInfoByID(this.packID),
        this.customcardsService.getCustomCardsByPack(this.packID),
      ).subscribe(([packInfo,packCards])=>{
        this.packInfo = packInfo;
        this.cards = packCards;
        this.secretCards = []
        this.ultraCards = []
        this.superCards = []
        this.rareCards = []
        this.commonCards = []
        this.cardsRemaining=9;

        if(this.packID!=1){
          if(this.packInfo['packsize']=='small'){
            this.cardsRemaining=3

            let counter = 0;
            for(counter; counter!=2;counter++){
              this.ultraCards.push(this.cards[counter])
            }

            for(counter; counter!=6;counter++){
              this.superCards.push(this.cards[counter])
            }

            for(counter; counter!=7;counter++){
              this.secretCards.push(this.cards[counter])
            }

            for(counter; counter!=16;counter++){
              this.rareCards.push(this.cards[counter])
            }

            for(counter; counter!=31;counter++){
              this.commonCards.push(this.cards[counter])
            }




          }
          if(this.packInfo['packsize']=='medium'){
            this.cardsRemaining=9

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




          }
          if(this.packInfo['packsize']=='large'){
            this.cardsRemaining=13
            let counter = 0;
            for(counter; counter!=14;counter++){
              this.ultraCards.push(this.cards[counter])
            }

            for(counter; counter!=34;counter++){
              this.superCards.push(this.cards[counter])
            }

            for(counter; counter!=40;counter++){
              this.secretCards.push(this.cards[counter])
            }

            for(counter; counter!=100;counter++){
              this.rareCards.push(this.cards[counter])
            }

            for(counter; counter!=200;counter++){
              this.commonCards.push(this.cards[counter])
            }
          }
        }



        this.shuffleCards();

      })

      this.packAmount = this.currentPack.amount;
}





mouseHovering(card: Card, e: MouseEvent) {
  if(this.state=="default"){
    return;
  }
  const final = {} as HoveredCardDetails;
  if (e.clientX >= 900) { final.leftPosition = e.clientX - 200; }
  else { final.leftPosition = e.clientX + 2; }
  final.rightPosition = e.clientY - 170;
  final.card = card;
  final.isHovering = true;
  this.customcardsService.HoveredCard(final);
}
mouseLeft() {
  this.customcardsService.DisableHoveredCard();
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
    if (this.authService.loggedIn()){
      this.authService.getUser().subscribe(
        res =>{
          console.log('this is user:'+res['id'])
          this.username = res['username']
          this.id = res['id']

          this.sealedmode= this.customcardsService.getSealedDraftMode()
          if(this.sealedmode==false){
            this.customcardsService.getBindersByOwner(this.id).subscribe(res=>{this.binders=res})
          }

        })
    }

    else{


    }



      console.log(this.cards);
  }

  timestamp: number = 0;
  getTimeStamp(){
    return this.timestamp;
  }


  goToLinkRevealed(url: string){
    if(this.state!="flipped"){return;}
    const newurl = 'https://www.duelingbook.com/card?id='+url
    window.open(newurl, "_blank");
}



  goToLink(url: string){
    const newurl = 'https://www.duelingbook.com/card?id='+url
    window.open(newurl, "_blank");
}
  shuffleCards(){
    this.revealed==false
    if (this.state === "flipped") {
        this.state = "default";
      }

    this.randomCards=[]
    let cardCounter = 0

    if(this.packID==1){
      while(cardCounter<this.cardsRemaining){
        const randID = this.randomIntFromInterval(0,this.cards.length-1)
        let newCard = this.cards[randID]
        newCard.rarity="common";
        this.randomCards.push(newCard)
        cardCounter++;
      }

    }
    if(this.packID!=1){
      while(cardCounter<this.cardsRemaining){

        if(cardCounter<this.cardsRemaining-2){
          const randID = this.randomIntFromInterval(0,this.commonCards.length-1)
          let newCard = this.commonCards[randID]

          while(this.randomCards.findIndex(obj => obj.id === newCard?.id)>-1){
            const randID = this.randomIntFromInterval(0,this.commonCards.length-1)
            newCard = this.commonCards[randID]
          }

          this.randomCards.push(newCard)
        }
        if(cardCounter==this.cardsRemaining-2){
          const randID = this.randomIntFromInterval(0,this.rareCards.length-1)
          const newCard = this.rareCards[randID]


          this.randomCards.push(newCard)
        }

        if(cardCounter==this.cardsRemaining-1){
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
      this.openedPack.push(card)
    }

    this.authService.subtractCurrency(this.currentPack.cost)
    this.addPackToCollection()
    this.currentOpened.sort((a, b) => a.name.localeCompare(b.name))
    this.currentOpened.sort((a, b) => a.creator.localeCompare(b.creator))
    this.packsopened.emit([this.packsOpened,this.packID,this.id,false])

    if(this.packQueue.length==0 && this.packsOpened==this.packAmount){
      this.finishedPacks=true;
      this.packsopened.emit([this.packsOpened,this.packID,this.id,true])
      return
    }
  }

  openNextPack(){
    this.revealed=false
    this.openedPack = []
    this.packsopened.emit([this.packsOpened,this.packID,this.id,false])


    if(this.packsOpened==this.packAmount){
      this.packsopened.emit([this.packsOpened,this.packID,this.id,true])
      this.packsOpened = 0;

      this.queueNextPack();
    }
    else{
      this.rotate();
      this.shuffleCards();

      this.card = undefined;
    }


  }



  revealDraftCards(){
    this.rotate();
    this.revealed=true;
    for(const card of this.randomCards){
      this.currentOpened.push(card)
      this.openedPack.push(card)
    }



    this.currentOpened.sort((a, b) => a.name.localeCompare(b.name))
    this.currentOpened.sort((a, b) => a.creator.localeCompare(b.creator))

    if(this.packQueue.length==0 && this.packsOpened==this.packAmount){
      this.finishedPacks=true;
      return
    }
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

submitBinder(){
  this.submitted=true;
  if(this.binderData.invalid){
    this.submitfail = true;
    console.log("Basic data not filled.")
    return;
  }
  const binderInfo = {} as BinderInfo;
  binderInfo['title']=this.binderData.controls['binderName'].value;
  binderInfo['creatorid'] = this.id;
  binderInfo['cards'] = this.currentOpened;
  binderInfo['packid'] = this.packID;

  this.customcardsService.submitBinder(binderInfo).subscribe(
    res=>{
      console.log(res);
      this.router.navigate(['/packs']);
    },

    err=>{console.log(err)}
  )
}


addPackToCollection(){
  const binderInfo = {} as AddToBinder;
  binderInfo['cards'] = this.openedPack;
  binderInfo['packid'] = this.packID;
  binderInfo['creatorid'] = this.id
  binderInfo['binderid'] = this.binderID;


  this.customcardsService.addToCollection(binderInfo).subscribe(
    res=>{
      console.log(res);
    },
    err=>{console.log(err)}
  )
}

addToBinder(){
  const binderInfo = {} as AddToBinder;
  binderInfo['cards'] = this.currentOpened;
  binderInfo['packid'] = this.packID;
  binderInfo['creatorid'] = this.id
  binderInfo['binderid'] = this.binderID;


  this.customcardsService.addToBinder(binderInfo).subscribe(
    res=>{
      console.log(res);
      this.router.navigate(['/packs']);
    },

    err=>{console.log(err)}
  )


}

}


