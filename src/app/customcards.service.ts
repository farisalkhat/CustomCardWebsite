import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';





export interface HoveredCardDetails extends Document {
  card: Card;
  isHovering: boolean;
  leftPosition: number;
  rightPosition: number;
}

export interface UserDetails extends Document {
  cards: Card[];
  collection: any[];
  decklists: importDecklist[];
  details: any;
  drafts: any[];
  matches: any[];
  packs: any[];

}

export interface ArticleSubmit extends Document {
  tag: string;
  author: number;
  title: string;
  header: string;
  header_img: string;
  article: string;
}
export interface ArticleUpdate extends Document {
  article_id: number;
  author: number;
  title: string;
  header: string;
  header_img: string;
  article: string;
  tag: string;
}
export interface Article extends Document {
  id: number;
  author: number;
  title: string;
  header: string;
  header_img: string;
  article: string;
  creation_time: string
  modification_time: string
  tag: string;
  username: string;
  views:number;

}
export interface SiteData extends Document {
  packs_opened: number,
  dosh_spent: number,
  cotd: number
}


export interface Card extends Document {
  id: string;
  cardtype: string;
  name: string;
  type: string;
  atk: number;
  def: number;
  level: number;
  attribute: string;
  effect: string;
  creator: string;
  tag: string;
  drive_id: string;
  views:number;
}

export interface DraftCard extends Document, Card {
  copies: number;
  cardid: number;
}


export interface DeckListCard extends Card, Document {
  deck: string;
}

export interface Binder extends Document {
  id: number;
  title: string;
  creatorid: number;
}



export interface BinderInfo extends Document {
  title: string;
  creatorid: number;
  cards: PackCard[];
  packid: number;
}

export interface AddToBinder extends Document {
  creatorid: number;
  cards: PackCard[];
  packid: number;
  binderid: number;
}


export interface Draft {
  id: number;
  title: string;
  cardIDs: string[];
  ownerid: number;
  draftimage: string;
  description: string;
}

export interface Decklist {
  title: string;
  creator: string;
  creatorid: number;
  public:string;

  desc: string;
  decklist: string;

  mainDeck: string[];
  sideDeck: string[];
  extraDeck: string[];

  decklistid?: number;
  body:string;
  thumbnail:number;
  label:string;
}

export interface importDecklist {
  
  id: number;
  name: string;
  description: string;
  creator: string;
  creatorid: number;
  views:number;
  label:string;
  thumbnail:number;
  body:any;
  public: string;

}

export interface Pack {
  title: string;
  creator: string;
  creatorid: number;
  commonIDs: string[];
  rareIDs: string[];
  superIDs: string[];
  ultraIDs: string[];
  secretIDs: string[];
  packSize: string;
  cost: number;
  discordname: string;
  packurl: string;
  packdescription: string;
}


export interface Pack2 {
  title: string;
  creator: string;
  creatorid: number;
  commonIDs: string[];
  rareIDs: string[];
  superIDs: string[];
  ultraIDs: string[];
  secretIDs: string[];
  packSize: string;
  cost: number;
  packID: number;
  packurl: string;
  discordname: string;
  packdescription: string;
}

export interface PackInfo {
  id: number;
  title: string;
  creator: string;
  creatorid: number;
  pack: string;
  packsize: string;
  cost: number;
  discordname: string
  packdescription: string;
}


export interface PackCard extends Document {
  id: string;
  cardtype: string;
  name: string;
  type: string;
  atk: number;
  def: number;
  level: number;
  attribute: string;
  effect: string;
  creator: string;
  tag: string;
  rarity: string;
  drive_id: string;
  views:number;
}


export interface BinderCard extends Document {
  id: number;
  cardtype: string;
  name: string;
  type: string;
  atk: number;
  def: number;
  level: number;
  attribute: string;
  effect: string;
  creator: string;
  rarity: string;
  packtitle: string;
  packid: number;
  copies: number;
  drive_id: string;
}

export interface ChecklistCard extends Document {
  id: number;
  cardtype: string;
  name: string;
  type: string;
  atk: number;
  def: number;
  level: number;
  attribute: string;
  effect: string;
  creator: string;
  rarity: string;
  copies: number;
  drive_id: string;
}






