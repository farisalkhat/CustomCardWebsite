import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { CustomcardsService, PackButton, PackSelected, PackSelectedData } from '../customcards.service';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../deactivate-component.guard';

@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.css']
})
export class PacksComponent implements OnInit,CanComponentDeactivate {

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
      
      if (this.hasUnsavedChanges()) {
        let result = confirm('You havent finished opening your packs, are you sure you want to leave?');
        if(result){
          if(this.submission[0]>0){
            let data: { user_id?: any; pack_id?: any; packs_opened?: any } = {}
            data['user_id'] = this.submission[2]
            data['pack_id']=this.submission[1]
            data['packs_opened']=this.submission[0]
            this.customcardsService.uploadPackEvent(data).subscribe(res=>{console.log(res)})
          }
        }
      }
      return true;
    }
  
     hasUnsavedChanges(): boolean {
      if(this.submission[3]==false){
        return true;
      }
      return false;
      
     }
     submission: any[] = [0,0,0,true];
     checkPackSubmission(submission:any[]):void{
       this.submission = submission
       if(this.submission[3]==true){
        let data: { user_id?: any; pack_id?: any; packs_opened?: any } = {}
        data['user_id'] = this.submission[2]
        data['pack_id']=this.submission[1]
        data['packs_opened']=this.submission[0]
        this.customcardsService.uploadPackEvent(data).subscribe(res=>{console.log(res)})
       }
     }
  
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


    this.customcardsService.getPacks().subscribe(
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

  goToLink(id: number | undefined) {

    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/packs/${id?.toString()}`])
    );

    window.open(url, '_blank');
  }

  openPack(){
    this.customcardsService.setPackQueue(this.packTrackerArray)
    this.openingPacks = true;
  }


  minimizePackTracker(){
    this.maximized = !this.maximized

  }

}
