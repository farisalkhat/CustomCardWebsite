import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';


export interface Card extends Document{
  id:string;
  cardtype:string;
  name:string;
  type:string;
  atk:number;
  def:number;
  level:number;
  attribute:string;
  effect:string;
  image:string;
  creator:string;
  tag:string;
}


export interface Draft {
  title: string;
  cardIDs:string[];
}

export interface Pack {
  title: string;
  creator:string;
  commonIDs:string[];
  rareIDs:string[];
  superIDs:string[];
  ultraIDs:string[];
  secretIDs:string[];
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

  getCustomCard(id:string){
    return this.http.get<any>(`https://mm8bitdm.herokuapp.com/api/yugioh/customcards/${id}`);
  } 

  getFilteredCards(data: any){
    return this.http.post<Card[]>('https://mm8bitdm.herokuapp.com/api/yugioh/searchresult',data);
  }
  getFilteredCards2(data: any){
    return this.http.post<Card[]>('https://mm8bitdm.herokuapp.com/api/yugioh/searchresult',data);
  }


  submitDraft(draft:Draft){
    return this.http.post<any>('https://mm8bitdm.herokuapp.com/api/yugioh/submitdraft',draft
      
      
      )
  }

  submitPack(pack:Pack){
    return this.http.post<any>('https://mm8bitdm.herokuapp.com/api/yugioh/submitpack',pack)
  }
  
  
}
