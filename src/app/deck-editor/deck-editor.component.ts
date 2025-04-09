import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Card, CustomcardsService, Draft, Decklist, DeckListCard, importDecklist, HoveredCardDetails, DraftCard } from 'src/app/customcards.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import * as FileSaver from 'file-saver';
import { AuthService } from 'src/app/auth/services/auth.service';
import { forkJoin, lastValueFrom, pipe } from 'rxjs';



@Component({
  selector: 'app-deck-editor',
  templateUrl: './deck-editor.component.html',
  styleUrls: ['./deck-editor.component.css']
})
export class DeckEditorComponent implements OnInit {
  xml_file: string = "";
  all_cards!: any[];
  @Input() cards!: any[];
  currentPage = 1;
  currentCards!: any[];
  currentID!: string;

  mainOrSide: string = 'Main';


  draftName!: string;


  currentDraft: any[] = [];

  mainDeck: any[] = [];
  extraDeck: any[] = [];
  sideDeck: any[] = [];

  monsterCounter = 0;
  spellCounter = 0;
  trapCounter = 0;
  edCounter = 0;
  sideCounter = 0;




  uploadCorrectly: boolean = true;
  finishedUploading:boolean = false;


  draftCard!: Card;


  deckDetails = new FormGroup({
    deckname: new FormControl(' ', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100)
    ]),
    deckdescription: new FormControl('placeholder', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100)
    ]),
    decklabel: new FormControl(' ', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100)
    ]),

  })
  get f() { return this.deckDetails.controls; }

  submitVerified = false;
  submitted = false;
  submitfail: boolean = false;




  constructor(public _authService: AuthService, private customcardsService: CustomcardsService, private _router: Router) { }

  deckname: string = "placeholder";
  deckdescription: string = "placeholder";
  decklabel:string = "placeholder";

  filters = {
    'name': '',
    'desc': '',
    'creator': '',
    'attribute': '',
    'initial': '',
    'cardtype': '',
    'monstertype': '',
    'levellow': '',
    'levelhigh': '',
    'atklow': '',
    'atkhigh': '',
    'deflow': '',
    'defhigh': '',
    'tag': '',
    'sort': 'c.name ASC',

  }

  card!: any;
  monster!: string;
  attribute!: string;
  stType!: string;
  mType!: string;


  creator!: string;
  creatorid!: string;

  decklist!: DeckListCard[];
  decklistinfo!: importDecklist;

  uploadedMain: any[] = []
  uploadedSide: any[] = []
  uploadedExtra: any[] = []


  defaultRules: string = "default";

  detaileddecklistdescription!:any;
  detailederror:boolean = false;
  sameNameError:boolean = false;


  showDeckButtons:boolean = false;
  showdetaileddeckdescription: boolean = true;
  setthumbnailmode: boolean = false;
  thumbnail:number = 0;

  @Input() drafting: boolean = true;
  username!:string;
  id!:number;
  decklists!:importDecklist[];
  editing:boolean = false;
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }


  ToggleDeckButtons(){
    this.showDeckButtons=!this.showDeckButtons;
  }
  GetDeckEditorDetails() {
    this.defaultRules = this.customcardsService.defaultDeckEditor
    this.customcardsService.receiveDecklistDetailsEvent.subscribe((data)=>{
      this.detaileddecklistdescription = data;
      console.log("blahlablal");
      console.log(this.detaileddecklistdescription.id)
    })



    if (this.customcardsService.defaultDeckEditor == "default") {
      this.customcardsService.getCustomCards().subscribe(res => {
        this.cards = res;
        this.DoTheMagic();
      })
    }

    if (this.customcardsService.defaultDeckEditor == "collection") {
      this.customcardsService.getCollectionCardsByCreatorID(this.customcardsService.deckEditorID).subscribe(
        res => {
          this.cards = res;
          this.DoTheMagic();
        }
      )
    }

    if (this.customcardsService.defaultDeckEditor == "binder") {
      this.customcardsService.getCardsByBinderID(this.customcardsService.deckEditorID).subscribe(
        res => {
          this.cards = res;
          this.DoTheMagic();
        }
      )
    }

    if (this.customcardsService.defaultDeckEditor == "draft") {
      this.cards = this.customcardsService.deckEditorCards;
    }


    this.DoTheMagic();
  }

  DoTheMagic() {
    this.uploadedMain = this.customcardsService.getUploadedMain()
    this.uploadedSide = this.customcardsService.getUploadedSide()
    this.uploadedExtra = this.customcardsService.getUploadedExtra()
    this.defaultRules = this.customcardsService.GetDeckEditorRule();
    console.log(this.cards);
    console.log(this.defaultRules);
    this.all_cards = this.cards;
    this.getCardNumbers(this.currentPage);
    this.hideloader();


    //First checks if it is in the middle of editing a decklist.
    if (this.customcardsService.getProcessingDeck() == false) {
      //Checks if there is a decklist saved.
      if (this.customcardsService.getEditDecklist() && this.customcardsService.getEditDeckID() != -1) {
        forkJoin(
          this.customcardsService.getDecklistInfo(this.customcardsService.getEditDeckID()),
          this.customcardsService.getDecklist(this.customcardsService.getEditDeckID()),
        ).subscribe(([deckInfo, decklist]) => {
          //Retrieves and sets decklist info.
          this.decklistinfo = deckInfo;
          this.decklist = decklist;
          console.log("decklistinfo: " + this.decklistinfo.id)
          this.uploadedMain = this.customcardsService.getUploadedMain()
          this.uploadedSide = this.customcardsService.getUploadedSide()
          this.uploadedExtra = this.customcardsService.getUploadedExtra()

          // for (let card in decklist) {
          //   if (decklist[card].deck == "maindeck" || decklist[card].deck == "extradeck") {
          //     this.addCard(decklist[card])
          //   }
          //   else {
          //     this.addSideCard(decklist[card])
          //   }
          // }
          this.deckDetails.controls['deckname'].setValue(this.customcardsService.getEditDeckName());
          this.deckDetails.controls['decklabel'].setValue(this.decklistinfo.label);
        })
        this.customcardsService.setProcessingDeck(true);
        console.log("Processing deck set to true.")

      }

    }
    else {
      console.log("Processing deck set to false")
      this.customcardsService.setProcessingDeck(false);
      this.customcardsService.editDeck(false);
      this.customcardsService.setEditDeckID(-1);
      this.customcardsService.setEditDeckName('')
      this.customcardsService.uploadDecklist([],[],[]);
      this.editing=false;
    }

    if (this.uploadedMain.length > 0 || this.uploadedSide.length > 0 || this.uploadedExtra.length > 0) {
      console.log(this.uploadedMain);
      for (let card in this.uploadedMain) {
        this.addCard(this.uploadedMain[card])
      }
      for (let card in this.uploadedSide) {
        this.addSideCard(this.uploadedSide[card])
      }
      for (let card in this.uploadedExtra) {
        this.addCard(this.uploadedExtra[card])
      }

    }
    this._authService.getUser().subscribe(
      res => {
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


  ngOnInit() {
    if(this.customcardsService.getProcessingDeck() == true){
      this.customcardsService.setProcessingDeck(false);
      this.customcardsService.editDeck(false);
      this.customcardsService.setEditDeckID(-1);
      this.customcardsService.setEditDeckName('')
      this.customcardsService.uploadDecklist([],[],[]);
      this.editing=false;
    }

    if (this._authService.loggedIn()){
      this._authService.getUser().subscribe(
        res =>{
          console.log('this is user:'+res['id'])
          this.username = res['username']
          this.id = res['id']
          this.customcardsService.getDecklistsFromUser(this.id).subscribe(
            res=>{
              this.decklists=res;
              console.log(this.decklists)
            }
          )
        }
          
          )
        
        }

    this.GetDeckEditorDetails();
    const current = new Date();
    this.timestamp = current.getTime();
    console.log(this.cards)



  }

  timestamp: number = 0;
  getTimeStamp(){
    return this.timestamp;
  }

  submitSearch() {
    var div = document.getElementById('Loading')
    if (div) {
      div.style.display = "block"
      console.log(div)
    }
    console.log(this.filters)
    this.cards = []
    this.attribute = '';
    this.stType = ''
    this.mType = '';
    this.monster = 'None';

    if (this.filters.levelhigh == null) { this.filters.levelhigh = '' }
    if (this.filters.levellow == null) { this.filters.levellow = '' }
    if (this.filters.atklow == null) { this.filters.atklow = '' }
    if (this.filters.atkhigh == null) { this.filters.atkhigh = '' }
    if (this.filters.deflow == null) { this.filters.deflow = '' }
    if (this.filters.defhigh == null) { this.filters.defhigh = '' }




    if (this.filters['initial'] == '') {
      this.filters['cardtype'] == '';
      this.filters['defhigh'] == '';
      this.filters['deflow'] == '';
      this.filters['levelhigh'] == '';
      this.filters['levellow'] == '';
      this.filters['monstertype'] == '';
      this.filters['atkhigh'] == '';
      this.filters['atklow'] == '';
    }
    if (this.filters['initial'] != 'Monster') {
      if (this.filters['sort'] == 'c.level ASC' || this.filters['sort'] == 'c.level DESC' ||
        this.filters['sort'] == 'c.ATK ASC' || this.filters['sort'] == 'c.ATK DESC' ||
        this.filters['sort'] == 'c.DEF ASC' || this.filters['sort'] == 'c.DEF DESC') {
        this.filters['sort'] = 'c.name ASC';
      }






    }

    if (this.filters['initial'] == 'Monster') {
      if (this.filters['cardtype'] != "Effect Monster" &&
        this.filters['cardtype'] != "Flip Monster" &&
        this.filters['cardtype'] != "Fusion Monster" &&
        this.filters['cardtype'] != "Ritual Monster" &&
        this.filters['cardtype'] != "Union Monster" &&
        this.filters['cardtype'] != "Synchro Monster" &&
        this.filters['cardtype'] != "Tuner Monster" &&
        this.filters['cardtype'] != "Gemini Monster" &&
        this.filters['cardtype'] != "Xyz Monster") {
        this.filters['cardtype'] = ''
      }
    }

    if (this.filters['initial'] == 'Spell') {
      this.filters['monstertype'] = ''
      this.filters['attribute']= ''
      this.filters['levellow'] = ''
      this.filters['levelhigh'] = ''  
      this.filters['atklow'] = ''
      this.filters['atkhigh'] = ''
      this.filters['deflow'] = ''
      this.filters['defhigh'] = ''


      if (this.filters['cardtype'] != "Normal Spell" &&
        this.filters['cardtype'] != "Continuous Spell" &&
        this.filters['cardtype'] != "Quick Spell" &&
        this.filters['cardtype'] != "Ritual Spell" &&
        this.filters['cardtype'] != "Equip Spell" &&
        this.filters['cardtype'] != "Field Spell") {
        this.filters['cardtype'] = ''
      }
    }

    if (this.filters['initial'] == 'Trap') {
      this.filters['monstertype'] = ''
      this.filters['monstertype'] = ''
      this.filters['attribute']= ''
      this.filters['levellow'] = ''
      this.filters['levelhigh'] = ''  
      this.filters['atklow'] = ''
      this.filters['atkhigh'] = ''
      this.filters['deflow'] = ''
      this.filters['defhigh'] = ''
      if (this.filters['cardtype'] != "Normal Trap" &&
        this.filters['cardtype'] != "Continuous Trap" &&
        this.filters['cardtype'] != "Counter Trap") {
        this.filters['cardtype'] = ''
      }
    }


    this.produceSearchRes()
    // this.customcardsService.getFilteredCards(this.filters).subscribe(
    //   res=>{

    //     console.log(res)
    //     this.cards = res;
    //     this.currentPage = 1

    //     this.getCardNumbers(this.currentPage);
    //     this.hideloader();
    //   },
    //   err=>{console.log(err)}
    // )

  }

  produceSearchRes() {
    // filters = {
    //   'name':'',
    //   'desc':'',
    //   'creator':'',
    //   'attribute':'',
    //   'initial':'',
    //   'cardtype':'',
    //   'monstertype':'',
    //   'levellow':'',
    //   'levelhigh':'',
    //   'atklow':'',
    //   'atkhigh':'',
    //   'deflow':'',
    //   'defhigh':'',
    //   'tag':'',
    //   'sort':'c.name ASC',

    // }
    console.log(this.filters)
    let search_res = this.all_cards;
    if (this.filters['name'] != '') {
      search_res = search_res.filter((card) => card.name.toLowerCase().includes(this.filters['name'].toLowerCase()))
    }
    if (this.filters['desc'] != '') {
      search_res = search_res.filter((card) => card.effect.toLowerCase().includes(this.filters['desc'].toLowerCase()))
    }
    if (this.filters['creator'] != '') {
      search_res = search_res.filter((card) => card.creator.toLowerCase().includes(this.filters['creator'].toLowerCase()))
    }
    if (this.filters['attribute'] != '') {
      search_res = search_res.filter((card) => card.attribute != undefined)
      search_res = search_res.filter((card) => card.attribute.toLowerCase().includes(this.filters['attribute'].toLowerCase()))
    }
    if (this.filters['initial'] != '') {
      if (this.filters['cardtype'] != '') {
        search_res = search_res.filter((card) => card.cardtype.toLowerCase().includes(this.filters['cardtype'].toLowerCase()))
      }
      else {
        search_res = search_res.filter((card) => card.cardtype.toLowerCase().includes(this.filters['initial'].toLowerCase()))
      }
    }
    if (this.filters['monstertype'] != '') {
      search_res = search_res.filter((card) => card.cardtype.toLowerCase().includes('monster'))
      search_res = search_res.filter((card) => card.type != undefined)
      search_res = search_res.filter((card) => card.type.toLowerCase().includes(this.filters['monstertype'].toLowerCase()))
    }

    if (this.filters['levellow'] != '') {
      if (this.filters['levelhigh'] != '') {
        let levellow = Number(this.filters['levellow'])
        let levelhigh = Number(this.filters['levelhigh'])
        search_res = search_res.filter((card) => card.level >= levellow && card.level <= levelhigh)
      }
      else {
        let levellow = Number(this.filters['levellow'])
        search_res = search_res.filter((card) => card.level == levellow)
      }
    }
    else if (this.filters['levelhigh'] != '') {
      let levelhigh = Number(this.filters['levelhigh'])
      search_res = search_res.filter((card) => card.level <= levelhigh)
    }


    if (this.filters['atklow'] != '') {
      if (this.filters['atkhigh'] != '') {
        let atklow = Number(this.filters['atklow'])
        let atkhigh = Number(this.filters['levelhigh'])
        search_res = search_res.filter((card) => card.atk >= atklow && card.atk <= atkhigh)
      }
      else {
        let atklow = Number(this.filters['atklow'])
        search_res = search_res.filter((card) => card.atk == atklow)
      }
    }
    else if (this.filters['atkhigh'] != '') {
      let atkhigh = Number(this.filters['atkhigh'])
      search_res = search_res.filter((card) => card.atk <= atkhigh)
    }





    if (this.filters['deflow'] != '') {
      if (this.filters['defhigh'] != '') {
        let deflow = Number(this.filters['deflow'])
        let defhigh = Number(this.filters['defhigh'])
        search_res = search_res.filter((card) => card.def >= deflow && card.def <= defhigh)
      }
      else {
        let deflow = Number(this.filters['deflow'])
        search_res = search_res.filter((card) => card.def == deflow)
      }
    }
    else if (this.filters['defhigh'] != '') {
      let defhigh = Number(this.filters['defhigh'])
      search_res = search_res.filter((card) => card.def <= defhigh)
    }

    if (this.filters['sort'] != '') {
      switch (this.filters['sort']) {
        case 'c.id ASC': {
          search_res.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
          break;
        }
        case 'c.id DESC': {
          search_res.sort((a, b) => (a.id > b.id) ? -1 : ((b.id > a.id) ? 1 : 0))
          break;
        }

        case 'c.name ASC': {
          search_res.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
          break;
        }
        case 'c.name DESC': {
          search_res.sort((a, b) => (a.name > b.name) ? -1 : ((b.name > a.name) ? 1 : 0))
          break;
        }

        case 'c.level ASC': {
          search_res.sort((a, b) => (a.level > b.level) ? 1 : ((b.level > a.level) ? -1 : 0))
          break;
        }
        case 'c.level DESC': {
          search_res.sort((a, b) => (a.level > b.level) ? -1 : ((b.level > a.level) ? 1 : 0))
          break;
        }


        case 'c.ATK ASC': {
          search_res.sort((a, b) => (a.atk > b.atk) ? 1 : ((b.atk > a.atk) ? -1 : 0))
          break;
        }
        case 'c.ATK DESC': {
          search_res.sort((a, b) => (a.atk > b.atk) ? -1 : ((b.atk > a.atk) ? 1 : 0))
          break;
        }

        case 'c.DEF ASC': {
          search_res.sort((a, b) => (a.def > b.def) ? 1 : ((b.def > a.def) ? -1 : 0))
          break;
        }
        case 'c.DEF DESC': {
          search_res.sort((a, b) => (a.def > b.def) ? -1 : ((b.def > a.def) ? 1 : 0))
          break;
        }



        default: {
          break;
        }




      }

    }

    this.cards = search_res;
    this.currentPage = 1
    this.getCardNumbers(this.currentPage);
    this.hideloader();


    //this.searchName=this.filters['name']
    //this.cards=this.originalCards.filter((card)=>card.name.toLowerCase().includes(this.searchName.toLowerCase()))
  }

  getCardNumbers(page: number) {
    this.currentCards = [];
    const cardmin = (page - 1) * 36;
    const cardmax = (page * 36) - 1;

    for (let i = cardmin; i <= cardmax; i++) {
      console.log(cardmin, ' ', cardmax);
      this.currentCards.push(this.cards[i]);
    }

    console.log(this.currentCards)


  }

  nextPage() {
    this.currentPage += 1;
    this.getCardNumbers(this.currentPage);
  }

  prevPage() {
    this.currentPage -= 1;
    this.getCardNumbers(this.currentPage);
  }
  hideloader() {
    var div = document.getElementById('Loading')
    if (div) {
      div.style.display = "none"
      console.log(div)
    }

  }



  addTo(type: string) {
    this.mainOrSide = type;
  }

  goToLink(id: string | undefined) {
    const url = this._router.serializeUrl(
      this._router.createUrlTree([`/cards/${id}`])
    );

    window.open(url, '_blank');
  }
  // goToLink(url: string){

  //   let new_url =''

  //   if(this._router['location']._platformLocation.location.origin=='http://localhost:4200'){
  //      new_url = this._router.serializeUrl(
  //       this._router.createUrlTree(['/cards/']));
  //   }
  //   else{
  //      new_url = this._router.serializeUrl(
  //     this._router.createUrlTree(['/cards/']));
  //   }



  //   window.open(new_url +'/'+url, '_blank');


  //   // const newurl = 'https://www.duelingbook.com/card?id='+url
  //   // window.open(newurl, "_blank");
  // }
  mouseHovering(card: Card, e: MouseEvent) {
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







  showDetails(card: Card) {
    this.card = card;
    console.log(this.card)
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

  addCard(card: Card) {
    if (card != undefined) {
      console.log(card)
      if (card.cardtype == "Fusion Monster" || card.cardtype == "Xyz Monster" || card.cardtype == "Synchro Monster") {
        if (this.extraDeck.length == 15) {
          return;
        }
        var duplicates = 0;
        for (const cardFrom of this.extraDeck) {
          if (card.name == cardFrom.name) {
            duplicates += 1;
            if (duplicates == 3) {
              return;
            }
          }
        }
        this.extraDeck.push(card)
        this.edCounter++;
      }
      else if (this.mainDeck.length != 60) {

        var duplicates = 0;
        for (const cardFrom of this.mainDeck) {
          if (card.name == cardFrom.name) {
            duplicates += 1;
            if (duplicates == 3) {
              return;
            }
          }
        }
        this.mainDeck.push(card);
        if (card.cardtype.includes("Spell")) {
          this.spellCounter++;
        }
        if (card.cardtype.includes("Monster")) {
          this.monsterCounter++;
        }
        if (card.cardtype.includes("Trap")) {
          this.trapCounter++;
        }

      }

    }

  }


  addSideCard(card: Card) {
    console.log(card)
    if (card != undefined) {
      if (card.cardtype == "Fusion Monster" || card.cardtype == "Xyz Monster" || card.cardtype == "Synchro Monster") {
        var duplicates = 0;
        for (const cardFrom of this.extraDeck) {
          if (card.name == cardFrom.name) {
            duplicates += 1;
            if (duplicates == 3) {
              return;
            }
          }
        }
      }
      else {

        var duplicates = 0;
        for (const cardFrom of this.mainDeck) {
          if (card.name == cardFrom.name) {
            duplicates += 1;
            if (duplicates == 3) {
              return;
            }
          }
        }
        for (const cardFrom of this.sideDeck) {
          if (card.name == cardFrom.name) {
            duplicates += 1;
            if (duplicates == 3) {
              return;
            }
          }
        }
        this.sideDeck.push(card);
        this.sideCounter++;

      }

    }
  }



  addCardDraft(card: DraftCard) {
    if (card != undefined) {
      if (card.copies == 0) {
        return;
      }
      console.log(card)
      if (card.cardtype == "Fusion Monster" || card.cardtype == "Xyz Monster" || card.cardtype == "Synchro Monster") {
        if (this.extraDeck.length == 15) {
          return;
        }
        var duplicates = 0;
        for (const cardFrom of this.extraDeck) {
          if (card.name == cardFrom.name) {
            duplicates += 1;
            if (duplicates == 3) {
              return;
            }
          }
        }
        card.copies--;
        this.extraDeck.push(card)
        this.edCounter++;
      }
      else if (this.mainDeck.length != 60) {

        var duplicates = 0;
        for (const cardFrom of this.mainDeck) {
          if (card.name == cardFrom.name) {
            duplicates += 1;
            if (duplicates == 3) {
              return;
            }
          }
        }
        if (card.copies == 0) {
          return;
        }
        card.copies--;
        this.mainDeck.push(card);

        if (card.cardtype.includes("Spell")) {
          this.spellCounter++;
        }
        if (card.cardtype.includes("Monster")) {
          this.monsterCounter++;
        }
        if (card.cardtype.includes("Trap")) {
          this.trapCounter++;
        }

      }

    }

  }


  addSideCardDraft(card: DraftCard) {
    console.log(card)
    if (card != undefined) {
      if (card.cardtype == "Fusion Monster" || card.cardtype == "Xyz Monster" || card.cardtype == "Synchro Monster") {
        var duplicates = 0;
        for (const cardFrom of this.extraDeck) {
          if (card.name == cardFrom.name) {
            duplicates += 1;
            if (duplicates == 3) {
              return;
            }
          }
        }
      }
      else {

        var duplicates = 0;
        for (const cardFrom of this.mainDeck) {
          if (card.name == cardFrom.name) {
            duplicates += 1;
            if (duplicates == 3) {
              return;
            }
          }
        }
        for (const cardFrom of this.sideDeck) {
          if (card.name == cardFrom.name) {
            duplicates += 1;
            if (duplicates == 3) {
              return;
            }
          }
        }
        if (card.copies == 0) {
          return;
        }
        card.copies--;
        this.sideDeck.push(card);
        this.sideCounter++;

      }

    }
  }

  selectDraftCard(card: Card) {
    // this.draftCard = this.currentDraft.find(x => x.id == id);
    this.draftCard = card;

  }

  rightAddDraftCard($event: { preventDefault: () => void; }, card: DraftCard) {

    $event.preventDefault();
    if(this.setthumbnailmode===true){
      this.thumbnail= Number(card.id);
      this.setthumbnailmode=false;
      return;
    }
    this.card = card;

    if (this.mainOrSide == 'Side') {
      this.addSideCardDraft(this.card);
    }
    else {
      this.addCardDraft(this.card);
    }


  }


  rightAddCard($event: { preventDefault: () => void; }, card: Card) {

    $event.preventDefault();
    if(this.setthumbnailmode===true){
      this.thumbnail= Number(card.id);
      this.setthumbnailmode=false;
      return;
    }
    this.card = card;

    if (this.mainOrSide == 'Side') {
      this.addSideCard(this.card);
    }
    else {
      this.addCard(this.card);
    }


  }
  leftAddDraftCard() {
    console.log(this.card);
    this.addCard(this.card);
  }

  leftAddSideCard() {
    console.log(this.card);
    this.addSideCard(this.card);
  }


  rightDeleteCard($event: { preventDefault: () => void; }, card: Card) {
    if(this.setthumbnailmode===true){
      this.thumbnail= Number(card.id);
      this.setthumbnailmode=false;
      return;
    }
    $event.preventDefault();
    this.deleteCard(card);

  }


  rightDeleteSideCard($event: { preventDefault: () => void; }, card: Card) {
    if(this.setthumbnailmode===true){
      this.thumbnail= Number(card.id);
      this.setthumbnailmode=false;
      return;
    }
    $event.preventDefault();
    console.log(this.sideDeck)
    const index = this.sideDeck.findIndex(obj => obj.id === card?.id)
    if (index > -1) {
      this.sideDeck.splice(index, 1);
      this.sideCounter--;
    }


  }

  deleteCard(card: Card) {
    console.log("in deleteDraftCard!")
    if (card != undefined) {

      if (card.cardtype == "Fusion Monster" || card.cardtype == "Xyz Monster" || card.cardtype == "Synchro Monster") {
        const index = this.extraDeck.findIndex(obj => obj.id === card?.id)
        if (index > -1) {
          this.extraDeck.splice(index, 1);
          this.edCounter--;
        }
      }
      else {
        console.log("Trying to delete!")
        const index = this.mainDeck.findIndex(obj => obj.id === card?.id)
        if (index > -1) {
          this.mainDeck.splice(index, 1);
        }
        if (card.cardtype.includes("Spell")) {
          this.spellCounter--;
        }
        if (card.cardtype.includes("Monster")) {
          this.monsterCounter--;
        }
        if (card.cardtype.includes("Trap")) {
          this.trapCounter--;
        }

      }




      // var draftCardID: number = +this.draftCard.id;
      // this.currentDraft.splice(draftCardID,1);

    }
  }




  rightDeleteDraftCard($event: { preventDefault: () => void; }, card: DraftCard) {
    if(this.setthumbnailmode===true){
      this.thumbnail= Number(card.id);
      this.setthumbnailmode=false;
      return;
    }
    $event.preventDefault();
    this.deleteDraftCard(card);

  }


  rightDeleteDraftSideCard($event: { preventDefault: () => void; }, card: DraftCard) {
    if(this.setthumbnailmode===true){
      this.thumbnail= Number(card.id);
      this.setthumbnailmode=false;
      return;
    }
    card.copies++;
    $event.preventDefault();
    console.log(this.sideDeck)
    const index = this.sideDeck.findIndex(obj => obj.id === card?.id)
    if (index > -1) {
      this.sideDeck.splice(index, 1);
      this.sideCounter--;
    }


  }

  deleteDraftCard(card: DraftCard) {
    console.log("in deleteDraftCard!")
    card.copies++;
    if (card != undefined) {

      if (card.cardtype == "Fusion Monster" || card.cardtype == "Xyz Monster" || card.cardtype == "Synchro Monster") {
        const index = this.extraDeck.findIndex(obj => obj.id === card?.id)
        if (index > -1) {
          this.extraDeck.splice(index, 1);
          this.edCounter--;
        }
      }
      else {
        console.log("Trying to delete!")
        const index = this.mainDeck.findIndex(obj => obj.id === card?.id)
        if (index > -1) {
          this.mainDeck.splice(index, 1);
        }
        if (card.cardtype.includes("Spell")) {
          this.spellCounter--;
        }
        if (card.cardtype.includes("Monster")) {
          this.monsterCounter--;
        }
        if (card.cardtype.includes("Trap")) {
          this.trapCounter--;
        }

      }




      // var draftCardID: number = +this.draftCard.id;
      // this.currentDraft.splice(draftCardID,1);

    }
  }


  getFormDetails(){
    console.log(this.deckDetails.controls['deckname'].value);
    console.log(this.deckDetails.controls['deckdescription'].value);
    console.log(this.deckDetails.controls['decklabel'].value);
  }

  uploadList() {
    this.customcardsService.SendDeckListDetails();
    if(this.detaileddecklistdescription==null){
      this.detailederror=true;

      return;
    }
    this.detailederror=false;
    if (this.mainDeck.length < 40 || this.mainDeck.length > 60) {
      this.uploadCorrectly = false;
      return;
    }



    const decklist = {} as Decklist;
    decklist['title'] = this.deckDetails.controls['deckname'].value;
    decklist['desc'] = " ";
    decklist['label']= this.deckDetails.controls['decklabel'].value;
    decklist['public'] = "true"

    this.xml_file = '<?xml version="1.0" encoding="utf-8" ?> <deck name=".TriType"><main>';

    const idList1: string[] = []
    const idList2: string[] = []
    const idList3: string[] = []



    for (const card of this.mainDeck) {
      this.xml_file += '<card id="' + String(card.id) + '" passcode="">' + card.name + '</card>\n'
      idList1.push(card.id)
    }
    this.xml_file += "</main><side>"
    for (const card of this.sideDeck) {
      this.xml_file += '<card id="' + String(card.id) + '" passcode="">' + card.name + '</card>\n'
      idList2.push(card.id)
    }
    this.xml_file += "</side><extra>"

    for (const card of this.extraDeck) {
      this.xml_file += '<card id="' + String(card.id) + '" passcode="">' + card.name + '</card>\n'
      idList3.push(card.id)
    }
    this.xml_file += "</extra></deck>\n"

    decklist['mainDeck'] = idList1;
    decklist['sideDeck'] = idList2;
    decklist['extraDeck'] = idList3;

    decklist['decklist'] = this.xml_file;
    decklist['creator'] = this.creator;
    decklist['creatorid'] = Number(this.creatorid);
    decklist['body'] = this.detaileddecklistdescription;

    if(this.thumbnail==0){

      decklist['thumbnail'] = 3117440;
    }
    else{
      decklist['thumbnail'] = this.thumbnail;
    }

    this.finishedUploading=true;
    console.log(this.customcardsService.getEditDeckID())
    if (this.customcardsService.getEditDeckID()!=undefined && this.customcardsService.getEditDeckID()!=-1) {
      decklist['decklistid'] = this.customcardsService.getEditDeckID()
      console.log("resubmitting decklist..")
      this.customcardsService.resubmitDecklist(decklist)
        .subscribe(
          res => {
            console.log("JOBS DONE");
            console.log(res);
            this.customcardsService.setProcessingDeck(false);
            this.customcardsService.editDeck(false);
            this.customcardsService.setEditDeckID(-1);
            this.customcardsService.setEditDeckName('')
            this.customcardsService.uploadDecklist([],[],[]);
            this.submitfail = false;
            this._router.navigate(['/decklists']);
          },

          err => { console.log(err) }
        )
    }
    else {
      console.log("submitting decklist..")
      this.customcardsService.submitDecklist(decklist)
        .subscribe(
          res => {
            this.submitfail = false;
            this._router.navigate(['/decklists']);
          },

          err => { console.log(err) }
        )


    }



  }

  exportList() {

    this.xml_file = '<?xml version="1.0" encoding="utf-8" ?>\n<deck name=".TriType">\n <main>\n';

    for (const card of this.mainDeck) {
      this.xml_file += '  <card id="' + String(card.id) + '" passcode="">' + card.name + '</card>\n'
    }
    this.xml_file += " </main>\n <side>\n"
    for (const card of this.sideDeck) {
      this.xml_file += '  <card id="' + String(card.id) + '" passcode="">' + card.name + '</card>\n'
    }
    this.xml_file += " </side>\n <extra>\n"

    for (const card of this.extraDeck) {
      this.xml_file += '  <card id="' + String(card.id) + '" passcode="">' + card.name + '</card>\n'
    }
    this.xml_file += " </extra>\n</deck>\n"
    console.log(this.xml_file);

    let blob = new Blob([this.xml_file], { type: "text/xml" });

    FileSaver.saveAs(blob, "cardlist.xml");







  }



  ShowDetailedDeckDescription(){
    console.log("poopie");
    this.showdetaileddeckdescription = !this.showdetaileddeckdescription;
  }
  SetThumbnailMode(){
    this.setthumbnailmode = !this.setthumbnailmode;

  }

  public:string="false";



  LoadDecklist() {
    this.customcardsService.setProcessingDeck(true);
    this.customcardsService.editDeck(true);
    this.customcardsService.setEditDeckID(this.selectedDecklist);

    this.customcardsService.getDecklist(this.selectedDecklist).subscribe(
      res => {
        console.log(res)

        

        this.deckDetails.setValue({
          deckname:this.decklistinfo.name,
          deckdescription:this.decklistinfo.description,
          decklabel:this.decklistinfo.label,
        
        })


        // this.deckDetails.controls['deckname'].setValue(res.title);
        // this.deckDetails.controls['deckdescription'].setValue(res.desc);
        // this.deckDetails.controls['decklabel'].setValue(res.label);
        this.thumbnail = this.decklistinfo.thumbnail;
        this.public = this.decklistinfo.public
        this.sideDeck = [];
        this.mainDeck = [];
        
        this.extraDeck = [];
        this.edCounter = 0;
        this.sideCounter = 0;
        this.monsterCounter = 0;
        this.spellCounter = 0;
        this.trapCounter = 0;

        for (let card in res) {
          if (res[card]['deck']=='sidedeck'){
            this.addSideCard(res[card])
          }
          else{
            this.addCard(res[card])
          }

        }



      })
    }

  SaveDecklist() {
    this.customcardsService.SendDeckListDetails();
    const decklist = {} as Decklist;
    decklist['title'] = this.deckDetails.controls['deckname'].value;
    decklist['desc'] = this.deckDetails.controls['deckdescription'].value;
    decklist['label']= this.deckDetails.controls['decklabel'].value;
    decklist['public'] = this.public
    decklist['thumbnail'] = this.thumbnail

    this.xml_file = '<?xml version="1.0" encoding="utf-8" ?> <deck name=".TriType"><main>';

    const idList1: string[] = []
    const idList2: string[] = []
    const idList3: string[] = []



    for (const card of this.mainDeck) {
      this.xml_file += '<card id="' + String(card.id) + '" passcode="">' + card.name + '</card>\n'
      idList1.push(card.id)
    }
    this.xml_file += "</main><side>"
    for (const card of this.sideDeck) {
      this.xml_file += '<card id="' + String(card.id) + '" passcode="">' + card.name + '</card>\n'
      idList2.push(card.id)
    }
    this.xml_file += "</side><extra>"

    for (const card of this.extraDeck) {
      this.xml_file += '<card id="' + String(card.id) + '" passcode="">' + card.name + '</card>\n'
      idList3.push(card.id)
    }
    this.xml_file += "</extra></deck>\n"

    decklist['mainDeck'] = idList1;
    decklist['sideDeck'] = idList2;
    decklist['extraDeck'] = idList3;

    decklist['decklist'] = this.xml_file;
    decklist['creator'] = this.creator;
    decklist['creatorid'] = Number(this.creatorid);
    decklist['body'] = this.detaileddecklistdescription;
    if (decklist['body']==undefined){
      decklist['body']='<p> </p>'
    }

    if(this.thumbnail==0){

      decklist['thumbnail'] = 3117440;
    }
    else{
      decklist['thumbnail'] = this.thumbnail;
    }

    console.log(decklist)
    this.finishedUploading=true;
    console.log(this.customcardsService.getEditDeckID())
    if (this.customcardsService.getEditDeckID()!=undefined && this.customcardsService.getEditDeckID()!=-1) {
      decklist['decklistid'] = this.customcardsService.getEditDeckID()
      this.customcardsService.resubmitDecklist(decklist)
        .subscribe(
          res => {
            console.log("JOBS DONE");
            console.log(res);

            this.submitfail = false;
            this.customcardsService.getDecklistsFromUser(this.id).subscribe(
              res=>{
                this.decklists=res;
                console.log(this.decklists)
              }
            )
            
          },

          err => { console.log(err) }
        )
    }
    else {
      console.log("submitting decklist..")
      this.customcardsService.submitDecklist(decklist)
        .subscribe(
          res => {
            this.submitfail = false;
            this.customcardsService.getDecklistsFromUser(this.id).subscribe(
              res=>{
                this.decklists=res;
                console.log(this.decklists)
              }
            )
            
          },

          err => { console.log(err) }
        )


    }
    
    
    
  }
  
  SaveDecklistAs() {
    this.customcardsService.SendDeckListDetails();
    const decklist = {} as Decklist;
    console.log("this is deckname:" + this.deckDetails.controls['deckname'].value)
    decklist['title'] = this.deckDetails.controls['deckname'].value;
    decklist['desc'] = this.deckDetails.controls['deckdescription'].value;
    decklist['label']= this.deckDetails.controls['decklabel'].value;
    decklist['public'] = "false"
    decklist['thumbnail'] = this.thumbnail
    

    let res = this.decklists.filter((deck)=>deck.name==decklist['title'])
    console.log(res)

    // if (decklist['title']){
    //   this.sameNameError=true
    //   return
    // }
    // else{
    //   this.sameNameError=false
    // }

    this.xml_file = '<?xml version="1.0" encoding="utf-8" ?> <deck name=".TriType"><main>';

    const idList1: string[] = []
    const idList2: string[] = []
    const idList3: string[] = []



    for (const card of this.mainDeck) {
      this.xml_file += '<card id="' + String(card.id) + '" passcode="">' + card.name + '</card>\n'
      idList1.push(card.id)
    }
    this.xml_file += "</main><side>"
    for (const card of this.sideDeck) {
      this.xml_file += '<card id="' + String(card.id) + '" passcode="">' + card.name + '</card>\n'
      idList2.push(card.id)
    }
    this.xml_file += "</side><extra>"

    for (const card of this.extraDeck) {
      this.xml_file += '<card id="' + String(card.id) + '" passcode="">' + card.name + '</card>\n'
      idList3.push(card.id)
    }
    this.xml_file += "</extra></deck>\n"

    decklist['mainDeck'] = idList1;
    decklist['sideDeck'] = idList2;
    decklist['extraDeck'] = idList3;

    decklist['decklist'] = this.xml_file;
    decklist['creator'] = this.creator;
    decklist['creatorid'] = Number(this.creatorid);
    decklist['body'] = this.detaileddecklistdescription;
    if (decklist['body']==undefined){
      decklist['body']='<p> </p>'
    }


    if(this.thumbnail==0){

      decklist['thumbnail'] = 3117440;
    }
    else{
      decklist['thumbnail'] = this.thumbnail;
    }

    this.finishedUploading=true;

      console.log("submitting decklist..")
      this.customcardsService.submitDecklist(decklist)
        .subscribe(
          res => {
            this.submitfail = false;
            this._router.navigate(['/decklists']);
          },

          err => { console.log(err) }
        )


    



  }
  NewDecklist(){
    this.customcardsService.setProcessingDeck(false);
    this.customcardsService.editDeck(false);
    this.customcardsService.setEditDeckID(-1);
    this.customcardsService.setEditDeckName('')

    this.deckDetails.controls['deckname'].setValue('');
    this.deckDetails.controls['deckdescription'].setValue('');
    this.deckDetails.controls['decklabel'].setValue('');
    this.detaileddecklistdescription = '';
    this.thumbnail = 0;
    this.public = 'false'

    this.sideDeck = [];
    this.mainDeck = [];
    
    this.extraDeck = [];
    this.edCounter = 0;
    this.sideCounter = 0;
    this.monsterCounter = 0;
    this.spellCounter = 0;
    this.trapCounter = 0;
  }
  ClearDecklist(){
    this.sideDeck = [];
    this.mainDeck = [];
    
    this.extraDeck = [];
    this.edCounter = 0;
    this.sideCounter = 0;
    this.monsterCounter = 0;
    this.spellCounter = 0;
    this.trapCounter = 0;
  }
  DeleteDecklist(){

  }

  selectedDecklist = -1;
	SelectedDecklist(event:any): void {
    //console.log(event.target.value);
		this.selectedDecklist = event.target.value
    let index:number = event.target["selectedIndex"];
    this.decklistinfo = this.decklists[index]
	}


}
