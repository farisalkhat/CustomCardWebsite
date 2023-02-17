import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-navigation',
  templateUrl: './player-navigation.component.html',
  styleUrls: ['./player-navigation.component.css']
})
export class PlayerNavigationComponent implements OnInit {

  page="Profile"
  constructor() { }

  ngOnInit(): void {
  }

  setPage(page:string){
    this.page=page;
  }

}
