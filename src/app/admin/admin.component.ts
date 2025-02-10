import { Component, OnInit } from '@angular/core';
import { CustomcardsService } from '../customcards.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  filter = "none";
  username:string | undefined;
  id:number | undefined
  currency!:number;
  players:any[]=[];
  staff:any[]=[];
  events:any[]=[];
  filteredEvents:any[]=[];
  filteredEventPage:any[]=[]
  currentPage: number = 1

  constructor(public _ccService:CustomcardsService, public _authService:AuthService,public router:Router,public datepipe:DatePipe) { }

  ngOnInit(): void {
    if (this._authService.loggedIn() && this._authService.adminRole()){

      this._authService.getUser().subscribe(
        res =>{
          console.log(res['username'])
          this.username = res['username']
          this.id = res['id']
          this.currency = res['currency']
        },
        err => {console.log(err)
        this.username = undefined
        this.id = undefined
        this.router.navigate(['/home'])
      }
      )
      this._ccService.getPlayers().subscribe(
        res => {
            this.players = res;
            this.staff=this.players.filter((user)=>user.role.toLowerCase().includes('admin'))
            this.hideloader();
            console.log(this.staff)

        }
      )
      this._ccService.getEvents().subscribe(
        res=>{
          this.events = res
          // console.log(this.events)
          // console.log(new Date((new Date().getTime().valueOf() - new Date(this.events[0].event_date).valueOf())).toLocaleString())
          
          
          // console.log(
          //   new Date(this.events[0].event_date).toLocaleDateString("en-US", {timeZone: "America/New_York"}), new Date(this.events[0].event_date).toLocaleTimeString("en-US", {timeZone: "America/New_York"}))
            
          for(let event of this.events){
              let date = new Date(event.event_date);
              let currentDate = new Date();
    
              
              //let minutes =  Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) ) /(1000 * 60));
          

              let days = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) ) /(1000 * 60 * 60 * 24));
              

              if(days == 0){
                let hours = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),currentDate.getHours(),currentDate.getMinutes()) - Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(),date.getHours(),date.getMinutes()) ) /(1000 * 60 * 60));
                // console.log(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),currentDate.getHours(),currentDate.getMinutes()))
                // console.log(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(),date.getHours(),date.getMinutes()))
                hours = hours-5
                console.log("Hours: " + hours)
                event.event_date = hours + " Hours ago"

                if(hours ==0){
                  let diffMs = (currentDate.getTime() - date.getTime());
                  let minutes = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                  event.event_date = minutes + " Minutes ago";

                }

              }
              else{
                event.event_date =  days + " Days Ago";
              }




          }

          console.log(this.events)
          this.filteredEvents = [...this.events]
          this.getEventNumbers(1);


        }
      )

    }
    else{
      this.username = undefined
      this.id = undefined
      this.router.navigate(['/home'])
    }
  }

  updateCOTD(){
    console.log("lol")
    this._ccService.updateCOTD().subscribe(
      res=>{console.log("lol");
      console.log(res)},
      err=>{}
    )
  }

  hideloader() {
    var div = document.getElementById('Loading')
    if(div){
      div.style.display = "none"
      console.log(div)
    }

}

  filterEvent(filter:string){
    this.filteredEvents = [...this.events]
    console.log("current filter: " + this.filter)
    if (this.filter === filter){
      this.filter="none"
    }
    else{
      this.filter = filter
    }

    switch(this.filter){
      case "none":
        {this.filteredEvents = [...this.events]
        break;}
      case "pack":
        {
        this.filteredEvents = this.events.filter((event)=>event.pack_id!=null)
        break;
        }
      case "decklist":
        {
        this.filteredEvents = this.events.filter((event)=>event.deck_id!=null)
        break;
        }
      case "article":
        {
        this.filteredEvents = this.events.filter((event)=>event.article_id!=null)
        break;
        }
      case "draft":
        {
        this.filteredEvents = this.events.filter((event)=>event.draft_id!=null)
        break;
        }
      case "structuredeck":
        {
        this.filteredEvents = this.events.filter((event)=>event.structure_deck_id!=null)
        break;
        }
      default:{
        break;
      }
    }

    this.getEventNumbers(1);
  }


  getEventNumbers(page: number) {
    this.filteredEventPage = [];
    const eventmin = (page - 1) * 15;
    const eventmax = (page * 15) - 1;

    for (let i = eventmin; i <= eventmax; i++) {
      console.log(eventmin, ' ', eventmax);
      this.filteredEventPage.push(this.filteredEvents[i]);
    }
  }

  nextPage() {
    if(this.filteredEvents.length <= (this.currentPage+1*15)-1){return;}
    this.currentPage += 1;
    this.getEventNumbers(this.currentPage);
  }

  prevPage() {
    if(this.currentPage==1){return;}
    this.currentPage -= 1;
    this.getEventNumbers(this.currentPage);
  }
  selectPage(page: number) {
    if(this.filteredEvents.length <= (page*15)-1){return;}
    this.currentPage = page;
    this.getEventNumbers(this.currentPage);
  }
}
