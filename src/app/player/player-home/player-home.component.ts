import { Component, OnInit } from '@angular/core';
import { CustomcardsService } from 'src/app/customcards.service';

@Component({
  selector: 'app-player-home',
  templateUrl: './player-home.component.html',
  styleUrls: ['./player-home.component.css']
})
export class PlayerHomeComponent implements OnInit {

  constructor(public customcardsService:CustomcardsService) { }

  players:any[]=[];
  playersMostViews:any[]=[];
  playersMostDecks:any[]=[];
  playersMostDeckViews:any[]=[];

  staff:any[]=[];
  newestUsers:any[]=[];
  ngOnInit(): void {

    this.customcardsService.getPlayersMostDeckViews().subscribe(
      res=>{
          this.playersMostDeckViews = res;
          if(this.playersMostDeckViews.length>7){
            this.playersMostDeckViews = this.playersMostDeckViews.slice(0,7)
          }
      }
    )

    this.customcardsService.getPlayersMostDecks().subscribe(
      res=>{
          this.playersMostDecks = res;
          if(this.playersMostDecks.length>7){
            this.playersMostDecks = this.playersMostDecks.slice(0,7)
          }
      }
    )
    this.customcardsService.getPlayers().subscribe(
        res => {
            this.players = res;
            this.staff=this.players.filter((user)=>user.role.toLowerCase().includes('admin'))
            this.hideloader();

            this.newestUsers = this.players.sort((a, b) => (a.id > b.id) ? -1 : ((b.id > a.id) ? 1 : 0))
            if(this.newestUsers.length>7){
              this.newestUsers = this.newestUsers.slice(0,7)
            }

            this.playersMostViews = this.players.sort((a, b) => (a.views > b.views) ? -1 : ((b.views > a.views) ? 1 : 0))
            if(this.playersMostViews.length>7){
              this.playersMostViews = this.playersMostViews.slice(0,7)
            }

            console.log(this.newestUsers);
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
}
