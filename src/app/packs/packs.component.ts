import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { CustomcardsService, PackButton } from '../customcards.service';

@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.css']
})
export class PacksComponent implements OnInit {
placeId: any;
 
  constructor(public _authService:AuthService,public customcardsService:CustomcardsService) { }

  packs:PackButton[] = [];
  packSelected:boolean=false;
  packAmount = 0;



  ngOnInit(): void {
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
  

}
