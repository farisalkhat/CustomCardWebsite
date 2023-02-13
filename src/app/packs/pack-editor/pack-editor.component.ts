import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Draft, CustomcardsService, PackInfo } from 'src/app/customcards.service';

@Component({
  selector: 'app-pack-editor',
  templateUrl: './pack-editor.component.html',
  styleUrls: ['./pack-editor.component.css']
})
export class PackEditorComponent implements OnInit {

  username!:string;
  id!:number;

  packs!:PackInfo[]; 

  constructor(private _router: Router, private _authService: AuthService, private customcardsService:CustomcardsService) { }

  ngOnInit(): void {
    this.customcardsService.editPack(false);
    if (this._authService.loggedIn()){

      this._authService.getUser().subscribe(
        res =>{
          console.log(res['username'])
          this.username = res['username']
          this.id = res['id']

          this.customcardsService.getPacksbyOwner(this.id).subscribe(
            res => {
              if(res){
                this.packs = res;
                console.log(this.packs)
                console.log("this is their id: "+this.id);
              }
            }
          )
        },
        err => {console.log(err)
        this.username = ''
        this.id = -99999
        this._router.navigate(['/login']);
      }
      )

    }
    else{
      this._router.navigate(['/login']);

    }






  }

    
  editPack(id:number,pack:string){
    this.customcardsService.editPack(true);
    this.customcardsService.setEditPackID(id);
    this.customcardsService.setEditPackName(pack)
    this._router.navigate(['/pack-maker']);
  }

}
