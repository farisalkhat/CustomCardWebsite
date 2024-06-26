import { Component, Input, OnInit } from '@angular/core';
import { CustomcardsService, PackInfo } from 'src/app/customcards.service';

@Component({
  selector: 'app-player-packs',
  templateUrl: './player-packs.component.html',
  styleUrls: ['./player-packs.component.css']
})
export class PlayerPacksComponent implements OnInit {
  @Input() userId!:number;
  constructor(public customcardsService: CustomcardsService) { }

  packs!:PackInfo[];
  ngOnInit(): void {
    const current = new Date();
    this.timestamp = current.getTime();
    this.customcardsService.getPacksbyOwner(this.userId).subscribe(
      res => {
        if(res){
          this.packs = res;
        }
      }
    )
  }
  timestamp: number = 0;
  getTimeStamp(){
    return this.timestamp;
  }
}
