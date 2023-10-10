import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { CustomcardsService, DuelData } from '../customcards.service';

@Component({
  selector: 'app-submit-match',
  templateUrl: './submit-match.component.html',
  styleUrls: ['./submit-match.component.css']
})
export class SubmitMatchComponent implements OnInit {

  matchData= new FormGroup({
    duelist: new FormControl(' ',[
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100)

    ]),
    result: new FormControl(' ',[
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100)

    ]),
    replay: new FormControl(' ',[]),
    gamemode: new FormControl(' ',[
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100)

    ]),
    format: new FormControl(' ',[
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100)

    ]),
    decklist: new FormControl(' ',[]),

    
  })

  submitVerified = false;
  submitted = false;
  submitfail: boolean = false;
  done: boolean = false;

  players:any[] = []
  today!: Date;
  jstoday: any;
  get f(){return this.matchData.controls;}

  username!:number;
  id!:number;

  constructor(public _authService: AuthService,private customcardsService:CustomcardsService,private _router:Router) { }
  hideloader() {
    var div = document.getElementById('Loading')
    if(div){
      div.style.display = "none"
      console.log(div)
    }

}
  ngOnInit(): void {

    if (this._authService.loggedIn()){
      this._authService.getUser().subscribe(
        res =>{
          console.log('this is user:'+res['id'])
          this.username = res['username']
          this.id = res['id']

          this.customcardsService.getPlayers().subscribe(
            res => {
              if(res){}
                this.players = res;
                this.players.sort((a, b) => a.username.localeCompare(b.username))

                const index = this.players.findIndex(obj => obj.id === this.id)
                if (index > -1) {
                  this.players.splice(index, 1);
                }

                console.log(this.players)
                this.hideloader();
            }
      
      
      )
  
          
        })
    }

    else{
      this._router.navigate(['/login']);

    }



  }


  saveMatch(){
    console.log("im a poopy butt")
    var div = document.getElementById('Loading')
    if(div){
      div.style.display = "block"
      console.log(div)
    }
    this.submitted=true;
    if(this.matchData.invalid){
      this.submitfail = true;
      console.log("Basic data not filled.")
      return;
    }
    

    else{ 
      this.done= true;
      this.today = new Date()
      this.jstoday = formatDate(this.today, 'MM-dd-yyyy hh:mm:ss a zzzz', 'en-US', '-0400');
 
      const duel = {} as DuelData
      duel['duelist1'] = this.id
      duel['duelist2'] = this.matchData.controls['duelist'].value;
      duel['result'] = this.matchData.controls['result'].value;
      duel['replay'] = this.matchData.controls['replay'].value;
      duel['gamemode'] = this.matchData.controls['gamemode'].value;
      duel['date'] = this.jstoday
      duel['format']=this.matchData.controls['format'].value;
      


            this.customcardsService.submitDuel(duel)
      .subscribe(
        res=>{
          console.log(res);
          this._router.navigate(['/players']);
        },
          
        err=>{console.log(err)}
      )

      // finaldata['title'] = this.draftData.controls['draftTitle'].value;
      // finaldata['creator'] = this.username;
      // finaldata['creatorid'] = this.id;
      // finaldata['cost'] = this.draftData.controls['cost'].value;


      



 

      // this.customcardsService.submitPack(this.matchData)
      // .subscribe(
      //   res=>{
      //     console.log(res);
      //     this._router.navigate(['/packs']);
      //   },
          
      //   err=>{console.log(err)}
      // )
      this.submitfail = false;
      



    }
  }
}
