import { Component, OnInit } from '@angular/core';
import { CustomcardsService, Decklist, importDecklist } from '../customcards.service';

@Component({
  selector: 'app-decklists',
  templateUrl: './decklists.component.html',
  styleUrls: ['./decklists.component.css']
})
export class DecklistsComponent implements OnInit {


  decklists!:importDecklist[];


  constructor(private customcardsService: CustomcardsService) { }

  ngOnInit(): void {
    this.customcardsService.getDecklists().subscribe(
      res => {
        if(res){}
        this.decklists = res;
        console.log(this.decklists)
      }


    )


  }

}
