import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CustomcardsService, UserDetails, ChecklistCard, PackButton } from 'src/app/customcards.service';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent implements OnInit {

  constructor(public authService: AuthService, public route:ActivatedRoute,public customcardsService:CustomcardsService) { }
  @Input() userId!:number;
  userDetails!:UserDetails;
  details:any[]=[];
  userID!:number;
  packID!:number;

  userPackCollection!:ChecklistCard[];
  
  loggedInID!:number;

  packs:PackButton[] = [];


  packTotal!:number;
  packOwned!:number;



  ngOnInit(): void {


    if (this.authService.loggedIn()){

      this.authService.getUser().subscribe(
        res =>{
          console.log(res['username'])
          this.loggedInID = res['id']
        },
        err => {}
      )

    }


    this.route.paramMap.subscribe((paramMap)=>{
      this.userID = Number(paramMap.get('playerid'));
      console.log(this.userID)
      this.customcardsService.getUserPageDetails(this.userID).subscribe(
        (data:any)=>{
          this.userDetails = data;
          console.log(this.userDetails);
        } 
      )
    })

    this.customcardsService.getPacks().subscribe(
      res => {
        if(res){}
          this.packs = res;
          console.log(this.packs)
      }


    )

  }


  goToLink(link:string){
    let sublink = link.substring(0,28)
    
    if(link.substring(0,28).trim()=='https://www.duelingbook.com'){
      window.open(link, "_blank");
    }
    else{
      console.log(sublink)
      console.log("Someone's been a naughty boy!")
    }
  }

  selectPack(){
    this.customcardsService.getChecklist(this.userID,this.packID).subscribe(
      res => {
        if(res){}
          this.userPackCollection = res;
          
          this.packTotal = this.userPackCollection.length
          this.packOwned = 0

          for(let card in this.userPackCollection){
            if(this.userPackCollection[card].copies>0){
              this.packOwned++;
            }
          }
      }
  
  
    )
  }
}

