import { Component, Input, OnInit } from '@angular/core';
import { CustomcardsService } from 'src/app/customcards.service';

@Component({
  selector: 'app-player-matches',
  templateUrl: './player-matches.component.html',
  styleUrls: ['./player-matches.component.css']
})
export class PlayerMatchesComponent implements OnInit {
  @Input() userId!:number;
  constructor(public customcardsService: CustomcardsService) { }

  matches:any[] = []
  ngOnInit(): void {
    this.customcardsService.getMatchesFromUser(this.userId).subscribe(
      res => {
        if(res){
          this.matches = res;
        }
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

}
