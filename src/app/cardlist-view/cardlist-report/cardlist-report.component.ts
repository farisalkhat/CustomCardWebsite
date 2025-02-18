import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { Card } from 'src/app/customcards.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-cardlist-report',
  templateUrl: './cardlist-report.component.html',
  styleUrls: ['./cardlist-report.component.css']
})
export class CardlistReportComponent implements OnInit {
  @Input() draftsCompleted:number=0
  @Input() cardlist: any[]=[]
  constructor(private _router:Router) { }

  
  chartMonsterTypes:any;
  
  mostpicked:any[]=[];
  leastpicked:any[]=[];

  createMonsterChart(){
    this.chartMonsterTypes = new Chart("Monster Type Distribution", {
      type: 'doughnut',
      data: {
        labels: [
          'Aqua',
          'Beast',
          'Beast-Warrior',
          'Dinosaur',
          'Divine-Beast',
          'Dragon',
          'Fairy',
          'Fiend',
          'Fish',
          'Insect',
          'Machine',
          'Plant',
          'Psychic',
          'Pyro',
          'Reptile',
          'Rock',
          'Sea Serpent',
          'Spellcaster',
          'Thunder',
          'Warrior',
          'Winged-Beast',
          'Zombie'
        ],
        datasets: [{
          label: 'Amount of Monsters',
          data: [
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Aqua')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Beast')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Beast-Warrior')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Dinosaur')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Divine-Beast')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Dragon')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Fairy')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Fiend')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Fish')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Insect')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Machine')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Plant')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Psychic')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Pyro')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Reptile')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Rock')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Sea Serpent')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Spellcaster')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Thunder')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Warrior')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Winged-Beast')).length,
            this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Zombie')).length
            
    
    
    
    
    
    
          ],
          backgroundColor: [
            'rgb(54, 130, 222)',
            'rgb(108, 42, 6)',
            'rgb(182, 92, 8)',
            'rgb(255, 102, 0)',
            'rgb(185, 136, 0)',
            'rgb(159, 16, 47)',
            'rgb(222, 96, 172)',
            'rgb(77, 23, 98)',
            'rgb(50, 1, 197)',
            'rgb(10, 175, 63)',
            'rgb(195, 182, 185)',
            'rgb(12, 116, 62)',
            'rgb(113, 43, 114)',
            'rgb(191, 28, 28)',
            'rgb(64, 224, 112)',
            'rgb(211, 132, 47)',
            'rgb(9, 16, 107)',
            'rgb(187, 9, 160)',
            'rgb(255, 236, 62)',
            'rgb(182, 6, 44)',
            'rgb(99, 255, 206)',
            'rgb(249, 169, 186)',
            'rgb(39, 39, 39)',





          ],
          hoverOffset: 4
        }],
        
        
      },
      plugins: [ChartDataLabels],
      options: {

        plugins: {
          legend: {
            display: false
        },
          datalabels: {
            anchor: 'end',
            formatter: function(value, context) {
              if (value == 0){return ''}

              if(context.chart.data.labels){
                return context.chart.data.labels[context.dataIndex] + ": " + value;
              }
              else{
                return value;
              }
             },
            color: 'white',
            labels: {
              value: {
                color: 'white'
              }
            }
          }
        }
      }

      
    });
  }
  ngOnInit(): void {
    this.mostpicked = [...this.cardlist];
    this.leastpicked = [...this.cardlist];

    this.mostpicked.sort((a, b) => b.timesdrafted - a.timesdrafted)
    this.leastpicked.sort((a, b) => a.timesdrafted - b.timesdrafted)

    // this.mostpicked = this.mostpicked.slice(0, 100)
    // this.leastpicked = this.leastpicked.slice(0, 100)
    // console.log("This is drafts completed:" + this.draftsCompleted)
    // for(let card of this.cardlist){
    //   if(card.timesdrafted!=0){
        
    //     card.timesdrafted = (card.timesdrafted / this.draftsCompleted) * 100
    //   }
    // }
    this.createMonsterChart();

  }

  goToLink(url: string){

    let new_url =''

    if(this._router['location']._platformLocation.location.origin=='http://localhost:4200'){
       new_url = this._router.serializeUrl(
        this._router.createUrlTree(['/cards/']));
    }
    else{
       new_url = this._router.serializeUrl(
      this._router.createUrlTree(['/cards/']));
    }



    window.open(new_url +'/'+url, '_blank');


    // const newurl = 'https://www.duelingbook.com/card?id='+url
    // window.open(newurl, "_blank");
  }



}
