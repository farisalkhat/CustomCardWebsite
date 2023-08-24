import { Component, OnInit } from '@angular/core';
import { CustomcardsService } from '../customcards.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  username:string | undefined;
  id:number | undefined
  currency!:number;

  constructor(public _ccService:CustomcardsService, public _authService:AuthService,public router:Router) { }

  ngOnInit(): void {
    if (this._authService.loggedIn() && this._authService.adminRole()){

      this._authService.getUser().subscribe(
        res =>{
          console.log(res['username'])
          this.username = res['username']
          this.id = res['id']
          this.currency = res['currency']
        },
        err => {console.log(err)
        this.username = undefined
        this.id = undefined
        this.router.navigate(['/home'])
      }
      )

    }
    else{
      this.username = undefined
      this.id = undefined
      this.router.navigate(['/home'])
    }
  }

  updateCOTD(){
    console.log("lol")
    this._ccService.updateCOTD().subscribe(
      res=>{console.log("lol");
      console.log(res)},
      err=>{}
    )
  }
}