export interface PackButton {
  packid: number;
  title: string;
  pack: string;
  packsize: string;
  cost: number;

}

export interface PackSelected {
  [details: string]: any[];
}

export interface PackSelectedData {
  packid: number;
  title: string;
  cost: number;
  amount: number;
}

export interface DuelData {
  duelist1: number;
  duelist2: number;
  result: string;
  replay: string;
  gamemode: string;
  date: string;
  format: string;
}


@Injectable({
  providedIn: 'root'
})


export class CustomcardsService {

  cardlistEvent: Subject<Object> = new Subject<Object>();
  deleteDraftCardEvent:Subject<Object> = new Subject<Object>();
  

  setDraft(draftType: string, customDraft: boolean) {
    this.draft = draftType;
    this.customDraft = customDraft;
  }
  getDraftType() {
    return this.draft;
  }
  getCustomEnabled() {
    return this.customDraft;
  }

  editDraft(edit: boolean) {
    this.editDrafts = edit;
  }
  getEditDraft() {
    return this.editDrafts;
  }

  setPack(draftType: string, customPack: boolean) {
    this.pack = draftType;
    this.customPack = customPack;
  }
  getPackType() {
    return this.pack;
  }
  getCustomPackEnabled() {
    return this.customPack;
  }

  editPack(edit: boolean) {
    this.editPacks = edit;
  }
  getEditPack() {
    return this.editPacks;
  }

  setEditPackID(editPackID: number) {
    this.editPackID = editPackID;
  }
  getEditPackID() {
    return this.editPackID;
  }

  setEditPackName(editPackName: string) {
    this.editPackName = editPackName;
  }

  getEditPackName() {
    return this.editPackName;
  }

  editDeck(edit: boolean) {
    this.editDecklist = edit;
  }
  getEditDecklist() {
    return this.editDecklist;
  }

  setEditDeckID(editDeckID: number) {
    this.editDeckID = editDeckID;
  }
  getEditDeckID() {
    return this.editDeckID;
  }

  setEditDeckName(editDeckName: string) {
    this.editDeckName = editDeckName;
  }

  getEditDeckName() {
    return this.editDeckName;
  }

  resetDeck() {
    this.editDeck(false);
    this.setEditDeckID(-1);
    this.setEditDeckName('')

    this.mainDeck = [];
    this.sideDeck = [];
    this.extraDeck = [];
  }

  uploadDecklist(mainDeck: any[], sideDeck: any[], extraDeck: any[]) {
    this.mainDeck = mainDeck;
    this.sideDeck = sideDeck;
    this.extraDeck = extraDeck;
  }
  getUploadedMain() {
    return this.mainDeck;
  }
  getUploadedSide() {
    return this.sideDeck;
  }
  getUploadedExtra() {
    return this.extraDeck;
  }




  setEditDraftID(editDraftID: number) {
    this.editDraftID = editDraftID;
  }
  getEditDraftID() {
    return this.editDraftID;
  }

  setEditDraftName(editDraftName: string) {
    this.editDraftName = editDraftName;
  }

  setEditDraftImage(editDraftImage: string) {
    this.editDraftImage = editDraftImage;
  }
  getEditDraftName() {
    return this.editDraftName;
  }
  getEditDraftImage() {
    return this.editDraftImage;
  }



  draft: string = "default"
  customDraft: boolean = false;

  editDrafts: boolean = false;
  editDraftID!: number;
  editDraftName!: string;
  editDraftImage!: string;


  pack: string = "default"
  customPack: boolean = false;

  editPacks: boolean = false;
  editPackID!: number;
  editPackName!: string;

  processingDraftEdit = false;
  processingPackEdit = false;

  editDecklist: boolean = false;
  editDeckID!: number;
  editDeckName!: string;
  processingDeckEdit = false;

  sealedDraftMode = false;


  mainDeck: string[] = []
  sideDeck: string[] = []
  extraDeck: string[] = []



  getSealedDraftMode() {
    return this.sealedDraftMode;
  }
  setSealedDraftMode(mode: boolean) {
    this.sealedDraftMode = mode;
  }


