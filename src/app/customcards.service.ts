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


export interface DeckListCard extends Document{
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
  deck:string;
}



export interface Draft {
  title: string;
  cardIDs:string[];
}

export interface Decklist{
  title:string;
  creator:string;
  creatorid:number;

  desc:string;
  decklist:string;

  mainDeck:string[];
  sideDeck:string[];
  extraDeck:string[];
}

export interface importDecklist{
  id:number;
  name:string;
  description:string;
  creator:string;
  creatorid:number;
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
  setDraft(draftType: string,customDraft:boolean) {
    this.draft= draftType;
    this.customDraft = customDraft;
  }
  getDraftType(){
    return this.draft;
  }
  getCustomEnabled(){
    return this.customDraft;
  }

  draft:string = "default"
  customDraft:boolean = false;


  private _carddataUrl = "https://mm8bitdm-ygo.herokuapp.com/api/yugioh/customcards"
  private _cardMonsters = "https://mm8bitdm-ygo.herokuapp.com/api/yugioh/monsters"
  private _cardSpells = "https://mm8bitdm-ygo.herokuapp.com/api/yugioh/spells"
  private _cardTraps = "https://mm8bitdm-ygo.herokuapp.com/api/yugioh/traps"
  private _cardST = "https://mm8bitdm-ygo.herokuapp.com/api/yugioh/spellstraps"





  constructor(private http:HttpClient,private _router:Router) {}

  getCustomCards(){
    return this.http.get<any[]>(this._carddataUrl);
  } 
  getDecklists(){
    return this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/decklists`);
  }

  getDecklist(id:number){
    return this.http.get<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/decklists/${id}`);
  } 

  getDecklistInfo(id:number){
    return this.http.get<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/decklists-info/${id}`);
  }

  getCustomCard(id:string){
    return this.http.get<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/customcards/${id}`);
  } 

  getCustomCardsByDraft(name:string){
    return this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/customcards/${name}`);
  } 
  getDrafts(){
    return this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/drafts`);
  }

  deleteDecklists(id:number){
    return this.http.post<any>(`http://127.0.0.1:8080/api/delete-decklists`,id);

  }

  getCustomMonsters(){
    return this.http.get<any[]>(this._cardMonsters);
  } 
  getCustomSpells(){
    return this.http.get<any[]>(this._cardSpells);
  } 
  getCustomTraps(){
    return this.http.get<any[]>(this._cardTraps);
  } 
  getCustomSpellsTraps(){
    return this.http.get<any[]>(this._cardST);
  } 
  getCustomCardsByCreator(name:string){
    return this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/customcards/creator/${name}`);
  }
  getCustomCardsByTag(name:string){
    return this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/customcards/tags/${name}`);
  }  





  getFilteredCards(data: any){
    return this.http.post<Card[]>('https://mm8bitdm-ygo.herokuapp.com/api/yugioh/searchresult',data);
  }
  getFilteredCards2(data: any){
    return this.http.post<Card[]>('https://mm8bitdm-ygo.herokuapp.com/api/yugioh/searchresult',data);
  }

  submitDecklist(decklist:Decklist){
    console.log("help!")
    return this.http.post<any>('https://mm8bitdm-ygo.herokuapp.com/api/yugioh/submitdeck',decklist);
  }
  submitDraft(draft:Draft){
    return this.http.post<any>('http://127.0.0.1:8080/api/yugioh/submitdraft',draft
      
      
      )
  }

  submitPack(pack:Pack){
    return this.http.post<any>('https://mm8bitdm-ygo.herokuapp.com/api/yugioh/submitpack',pack)
  }

  
  
}
