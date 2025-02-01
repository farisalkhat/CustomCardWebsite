import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cardlist-changelog',
  templateUrl: './cardlist-changelog.component.html',
  styleUrls: ['./cardlist-changelog.component.css']
})
export class CardlistChangelogComponent implements OnInit {
  @Input() cardlist: any[]=[]
  constructor() { }

  ngOnInit(): void {
  }

}