  getProcessingPack() {
    return this.processingPackEdit;
  }
  getProcessingDraft() {
    return this.processingDraftEdit;
  }
  setProcessingDraft(process: boolean) {

    this.processingDraftEdit = process;
  }
  setProcessingPack(process: boolean) {
    this.processingPackEdit = process;
  }

  getProcessingDeck() { return this.processingDeckEdit; }
  setProcessingDeck(process: boolean) { this.processingDeckEdit = process; }



  packAmount = 6;
  packSize = 'medium'

  private _carddataUrl = "https://farisalkhat.com/theattic/api/yugioh/customcards"
  private _cardMonsters = "https://farisalkhat.com/theattic/api/yugioh/monsters"
  private _cardSpells = "https://farisalkhat.com/theattic/api/yugioh/spells"
  private _cardTraps = "https://farisalkhat.com/theattic/api/yugioh/traps"
  private _cardST = "https://farisalkhat.com/theattic/api/yugioh/spellstraps"

  PackQueue: PackSelectedData[] = [];



  constructor(private http: HttpClient, private _router: Router) { }

  setPackQueue(packQueue: PackSelectedData[]) {
    this.PackQueue = packQueue;
  }
  getPackQueue() {
    return this.PackQueue;
  }

  getCustomCards() {
    return this.http.get<any[]>(this._carddataUrl);
  }
  getRecentCards() {
    return this.http.get<any[]>("https://farisalkhat.com/theattic/api/yugioh/recentcards");
  }
  getCustomCardsIDs() {
    return this.http.get<any[]>("https://farisalkhat.com/theattic/api/yugioh/customcards-ids");
  }
  getDecklists() {
    return this.http.get<any[]>(`https://farisalkhat.com/theattic/api/yugioh/decklists`);
  }
  getDecklistsFromUser(id: number) {
    return this.http.get<any[]>(`https://farisalkhat.com/theattic/api/yugioh/decklists/creator/${id}`);
  }

  getMatchesFromUser(id: number) {
    return this.http.get<any[]>(`https://farisalkhat.com/theattic/api/yugioh/matches/duelist/${id}`);
  }
  getRecentDecklists(){
    return this.http.get<any[]>('https://farisalkhat.com/theattic/api/yugioh/recent-decklists');
  }

  getPlayers() {
    return this.http.get<any[]>(`https://farisalkhat.com/theattic/api/yugioh/players`);
  }
  getPlayersMostDecks() {
    return this.http.get<any[]>(`https://farisalkhat.com/theattic/api/yugioh/players-most-decks`);
  }
  getPlayersMostDeckViews() {
    return this.http.get<any[]>(`https://farisalkhat.com/theattic/api/yugioh/players-most-deck-views`);
  }

  getMatches() {
    return this.http.get<any[]>(`https://farisalkhat.com/theattic/api/yugioh/matches`);
  }
  getBanlist() {
    return this.http.get<any[]>(`https://farisalkhat.com/theattic/api/yugioh/customcards/banlist`);
  }

  getDeckMasters() {
    return this.http.get<any[]>(`https://farisalkhat.com/theattic/api/yugioh/deckmaster`);
  }

  getDecklist(id: number) {
    return this.http.get<any>(`https://farisalkhat.com/theattic/api/yugioh/decklists/${id}`);
  }
  getStructureDeck(id: number) {
    return this.http.get<any>(`https://farisalkhat.com/theattic/api/yugioh/structure-decks/${id}`);
  }

  getDecklistInfo(id: number) {
    return this.http.get<any>(`https://farisalkhat.com/theattic/api/yugioh/decklists-info/${id}`);
  }

  getCustomCard(id: number) {
    return this.http.get<any>(`https://farisalkhat.com/theattic/api/yugioh/customcards/card/${id}`);
  }

  getCustomCardsByDraft(name: number) {
    return this.http.get<any[]>(`https://farisalkhat.com/theattic/api/yugioh/customcards/draft/${name}`);
  }
  getDrafts() {
    return this.http.get<any[]>(`https://farisalkhat.com/theattic/api/yugioh/drafts`);
  }

