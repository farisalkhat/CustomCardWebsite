import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Card, CustomcardsService, DraftCard } from 'src/app/customcards.service';
import * as FileSaver from 'file-saver';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-draft-form',
  templateUrl: './draft-form.component.html',
  styleUrls: ['./draft-form.component.css'],
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

export class DraftFormComponent implements OnInit {
  xml_file: string = "";

  constructor(private route: ActivatedRoute, public router: Router, private customcardsService: CustomcardsService) { }
  draftMode: string = "generic"
  customEnabled: boolean = false;

  cards!: Card[];
  draftid!: number;

  database!: Card[];
  monsters!: Card[];
  spells!: Card[];
  traps!: Card[];
  spellstraps!: Card[];
  swampus!: Card[];
  gergoos!: Card[];
  afres!: Card[];
  richie!: Card[];
  generic!: Card[];
  genericT!: Card[];
  genericA!: Card[];
  genericAll!: Card[];



  card!: DraftCard; // Selected Card


  monster!: string;
  attribute!: string;
  stType!: string;
  mType!: string;

  randomCards!: any[] | undefined;
  customDraft: DraftCard[] = [];

  draftToEditor: DraftCard[] = [];

  shuffleStyle: string = "nothing";
  customButton1: string = "nothing";
  customButton2: string = "nothing";

  round = 0;
  cardsRemaining = 15;
  currentDraft: any[] = [];
  sortedList: DraftCard[] = []

  state: string = 'default';

  cardsSelected = 0;

  draftCardSelected = false;

  firstTime = true;


  draftArray: [] = []


  isHovering: boolean = false;
  hoveredCard!: any;
  hovermonster!: string;
  hoverattribute!: string;
  hoverstType!: string;
  hovermType!: string;
  leftPosition = 100
  rightPosition = 100

  rotate() {
    if (this.state === "default") {
      this.state = "flipped";
    } else {
      this.state = "default";
    }
  }
  rightAddDraftCard($event: { preventDefault: () => void; }, card: DraftCard) {
    if (this.state == "default") {
      return;
    }
    else {
      this.card = card
      $event.preventDefault();
      this.addCard();
    }

  }
  addCard() {
    if (this.card) {
      this.currentDraft.push(this.card);



      const index = this.sortedList.findIndex(obj => obj.id === this.card.id)
      if (index > -1) { this.sortedList[index]['copies']++; }
      else { this.card['copies'] = 1; this.sortedList.push(this.card) }

      this.sortedList.sort((a, b) => a.name.localeCompare(b.name))
      this.sortedList.sort((a, b) => a.creator.localeCompare(b.creator))



      this.cardsRemaining--;
      this.cardsSelected++;
      this.draftCardSelected = false;
      if (this.cardsRemaining <= 0) {
        this.round++;
        if (this.round >= 5) { this.clearCards(); }
        else { this.cardsRemaining = 15; this.shuffleCards() }
      }
      else {
        this.shuffleCards();
      }
    }

    this.customcardsService.UpdateDeckEditorUserDraft(this.sortedList)

  }

  clearCards() {
    this.randomCards = undefined;
  }


