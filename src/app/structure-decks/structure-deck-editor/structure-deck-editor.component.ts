import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Card, CustomcardsService, Draft, Decklist, DeckListCard, importDecklist, Pack, PackCard, Pack2, HoveredCardDetails } from 'src/app/customcards.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import * as FileSaver from 'file-saver';
import { AuthService } from 'src/app/auth/services/auth.service';
import { forkJoin } from 'rxjs';
import { Editor, Toolbar } from 'ngx-editor';
import { toHTML } from 'ngx-editor';
@Component({
  selector: 'app-structure-deck-editor',
  templateUrl: './structure-deck-editor.component.html',
  styleUrls: ['./structure-deck-editor.component.css']
})
export class StructureDeckEditorComponent implements OnInit {

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  done:boolean=false;
  xml_file: string = "";
  all_cards!:Card[];
  @Input() cards!: Card[];
  currentPage = 1;
  currentCards!:Card[];
  currentID!:string;

  mainOrSide:string = 'Main';

  currentCommons: Card[] = [];
  currentRare: Card[] = [];
  currentSuper: Card[] = [];
  currentUltra: Card[] = [];
  currentSecret: Card[] = [];
  rarity:string="common";

  draftName!:string;
  html!: 'asdasd';
  theInnerHTML!:any;

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

    ]),
    cost: new FormControl(50,[Validators.required,Validators.min(50)]),
    packImage: new FormControl(File),
    packdescription: new FormControl(null, [Validators.required,Validators.min(1)]),
  })
  editor!: Editor;

  submitVerified = false;
  submitted = false;
  submitfail: boolean = false;

  get f(){return this.draftData.controls;}


  constructor(private route: ActivatedRoute,public _authService:AuthService,private customcardsService:CustomcardsService,private _router:Router) { }

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
  deckInfo!:any;
  card!: Card;
  monster!:string;
  attribute!:string;
  stType!:string;
  mType!:string;


  creator!:string;
  creatorid!:string;

  decklist!:DeckListCard[];
  decklistinfo!:importDecklist;

  uploadedMain:any[] =[]
  uploadedSide:any[]=[]
  uploadedExtra:any[]=[]

  deckid!:number;


  @Input() drafting:boolean=true;

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur  = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }


  ngOnInit(): void {
    const current = new Date();
    this.timestamp = current.getTime();
    this.editor = new Editor();

    this.uploadedMain= this.customcardsService.getUploadedMain()
    this.uploadedSide= this.customcardsService.getUploadedSide()
    this.uploadedExtra= this.customcardsService.getUploadedExtra()


    this.route.paramMap.subscribe((paramMap)=>{
      this.deckid = Number(paramMap.get('deckid'));




      this.customcardsService.getPackInfoByID(this.deckid).subscribe(
        res=>{
            this.deckInfo=res;
            this.editor.setContent(this.deckInfo['packdescription']);



                this.draftData.controls['draftTitle'].setValue(this.deckInfo['title'])
                this.draftData.controls['cost'].setValue(this.deckInfo['cost'])
                this.draftData.controls['packdescription'].setValue(this.deckInfo['packdescription'])
            console.log(this.deckInfo)
            this.customcardsService.getCustomCards().subscribe(
              res => {
                if(res){}
                this.cards = res;
                this.all_cards = this.cards;
                this.getCardNumbers(this.currentPage);
                this.hideloader();

                this.customcardsService.getCustomCardsByPack(this.deckid).subscribe(
                  (data:any)=>{
                    let decklist = data;
                    console.log(decklist)
                    for(let card of decklist){

                      console.log(card['id'])
                      let originalCard = this.all_cards.find(x => x.id === card['id']);
                      if(originalCard!=undefined){
                        this.editAddCard(originalCard,card['rarity'])
                      }


                    }

                  }

                )





              }
            )




        }
    )




    })














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
  timestamp: number = 0;
  getTimeStamp(){
    return this.timestamp;
  }

  submitSearch(){
    var div = document.getElementById('Loading')
    if(div){
      div.style.display = "block"
      console.log(div)
    }
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
        this.filters['cardtype']!="Tuner Monster" &&
        this.filters['cardtype']!="Gemini Monster" &&
        this.filters['cardtype']!="Xyz Monster"){
          this.filters['cardtype']=''
        }
      }

      if(this.filters['initial']=='Spell'){
        this.filters['monstertype']=''
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
        this.filters['monstertype']=''
        if(this.filters['cardtype']!="Normal Trap" &&
        this.filters['cardtype']!="Continuous Trap"&&
        this.filters['cardtype']!="Counter Trap"){
          this.filters['cardtype']=''
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

  produceSearchRes(){
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
    let search_res= this.all_cards;
    if(this.filters['name']!=''){
      search_res=search_res.filter((card)=>card.name.toLowerCase().includes(this.filters['name'].toLowerCase()))
    }
    if(this.filters['desc']!=''){
      search_res=search_res.filter((card)=>card.effect.toLowerCase().includes(this.filters['desc'].toLowerCase()))
    }
    if(this.filters['creator']!=''){
      search_res=search_res.filter((card)=>card.creator.toLowerCase().includes(this.filters['creator'].toLowerCase()))
    }
    if(this.filters['attribute']!=''){
      search_res=search_res.filter((card)=>card.attribute!=undefined)
      search_res=search_res.filter((card)=>card.attribute.toLowerCase().includes(this.filters['attribute'].toLowerCase()))
    }
    if(this.filters['initial']!=''){
      if(this.filters['cardtype']!=''){
        search_res=search_res.filter((card)=>card.cardtype.toLowerCase().includes(this.filters['cardtype'].toLowerCase()))
      }
      else{
        search_res=search_res.filter((card)=>card.cardtype.toLowerCase().includes(this.filters['initial'].toLowerCase()))
      }
    }
    if(this.filters['monstertype']!=''){
      search_res=search_res.filter((card)=>card.cardtype.toLowerCase().includes('monster'))
      search_res=search_res.filter((card)=>card.type!=undefined)
      search_res=search_res.filter((card)=>card.type.toLowerCase().includes(this.filters['monstertype'].toLowerCase()))
    }

    if(this.filters['levellow']!=''){
      if(this.filters['levelhigh']!=''){
        let levellow = Number(this.filters['levellow'])
        let levelhigh = Number(this.filters['levelhigh'])
        search_res=search_res.filter((card)=>card.level >=levellow && card.level <=levelhigh)
      }
      else{
        let levellow = Number(this.filters['levellow'])
        search_res=search_res.filter((card)=>card.level ==levellow)
      }
    }
    else if(this.filters['levelhigh']!=''){
        let levelhigh = Number(this.filters['levelhigh'])
        search_res=search_res.filter((card)=>card.level <=levelhigh)
    }


    if(this.filters['atklow']!=''){
      if(this.filters['atkhigh']!=''){
        let atklow = Number(this.filters['atklow'])
        let atkhigh = Number(this.filters['atkhigh'])
        search_res=search_res.filter((card)=>card.atk >=atklow && card.atk <=atkhigh)
      }
      else{
        let atklow = Number(this.filters['atklow'])
        search_res=search_res.filter((card)=>card.atk ==atklow)
      }
    }
    else if(this.filters['atkhigh']!=''){
        let atkhigh = Number(this.filters['atkhigh'])
        search_res=search_res.filter((card)=>card.atk <=atkhigh)
    }





    if(this.filters['deflow']!=''){
      if(this.filters['defhigh']!=''){
        let deflow = Number(this.filters['deflow'])
        let defhigh = Number(this.filters['defhigh'])
        search_res=search_res.filter((card)=>card.def >=deflow && card.def <=defhigh)
      }
      else{
        let deflow = Number(this.filters['deflow'])
        search_res=search_res.filter((card)=>card.def ==deflow)
      }
    }
    else if(this.filters['defhigh']!=''){
        let defhigh = Number(this.filters['defhigh'])
        search_res=search_res.filter((card)=>card.def <=defhigh)
    }

    if(this.filters['sort']!=''){
      switch(this.filters['sort']){
        case 'c.id ASC':{
          search_res.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
          break;
        }
        case 'c.id DESC':{
          search_res.sort((a,b) => (a.id > b.id) ? -1 : ((b.id > a.id) ? 1 : 0))
          break;
        }

        case 'c.name ASC':{
          search_res.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
          break;
        }
        case 'c.name DESC':{
          search_res.sort((a,b) => (a.name > b.name) ? -1 : ((b.name > a.name) ? 1 : 0))
          break;
        }

        case 'c.level ASC':{
          search_res.sort((a,b) => (a.level > b.level) ? 1 : ((b.level > a.level) ? -1 : 0))
          break;
        }
        case 'c.level DESC':{
          search_res.sort((a,b) => (a.level > b.level) ? -1 : ((b.level > a.level) ? 1 : 0))
          break;
        }


        case 'c.ATK ASC':{
          search_res.sort((a,b) => (a.atk > b.atk) ? 1 : ((b.atk > a.atk) ? -1 : 0))
          break;
        }
        case 'c.ATK DESC':{
          search_res.sort((a,b) => (a.atk > b.atk) ? -1 : ((b.atk > a.atk) ? 1 : 0))
          break;
        }

        case 'c.DEF ASC':{
          search_res.sort((a,b) => (a.def > b.def) ? 1 : ((b.def > a.def) ? -1 : 0))
          break;
        }
        case 'c.DEF DESC':{
          search_res.sort((a,b) => (a.def > b.def) ? -1 : ((b.def > a.def) ? 1 : 0))
          break;
        }



        default:{
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

  getCardNumbers(page:number){
    this.currentCards = [];
    const cardmin = (page-1)*36;
    const cardmax = (page * 36) - 1;

    for (let i = cardmin; i <= cardmax; i++) {
      console.log(cardmin,' ',cardmax);
      this.currentCards.push(this.cards[i]);
    }

    console.log(this.currentCards)


  }

  nextPage(){
    this.currentPage +=1;
    this.getCardNumbers(this.currentPage);
  }

  prevPage(){
    this.currentPage -=1;
    this.getCardNumbers(this.currentPage);
  }
  hideloader() {
    var div = document.getElementById('Loading')
    if(div){
      div.style.display = "none"
      console.log(div)
    }

  }



addTo(type:string){
  this.mainOrSide = type;
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
      console.log(card)
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
        this.addRarity(card)

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
        this.addRarity(card);
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

  addRarity(card:Card){
    switch(this.rarity){
      case "common":{
        this.currentCommons.push(card);
        break;
      }
      case "rare":{
        this.currentRare.push(card);
        break;
      }
      case "super":{
        this.currentSuper.push(card);
        break;
      }
      case "ultra":{
        this.currentUltra.push(card);
        break;
      }
      case "secret":{
        this.currentSecret.push(card);
        break;
      }
    }
    console.log(this.currentCommons);
    console.log(this.currentRare);
    console.log(this.currentSuper);
    console.log(this.currentUltra);
    console.log(this.currentSecret);
  }


  editAddRarity(card:Card,rarity:string){
    switch(rarity){
      case "common":{
        this.currentCommons.push(card);
        break;
      }
      case "rare":{
        this.currentRare.push(card);
        break;
      }
      case "super":{
        this.currentSuper.push(card);
        break;
      }
      case "ultra":{
        this.currentUltra.push(card);
        break;
      }
      case "secret":{
        this.currentSecret.push(card);
        break;
      }
    }
    console.log(this.currentCommons);
    console.log(this.currentRare);
    console.log(this.currentSuper);
    console.log(this.currentUltra);
    console.log(this.currentSecret);
  }
  editAddCard(card:Card,rarity:string){
    if(card!=undefined){
      console.log(card)
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
        this.editAddRarity(card,rarity)

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
        this.editAddRarity(card,rarity)
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

  removeRarity(card:Card){
    let index = this.currentCommons.findIndex(obj => obj.id === card?.id)
    if (index > -1) {
      this.currentCommons.splice(index, 1);
    }
     index = this.currentRare.findIndex(obj => obj.id === card?.id)
    if (index > -1) {
      this.currentRare.splice(index, 1);
    }
     index = this.currentSuper.findIndex(obj => obj.id === card?.id)
    if (index > -1) {
      this.currentSuper.splice(index, 1);
    }
     index = this.currentUltra.findIndex(obj => obj.id === card?.id)
    if (index > -1) {
      this.currentUltra.splice(index, 1);
    }
     index = this.currentSecret.findIndex(obj => obj.id === card?.id)
    if (index > -1) {
      this.currentSecret.splice(index, 1);
    }

    console.log(this.currentCommons);
    console.log(this.currentRare);
    console.log(this.currentSuper);
    console.log(this.currentUltra);
    console.log(this.currentSecret);
  }



  addSideCard(card:Card){
    console.log(card)
    if(card!=undefined){
      if(card.cardtype=="Fusion Monster" || card.cardtype=="Xyz Monster"|| card.cardtype=="Synchro Monster"){
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
    console.log(this.sideDeck)
    const index = this.sideDeck.findIndex(obj => obj.id === card?.id)
    if (index > -1) {
      this.sideDeck.splice(index, 1);
      this.sideCounter--;
    }


  }

  deleteDraftCard(card:Card){
    console.log("in deleteDraftCard!")
    if(card!=undefined){

      if(card.cardtype=="Fusion Monster" || card.cardtype=="Xyz Monster" || card.cardtype=="Synchro Monster"){
        const index = this.extraDeck.findIndex(obj => obj.id === card?.id)
        if (index > -1) {
          this.extraDeck.splice(index, 1);
          this.removeRarity(card)
          this.edCounter--;
        }
      }
      else{
        console.log("Trying to delete!")
        const index = this.mainDeck.findIndex(obj => obj.id === card?.id)
        if (index > -1) {
          this.mainDeck.splice(index, 1);
          this.removeRarity(card)
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
        this.xml_file+='<card id="' + String(card.id) +'" passcode="">'+card.name+'</card>\n'
        idList1.push(card.id)
    }
    this.xml_file+="</main><side>"
    for(const card of this.sideDeck){
     this.xml_file+='<card id="' + String(card.id) +'" passcode="">'+card.name+'</card>\n'
     idList2.push(card.id)
    }
    this.xml_file+="</side><extra>"

    for(const card of this.extraDeck){
        this.xml_file+='<card id="' + String(card.id) +'" passcode="">'+card.name+'</card>\n'
        idList3.push(card.id)
    }
    this.xml_file+="</extra></deck>\n"

    decklist['mainDeck'] = idList1;
    decklist['sideDeck'] = idList2;
    decklist['extraDeck'] = idList3;

    decklist['decklist'] = this.xml_file;
    decklist['creator']=this.creator;
    decklist['creatorid']=Number(this.creatorid);


    if(this.decklistinfo){
      decklist['decklistid'] = this.decklistinfo.id
      console.log("resubmitting decklist..")
      this.customcardsService.resubmitDecklist(decklist)
      .subscribe(
        res=>{
          console.log("JOBS DONE");
          console.log(res);
          this.customcardsService.setProcessingDeck(false);
          this.customcardsService.editDeck(false);
          this.customcardsService.setEditDeckID(-1);
          this.customcardsService.setEditDeckName('')
          this.submitfail = false;
        this._router.navigate(['/decklists']);
        },

        err=>{console.log(err)}
      )
    }
    else{
      console.log("submitting decklist..")
      this.customcardsService.submitDecklist(decklist)
      .subscribe(
        res=>{
          this.submitfail = false;
          this._router.navigate(['/decklists']);
        },

        err=>{console.log(err)}
      )


    }



  }

  exportList(){

    this.xml_file = '<?xml version="1.0" encoding="utf-8" ?>\n<deck name=".TriType">\n <main>\n';

   for(const card of this.mainDeck){
       this.xml_file+='  <card id="' + String(card.id) +'" passcode="">'+card.name+'</card>\n'
   }
   this.xml_file+=" </main>\n <side>\n"
   for(const card of this.sideDeck){
    this.xml_file+='  <card id="' + String(card.id) +'" passcode="">'+card.name+'</card>\n'
   }
   this.xml_file+=" </side>\n <extra>\n"

   for(const card of this.extraDeck){
       this.xml_file+='  <card id="' + String(card.id) +'" passcode="">'+card.name+'</card>\n'
   }
   this.xml_file+=" </extra>\n</deck>\n"
   console.log(this.xml_file);

   let blob = new Blob([this.xml_file], {type: "text/xml"});

   FileSaver.saveAs(blob, "cardlist.xml");







   }

   fileChanged:boolean = false;
   file!:File;
   onFileSelected(event:any) {

     this.file = event.target.files[0];
     this.fileChanged = true;



    }

    saveDraft(){
      var div = document.getElementById('Loading')
      if(div){
        div.style.display = "block"
        console.log(div)
      }
      this.submitted=true;
      if(this.draftData.invalid){
        this.submitfail = true;
        console.log(this.draftData.controls['draftTitle'].value);
        console.log(this.draftData.controls['cost'].value);
        console.log(this.draftData.controls['packdescription'].value);

        console.log("Basic data not filled.")
        return;
      }
      if(this.mainDeck.length<40){
        this.submitfail=true;
        return;
      }
        else{
          const finaldata = {} as Pack2;
        finaldata['packID'] = this.deckInfo['id']
        finaldata['title'] = this.draftData.controls['draftTitle'].value;
        finaldata['creator'] = this.creator;
        finaldata['creatorid'] = Number(this.creatorid);
        finaldata['cost'] = this.draftData.controls['cost'].value;
        finaldata['packurl'] = this.deckInfo['pack']
        finaldata['packdescription'] = this.draftData.controls['packdescription'].value;


        const commonIDs:string[] = []
        const rareIDs:string[] = []
        const superIDs:string[] = []
        const ultraIDs:string[] = []
        const secretIDs:string[] = []



        for (let i = 0; i <= this.currentCommons.length-1; i++) {
          commonIDs.push(this.currentCommons[i].id);
        }
        for (let i = 0; i <= this.currentRare.length-1; i++) {
          rareIDs.push(this.currentRare[i].id);
        }
        for (let i = 0; i <= this.currentSuper.length-1; i++) {
          superIDs.push(this.currentSuper[i].id);
        }
        for (let i = 0; i <= this.currentUltra.length-1; i++) {
          ultraIDs.push(this.currentUltra[i].id);
        }
        for (let i = 0; i <= this.currentSecret.length-1; i++) {
          secretIDs.push(this.currentSecret[i].id);
        }

        finaldata['commonIDs'] = commonIDs;
        finaldata['rareIDs'] = rareIDs;
        finaldata['superIDs'] = superIDs;
        finaldata['ultraIDs'] = ultraIDs;
        finaldata['secretIDs'] = secretIDs;
        finaldata['packSize'] = "structure";







        if(this.fileChanged){
          const formData = new FormData();
          formData.append("thumbnail", this.file);
          formData.append("name",finaldata['packID'].toString())
          this.customcardsService.uploadPackImage(formData).subscribe(res=>{
            finaldata['packurl']=res
            this.customcardsService.resubmitPack(finaldata)
            .subscribe(
              res=>{
                this._router.navigate(['/structure-decks']);
              },

              err=>{console.log(err)}
            )

        },err=>{console.log(err)})



        }
        else{
          this.customcardsService.resubmitPack(finaldata)
          .subscribe(
            res=>{
              console.log(res);
              this._router.navigate(['/structure-decks']);
            },

            err=>{console.log(err)}
          )
        }



        this.submitfail = false;




      }



    }
    autoSelect(rarity:string){
      this.rarity= rarity;
    }
  }
