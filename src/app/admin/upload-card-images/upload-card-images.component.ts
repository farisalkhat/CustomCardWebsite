import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CustomcardsService } from 'src/app/customcards.service';

@Component({
  selector: 'app-upload-card-images',
  templateUrl: './upload-card-images.component.html',
  styleUrls: ['./upload-card-images.component.css']
})
export class UploadCardImagesComponent implements OnInit {

  constructor(public route:ActivatedRoute, public _authService:AuthService, public customcardsService:CustomcardsService, public _router:Router) { }
  username:string | undefined;
  id:number | undefined
  currency!:number;
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
        this._router.navigate(['/home'])
      }
      )

    }
    else{
      this.username = undefined
      this.id = undefined
      this._router.navigate(['/home'])
    }
  }



  fileChanged:boolean = false;
files!:FileList;
filename:string= '';

cardImages= new FormGroup({
  about: new FormControl(' ',[
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(500)

  ]),
})

submitVerified = false;
submitted = false;
submitfail: boolean = false;
done: boolean = false;
get f(){return this.cardImages.controls;}


onFileSelected(event:any){

  if(event.target.files.length > 0){

    if (event.target?.files && event.target.files.length > 0) {
    	this.files = event.target.files;
      }
    else{
      this.files = event.target.files;
      this.fileChanged = true;
    }
  }
}
cardsUploaded:boolean = false;
firstUpload:boolean = false;
uploadImages(){
  this.uploadImagesPrivate()
}
private uploadImagesPrivate(){
  this.cardsUploaded = false;
  for (let index = 0; index < this.files.length; index++) {
    let element = this.files[index]
    let randnum = Math.floor(Math.random() * 100000);
    const formData = new FormData();
    formData.append("thumbnail", element);
    formData.append("name",element.name);


    this.customcardsService.uploadCardImage(formData).subscribe(res=>{
      console.log(res);
    });
  }
  if(!this.firstUpload){this.firstUpload=true;}
  this.cardsUploaded=true;

}

}
