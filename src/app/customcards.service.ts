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
  creator:string;
  tag:string;
  deck:string;
}

export interface Binder extends Document{
  id:number;
  title:string;
  creatorid:number;
}



export interface BinderInfo extends Document{
  title:string;
  creatorid:number;
  cards:PackCard[];
  packid:number;
}

export interface AddToBinder extends Document{
  creatorid:number;
  cards:PackCard[];
  packid:number;
  binderid:number;
}


export interface Draft {
  id:number;
  title: string;
  cardIDs:string[];
  ownerid:number;
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
  creatorid:number;
  commonIDs:string[];
  rareIDs:string[];
  superIDs:string[];
  ultraIDs:string[];
  secretIDs:string[];
  packSize:string;
  cost: number;
}

export interface PackInfo{
  id:number;
  title:string;
  creator:string;
  creatorid:number;
  pack:string;
  packsize:string;
  cost:number;
}


export interface PackCard extends Document{
  id:string;
  cardtype:string;
  name:string;
  type:string;
  atk:number;
  def:number;
  level:number;
  attribute:string;
  effect:string;
  creator:string;
  tag:string;
  rarity:string;
}


export interface BinderCard extends Document{
  id:number;
  cardtype:string;
  name:string;
  type:string;
  atk:number;
  def:number;
  level:number;
  attribute:string;
  effect:string;
  creator:string;
  rarity:string;
  packtitle:string;
  packid:number;
  copies:number;
}

export interface ChecklistCard extends Document{
  id:number;
  cardtype:string;
  name:string;
  type:string;
  atk:number;
  def:number;
  level:number;
  attribute:string;
  effect:string;
  creator:string;
  rarity:string;
  copies:number;
}






export interface PackButton{
  packid:number;
  title:string;
  pack:string;
  packsize:string;
  cost:number;
  
}

export interface PackSelected{
  [details:string] :any[];
}

export interface PackSelectedData{
  packid:number;
  title:string;
  cost:number;
  amount:number;
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

  editDraft(edit:boolean){
    this.editDrafts=edit;
  }
  getEditDraft(){
    return this.editDrafts;
  }

  setEditDraftID(editDraftID:number){
    this.editDraftID=editDraftID;
  }
  getEditDraftID(){
    return this.editDraftID;
  }

  setEditDraftName(editDraftName:string){
    this.editDraftName = editDraftName;
  }

  getEditDraftName(){
    return this.editDraftName;
  }
  draft:string = "default"
  customDraft:boolean = false;

  editDrafts:boolean=false;
  editDraftID!:number;
  editDraftName!:string;

  packAmount = 6;
  packSize = 'medium'

  private _carddataUrl = "https://mm8bitdm-ygo.herokuapp.com/api/yugioh/customcards"
  private _cardMonsters = "https://mm8bitdm-ygo.herokuapp.com/api/yugioh/monsters"
  private _cardSpells = "https://mm8bitdm-ygo.herokuapp.com/api/yugioh/spells"
  private _cardTraps = "https://mm8bitdm-ygo.herokuapp.com/api/yugioh/traps"
  private _cardST = "https://mm8bitdm-ygo.herokuapp.com/api/yugioh/spellstraps"

  PackQueue:PackSelectedData[] =[];



  constructor(private http:HttpClient,private _router:Router) {}

  setPackQueue(packQueue:PackSelectedData[]){
    this.PackQueue = packQueue;
  }
  getPackQueue(){
    return this.PackQueue;
  }

  getCustomCards(){
    return this.http.get<any[]>(this._carddataUrl);
  } 
  getDecklists(){
    return this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/decklists`);
  }

  getPlayers(){
    return this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/players`);
  }

  getBanlist(){
    return this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/customcards/banlist`);
  }

  getDeckMasters(){
    return this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/deckmaster`);
  } 

  getDecklist(id:number){
    return this.http.get<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/decklists/${id}`);
  } 

  getDecklistInfo(id:number){
    return this.http.get<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/decklists-info/${id}`);
  }

  getCustomCard(id:number){
    return this.http.get<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/customcards/${id}`);
  } 

  getCustomCardsByDraft(name:string){
    return this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/customcards/${name}`);
  } 
  getDrafts(){
    return this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/drafts`);
  }

  getPacks(){
    return this.http.get<PackButton[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/packs`);
  }

  getPackInfoByID(id:number){
    return this.http.get<PackInfo>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/packs/${id}`);
  }

  getDraftsbyOwner(id:number){
    return this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/drafts/${id}`);
  }

  

  getDraftCardsbyID(id:number){
    return this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/customcards/draft/${id}`);
  }

  deleteDecklists(id:number){
    return this.http.post<any>(`https://mm8bitdm-ygo.herokuapp.com/api/delete-decklists`,id);

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

  SetPackNo(value:number,packid:number){
    if(value==undefined){
      this.packAmount= 6
    }
    else{
      this.packAmount=value;
    }

  }
  getCustomCardsByPack(id:number){
    return (this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/customcards/pack/${id}`));
  } 

  getPackAmount(){
    return this.packAmount;
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
    return this.http.post<any>('https://mm8bitdm-ygo.herokuapp.com/api/yugioh/submitdraft',draft
      )
  }

  resubmitDraft(draft:Draft){
    return this.http.post<any>('https://mm8bitdm-ygo.herokuapp.com/api/yugioh/editdraft',draft   
    )
  }

  submitPack(pack:Pack){
    return this.http.post<any>('https://mm8bitdm-ygo.herokuapp.com/api/yugioh/submitpack',pack)
  }

  
 
  

  getBindersByOwner(id:number){
    return this.http.get<Binder[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/binders/${id}`);
  }

  submitBinder(binderInfo:BinderInfo){
    return this.http.post<any>('https://mm8bitdm-ygo.herokuapp.com/api/yugioh/submitbinder',binderInfo   
    )
  }

  addToBinder(addToBinder:AddToBinder){
    return this.http.post<any>('https://mm8bitdm-ygo.herokuapp.com/api/yugioh/addtobinder',addToBinder   
    )
  }

  addToCollection(addToBinder:AddToBinder){
    return this.http.post<any>('https://mm8bitdm-ygo.herokuapp.com/api/yugioh/addtocollection',addToBinder   
    )
  }

  getCardsByBinderID(id:number){

    return this.http.get<BinderCard[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/customcards/binders/${id}`);
    
  }

  getCollectionCardsByCreatorID(id:number){
    return this.http.get<BinderCard[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/customcards/collections/${id}`);
  }

  getChecklist(userid:number,packid:number){
    return this.http.get<ChecklistCard[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/customcards/checklist/${userid}/${packid}`);
  }


  getCardDetails(id:number){
    return this.http.get<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/customcards/cards/details/${id}`);
  }
}