  getPacks() {
    return this.http.get<PackButton[]>(`https://farisalkhat.com/theattic/api/yugioh/packs`);
  }
  getEvents() {
    return this.http.get<any[]>(`https://farisalkhat.com/theattic/api/yugioh/events`);
  }
  getStructureDecks() {
    return this.http.get<PackButton[]>(`https://farisalkhat.com/theattic/api/yugioh/structure-decks`);
  }

  getPackInfoByID(id: number) {
    //Input: Pack ID, Output: Pack Info
    return this.http.get<PackInfo>(`https://farisalkhat.com/theattic/api/yugioh/packs/${id}`);
  }

  getDraftsbyOwner(id: number) {
    return this.http.get<any[]>(`https://farisalkhat.com/theattic/api/yugioh/drafts/${id}`);
  }
  getPacksbyOwner(id: number) {
    return this.http.get<any[]>(`https://farisalkhat.com/theattic/api/yugioh/packs/owner/${id}`);
  }

  getDraftByID(id: number) {
    return this.http.get<any[]>(`https://farisalkhat.com/theattic/api/yugioh/customcards/draft/${id}`);
  }

  getDraftCardsbyID(id: number) {
    return this.http.get<any[]>(`https://farisalkhat.com/theattic/api/yugioh/customcards/draft/cards/${id}`);
  }

  deleteDecklists(deckid: number,userid:number) {
    let data = {userid,deckid}
    return this.http.post<any>(`https://farisalkhat.com/theattic/api/delete-decklists`, data);

  }

  getCustomMonsters() {
    return this.http.get<any[]>(this._cardMonsters);
  }
  getCustomSpells() {
    return this.http.get<any[]>(this._cardSpells);
  }
  getCustomTraps() {
    return this.http.get<any[]>(this._cardTraps);
  }
  getCustomSpellsTraps() {
    return this.http.get<any[]>(this._cardST);
  }
  getCustomCardsByCreator(name: string) {
    return this.http.get<any[]>(`https://farisalkhat.com/theattic/api/yugioh/customcards/creator/${name}`);
  }
  getCustomCardsByTag(name: string) {
    return this.http.get<any[]>(`https://farisalkhat.com/theattic/api/yugioh/customcards/tags/${name}`);
  }

  SetPackNo(value: number, packid: number) {
    if (value == undefined) {
      this.packAmount = 6
    }
    else {
      this.packAmount = value;
    }

  }
  getCustomCardsByPack(id: number) {
    if(id==1){

      return this.getCustomCards();

    }
    else{
      return (this.http.get<any[]>(`https://farisalkhat.com/theattic/api/yugioh/customcards/pack/${id}`));
    }

  }

  getPackAmount() {
    return this.packAmount;
  }




  getFilteredCards(data: any) {
    return this.http.post<Card[]>('https://farisalkhat.com/theattic/api/yugioh/searchresult', data);
  }
  getFilteredCards2(data: any) {
    return this.http.post<Card[]>('https://farisalkhat.com/theattic/api/yugioh/searchresult', data);
  }

  submitDecklist(decklist: Decklist) {
    console.log("help!")
    return this.http.post<any>('https://farisalkhat.com/theattic/api/yugioh/submitdeck', decklist);
  }
  submitDraft(draft: any) {
    return this.http.post<any>('https://farisalkhat.com/theattic/api/yugioh/submitdraft', draft
    )
  }

  resubmitDraft(draft: any) {
    return this.http.post<any>('https://farisalkhat.com/theattic/api/yugioh/editdraft', draft
    )
  }

  submitPack(pack: Pack) {
    return this.http.post<any>('https://farisalkhat.com/theattic/api/yugioh/submitpack', pack)
  }

  submitStructure(pack: Pack) {
    return this.http.post<any>('https://farisalkhat.com/theattic/api/yugioh/submitstructure', pack)
  }

  resubmitPack(pack: Pack) {
    return this.http.post<any>('https://farisalkhat.com/theattic/api/yugioh/editpack', pack
    )
  }

  deletePack(packid: number,userid:number) {
    let data = {userid,packid}
    return this.http.post<any>(`https://farisalkhat.com/theattic/api/delete-pack`, data);
  }