  ngOnInit(): void {
    this.draftMode = this.customcardsService.getDraftType();
    this.customEnabled = this.customcardsService.getCustomEnabled();
    console.log(this.draftMode);
    console.log(this.draftMode);
    console.log(this.draftMode);
    console.log(this.customEnabled)



    this.route.paramMap.subscribe((paramMap) => {
      this.draftid = Number(paramMap.get('draftid'))
      this.customcardsService.getCustomCardsByDraft(this.draftid).subscribe(
        res => {
          this.customDraft = res;
          this.cards = res;
          console.log(this.customDraft);
          this.shuffleCards()
        }
      )


    });




    // this.customcardsService.getCustomMonsters().subscribe(
    //   res => {

    //     this.monsters = res;

    //   }
    // )
    // this.customcardsService.getCustomSpells().subscribe(
    //   res => {

    //     this.spells = res;

    //   }
    // )
    // this.customcardsService.getCustomTraps().subscribe(
    //   res => {

    //     this.traps = res;

    //   }
    // )
    // this.customcardsService.getCustomCardsByCreator('charge301').subscribe(
    //   res => {
    //     if(res){}
    //     this.richie = res;  
    //   }
    // )
    // this.customcardsService.getCustomSpellsTraps().subscribe(
    //   res => {

    //     this.spellstraps = res;

    //   }
    // )

    // this.customcardsService.getCustomCardsByCreator('Afres').subscribe(
    //   res => {
    //     if(res){this.afres = res;}

    //   }
    // )
    // this.customcardsService.getCustomCardsByCreator('Gergoos').subscribe(
    //   res => {
    //     if(res){this.gergoos = res;}

    //   }
    // )
    // this.customcardsService.getCustomCardsByCreator('jirai_gumo_2200').subscribe(
    //   res => {
    //     if(res){this.swampus = res;  }

    //   }
    // )
    // this.customcardsService.getCustomCardsByTag('Generic').subscribe(
    //   res => {
    //     if(res){this.generic = res;  }

    //   }
    // )
    // this.customcardsService.getCustomCardsByTag('Attribute-Generic').subscribe(
    //   res => {
    //     if(res){this.genericA = res; }

    //   }
    // )
    // this.customcardsService.getCustomCardsByTag('Type-Generic').subscribe(
    //   res => {
    //     if(res){        
    //       this.genericT = res;  





    //     }


    //   }
    // )
    // this.customcardsService.getCustomCards().subscribe(
    //   res => {
    //     if(res)
    //     this.database = res;
    //     this.genericAll =  this.generic,this.genericA,this.genericT;
    //     this.cards = this.database;
    //     this.decideCardPool();


    //     this.shuffleCards();


    //   }
    // )




  }

  goToLink(url: string) {

    let new_url = ''

    if (this.router['location']._platformLocation.location.origin == 'http://localhost:4200') {
      new_url = this.router.serializeUrl(
        this.router.createUrlTree(['/cards/']));
    }
    else {
      new_url = this.router.serializeUrl(
        this.router.createUrlTree(['/CustomCardWebsite/cards/']));
    }



    window.open(new_url + '/' + url, '_blank');


    // const newurl = 'https://www.duelingbook.com/card?id='+url
    // window.open(newurl, "_blank");
  }
  mouseHovering(card: Card, e: MouseEvent) {


    if (this.state != 'flipped') {
      return
    }

    this.isHovering = true;
    this.hoveredCard = card

    if (e.clientX >= 900) {
      this.leftPosition = e.clientX - 200;
    }

    else {
      this.leftPosition = e.clientX + 2;
    }

    this.rightPosition = e.clientY - 170;


    this.getHoveredCardDetails()



  }


