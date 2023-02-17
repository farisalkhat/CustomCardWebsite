import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-packs',
  templateUrl: './player-packs.component.html',
  styleUrls: ['./player-packs.component.css']
})
export class PlayerPacksComponent implements OnInit {
  @Input() userId!:number;
  constructor() { }

  ngOnInit(): void {
  }

}
