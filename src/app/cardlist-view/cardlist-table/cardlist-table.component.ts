import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card, CustomcardsService } from 'src/app/customcards.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart, { Color } from 'chart.js/auto';
@Component({
  selector: 'app-cardlist-table',
  templateUrl: './cardlist-table.component.html',
  styleUrls: ['./cardlist-table.component.css']
})
export class CardlistTableComponent implements OnInit {
  @Input() mode:string='draft';
  chartMonsterTypes:any;
  chartMonsterAttributes:any;
  chartCardtypes:any;
  @Input() cardlist: any[]=[]
  constructor(private _router:Router,private _ccService:CustomcardsService) {}
  effectCards!:any[];
  xyzCards!:any[];
  fusionCards!:any[];
  ritualCards!:any[];
  synchroCards!:any[];
  spellCards!:any[];
  trapCards!:any[];
  ngOnInit(): void {
    console.log("inside cardlist-tableview")
    console.log(this.cardlist)
    this._ccService.cardlistEvent.subscribe((data)=>{
      this.updateCardlist(data)
    })
    this.FilterCards();
    



      this.createMonsterChart();
      this.createMonsterCardTypeChart();
      this.createMonsterAttributeChart();

      this.chartMonsterTypes.render();
      this.chartCardtypes.render();
      this.chartMonsterAttributes.render();

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
  rightDeleteDraftCard($event: { preventDefault: () => void; },card:Card){
    this._ccService.deleteDraftCardEvent.next(card)
    $event.preventDefault();
    

  } 
  updateCardlist(data:any){
    console.log("updateCardlist:")
    console.log(data)
    this.cardlist=data
    this.FilterCards();
   }

   createMonsterChart(){
    let labels1 = ['Aqua',
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
      'Zombie']

let data1 = [this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Aqua')).length,
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
  this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.type.includes('Zombie')).length]

  
  let dataset = labels1.map(function(d,i){return {
    label:d,
    data:data1[i]||0
  }
})

  dataset = dataset.sort(function(a,b){return b.data - a.data})
    let labels: string[] = [];
    let data: number[] = []
    dataset.forEach(function(d: { label: string, data: number }){
      labels.push(d.label)
      data.push(d.data)
    })

    this.chartMonsterTypes = new Chart(document.getElementById('monsterType') as HTMLCanvasElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Amount of Monsters',
          data: data,
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
      options: {layout:{padding:100},

        plugins: {
          legend: {
            display: false
        },
        title:{text: 'Monster Type Distribution', display:true,
          padding:{bottom:30},
          font:{ weight:'bold',size:20},
          color:'white',
        },
          datalabels: {
            anchor: 'end',
            align: 'end',
            
            
            formatter: function(value, context) {
              if (value <=4){return ''}

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
  
  createMonsterCardTypeChart(){
    let labels1 = ['Effect','Ritual','Fusion','Synchro','Xyz','Spell','Trap']

    let data1 = [this.cardlist.filter((card)=>card.cardtype.includes('Effect')).length,
      this.cardlist.filter((card)=>card.cardtype.includes('Ritual')).length,
      this.cardlist.filter((card)=>card.cardtype.includes('Fusion')).length,
      this.cardlist.filter((card)=>card.cardtype.includes('Synchro')).length,
      this.cardlist.filter((card)=>card.cardtype.includes('Xyz')).length,
      this.cardlist.filter((card)=>card.cardtype.includes('Spell')).length,
      this.cardlist.filter((card)=>card.cardtype.includes('Trap')).length]

      let bgColor1 =[ 'rgb(149, 77, 33)',
      'rgb(28, 92, 195)',
      'rgb(149, 33, 149)',
      'rgb(238, 211, 231)',
      'rgb(53, 53, 53)',
      'rgb(19, 154, 148)',
      'rgb(180, 26, 162)']

  
  let dataset = labels1.map(function(d,i){return {
    label:d,
    data:data1[i]||0,
    backgroundColor:bgColor1[i]
  }
})

  dataset = dataset.sort(function(a,b){return b.data - a.data})
    let labels: string[] = [];
    let data: number[] = []
    let bgColor: Color[] = []

    dataset.forEach(function(d: { label: string, data: number, backgroundColor: Color }){
      labels.push(d.label)
      data.push(d.data)
      bgColor.push(d.backgroundColor)
    })

    this.chartCardtypes = new Chart(document.getElementById('cardType') as HTMLCanvasElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          
          label: 'Card Type Distribution',
          data: data,
          backgroundColor:bgColor,
          hoverOffset: 4
        }],
        
        
      },
      plugins: [ChartDataLabels],
      options: {layout:{padding:100},

        plugins: {
          legend: {
            display: false
        },
        title:{text: 'Card Type Distribution', display:true,
          padding:{bottom:30},
          font:{ weight:'bold',size:20},
          color:'white',
        },
          datalabels: {
            anchor: 'end',
            align: 'end',
            
            
            formatter: function(value, context) {
              if (value <=4){return ''}

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

  createMonsterAttributeChart(){
    let labels1 = ['DARK','LIGHT','EARTH','WATER','FIRE','WIND','DIVINE']

    let data1 = [this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.attribute.includes('DARK')).length,
      this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.attribute.includes('LIGHT')).length,
      this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.attribute.includes('EARTH')).length,
      this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.attribute.includes('WATER')).length,
      this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.attribute.includes('FIRE')).length,
      this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.attribute.includes('WIND')).length,
      this.cardlist.filter((card)=>card.cardtype.includes('Monster')).filter((card:Card)=>card.attribute.includes('DIVINE')).length]

      let bgColor1 =[ 'rgb(37, 38, 40)',
      'rgb(235, 221, 205)',
      'rgb(170, 88, 0)',
      'rgb(29, 43, 165)',
      'rgb(179, 9, 9)',
      'rgb(19, 154, 148)',
      'rgb(255, 221, 0)']

  
  let dataset = labels1.map(function(d,i){return {
    label:d,
    data:data1[i]||0,
    backgroundColor:bgColor1[i]
  }
})

  dataset = dataset.sort(function(a,b){return b.data - a.data})
    let labels: string[] = [];
    let data: number[] = []
    let bgColor: Color[] = []

    dataset.forEach(function(d: { label: string, data: number, backgroundColor: Color }){
      labels.push(d.label)
      data.push(d.data)
      bgColor.push(d.backgroundColor)
    })

    this.chartMonsterAttributes = new Chart(document.getElementById('monsterAttribute') as HTMLCanvasElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          
          label: 'Monster Attribute Distribution',
          data: data,
          backgroundColor:bgColor,
          hoverOffset: 4
        }],
        
        
      },
      plugins: [ChartDataLabels],
      options: {layout:{padding:100},

        plugins: {
          legend: {
            display: false
        },
        title:{text: 'Monster Attribute Distribution', display:true,
          padding:{bottom:30},
          font:{ weight:'bold',size:20},
          color:'white',
        },
          datalabels: {
            anchor: 'end',
            align: 'end',
            
            
            formatter: function(value, context) {
              if (value <=4){return ''}

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

  FilterCards(){
    this.effectCards = this.cardlist.filter((card)=>card.cardtype.includes('Effect'));
    this.xyzCards = this.cardlist.filter((card)=>card.cardtype.includes('Xyz'));
    this.ritualCards = this.cardlist.filter((card)=>card.cardtype.includes('Ritual Monster'));
    this.synchroCards = this.cardlist.filter((card)=>card.cardtype.includes('Synchro'));
    this.fusionCards = this.cardlist.filter((card)=>card.cardtype.includes('Fusion'));
    this.spellCards = this.cardlist.filter((card)=>card.cardtype.includes('Spell'));
    this.trapCards = this.cardlist.filter((card)=>card.cardtype.includes('Trap'));
    this.SortCards()

  }
  SortCards(){
    this.xyzCards.sort((a, b) => a.type.localeCompare(b.type)  || a.attribute.localeCompare(b.attribute)|| a.name.localeCompare(b.name))
    this.spellCards.sort((a, b) => a.cardtype.localeCompare(b.cardtype)  || a.name.localeCompare(b.name))
    this.effectCards.sort((a, b) => a.type.localeCompare(b.type)  || a.attribute.localeCompare(b.attribute)|| a.name.localeCompare(b.name))
    
    this.ritualCards.sort((a, b) => a.type.localeCompare(b.type)  || a.attribute.localeCompare(b.attribute)|| a.name.localeCompare(b.name))
    this.synchroCards.sort((a, b) => a.type.localeCompare(b.type)  || a.attribute.localeCompare(b.attribute)|| a.name.localeCompare(b.name))
    this.fusionCards.sort((a, b) => a.type.localeCompare(b.type)  || a.attribute.localeCompare(b.attribute)|| a.name.localeCompare(b.name))
    
    this.trapCards.sort((a, b) => a.cardtype.localeCompare(b.cardtype)  || a.name.localeCompare(b.name))
  }
}
