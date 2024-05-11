import { Component, OnInit } from '@angular/core';
import { CustomcardsService } from '../customcards.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  searchPage:boolean = false
  players:any[]=[];
  playerSearchResults: any[]=[]
  searchName:string = ""
  constructor(public customcardsService:CustomcardsService) { }
  ngOnInit(): void {
    this.customcardsService.getPlayers().subscribe(
      res => {
          this.players = res;})
  
  
  }
  

  switchPages(){
    this.searchPage= !this.searchPage;
    
  }
  submitSearch(){
    // var div = document.getElementById('Loading')
    // if(div){
    //   div.style.display = "block"
    //   console.log(div)
    // }
    console.log(this.searchName.length);
    console.log(this.searchPage);
    if(this.searchName.length==0 && this.searchPage==false){
      return;

    }
    if(this.searchName.length==0 && this.searchPage==true){
      this.switchPages()
      return;

    }
    else{
      this.playerSearchResults = this.players.filter((player)=>player.username.toLowerCase().includes(this.searchName.toLowerCase()))
      this.switchPages();
    }


  }

  
}
