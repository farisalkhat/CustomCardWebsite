import { Component, OnInit } from '@angular/core';
import { CustomcardsService } from '../customcards.service';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  constructor(private _router: Router, public _authService:AuthService,public customcardsService:CustomcardsService) { }

  matches:any[] = []
  ngOnInit(): void {
    this.customcardsService.getMatches().subscribe(
      res => {
        if(res){}
          this.matches = res;
          console.log(this.matches)
          //this.hideloader();
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

  deleteMatch(id:number){
    let match = {id}
    match['id']=id

    this.customcardsService.deleteMatch(match).subscribe(
      res => {
        if(res){
          location.reload();
        }
      })
  }

}
