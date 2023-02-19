import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CustomcardsService, importDecklist } from 'src/app/customcards.service';

@Component({
  selector: 'app-player-decklists',
  templateUrl: './player-decklists.component.html',
  styleUrls: ['./player-decklists.component.css']
})
export class PlayerDecklistsComponent implements OnInit {
  @Input() userId!:number;
  username!:string;
  id!:number;
  decklists!:importDecklist[];

  constructor(public _authService:AuthService,public customcardsService:CustomcardsService) { }

  ngOnInit(): void {
    this.customcardsService.getDecklistsFromUser(this.userId).subscribe(
      res=>{
        this.decklists=res;
      }
    )

  }

}
