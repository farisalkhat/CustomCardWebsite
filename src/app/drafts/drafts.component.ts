import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.css']
})
export class DraftsComponent implements OnInit {

  constructor() { }

  draftData= new FormGroup({
    draftTitle: new FormControl(undefined,[
      Validators.required,
      Validators.minLength(1)
    ]),
    totalPlayers: new FormControl(1,[
      Validators.required,
    ])
  })

  draft = {}
  players = {}
  playernames: any[] = [];
  public totalPlayers = 4;
  submitVerified = false;
  submitted = false;
  submitfail: boolean = false;




  ngOnInit(): void {

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

}