  mouseHoverDrafted(card: Card, e: MouseEvent) {
    this.isHovering = true;
    this.hoveredCard = card

    if (e.clientX >= 900) {
      this.leftPosition = e.clientX - 200;
    }

    else {
      this.leftPosition = e.clientX + 2;
    }

    this.rightPosition = e.clientY - 170;


    this.getHoveredCardDetails()
  }
  mouseLeft() {
    this.isHovering = false;
  }
  getHoveredCardDetails() {

    this.hoverattribute = ''
    this.hoverstType = ''
    this.hovermType = ''

    if (this.hoveredCard?.cardtype == "Normal Trap" || this.hoveredCard?.cardtype == "Counter Trap" || this.hoveredCard?.cardtype == "Continuous Trap") {
      this.hovermonster = 'False';
      this.hoverattribute = "assets/cardstats/TRAP.png";

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

    else if (this.hoveredCard?.cardtype == "Normal Spell" || this.hoveredCard?.cardtype == "Quick Spell" || this.hoveredCard?.cardtype == "Continuous Spell" ||
      this.hoveredCard?.cardtype == "Ritual Spell" || this.hoveredCard?.cardtype == "Field Spell" || this.hoveredCard?.cardtype == "Equip Spell") {
      this.hovermonster = 'False';
      this.hoverattribute = "assets/cardstats/SPELL.png";

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



    else {
      this.hovermonster = 'True';
      switch (this.hoveredCard?.attribute) {
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
  // decideCardPool(){
  //   console.log(this.customEnabled);
  //   if(this.customEnabled == true){
  //     this.cards = this.customDraft;
  //   }
  //   else{
  //     switch(this.draftMode){

  //       case "default":
  //         this.cards = this.database

  //         break;

  //       case "generic":
  //         this.cards = this.genericAll
  //         break;

  //       default:
  //         this.cards = this.database
  //     }
  //   }



  // }

  shuffleUnique(shuffleStyle: string) {
    this.shuffleStyle = shuffleStyle;
    this.customButton1 = "nothing"
    this.customButton2 = "nothing"
    this.shuffleCards();
  }

  shuffleCards() {
    if (this.state === "flipped") {
      this.state = "default";
    }

    this.randomCards = []
    let cardCounter = 0
    console.log(this.shuffleStyle)



    switch (this.shuffleStyle) {
      case "nothing":
        while (cardCounter < this.cardsRemaining) {
          const randID = this.randomIntFromInterval(0, this.cards.length - 1)
          const newCard = this.cards[randID]
          this.randomCards.push(newCard)
          cardCounter++;
        }
        if (this.firstTime) { this.firstTime = false }
        else {
          this.randomizeButtons();
          this.shuffleStyle = "nothing"
        }

        break;
      case "afres":
        while (cardCounter < this.cardsRemaining) {
          const randID = this.randomIntFromInterval(0, this.afres.length - 1)
          const newCard = this.afres[randID]
          this.randomCards.push(newCard)
          cardCounter++;
        }
        this.shuffleStyle = "nothing"
        break;
      case "gergoos":
        while (cardCounter < this.cardsRemaining) {
          const randID = this.randomIntFromInterval(0, this.gergoos.length - 1)
          const newCard = this.gergoos[randID]
          this.randomCards.push(newCard)
          cardCounter++;
        }
        this.shuffleStyle = "nothing"
        break;
      case "swampus":
        while (cardCounter < this.cardsRemaining) {
          const randID = this.randomIntFromInterval(0, this.swampus.length - 1)
          const newCard = this.swampus[randID]
          this.randomCards.push(newCard)
          cardCounter++;
        }
        this.shuffleStyle = "nothing"
        break;
      case "richie":
        while (cardCounter < this.cardsRemaining) {
          const randID = this.randomIntFromInterval(0, this.richie.length - 1)
          const newCard = this.richie[randID]
          this.randomCards.push(newCard)
          cardCounter++;
        }
        this.shuffleStyle = "nothing"
        break;

      case "spells":
        console.log("IN CASE SPELLS");
        while (cardCounter < this.cardsRemaining) {
          const randID = this.randomIntFromInterval(0, this.spells.length - 1)
          const newCard = this.spells[randID]
          this.randomCards.push(newCard)
          cardCounter++;
        }
        this.shuffleStyle = "nothing"
        break;

      case "traps":
        console.log("IN CASE traps");
        while (cardCounter < this.cardsRemaining) {
          const randID = this.randomIntFromInterval(0, this.traps.length - 1)
          const newCard = this.traps[randID]
          this.randomCards.push(newCard)
          cardCounter++;
        }
        this.shuffleStyle = "nothing"
        break;

      case "monsters":
        console.log("IN CASE monsters");
        while (cardCounter < this.cardsRemaining) {
          const randID = this.randomIntFromInterval(0, this.monsters.length - 1)
          const newCard = this.monsters[randID]
          this.randomCards.push(newCard)
          cardCounter++;
        }
        this.shuffleStyle = "nothing"
        break;




      default: {
        while (cardCounter < this.cardsRemaining) {
          const randID = this.randomIntFromInterval(0, this.cards.length - 1)
          const newCard = this.cards[randID]
          this.randomCards.push(newCard)
          cardCounter++;
        }
        this.shuffleStyle = "nothing"
        this.randomizeButtons();
      }
    }
    console.log(this.randomCards);

  }

  randomizeButtons() {
    let button1 = this.randomIntFromInterval(0, 12)
    let button2 = this.randomIntFromInterval(0, 12)
    while (button2 == button1) { button2 = this.randomIntFromInterval(0, 12) }
    this.findButton(1, button1);
    this.findButton(2, button2);


  }

  findButton(button: number, buttonStyle: number) {
    switch (buttonStyle) {
      case 0: {
        if (button == 1) {
          this.customButton1 = "nothing"
        }
        else {
          this.customButton2 = "nothing"
        }
        break;
      }
      case 1: {
        if (button == 1) {
          this.customButton1 = "afres"
        }
        else {
          this.customButton2 = "afres"
        }
        break;
      }
      case 2: {
        if (button == 1) {
          this.customButton1 = "gergoos"
        }
        else {
          this.customButton2 = "gergoos"
        }
        break;
      }
      case 3: {
        if (button == 1) {
          this.customButton1 = "swampus"
        }
        else {
          this.customButton2 = "swampus"
        }
        break;
      }
      case 4: {
        if (button == 1) {
          this.customButton1 = "spells"
        }
        else {
          this.customButton2 = "spells"
        }
        break;
      }
      case 5: {
        if (button == 1) {
          this.customButton1 = "traps"
        }
        else {
          this.customButton2 = "traps"
        }
        break;
      }
      case 6: {
        if (button == 1) {
          this.customButton1 = "monsters"
        }
        else {
          this.customButton2 = "monsters"
        }
        break;
      }
      case 7: {
        if (button == 1) {
          this.customButton1 = "richie"
        }
        else {
          this.customButton2 = "richie"
        }
        break;
      }
      default: {
        this.customButton1 = "nothing"
        break;
      }
    }
  }


  randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  revealCards() {
    this.customButton1 = "nothing"
    this.customButton2 = "nothing"
    this.rotate();
  }

  openNextPack() {
    this.shuffleCards()
    this.rotate();
  }


  showDetails2(card: DraftCard) {
    this.draftCardSelected = false;
    this.card = card;
    this.attribute = ''
    this.stType = ''
    this.mType = ''

    if (this.card?.cardtype == "Normal Trap" || this.card?.cardtype == "Counter Trap" || this.card?.cardtype == "Continuous Trap") {
      this.monster = 'False';
      this.attribute = "assets/cardstats/TRAP.png";

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

    else if (this.card?.cardtype == "Normal Spell" || this.card?.cardtype == "Quick Spell" || this.card?.cardtype == "Continuous Spell" ||
      this.card?.cardtype == "Ritual Spell" || this.card?.cardtype == "Field Spell" || this.card?.cardtype == "Equip Spell") {
      this.monster = 'False';
      this.attribute = "assets/cardstats/SPELL.png";

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



    else {
      this.monster = 'True';
      switch (this.card?.attribute) {
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

  showDetails(card: DraftCard) {
    if (this.state == "default") {
      return;
    }
    this.draftCardSelected = true;

    this.card = card;
    this.attribute = ''
    this.stType = ''
    this.mType = ''

    if (this.card?.cardtype == "Normal Trap" || this.card?.cardtype == "Counter Trap" || this.card?.cardtype == "Continuous Trap") {
      this.monster = 'False';
      this.attribute = "assets/cardstats/TRAP.png";

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

    else if (this.card?.cardtype == "Normal Spell" || this.card?.cardtype == "Quick Spell" || this.card?.cardtype == "Continuous Spell" ||
      this.card?.cardtype == "Ritual Spell" || this.card?.cardtype == "Field Spell" || this.card?.cardtype == "Equip Spell") {
      this.monster = 'False';
      this.attribute = "assets/cardstats/SPELL.png";

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



    else {
      this.monster = 'True';
      switch (this.card?.attribute) {
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

  GoToDeckEditor() {
    this.customcardsService.SetDeckEditorUserDraft(this.sortedList);
    this.router.navigate(['/deck-editor'])
  }


  exportList() {

    this.xml_file = '<?xml version="1.0" encoding="utf-8" ?> <deck name=".TriType"><main>';

    for (const card of this.currentDraft) {
      if (card.cardtype != "Fusion Monster") {
        this.xml_file += '<card id="' + String(card.id) + '" passcode="">' + card.name + '</card>'
      }

    }
    this.xml_file += "</main><side></side><extra>"
    for (const card of this.currentDraft) {
      if (card.cardtype == "Fusion Monster") {
        this.xml_file += '<card id="' + String(card.id) + '" passcode="">' + card.name + '</card>'
      }
    }
    this.xml_file += "</extra></deck>"
    console.log(this.xml_file);

    let blob = new Blob([this.xml_file], { type: "text/xml" });

    FileSaver.saveAs(blob, "cardlist.xml");







  }
}
