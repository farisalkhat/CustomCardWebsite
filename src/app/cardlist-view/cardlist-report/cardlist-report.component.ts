import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cardlist-report',
  templateUrl: './cardlist-report.component.html',
  styleUrls: ['./cardlist-report.component.css']
})
export class CardlistReportComponent implements OnInit {
  @Input() cardlist: any[]=[]
  constructor() { }

  ngOnInit(): void {
  }

}
