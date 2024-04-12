import { Component, OnInit } from '@angular/core';
import { CustomcardsService } from '../customcards.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(public customcardsService:CustomcardsService) { }

  players:any[]=[];

  staff:any[]=[];
  newestUsers:any[]=[];
  ngOnInit(): void {

    this.customcardsService.getPlayers().subscribe(
        res => {
            this.players = res;
            this.staff=this.players.filter((user)=>user.role.toLowerCase().includes('admin'))
            this.hideloader();

            this.newestUsers = this.players.sort((a, b) => (a.id > b.id) ? -1 : ((b.id > a.id) ? 1 : 0))
            if(this.newestUsers.length>7){
              this.newestUsers = this.newestUsers.slice(0,7)
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
