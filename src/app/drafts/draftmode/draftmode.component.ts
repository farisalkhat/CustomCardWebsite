import { Component, OnInit } from '@angular/core';
import { Card, CustomcardsService, Draft } from 'src/app/customcards.service';
import {trigger, state, style, animate, transition} from '@angular/animations';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-draftmode',
  templateUrl: './draftmode.component.html',
  styleUrls: ['./draftmode.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
        state('default', style({ transform: 'rotate(0)' })),
        state('rotated', style({ transform: 'rotate(-180deg)' })),
        transition('rotated => default', animate('400ms ease-out')),
        transition('default => rotated', animate('400ms ease-in'))
  ])]

})
export class DraftmodeComponent implements OnInit {

  
  username!:string;
  id!:number;

  drafts!:Draft[];

  constructor(private _router: Router, private _authService: AuthService, private customcardsService:CustomcardsService) { }

  ngOnInit(): void {
    if (this._authService.loggedIn()){

      this._authService.getUser().subscribe(
        res =>{
          console.log(res['username'])
          this.username = res['username']
          this.id = res['id']

          this.customcardsService.getDraftsbyOwner(this.id).subscribe(
            res => {
              if(res){
                this.drafts = res;
                console.log(this.drafts)
                console.log("this is their id: "+this.id);
              }
            }
          )
        },
        err => {console.log(err)
        this.username = ''
        this.id = -99999
        this._router.navigate(['/drafts']);
      }
      )

    }






  }

    
  editDraft(id:number,draft:string){
    this.customcardsService.setEditDraftID(id);
    this.customcardsService.setEditDraftName(draft)
    this._router.navigate(['/draft-maker']);
  }



}