  deleteDraft(id: number) {
    const draftID = new FormData();
    draftID.append('draftid', id.toString())
    return this.http.post<any>(`https://farisalkhat.com/theattic/api/yugioh/delete-draft`, draftID);
  }




  uploadPackImage(formData: FormData) {
    return this.http.post<any>('https://farisalkhat.com/theattic/api/yugioh/uploadpackimage', formData
    )
  }

  uploadProfileImage(formData: FormData) {
    return this.http.post<any>('https://farisalkhat.com/theattic/api/yugioh/uploadprofileimage', formData
    )
  }

  uploadCardImage(formData: FormData) {
    return this.http.post<any>('https://farisalkhat.com/theattic/api/yugioh/uploadcardimage', formData
    )
  }

  uploadPackEvent(data:any) {
    return this.http.post<any>('https://farisalkhat.com/theattic/api/yugioh/upload-pack-event', data
    )
  }





  getBindersByOwner(id: number) {
    return this.http.get<Binder[]>(`https://farisalkhat.com/theattic/api/yugioh/binders/${id}`);
  }

  submitBinder(binderInfo: BinderInfo) {
    return this.http.post<any>('https://farisalkhat.com/theattic/api/yugioh/submitbinder', binderInfo
    )
  }
 
  addToBinder(addToBinder: AddToBinder) {
    return this.http.post<any>('https://farisalkhat.com/theattic/api/yugioh/addtobinder', addToBinder
    )
  }

  addToCollection(addToBinder: AddToBinder) {
    return this.http.post<any>('https://farisalkhat.com/theattic/api/yugioh/addtocollection', addToBinder
    )
  }
  submitDuel(dueldata: DuelData) {
    return this.http.post<any>('https://farisalkhat.com/theattic/api/yugioh/submit-duel', dueldata)
  }

  getCardsByBinderID(id: number) {

    return this.http.get<BinderCard[]>(`https://farisalkhat.com/theattic/api/yugioh/customcards/binders/${id}`);

  }

  getCollectionCardsByCreatorID(id: number) {
    return this.http.get<BinderCard[]>(`https://farisalkhat.com/theattic/api/yugioh/customcards/collections/${id}`);
  }
  getCollectionCardsByCreatorIDMerged(id: number) {
    return this.http.get<BinderCard[]>(`https://farisalkhat.com/theattic/api/yugioh/customcards/collectionsmerged/${id}`);
  }

  getChecklist(userid: number, packid: number) {
    return this.http.get<ChecklistCard[]>(`https://farisalkhat.com/theattic/api/yugioh/customcards/checklist/${userid}/${packid}`);
  }


  getCardDetails(id: number) {
    return this.http.get<any>(`https://farisalkhat.com/theattic/api/yugioh/customcards/cards/details/${id}`);
  }
  getTopCards() {
    return this.http.get<any>(`https://farisalkhat.com/theattic/api/yugioh/top-cards`);
  }

  getUserPageDetails(id: number) {
    return this.http.get<any>(`https://farisalkhat.com/theattic/api/yugioh/users/${id}`);
  }

  editProfileImages(images: any) {
    return this.http.post<any>(`https://farisalkhat.com/theattic/api/yugioh/editprofile/images`, images);
  }

  resubmitDecklist(decklist: Decklist) {
    return this.http.post<any>(`https://farisalkhat.com/theattic/api/yugioh/editdeck`, decklist);
  }
  deleteMatch(id: any) {
    return this.http.post<any>(`https://farisalkhat.com/theattic/api/yugioh/deletematch`, id);
  }

  submitCSVFile(file: any) {
    const uploadedFile = new FormData();
    uploadedFile.append('file', new Blob([file], { type: 'text/csv' }), file.name);
    return this.http.post<any>(`https://farisalkhat.com/theattic/api/yugioh/submitCSV`, uploadedFile);
  }
  deleteCard(card: Card) {
    const cardID = new FormData();
    cardID.append('cardid', card.id)
    return this.http.post<any>(`https://farisalkhat.com/theattic/api/yugioh/deleteCard`, cardID);

  }

