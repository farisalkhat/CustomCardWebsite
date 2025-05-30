import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Card, CustomcardsService, HoveredCardDetails, Draft } from 'src/app/customcards.service';
import { toHTML,toDoc } from 'ngx-editor';
import { Observable, Subject } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/deactivate-component.guard';
@Component({
  selector: 'app-draft-editor',
  templateUrl: './draft-editor.component.html',
  styleUrls: ['./draft-editor.component.css']
})

export class DraftEditorComponent implements OnInit,CanComponentDeactivate {
    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        

        let result = confirm('You havent finished opening your packs, are you sure you want to leave?');
        if(result){
          this.customcardsService.cardlistEvent.next([])
        }
      
      return true;
    }
  cards!: Card[];
  currentPage = 1;
  currentCards!:Card[];
  draftid!: number;
  draft:any = {};
  draftInfo:any;
  customDraft: [] = [];

  draftSize:number = 0;

  draftName!:string;


  currentDraft: Card[] = [];
  deletedDraftCards: Card[] = [];
  addedDraftCards: Card[] = [];

  isHovering: boolean = false;
  hoveredCard!:Card;
  hovermonster!:string;
  hoverattribute!:string;
  hoverstType!:string;
  hovermType!:string;
  leftPosition = 100
  rightPosition = 100


  done:boolean = false;

  draftCard!:Card | undefined;


  draftMode:boolean = true;

  draftData= new FormGroup({
    draftTitle: new FormControl(' ',[
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100)

    ]),
    smallDescription: new FormControl(' ',[
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100)

    ]),

    editorContent: new FormControl(null, [Validators.required]),
  })


  editor!: Editor;
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
  html!: 'asdasd';
  theInnerHTML!:any;

  submitVerified = false;
  submitted = false;
  submitfail: boolean = false;

  get f(){return this.draftData.controls;}



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
  initialBody!:any;
  card: Card | undefined;
  draftImage!:string;
  monster!:string;
  attribute!:string;
  stType!:string;
  mType!:string;

  username!:string;
  id!:number;

  constructor(public route:ActivatedRoute, public _authService:AuthService, public customcardsService:CustomcardsService,private _router:Router) { }
  ngOnInit(): void {






    this.customcardsService.deleteDraftCardEvent.subscribe((data)=>this.deleteDraftCardEvent(data))



    const current = new Date();
    this.editor = new Editor();
    this.timestamp = current.getTime();
    if (this._authService.loggedIn()){

      this._authService.getUser().subscribe(
        res =>{
          console.log(res['username'])
          this.username = res['username']
          this.id = res['id']

          this.route.paramMap.subscribe((paramMap) => {
            this.draftid = Number(paramMap.get('draftid'))
            this.customcardsService.getDraftByID(this.draftid).subscribe(
              res => {
                  console.log(res)
                this.draft = res; 
                this.draftInfo = this.draft['draft_info']
                this.currentDraft = this.draft['cards']
                this.draftSize = this.cards.length;

                console.log(this.currentDraft)
                
                this.emitDraft()

                if(this.draftInfo.ownerid!=this.id){
                  this._router.navigate(['/drafts'])
                }
                this.initialBody=this.draftInfo['description']
                this.editor.setContent(this.initialBody);
                
                if(this.draftInfo['title']!=null){
                  this.draftData.setValue({draftTitle:this.draftInfo['title']});
                }
                if(this.draftInfo['smalldescription']!=null){
                  this.draftData.setValue({smallDescription:this.draftInfo['smalldescription']});
                }
                this.draftData.setValue({editorContent:this.initialBody});
                if(this.draftInfo['title']!=null){
                  this.draftData.setValue({draftTitle:this.draftInfo['title']});
                }


                this.draftImage = this.draftInfo['draftimage']

           
      
              }
            )
      
      
          });







        },
        err => {console.log(err)
        this.username = ''
        this.id = -99999
        this._router.navigate(['/drafts']);
      }
      )


    }
    else{
      this._router.navigate(['/login']);

    }





      this.customcardsService.getCustomCards().subscribe(
        res => {
          if(res){
            this.cards = res;
            this.getCardNumbers(this.currentPage);
            this.hideloader();
          }

        }
      )


      


  }

  draftEmitter: Subject<Card[]>= new Subject<Card[]>();
  emitDraft(){
    this.customcardsService.cardlistEvent.next(this.currentDraft)
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


  timestamp: number = 0;
  getTimeStamp(){
    return this.timestamp;
  }
  hideloader() {
    var div = document.getElementById('Loading')
    if(div){
      div.style.display = "none"
      console.log(div)
    }

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

  addSearchResults(){
    for(const card in this.currentCards){
      this.addCardfromDraft(this.currentCards[card])

    }

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
        this.hideloader();
      },
      err=>{console.log(err)}
    )

  }
  getCardNumbers(page:number){
    this.currentCards = [];
    const cardmin = (page-1)*30;
    const cardmax = (page * 30) - 1;

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

  selectCard(id:string){
    this.card = this.cards.find(x => x.id == id);
  }

  selectDraftImage(id:string){
    const selectedCard = this.cards.find(x => x.id == id);
    if (selectedCard) {
      this.draftImage = selectedCard.id;
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

  addCard(){
    if(this.card!=undefined){
      const index = this.currentDraft.findIndex(obj => obj.id === this.card?.id)
      console.log(index)
        if (index > -1) {
          return;
        }
      this.currentDraft.push(this.card);
      this.addedDraftCards.push(this.card);
      this.emitDraft()
      
    }

  }


  addCardfromDraft(card:Card){
    if(card!=undefined){
      const index = this.currentDraft.findIndex(obj => obj.id === card?.id)
      console.log(index)
        if (index > -1) {
          return;
        }
      this.currentDraft.push(card);
      this.addedDraftCards.push(card);
      this.emitDraft()
    }

  }


  selectDraftCard(card:Card){
    // this.draftCard = this.currentDraft.find(x => x.id == id);
    this.draftCard = card;

  }

  deleteDraftCard(){
    if(this.draftCard!=undefined){

      const index = this.currentDraft.findIndex(obj => obj.id === this.draftCard?.id)
      if (index > -1) {
        this.currentDraft.splice(index, 1);
        this.deletedDraftCards.push(this.draftCard);
        this.emitDraft()
      }


      // var draftCardID: number = +this.draftCard.id;
      // this.currentDraft.splice(draftCardID,1);
      this.draftCard = undefined;
    }
  }
  saveDraft(){
    this.submitted=true;
    var div = document.getElementById('Loading')
    if(div){
      div.style.display = "block"
      console.log(div)
    }
    if(this.draftData.invalid || this.currentDraft.length<100){
      this.submitfail = true;
      console.log("Basic data not filled.")
      return;
    }
    else{

      this.done = true


      const finaldata: { [key: string]: any } = {};
      finaldata['ownerid']=this.id;
      if(this.draftImage!=undefined){
        finaldata['draftimage']= this.draftImage;
      }
      else{
        
          const randID = this.randomIntFromInterval(0,this.currentDraft.length-1)
          let newCard = this.currentDraft[randID]
          finaldata['draftimage'] = newCard['id']

      }


        this.theInnerHTML =  toHTML(this.draftData.controls['editorContent'].value);
        finaldata['title'] = this.draftData.controls['draftTitle'].value;
        finaldata['smalldescription'] = this.draftData.controls['smallDescription'].value;
        finaldata['id']=this.draftid;
        finaldata['description'] = this.theInnerHTML;


      const idList:string[] = []
      const deletedList:string[] = [];
      const addedList:string[] = []; 

      const current = new Date();
      this.timestamp = current.getTime();



      for (let i = 0; i <= this.currentDraft.length-1; i++) {
        idList.push(this.currentDraft[i].id);
      }
      for (let i = 0; i <= this.addedDraftCards.length-1; i++) {
        addedList.push(this.addedDraftCards[i].id);
      }
      for (let i = 0; i <= this.deletedDraftCards.length-1; i++) {
        deletedList.push(this.deletedDraftCards[i].id);
      }

      finaldata['cardIDs'] = idList;
      finaldata['addedCardIDs'] = addedList;
      finaldata['deletedCardIDs'] = deletedList;


      console.log("this is finaldata id:"+finaldata['id']);
      console.log("this is final data");
      console.log(finaldata);


        this.customcardsService.resubmitDraft(finaldata)
        .subscribe(
          res=>{
            this._router.navigate(['/drafts']);
          },

          err=>{console.log(err)}
        )
        this.submitfail = false;

      





    }
  }
  SetDraftMode(mode:boolean){
    this.draftMode=mode;
  }
  rightAddDraftCard($event: { preventDefault: () => void; },card:string){

    if(this.draftMode){
      this.selectCard(card);
      $event.preventDefault();
      this.addCard();
    }
    else{
      this.selectDraftImage(card);
      $event.preventDefault();
    }


  }

  deleteDraftCardEvent(card:any){
    this.selectDraftCard(card)
    this.deleteDraftCard()
  }

  rightDeleteDraftCard($event: { preventDefault: () => void; },card:Card){
    this.selectDraftCard(card);
    $event.preventDefault();
    this.deleteDraftCard();

  } 

  randomIntFromInterval(min:number, max:number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  deleteDraft(){


            let text = "Are you sure you want to delete this draft?";
            if (confirm(text) == true) {

                this.customcardsService.deleteDraft(this.draftid).subscribe(
                  res=>{
                    this._router.navigate(['/drafts']);
                  },
                  err=>{this._router.navigate(['/drafts']);}
                )
            } else {
                text = "You canceled!";
            }
        }
    
}



