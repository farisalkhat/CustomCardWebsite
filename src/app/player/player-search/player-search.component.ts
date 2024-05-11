import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css']
})
export class PlayerSearchComponent implements OnInit {

  constructor() { }

  @Input() searchResultsFromParent: any;
  ngOnInit(): void {
  }

}
