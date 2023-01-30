import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Card, CustomcardsService, Draft, Pack } from 'src/app/customcards.service';


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
  creator!:string;


  currentDraft: Card[] = [];

  currentCommons: Card[] = [];
  currentRare: Card[] = [];
  currentSuper: Card[] = [];
  currentUltra: Card[] = [];
  currentSecret: Card[] = [];



  rarity:string="common";

  draftCard!:Card | undefined;


  draftData= new FormGroup({
    draftTitle: new FormControl(' ',[
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100)

    ])
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


  username!:string;
  id!:number;



  ngOnInit(): void {
    if (this._authService.loggedIn()){

      this._authService.getUser().subscribe(
        res =>{
          console.log(res['username'])
          this.username = res['username']
          this.id = res['id']


          if(this.customcardsService.getEditDraft() && this.customcardsService.getEditDraftID()!=-1){
            this.customcardsService.getDraftCardsbyID(this.customcardsService.getEditDraftID()).subscribe(
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
          }

        },
        err => {console.log(err)
        this.username = ''
        this.id = -99999
        this._router.navigate(['/drafts']);
      }
      )

    }



    this.customcardsService.getCustomCards().subscribe(
      res => {
        if(res){}
        this.cards = res;
        this.getCardNumbers(this.currentPage);
      }


    )
  }

  submitSearch(){
    console.log(this.filters)
    this.cards = [] 
    this.attribute ='';
    this.stType=''
    this.mType='';
    this.monster='None';
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

    this.customcardsService.getFilteredCards(this.filters).subscribe(
      res=>{
        
        console.log(res)
        this.cards = res;
        this.currentPage = 1
        this.card=undefined;
        this.getCardNumbers(this.currentPage);
      },
      err=>{console.log(err)}
    )

  }
  getCardNumbers(page:number){
    this.currentCards = [];
    const cardmin = (page-1)*21;
    const cardmax = (page * 21) - 1;

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
  
  addCard(cardtype:string){

    const index = this.currentDraft.findIndex(obj => obj.id === this.card?.id)
    console.log(index)
      if (index > -1) {
        return;
      }


    if(this.card!=undefined){
      if(cardtype=="common"){
        if(this.common==48){
          return;
        }
        this.currentCommons.push(this.card);
        this.currentDraft.push(this.card);
        this.common++;
      }
      else if(cardtype=="rare"){
        if(this.rare==25){
          return;
        }
        this.currentRare.push(this.card);
        this.currentDraft.push(this.card);
        this.rare++;
      }
      else if(cardtype=="super"){
        if(this.super==15){
          return;
        }
        this.currentSuper.push(this.card);
        this.currentDraft.push(this.card);
        this.super++;
      }
      else if(cardtype=="ultra"){
        if(this.ultra==10){
          return;
        }
        this.currentUltra.push(this.card);
        this.currentDraft.push(this.card);
        this.ultra++;
      }
      else if(cardtype=="secret"){
        if(this.secret==2){
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
    this.submitted=true;
    if(this.draftData.invalid){
      this.submitfail = true;
      console.log("Basic data not filled.")
      return;
    }
    else if(this.currentCommons.length!= 48 || 
        this.currentRare.length!= 25 ||
        this.currentSuper.length!= 15 ||
        this.currentUltra.length!= 10 ||
        this.currentSecret.length!= 2)
        {
        this.submitfail = true;
        return;
    }

    else{ 

 
      const finaldata = {} as Pack;
      finaldata['title'] = this.draftData.controls['draftTitle'].value;
      finaldata['creator'] = this.username;
      finaldata['creatorid'] = this.id;

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





      this.customcardsService.submitPack(finaldata)
      .subscribe(
        res=>{
          console.log(res);
          this._router.navigate(['/packs']);
        },
          
        err=>{console.log(err)}
      )
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