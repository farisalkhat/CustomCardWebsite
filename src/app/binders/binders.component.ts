import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { Binder, BinderCard, Card, CustomcardsService } from '../customcards.service';

@Component({
  selector: 'app-binders',
  templateUrl: './binders.component.html',
  styleUrls: ['./binders.component.css']
})
export class BindersComponent implements OnInit {

  creator!:string;
  creatorid!:number;
  binderID!:number;

  binders:Binder[] = [];
  cards:BinderCard[] = []

  isHovering: boolean = false;
  hoveredCard!:BinderCard;
  hovermonster!:string;
  hoverattribute!:string;
  hoverstType!:string;
  hovermType!:string;
  leftPosition = 100
  rightPosition = 100

  constructor(public customcardsService:CustomcardsService, public authService:AuthService, public router:Router) { }

  ngOnInit(): void {


    this.authService.getUser().subscribe(
      res =>{
        console.log(res['username'])
        this.creator = res['username']
        this.creatorid = res['id']

        this.customcardsService.getBindersByOwner(this.creatorid).subscribe(
          res => {
            if(res){
              this.binders=res;
              console.log(this.binders)
    
    
            }
    
          }
        )
      },
      err => {
        console.log(err)
        this.router.navigate(['/home'])

      }
    )

    console.log(this.creatorid)

    }



    selectBinder(){

      this.customcardsService.getCardsByBinderID(this.binderID).subscribe(
        res => {
          if(res){
            this.cards=res;
            console.log(this.cards)
  
  
          }
  
        }
      )

    }
    
    goToLink(url: number){

        const new_url = this.router.serializeUrl(
          this.router.createUrlTree(['/CustomCardWebsite/cards']));
    
        console.log(new_url)
     
        window.open(new_url +url, '_blank');
    
    
        // const newurl = 'https://www.duelingbook.com/card?id='+url
        // window.open(newurl, "_blank");
    }

    mouseHovering(card:BinderCard,e:MouseEvent) {

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
  
}
