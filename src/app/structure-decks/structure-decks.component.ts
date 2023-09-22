import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { CustomcardsService, PackButton, PackSelected, PackSelectedData } from '../customcards.service';

@Component({
  selector: 'app-structure-decks',
  templateUrl: './structure-decks.component.html',
  styleUrls: ['./structure-decks.component.css']
})
export class StructureDecksComponent implements OnInit {

  placeId: any;
chosenPack:any;
 
openingPacks:boolean = false;
packLength:number = 0;
maximized:boolean = true;
@ViewChild('packtracker', { read: ElementRef }) public packtracker: ElementRef<any> | undefined;




  constructor(public router:Router,public _authService:AuthService,public customcardsService:CustomcardsService) { }

  creator!:string;
  id!:number;
  currency!:number;

  
  packs:PackButton[] = [];
  packSelected:boolean=false;
  packAmount = 0;
 
  packsSelected = new Map();
  packTrackerArray:PackSelectedData[]=[];
  totalCost:number = 0;

  sealedmode:boolean=false

  queuePack(pack:PackButton,value:number){
    

    let packSelected:PackSelectedData = {
      packid: pack.packid,
      title: pack.title,
      cost: pack.cost,
      amount: value
    };

    // this.packTrackerArray.push(packSelected);

    const index = this.packTrackerArray.findIndex(obj => obj.packid === packSelected?.packid)
    if (index > -1) {
      console.log('im in index ' +index)
      if(packSelected.amount==0){
        this.packTrackerArray.splice(index,1)
        this.packLength--;
      }
      else{
        this.packTrackerArray[index].amount = packSelected.amount;
      }
    }
    else if(packSelected.amount==0){return;}
    else{
      console.log('im in else')
      this.packTrackerArray.push(packSelected)}
      this.packLength++;

      this.totalCost = 0
      for(let pack in this.packTrackerArray){
        
        this.totalCost+=this.packTrackerArray[pack].cost *this.packTrackerArray[pack].amount
      }

  }
  ngOnInit(): void {
    this.sealedmode = this.customcardsService.getSealedDraftMode()
    this._authService.getUser().subscribe(
      res =>{
        console.log(res['username'])
        this.creator = res['username']
        this.id = res['id']
        this.currency = res['currency']


      },
      err => {
        console.log(err)
        this.router.navigate(['/home'])

      }
    )


    this.customcardsService.getStructureDecks().subscribe(
      res => {
        if(res){}
          this.packs = res;
          console.log(this.packs)
      }


    )

    

    
  }
  SetPackNo(pack:number,packid:number){
    this.packSelected=true;
    this.packAmount=pack;
    this.customcardsService.SetPackNo(pack,packid);


  }

  openPack(){
    this.customcardsService.setPackQueue(this.packTrackerArray)
    this.openingPacks = true;
  }
  

  minimizePackTracker(){
    this.maximized = !this.maximized
   
  }

}
