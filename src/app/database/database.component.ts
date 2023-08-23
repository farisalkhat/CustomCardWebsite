import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { AuthService } from '../auth/services/auth.service';
import { Card, CustomcardsService } from '../customcards.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {
  username:string | undefined;
  id:number | undefined
  currency!:number;

  constructor(public _ccService:CustomcardsService, public _authService:AuthService,public router:Router) { }
  file:any;
  csv_file!:any;
  fileString:any;
  decklistIDs:number[]=[]
  fileChanged(e:Event) {
    const element = e.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.file = fileList[0];
    }
  }
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

  
  submitCSV(){
    this._ccService.submitCSVFile(this.file).subscribe(
      res=>{
        this.router.navigate(['/home'])
      },
      err=>{
        location.reload();
      }
    );
  }
}
