import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Card, CustomcardsService } from '../../customcards.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  about!:string;
  cardSelected:number=0;
  newSettings= {
    id:0,
    profile_image:0,
    favorite_card1:0,
    favorite_card2:0,
    favorite_card3:0,
    favorite_card4:0,
    favorite_card5:0,
    about:''
  }

  userdata!:any;

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




  aboutMe= new FormGroup({
    about: new FormControl(' ',[
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(500)

    ]),
  })

  submitVerified = false;
  submitted = false;
  submitfail: boolean = false;
  done: boolean = false;
  get f(){return this.aboutMe.controls;}

  constructor(public route:ActivatedRoute, public _authService:AuthService, public customcardsService:CustomcardsService, public _router:Router) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe((paramMap)=>{
    //   this.creatorid = String(paramMap.get('creatorid'));
    //   this.customcardsService.getUserPageDetails(Number(this.creatorid)).subscribe(
    //     (data:any)=>{
    //       this.userDetails = data;
    //       console.log(this.userDetails);
    //     } 
    //   )
    // })


    this.customcardsService.getCustomCards().subscribe(
      res => {
        if(res){}
        this.cards = res;
        this.getCardNumbers(this.currentPage);
        this.hideloader();
      }


    )

    this._authService.getUser().subscribe(
      res =>{
        console.log(res['username'])
        this.creator = res['username']
        this.creatorid = res['id']

        this.customcardsService.getUserPageDetails(Number(this.creatorid)).subscribe(
          res=>{this.userdata = res;
            console.log(this.userdata);
            this.newSettings['id'] = Number(this.creatorid);
            this.newSettings['profile_image'] = this.userdata['details']['profile_image'];
            this.newSettings['favorite_card1'] = this.userdata['details']['favorite_card1'];
            this.newSettings['favorite_card2'] = this.userdata['details']['favorite_card2'];
            this.newSettings['favorite_card3'] = this.userdata['details']['favorite_card3'];
            this.newSettings['favorite_card4'] = this.userdata['details']['favorite_card4'];
            this.newSettings['favorite_card5'] = this.userdata['details']['favorite_card5'];
            this.newSettings['about'] = this.userdata['details']['about'];
            this.about = this.userdata['details']['about'];
        })
        
      },
      err => {
        console.log(err)
        this.creator = ''
        this.creatorid = ''

      }
    )



  }


  saveImages(){

    this.submitted=true;
    if(this.aboutMe.invalid){
      this.submitfail = true;
      console.log("Basic data not filled.")
      return;
    }

    this.done=true;

    this.newSettings['about'] = this.aboutMe.controls['about'].value;;
    this.customcardsService.editProfileImages(this.newSettings).subscribe(res=>{
      window.location.reload()
    },
    err=>{
      this._router.navigate(['/home'])
    })
  }


  selectCardEdit(image:number){
    this.cardSelected = image;
  }

  setCard(card:string){
    if(this.cardSelected==0){this.newSettings['profile_image']=Number(card)}
    if(this.cardSelected==1){this.newSettings['favorite_card1']=Number(card)}
    if(this.cardSelected==2){this.newSettings['favorite_card2']=Number(card)}
    if(this.cardSelected==3){this.newSettings['favorite_card3']=Number(card)}
    if(this.cardSelected==4){this.newSettings['favorite_card4']=Number(card)}
    if(this.cardSelected==5){this.newSettings['favorite_card5']=Number(card)}
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

}
