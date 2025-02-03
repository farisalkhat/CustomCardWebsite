import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardlist-report',
  templateUrl: './cardlist-report.component.html',
  styleUrls: ['./cardlist-report.component.css']
})
export class CardlistReportComponent implements OnInit {
  @Input() draftsCompleted:number=0
  @Input() cardlist: any[]=[]
  constructor(private _router:Router) { }


  mostpicked:any[]=[];
  leastpicked:any[]=[];


  ngOnInit(): void {
    this.mostpicked = [...this.cardlist];
    this.leastpicked = [...this.cardlist];

    this.mostpicked.sort((a, b) => b.timesdrafted - a.timesdrafted)
    this.leastpicked.sort((a, b) => a.timesdrafted - b.timesdrafted)

    // this.mostpicked = this.mostpicked.slice(0, 100)
    // this.leastpicked = this.leastpicked.slice(0, 100)
    // console.log("This is drafts completed:" + this.draftsCompleted)
    // for(let card of this.cardlist){
    //   if(card.timesdrafted!=0){
        
    //     card.timesdrafted = (card.timesdrafted / this.draftsCompleted) * 100
    //   }
    // }

  }

  goToLink(url: string){

    let new_url =''

    if(this._router['location']._platformLocation.location.origin=='http://localhost:4200'){
       new_url = this._router.serializeUrl(
        this._router.createUrlTree(['/cards/']));
    }
    else{
       new_url = this._router.serializeUrl(
      this._router.createUrlTree(['/cards/']));
    }



    window.open(new_url +'/'+url, '_blank');


    // const newurl = 'https://www.duelingbook.com/card?id='+url
    // window.open(newurl, "_blank");
  }



}
