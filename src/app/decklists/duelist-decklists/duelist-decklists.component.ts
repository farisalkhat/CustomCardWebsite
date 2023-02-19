import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { importDecklist, CustomcardsService } from 'src/app/customcards.service';

@Component({
  selector: 'app-duelist-decklists',
  templateUrl: './duelist-decklists.component.html',
  styleUrls: ['./duelist-decklists.component.css']
})
export class DuelistDecklistsComponent implements OnInit {

  username!:string;
  id!:number;
  decklists!:importDecklist[];

  constructor(public _authService:AuthService,public customcardsService:CustomcardsService) { }

  ngOnInit(): void {
    if (this._authService.loggedIn()){
      this._authService.getUser().subscribe(
        res =>{
          console.log('this is user:'+res['id'])
          this.username = res['username']
          this.id = res['id']
          this.customcardsService.getDecklistsFromUser(this.id).subscribe(
            res=>{
              this.decklists=res;
            }
          )
        }
          
          )
        
        }

  }

}
