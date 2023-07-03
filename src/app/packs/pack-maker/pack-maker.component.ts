import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Card, CustomcardsService, Draft, Pack, Pack2, PackInfo } from 'src/app/customcards.service';


@Component({
  selector: 'app-pack-maker',
  templateUrl: './pack-maker.component.html',
  styleUrls: ['./pack-maker.component.css']
})
export class PackMakerComponent implements OnInit {

  
  cards!: Card[];
  currentPage = 1;
  currentCards!:Card[];
  currentID!:string;


  draftName!:string;
  discordTag!:string;
  creator!:string;


  currentDraft: Card[] = [];

  currentCommons: Card[] = [];
  currentRare: Card[] = [];
  currentSuper: Card[] = [];
  currentUltra: Card[] = [];
  currentSecret: Card[] = [];

  packSize = 'medium'
  cost = 50

  rarity:string="common";

  draftCard!:Card | undefined;


  draftData= new FormGroup({
    draftTitle: new FormControl(' ',[
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100)

    ]),
    discordTag:new FormControl(' ',[
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100)

    ]),
    cost: new FormControl(50,[Validators.required,Validators.min(50)])
  })


  submitVerified = false;
  submitted = false;
  submitfail: boolean = false;

  get f(){return this.draftData.controls;}


  constructor(public _authService: AuthService,private customcardsService:CustomcardsService,private _router:Router) { }

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

  card: Card | undefined;
  monster!:string;
  attribute!:string;
  stType!:string;
  mType!:string;


  common:number= 0;
  rare:number= 0;
  super:number= 0;
  ultra:number= 0;
  secret:number= 0;

  maxCommon:number = 48;
  maxRare:number = 25;
  maxSuper:number = 15;
  maxUltra: number = 10;
  maxSecret:number = 2;

  username!:string;
  id!:number;

  isHovering: boolean = false;
  hoveredCard!:Card;
  hovermonster!:string;
  hoverattribute!:string;
  hoverstType!:string;
  hovermType!:string;
  leftPosition = 100
  rightPosition = 100

  packInfo!: PackInfo;

  done:boolean = false;
  ngOnInit(): void {
    if (this._authService.loggedIn()){

      this._authService.getUser().subscribe(
        res =>{
          console.log(res['username'])
          this.username = res['username']
          this.id = res['id']


          if(this.customcardsService.getProcessingPack()==false){
            if(this.customcardsService.getEditPack() && this.customcardsService.getEditPackID()!=-1){
              forkJoin(
                this.customcardsService.getPackInfoByID(this.customcardsService.getEditPackID()),
                this.customcardsService.getCustomCardsByPack(this.customcardsService.getEditPackID()),
              ).subscribe(([packInfo,packCards])=>{
                this.packInfo = packInfo;
                this.cards = packCards;
                this.packSize = this.packInfo['packsize']
  
                this.customcardsService.setProcessingPack(true);
  
                
                
        
                if(this.packInfo['packsize']=='small'){
  
                  this.maxCommon=15
                  this.maxRare=9
                  this.maxSuper=4
                  this.maxUltra=2
                  this.maxSecret=1
  
                  this.common=15
                  this.rare=9
                  this.super=4
                  this.ultra=2
                  this.secret=1
  
        
                  let counter = 0;
                  for(counter; counter!=2;counter++){
                    this.currentUltra.push(this.cards[counter])
        
                  }
        
                  for(counter; counter!=6;counter++){
                    this.currentSuper.push(this.cards[counter])
                  }
        
                  for(counter; counter!=7;counter++){
                    this.currentSecret.push(this.cards[counter])
                  }
        
                  for(counter; counter!=16;counter++){
                    this.currentRare.push(this.cards[counter])
                  }
        
                  for(counter; counter!=31;counter++){
                    this.currentCommons.push(this.cards[counter])
                  }
        
                  
                
                
                }
                if(this.packInfo['packsize']=='medium'){
                  this.maxCommon=48
                  this.maxRare=25
                  this.maxSuper=15
                  this.maxUltra=10
                  this.maxSecret=2
  
                  this.common=48
                  this.rare=25
                  this.super=15
                  this.ultra=10
                  this.secret=2
  
                  let counter = 0;
                  for(counter; counter!=10;counter++){
                    this.currentUltra.push(this.cards[counter])
                  }
        
                  for(counter; counter!=25;counter++){
                    this.currentSuper.push(this.cards[counter])
                  }
        
                  for(counter; counter!=27;counter++){
                    this.currentSecret.push(this.cards[counter])
                  }
        
                  for(counter; counter!=52;counter++){
                    this.currentRare.push(this.cards[counter])
                  }
        
                  for(counter; counter!=100;counter++){
                    this.currentCommons.push(this.cards[counter])
                  }
        
        
        
                  
                }
                if(this.packInfo['packsize']=='large'){
                  this.maxCommon=100
                  this.maxRare=60
                  this.maxSuper=20
                  this.maxUltra=14
                  this.maxSecret=6
  
                  this.common=100
                  this.rare=60
                  this.super=20
                  this.ultra=14
                  this.secret=6
  
                  let counter = 0;
                  for(counter; counter!=14;counter++){
                    this.currentUltra.push(this.cards[counter])
                  }
        
                  for(counter; counter!=34;counter++){
                    this.currentSuper.push(this.cards[counter])
                  }
        
                  for(counter; counter!=40;counter++){
                    this.currentSecret.push(this.cards[counter])
                  }
        
                  for(counter; counter!=100;counter++){
                    this.currentRare.push(this.cards[counter])
                  }
        
                  for(counter; counter!=200;counter++){
                    this.currentCommons.push(this.cards[counter])
                  }
                }
        
        
        
              })
  
  
  
  
              this.customcardsService.getCustomCardsByPack(this.customcardsService.getEditPackID()).subscribe(
                res => {
                  if(res){
                    this.currentDraft=res;
  
                    // for (let i = 0; i <= res.length-1; i++) {
                    //   this.addCardfromDraft(res[i]);
                    // }
                    // console.log(this.currentDraft)
  
                    this.draftData.controls['draftTitle'].setValue(this.customcardsService.getEditDraftName());
                  }
        
                }
              )

              this.customcardsService.setProcessingPack(true)
            }

          }
          else{
            this.customcardsService.setProcessingPack(false);
            this.customcardsService.editPack(false);
            this.customcardsService.setEditPackID(-1);
            this.customcardsService.setEditPackName('')
          }


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
        if(res){}
        this.cards = res;
        this.getCardNumbers(this.currentPage);
        this.hideloader();
      }


    )
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
      this._router.createUrlTree(['/CustomCardWebsite/cards/']));
    }
    

 
    window.open(new_url +'/'+url, '_blank');


    // const newurl = 'https://www.duelingbook.com/card?id='+url
    // window.open(newurl, "_blank");
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
        this.filters['cardtype']!="Xyz Monster"
        ){
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


  showDetails(card:Card){
    this.card = card
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
  
  resetPack(size:string){

    console.log("Ah!")
    this.packSize = size;
    this.currentDraft=[]
    this.currentCommons = []
    this.currentRare =[]
    this.currentSuper = []
    this.currentUltra = []
    this.currentSecret = []
    this.common= 0
    this.rare=0
    this.super=0
    this.ultra=0
    this.secret=0

    if(size=='small'){
      console.log("smallfry")
      this.maxCommon= 15
      this.maxRare= 9
      this.maxSuper = 4
      this.maxUltra = 2
      this.maxSecret = 1
    }
    if(size=='medium'){
      this.maxCommon=48
      this.maxRare= 25
      this.maxSuper = 15
      this.maxUltra = 10
      this.maxSecret = 2
    }
    if(size=='large'){
      this.maxCommon=100
      this.maxRare= 60
      this.maxSuper = 20
      this.maxUltra = 14
      this.maxSecret = 6
    }

  }

  addCard(cardtype:string){

    const index = this.currentDraft.findIndex(obj => obj.id === this.card?.id)
    console.log(index)
      if (index > -1) {
        return;
      }


    if(this.card!=undefined){
      if(cardtype=="common"){
        if(this.common==this.maxCommon){
          return;
        }
        this.currentCommons.push(this.card);
        this.currentDraft.push(this.card);
        this.common++;
      }
      else if(cardtype=="rare"){
        if(this.rare==this.maxRare){
          return;
        }
        this.currentRare.push(this.card);
        this.currentDraft.push(this.card);
        this.rare++;
      }
      else if(cardtype=="super"){
        if(this.super==this.maxSuper){
          return;
        }
        this.currentSuper.push(this.card);
        this.currentDraft.push(this.card);
        this.super++;
      }
      else if(cardtype=="ultra"){
        if(this.ultra==this.maxUltra){
          return;
        }
        this.currentUltra.push(this.card);
        this.currentDraft.push(this.card);
        this.ultra++;
      }
      else if(cardtype=="secret"){
        if(this.secret==this.maxSecret){
          return;
        }
        this.currentSecret.push(this.card);
        this.currentDraft.push(this.card);
        this.secret++;
      }


      
    }
    
  }

  selectDraftCard(card:Card){
    // this.draftCard = this.currentDraft.find(x => x.id == id);
    this.draftCard = card;
    
  }

  deleteDraftCard(cardtype:string){

    if(this.draftCard!=undefined){
      console.log(this.draftCard)
      console.log(cardtype)
      if(cardtype=="common"){
        const index = this.currentCommons.findIndex(obj => obj.id === this.draftCard?.id)
        if (index > -1) {
          this.currentCommons.splice(index, 1);
          this.common--;
        }
      }
      else if(cardtype=="rare"){
        
        const index = this.currentRare.findIndex(obj => obj.id === this.draftCard?.id)
        if (index > -1) {
          this.currentRare.splice(index, 1);
          this.rare--;
        }
      }
      else if(cardtype=="super"){
        const index = this.currentSuper.findIndex(obj => obj.id === this.draftCard?.id)
        if (index > -1) {
          this.currentSuper.splice(index, 1);
          this.super--;
        }
      }
      else if(cardtype=="ultra"){
        const index = this.currentUltra.findIndex(obj => obj.id === this.draftCard?.id)
        if (index > -1) {
          this.currentUltra.splice(index, 1);
          this.ultra--;
        }
      }
      else if(cardtype=="secret"){
        const index = this.currentSecret.findIndex(obj => obj.id === this.draftCard?.id)
        if (index > -1) {
          this.currentSecret.splice(index, 1);
          this.secret--;
        }
      }


      const index = this.currentDraft.findIndex(obj => obj.id === this.draftCard?.id)
      if (index > -1) {
        this.currentDraft.splice(index, 1);
      }


      // var draftCardID: number = +this.draftCard.id;
      // this.currentDraft.splice(draftCardID,1);
      this.draftCard = undefined;
    }
  }
  rightAddPackCard($event: { preventDefault: () => void; },card:Card){
    
    $event.preventDefault();
    this.card=card;
    console.log(card.name);
    this.addCard(this.rarity);

  }

  autoSelect(rarity:string){
    this.rarity= rarity;
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
      console.log("Basic data not filled.")
      return;
    }
    else if(this.currentCommons.length!= this.maxCommon || 
        this.currentRare.length!= this.maxRare ||
        this.currentSuper.length!= this.maxSuper ||
        this.currentUltra.length!= this.maxUltra ||
        this.currentSecret.length!= this.maxSecret)
        {
        this.submitfail = true;
        return;
    }

    else{ 
      this.done=true;
      if(this.packInfo){
        const finaldata = {} as Pack2;
        finaldata['packID'] = this.packInfo['id']
        finaldata['title'] = this.draftData.controls['draftTitle'].value;
        finaldata['discordname'] = this.draftData.controls['discordTag'].value;
        finaldata['creator'] = this.username;
        finaldata['creatorid'] = this.id;
        finaldata['cost'] = this.draftData.controls['cost'].value;
        finaldata['packurl'] = this.packInfo['pack']
  
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
        finaldata['packSize'] = this.packSize;
        
  
  
  
  
   
  
        this.customcardsService.resubmitPack(finaldata)
        .subscribe(
          res=>{
            console.log(res);
            this.customcardsService.setProcessingPack(false);
            this.customcardsService.editPack(false);
            this.customcardsService.setEditPackID(-1);
            this.customcardsService.setEditPackName('')
            this._router.navigate(['/packs']);
          },
            
          err=>{console.log(err)}
        )
      }
      else{
        const finaldata = {} as Pack;
        finaldata['title'] = this.draftData.controls['draftTitle'].value;
        finaldata['creator'] = this.username;
        finaldata['creatorid'] = this.id;
        finaldata['cost'] = this.draftData.controls['cost'].value;
        finaldata['discordname'] = this.draftData.controls['discordTag'].value;
  
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
        finaldata['packSize'] = this.packSize;
        
  
  
  
  
   
  
        this.customcardsService.submitPack(finaldata)
        .subscribe(
          res=>{
            console.log(res);
            this._router.navigate(['/packs']);
          },
            
          err=>{console.log(err)}
        )
      }

 

      this.submitfail = false;
      



    }
  }

  // rightAddDraftCard($event: { preventDefault: () => void; },card:string){
    
  //   this.selectCard(card);
  //   $event.preventDefault();
  //   this.addCard();

  // }


  rightDeleteDraftCard($event: { preventDefault: () => void; },card:Card,cardtype:string){
    this.selectDraftCard(card);
    $event.preventDefault();
    this.deleteDraftCard(cardtype);

  }

  




}
// var map: {}; // You could also use an array
// onkeydown = onkeyup = function(e){
//     e = e || event; // to deal with IE
//     map[e.key] = e.type == 'keydown';
//     /* insert conditional here */
// }