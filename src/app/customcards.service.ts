import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';


export interface UserDetails extends Document{
  cards:Card[];
  collection:any[];
  decklists:importDecklist[];
  details:any;
  drafts:any[];
  matches:any[];
  packs:any[];

}

export interface ArticleSubmit extends Document{
  author:number;
  title:string;
  header:string;
  header_img:string;
  article:string;
}
export interface ArticleUpdate extends Document{
  article_id:number;
  author:number;
  title:string;
  header:string;
  header_img:string;
  article:string;
}
export interface Article extends Document{
  id:number;
  author:number;
  title:string;
  header:string;
  header_img:string;
  article:string;
  creation_time:string
  modification_time:string
  username:string;
  
}
export interface SiteData extends Document{
  packs_opened:number,
  dosh_spent:number,
  cotd:number
}


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
  drive_id:string
}


export interface DeckListCard extends Card, Document{
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
  draftimage:string;
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

  decklistid?:number;
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
  discordname:string;
  packurl:string;
}


export interface Pack2 {
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
  packID:number;
  packurl:string;
  discordname:string;
}

export interface PackInfo{
  id:number;
  title:string;
  creator:string;
  creatorid:number;
  pack:string;
  packsize:string;
  cost:number;
  discordname:string
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
  drive_id:string;
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
  drive_id:string;
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
  drive_id:string;
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

export interface DuelData{
  duelist1:number;
  duelist2:number;
  result:string;
  replay:string;
  gamemode:string;
  date:string;
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

  setPack(draftType: string,customPack:boolean) {
    this.pack= draftType;
    this.customPack = customPack;
  }
  getPackType(){
    return this.pack;
  }
  getCustomPackEnabled(){
    return this.customPack;
  }

  editPack(edit:boolean){
    this.editPacks=edit;
  }
  getEditPack(){
    return this.editPacks;
  }

  setEditPackID(editPackID:number){
    this.editPackID=editPackID;
  }
  getEditPackID(){
    return this.editPackID;
  }

  setEditPackName(editPackName:string){
    this.editPackName = editPackName;
  }

  getEditPackName(){
    return this.editPackName;
  }

  editDeck(edit:boolean){
    this.editDecklist=edit;
  }
  getEditDecklist(){
    return this.editDecklist;
  }

  setEditDeckID(editDeckID:number){
    this.editDeckID=editDeckID;
  }
  getEditDeckID(){
    return this.editDeckID;
  }

  setEditDeckName(editDeckName:string){
    this.editDeckName = editDeckName;
  }

  getEditDeckName(){
    return this.editDeckName;
  }

  resetDeck(){
    this.editDeck(false);
    this.setEditDeckID(-1);
    this.setEditDeckName('')

    this.mainDeck= [];
    this.sideDeck = [];
    this.extraDeck = [];
  } 

