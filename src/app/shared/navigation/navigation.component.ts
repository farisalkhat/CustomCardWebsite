import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public _authService:AuthService) { }

  username:string | undefined;
  id:number | undefined

  ngOnInit(): void {
    if (this._authService.loggedIn()){

      this._authService.getUser().subscribe(
        res =>{
          console.log(res['username'])
          this.username = res['username']
          this.id = res['id']
        },
        err => {console.log(err)
        this.username = undefined
        this.id = undefined
      }
      )

    }
    else{
      this.username = undefined
      this.id = undefined
    }

  }



}
