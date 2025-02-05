import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card, CustomcardsService, DraftCard } from 'src/app/customcards.service';

@Component({
  selector: 'app-view-draft-details',
  templateUrl: './view-draft-details.component.html',
  styleUrls: ['./view-draft-details.component.css']
})
export class ViewDraftDetailsComponent implements OnInit {
  draftid!: number;
  draft:any = {};
  draftInfo:any;
  modifications:any
  customDraft: [] = [];
  cards!: any[];
  draftSize:number = 0;
  constructor(private route: ActivatedRoute, public router: Router, private customcardsService: CustomcardsService) { }

  effectCards!:any[];
  xyzCards!:any[];
  fusionCards!:any[];
  ritualCards!:any[];
  synchroCards!:any[];
  spellCards!:any[];
  trapCards!:any[];

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.draftid = Number(paramMap.get('draftid'))
      this.customcardsService.getDraftByID(this.draftid).subscribe(
        res => {
            console.log(res)
          this.draft = res;
          this.draftInfo = this.draft['draft_info']
          this.cards = this.draft['cards']
          this.modifications = this.draft['modifications']
          this.draftSize = this.cards.length;

          if(this.cards.length == 0){
            this.router.navigate(['/drafts/draftlists'])
          }



          this.cards.sort((a, b) =>

            {
              if(a.cardtype.includes('Monster')){
                  if(b.cardtype.includes('Spell') || b.cardtype.includes('Trap')){
                      return -1
                  }
                  else{
                      if(a.name > b.name){
                          return 1
                      }
                      else{
                          return -1
                      }

                  }
              }
              if(a.cardtype.includes('Spell')){
                  if(b.cardtype.includes('Monster')){
                      return 1
                  }
                  else if(b.cardtype.includes('Trap')){
                      return -1
                  }
                  else{
                      if(a.name > b.name){
                          return 1
                      }
                      else{
                          return -1
                      }
                  }

              }
              if(a.cardtype.includes('Trap')){
                  if(b.cardtype.includes('Monster') || b.cardtype.includes('Spell')){
                      return 1
                  }
                  else{
                      if(a.name > b.name){
                          return 1
                      }
                      else{
                          return -1
                      }
                  }
              }

              return 1}





            )
            
            this.customcardsService.updateDraftviews(this.draftid).subscribe()
        }
      )


    });
  }
 

  FilterCards(){
    this.effectCards = this.cards.filter((card)=>card.cardtype.includes('Effect'));
    this.xyzCards = this.cards.filter((card)=>card.cardtype.includes('Xyz'));
    this.ritualCards = this.cards.filter((card)=>card.cardtype.includes('Ritual'));
    this.synchroCards = this.cards.filter((card)=>card.cardtype.includes('Synchro'));
    this.fusionCards = this.cards.filter((card)=>card.cardtype.includes('Fusion'));
    this.spellCards = this.cards.filter((card)=>card.cardtype.includes('Spell'));
    this.trapCards = this.cards.filter((card)=>card.cardtype.includes('Trap'));

  }

}
