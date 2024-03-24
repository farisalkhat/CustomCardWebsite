import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { ChecklistCard, CustomcardsService, HoveredCardDetails, PackButton, PackCard } from '../customcards.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {

  constructor(public authService:AuthService,public router:Router, public customCardService:CustomcardsService) { }

  packs:PackButton[] = [];
  packID!:number;

  userPackCollection:ChecklistCard[] = []
  userId!:number;


  isHovering: boolean = false;
  hoveredCard!:ChecklistCard;
  hovermonster!:string;
  hoverattribute!:string;
  hoverstType!:string;
  hovermType!:string;
  leftPosition = 100
  rightPosition = 100

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      res =>{
        this.userId = res['id']
      },
      err => {
        console.log(err)
        this.router.navigate(['/home'])

      }
    )

    this.customCardService.getPacks().subscribe(
      res => {
        if(res){}
          this.packs = res;
          console.log(this.packs)
      }


    )
  }


  selectPack(){
    this.customCardService.getChecklist(this.userId,this.packID).subscribe(
      res => {
        if(res){}
          this.userPackCollection = res;
          console.log(this.userPackCollection)


          this.userPackCollection.sort((a, b) => 
          
          {
            if(a.cardtype.includes('Monster')){
                if(b.cardtype.includes('Spell') || b.cardtype.includes('Trap')){
                    return -1
                }
                else{
                    if(a.name > b.name){
                        return 1
                    }
                    else{
                        return -1
                    }
                    
                }
            }
            if(a.cardtype.includes('Spell')){
                if(b.cardtype.includes('Monster')){
                    return 1
                }
                else if(b.cardtype.includes('Trap')){
                    return -1
                }
                else{
                    if(a.name > b.name){
                        return 1
                    }
                    else{
                        return -1
                    }
                }

            }
            if(a.cardtype.includes('Trap')){
                if(b.cardtype.includes('Monster') || b.cardtype.includes('Spell')){
                    return 1
                }
                else{
                    if(a.name > b.name){
                        return 1
                    }
                    else{
                        return -1
                    }
                }
            }
            
            return 1}
          

          
          
          
          )





      }


    )
  }


  mouseHovering(card: ChecklistCard, e: MouseEvent) {
    const final = {} as HoveredCardDetails;
    if (e.clientX >= 900) { final.leftPosition = e.clientX - 200; }
    else { final.leftPosition = e.clientX + 2; }
    final.rightPosition = e.clientY - 170;
    console.log(card.id)
    this.customCardService.getCustomCard(card.id).subscribe(
        res=>{
            console.log(res)
            final.card = res
            final.isHovering = true;
            this.customCardService.HoveredCard(final);
        })
  }
  mouseLeft() {
    this.customCardService.DisableHoveredCard();
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

    goToLink(url: number){

        let new_url =''
    
        if(this.router['location']._platformLocation.location.origin=='http://localhost:4200'){
           new_url = this.router.serializeUrl(
            this.router.createUrlTree(['/cards/']));
        }
        else{
           new_url = this.router.serializeUrl(
          this.router.createUrlTree(['/CustomCardWebsite/cards/']));
        }
        
    
     
        window.open(new_url +'/'+url, '_blank');
    
    
        // const newurl = 'https://www.duelingbook.com/card?id='+url
        // window.open(newurl, "_blank");
    }

}
