import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-matches',
  templateUrl: './player-matches.component.html',
  styleUrls: ['./player-matches.component.css']
})
export class PlayerMatchesComponent implements OnInit {
  @Input() userId!:number;
  constructor() { }

  ngOnInit(): void {
  }

}