  getSiteData() {
    return this.http.get<any>(`https://farisalkhat.com/theattic/api/yugioh/sitedata`);
  }
  getLatestPack() {
    return this.http.get<PackButton>(`https://farisalkhat.com/theattic/api/yugioh/latestpack`);
  }
  updateCOTD() {
    return this.http.get<any>(`https://farisalkhat.com/theattic/api/yugioh/cotd`);
  }
  submitArticle(article: ArticleSubmit) {
    console.log(article)
    return this.http.post<any>(`https://farisalkhat.com/theattic/api/yugioh/submitArticle`, article);
  }
  getArticles() {
    return this.http.get<any>(`https://farisalkhat.com/theattic/api/yugioh/articles`);
  }
  getArticle(id: number) {
    return this.http.get<any>(`https://farisalkhat.com/theattic/api/yugioh/articles/${id}`);
  }
  updateArticle(article: ArticleUpdate) {
    return this.http.post<any>(`https://farisalkhat.com/theattic/api/yugioh/updateArticle`, article);
  }
  updateDraftCardViews(data:{}){  
    return this.http.post<any>(`https://farisalkhat.com/theattic/api/yugioh/update-draft-card-views`,data);
  }

  updateProfileViews(id:number) {
    return this.http.post<any>(`https://farisalkhat.com/theattic/api/yugioh/update-profile-views`, id);
  }
  updateDraftviews(id:number) {
    return this.http.post<any>(`https://farisalkhat.com/theattic/api/yugioh/update-draft-views`, id);
  }
  updateDecklistViews(id:number) {
    return this.http.post<any>(`https://farisalkhat.com/theattic/api/yugioh/update-decklist-views`, id);
  }
  updateCardViews(id:number) {
    return this.http.post<any>(`https://farisalkhat.com/theattic/api/yugioh/update-card-views`, id);
  }
  updateArticleViews(id:number) {
    return this.http.post<any>(`https://farisalkhat.com/theattic/api/yugioh/update-article-views`, id);
  }





  deleteArticle(article: Article) {
    return this.http.post<any>(`https://farisalkhat.com/theattic/api/yugioh/deleteArticle`, article);
  }


  @Output() hoverCardEvent = new EventEmitter<HoveredCardDetails>();
  HoveredCard(msg: HoveredCardDetails) {
    this.hoverCardEvent.emit(msg);
  }

  @Output() disableHoverCardEvent = new EventEmitter<boolean>();
  DisableHoveredCard() {
    this.disableHoverCardEvent.emit(false);
  }

  @Output() provideDecklistDetailsEvent = new EventEmitter<number>();
  SendDeckListDetails(){
    this.provideDecklistDetailsEvent.emit(1);
  }

  @Output() receiveDecklistDetailsEvent = new EventEmitter<string>();
  ReceiveDeckListDetails(msg:any){
    this.receiveDecklistDetailsEvent.emit(msg);
    console.log("this is msg:" + msg)
  }


  editorDefault = this.getCustomCards();

  defaultDeckEditor: string = "default";
  deckEditorID: number = 0;
  deckEditorCards: any[] = [];



  SetDeckEditorDefault() {
    this.defaultDeckEditor = "default";
    console.log(this.defaultDeckEditor);
    this._router.navigate(['/deck-editor'])
  }




  SetDeckEditorUserCollection(id: number) {
    this.defaultDeckEditor = "collection";
    this.deckEditorID = id;
    this._router.navigate(['/deck-editor'])
  }


  SetDeckEditorUserBinder(id: number) {
    this.defaultDeckEditor = "binder";
    this.deckEditorID = id
    this._router.navigate(['/deck-editor'])
  }


  UpdateDeckEditorUserDraft(deck: Card[]) {
    this.defaultDeckEditor = "draft";
    this.deckEditorCards = deck;
  }
  SetDeckEditorUserDraft(deck: Card[]) {
    this.defaultDeckEditor = "draft";
    this.deckEditorCards = deck;
    this._router.navigate(['/deck-editor'])
  }

  GetDeckEditorRule() {
    return this.defaultDeckEditor;
  }



}