  uploadDecklist(mainDeck:any[],sideDeck:any[],extraDeck:any[]){
    this.mainDeck=mainDeck;
    this.sideDeck=sideDeck;
    this.extraDeck=extraDeck;
  }
  getUploadedMain(){
    return this.mainDeck;
  }
  getUploadedSide(){
    return this.sideDeck;
  }
  getUploadedExtra(){
    return this.extraDeck;
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

  setEditDraftImage(editDraftImage:string){
    this.editDraftImage = editDraftImage;
  }
  getEditDraftName(){
    return this.editDraftName;
  }
  getEditDraftImage(){
    return this.editDraftImage;
  }



  draft:string = "default"
  customDraft:boolean = false;

  editDrafts:boolean=false;
  editDraftID!:number;
  editDraftName!:string;
  editDraftImage!:string;


  pack:string = "default"
  customPack:boolean = false;

  editPacks:boolean=false;
  editPackID!:number;
  editPackName!:string;

  processingDraftEdit = false;
  processingPackEdit = false;

  editDecklist:boolean = false;
  editDeckID!:number;
  editDeckName!:string;
  processingDeckEdit = false;

  sealedDraftMode = false;


  mainDeck:string[]=[]
  sideDeck:string[]=[]
  extraDeck:string[]=[]



  getSealedDraftMode(){
    return this.sealedDraftMode;
  }
  setSealedDraftMode(mode:boolean){
    this.sealedDraftMode = mode;
  }


  getProcessingPack(){
    return this.processingPackEdit;
  }
  getProcessingDraft(){
    return this.processingDraftEdit;
  }
  setProcessingDraft(process:boolean){
    
    this.processingDraftEdit=process;
  }
  setProcessingPack(process:boolean){
    this.processingPackEdit=process;
  }

  getProcessingDeck(){return this.processingDeckEdit;}
  setProcessingDeck(process:boolean){this.processingDeckEdit = process;}



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
  getRecentCards(){
    return this.http.get<any[]>("https://mm8bitdm-ygo.herokuapp.com/api/yugioh/recentcards");
  } 
  getCustomCardsIDs(){
    return this.http.get<any[]>("https://mm8bitdm-ygo.herokuapp.com/api/yugioh/customcards-ids");
  } 
  getDecklists(){
    return this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/decklists`);
  }
  getDecklistsFromUser(id:number){
    return this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/decklists/creator/${id}`);
  }

  getMatchesFromUser(id:number){
    return this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/matches/duelist/${id}`);
  }

  getPlayers(){
    return this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/players`);
  }

  getMatches(){
    return this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/matches`);
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
    return this.http.get<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/customcards/card/${id}`);
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
    //Input: Pack ID, Output: Pack Info
    return this.http.get<PackInfo>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/packs/${id}`);
  }

  getDraftsbyOwner(id:number){
    return this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/drafts/${id}`);
  }
  getPacksbyOwner(id:number){
    return this.http.get<any[]>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/packs/owner/${id}`);
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

  resubmitPack(pack:Pack){
    return this.http.post<any>('https://mm8bitdm-ygo.herokuapp.com/api/yugioh/editpack',pack   
    )
  }
  uploadImage(formData:FormData){
    return this.http.post<any>('https://mm8bitdm-ygo.herokuapp.com/api/yugioh/uploadimage',formData   
    )
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
  submitDuel(dueldata:DuelData){
    return this.http.post<any>('https://mm8bitdm-ygo.herokuapp.com/api/yugioh/submit-duel',dueldata)
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

  getUserPageDetails(id:number){
    return this.http.get<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/users/${id}`);
  }

  editProfileImages(images:any){
    return this.http.post<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/editprofile/images`,images);
  }

  resubmitDecklist(decklist:Decklist){
    return this.http.post<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/editdeck`,decklist);
  }
  deleteMatch(id:any){
    return this.http.post<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/deletematch`,id);
  }

  submitCSVFile( file:any) {
    const uploadedFile = new FormData();
    uploadedFile.append( 'file', new Blob([file], { type: 'text/csv' }), file.name);
    return this.http.post<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/submitCSV`, uploadedFile);
  }
  deleteCard(card:Card){
    const cardID = new FormData();
    cardID.append('cardid',card.id)
    return this.http.post<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/deleteCard`, cardID);
    
  }

  getSiteData(){
    return this.http.get<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/sitedata`);
  }
  getLatestPack(){
    return this.http.get<PackButton>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/latestpack`);
  }
  updateCOTD(){
    return this.http.get<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/cotd`);
  }
  submitArticle(article:ArticleSubmit){
    console.log(article)
    return this.http.post<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/submitArticle`, article);
  }
  getArticles(){
    return this.http.get<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/articles`);
  }
  getArticle(id:number){
    return this.http.get<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/articles/${id}`);
  }
  updateArticle(article:ArticleUpdate){
    return this.http.post<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/updateArticle`, article);
  }
  deleteArticle(article:Article){
    return this.http.post<any>(`https://mm8bitdm-ygo.herokuapp.com/api/yugioh/deleteArticle`, article);
  }
}
