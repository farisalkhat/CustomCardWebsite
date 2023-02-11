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
  ngOnInit(): void {    
    
    this.customcardsService.getPlayers().subscribe(
        res => {
          if(res){}
            this.players = res;
            console.log(this.players)
            this.hideloader();
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
