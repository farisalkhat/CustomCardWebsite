import { Component, OnInit } from '@angular/core';
import { Card, CustomcardsService, Decklist, importDecklist } from '../customcards.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-decklists',
  templateUrl: './decklists.component.html',
  styleUrls: ['./decklists.component.css']
})
export class DecklistsComponent implements OnInit {
  searchFilters = new FormGroup({
    deckname: new FormControl('', [
      Validators.minLength(1),
      Validators.maxLength(100)
    ]),
    cardname: new FormControl('', [
      Validators.minLength(1),
      Validators.maxLength(100)
    ]),
    decklabel: new FormControl('', [
      Validators.minLength(1),
      Validators.maxLength(100)
    ]),

  })
  get f() { return this.searchFilters.controls; }


  originalDecklists:any[]=[]
  decklists:any[]=[]

  current_decklists:any[]=[];

  constructor(private customcardsService: CustomcardsService) { }

  ngOnInit(): void {
    this.customcardsService.getDecklists().subscribe(
      res => {

        this.decklists = res;
        this.originalDecklists = [...this.decklists];
        const current = new Date();
        this.timestamp = current.getTime();
        this.loadInitialDecks();

      }


    )


  }

  loadInitialDecks(){
    this.current_decklists = [];
    let i = 0;
    console.log('starting while loops...')
        while(i!=12){
          if(this.decklists.length!=0){
            let decklist = this.decklists.shift();
            this.current_decklists.push(decklist);
          }
          i++;
        }
    console.log(this.originalDecklists)
    this.hideloader();


  }

  timestamp: number = 0;
  getTimeStamp(){
    return this.timestamp;
  }

  loadMore(){
    let i = 0;
        while(i!=3){
          if(this.decklists.length==0){
            return;
          }
          let decklist = this.decklists.shift();
          this.current_decklists.push(decklist);
          i++;
        }
  }

  submitSearch(){
    this.showloader();

    if(this.searchFilters.controls['deckname'].value.length==0 &&
    this.searchFilters.controls['cardname'].value.length==0  &&
    this.searchFilters.controls['decklabel'].value.length==0
    ){
      this.decklists = [...this.originalDecklists];
      this.loadInitialDecks();
      return;
    }

    this.decklists = []
    let placeholderDecklists = [...this.originalDecklists]
    if(this.searchFilters.controls['cardname'].value.length!=0){
      for(let decklist in placeholderDecklists){
        let cards = placeholderDecklists[decklist].cards
        cards = cards.filter((card: any)=>card.name.toLowerCase().includes(this.searchFilters.controls['cardname'].value.toLowerCase()))
        console.log(cards)
        if(cards.length>0){
          this.decklists.push(placeholderDecklists[decklist])
        }
      }
      placeholderDecklists = [...this.decklists]
    }
    if(this.searchFilters.controls['deckname'].value.length!=0){
      this.decklists = placeholderDecklists.filter((decklist)=>decklist.name.toLowerCase().includes(this.searchFilters.controls['deckname'].value.toLowerCase()))
      placeholderDecklists = [...this.decklists]
    }

    if(this.searchFilters.controls['decklabel'].value.length!=0){
      this.decklists = placeholderDecklists.filter((decklist)=>decklist.label === this.searchFilters.controls['decklabel'].value)
      placeholderDecklists = [...this.decklists]
    }

    this.loadInitialDecks();
  }

  hideloader() {
    var div = document.getElementById('Loading')
    if(div){
      div.style.display = "none"
      console.log(div)
    }

  }

  showloader() {
    var div = document.getElementById('Loading')
    if(div){
      div.style.display = "block"
      console.log(div)
    }

  }


}
