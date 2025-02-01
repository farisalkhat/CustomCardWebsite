import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cardlist-view',
  templateUrl: './cardlist-view.component.html',
  styleUrls: ['./cardlist-view.component.css']
})
export class CardlistViewComponent implements OnInit {


  @Input() cardlist: any[]=[]
  constructor() { }

  ngOnInit(): void {
  }

}
