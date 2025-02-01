import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CustomcardsService, Draft } from 'src/app/customcards.service';

@Component({
  selector: 'app-view-drafts',
  templateUrl: './view-drafts.component.html',
  styleUrls: ['./view-drafts.component.css']
})
export class ViewDraftsComponent implements OnInit {

  constructor(private customcardsService:CustomcardsService,private _router:Router, public _authService:AuthService) { 



    


  }

  draftData= new FormGroup({
    draftTitle: new FormControl(undefined,[
      Validators.required,
      Validators.minLength(1)
    ]),
    totalPlayers: new FormControl(1,[
      Validators.required,
    ])
  })

  players = {}
  playernames: any[] = [];
  public totalPlayers = 4;
  submitVerified = false;
  submitted = false;
  submitfail: boolean = false;

  draft={};

  drafts:any[]=[];
 
  ngOnInit(): void {
    this.editDraft(false);
    this.customcardsService.setEditDraftID(-1);
    this.customcardsService.getDrafts().subscribe(
      res => {
        if(res){}
          this.drafts = res;
          console.log(this.drafts)
      }


    )
  }

  get f(){return this.draftData.controls;}
  onSubmit(){
    this.submitted=true;
    if(this.draftData.invalid){
      this.submitfail = true;
      console.log("Basic data not filled.")
      return;
    }
    // this.players = this.draftForm.collectdata()
    // if(this.players==undefined){
    //   this.submitfail = true;
    //   console.log("gameForm failed.")
    //   return 
    // }

    this.draft = {}
    // this.draft['title']=123;
    // this.draft['players'] = this.players

  }

  editDraft(edit:boolean){
    this.customcardsService.editDraft(edit);
  }

  // setDraft(draftType:number){
  //   this.customcardsService.setDraft(draftType,false);
  // }

  // setCustomDraft(draftType:number){
  //   this.customcardsService.setDraft(draftType,true);
  // }

}
