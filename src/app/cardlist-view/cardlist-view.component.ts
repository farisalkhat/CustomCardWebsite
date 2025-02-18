import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Card, CustomcardsService } from '../customcards.service';

@Component({
  selector: 'app-cardlist-view',
  templateUrl: './cardlist-view.component.html',
  styleUrls: ['./cardlist-view.component.css']
})
export class CardlistViewComponent implements OnInit {


  @Input() cardlist: any[]=[]
  @Input() draftsCompleted: number=0
  @Input() modifications: any[]=[]
  @Input() mode:string="draft"

  constructor(private _ccService:CustomcardsService) {}

   updateCardlist(data:any){
    console.log("updateCardlist:")
    console.log(data)
    this.cardlist=data
   }

  ngOnInit(): void {
    this._ccService.cardlistEvent.subscribe((data)=>{
      this.updateCardlist(data)
    })
  }

 

}
