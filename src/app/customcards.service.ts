import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

export interface Card extends Document{
  _id:string;
  cardtype:string;
  name:string;
  type:string;
  atk:number;
  def:number;
  level:number;
  attribute:string;
  effect:string;
}



@Injectable({
  providedIn: 'root'
})


export class CustomcardsService {



  private _carddataUrl = "https://mm8bitdm.herokuapp.com/api/yugioh/customcards"

  constructor(private http:HttpClient,private _router:Router) {}

  getCustomCards(){
    return this.http.get<any[]>(this._carddataUrl);
  } 
}
