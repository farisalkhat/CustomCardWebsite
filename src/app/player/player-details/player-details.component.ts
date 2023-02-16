import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CustomcardDbComponent } from 'src/app/customcard-db/customcard-db.component';
import { CustomcardsService, UserDetails } from 'src/app/customcards.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {




  
  constructor(public authService: AuthService, public route:ActivatedRoute,public customcardsService:CustomcardsService) { }

  userDetails!:UserDetails;
  details:any[]=[];
  userID!:number;

  
  loggedInID!:number;




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
}
