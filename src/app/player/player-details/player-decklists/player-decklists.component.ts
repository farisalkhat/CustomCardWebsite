import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-decklists',
  templateUrl: './player-decklists.component.html',
  styleUrls: ['./player-decklists.component.css']
})
export class PlayerDecklistsComponent implements OnInit {
  @Input() userId!:number;
  constructor() { }

  ngOnInit(): void {
  }

}
