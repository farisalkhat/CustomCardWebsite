import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { AuthService } from '../auth/services/auth.service';
import { Card, CustomcardsService } from '../customcards.service';


@Component({
  selector: 'app-upload-decklist',
  templateUrl: './upload-decklist.component.html',
  styleUrls: ['./upload-decklist.component.css']
})
export class UploadDecklistComponent implements OnInit {



  username!:number;
  id!:number;
  cards:Card[]=[];
  xml_file!: any;

  sideDeck: any[]=[];
  mainDeck: any[]=[];
  extraDeck: any[]=[];

  constructor(public _authService: AuthService,private customcardsService:CustomcardsService,private _router:Router) { }
  hideloader() {
    var div = document.getElementById('Loading')
    if(div){
      div.style.display = "none"
      console.log(div)
    }

}
  ngOnInit(): void {

    if (this._authService.loggedIn()){
      this._authService.getUser().subscribe(
        res =>{
          this.username = res['username']
          this.id = res['id']

          this.customcardsService.getCustomCards().subscribe(
            res => {
              if(res){}
                this.cards = res;
                this.hideloader();
            }
      
      
      )
  
          
        })
    }

    else{
      this._router.navigate(['/login']);

    }



  }
  file:any;
  fileString:any;
  decklistIDs:number[]=[]
  fileChanged(e:Event) {
    const element = e.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.file = fileList[0];
    }
  }

  checkList(){
    this.mainDeck=[]
    this.sideDeck=[]
    this.extraDeck=[]
    let cardtype=''
    let fileReader = new FileReader();

    fileReader.onloadend = (e) => {
      this.fileString=fileReader.result
      if(fileReader.result){
        var lines = this.fileString.split('\n');

        for(var line = 0; line < lines.length; line++){
          
            if(lines[line].substring(1,8)=='<main>'){
              cardtype='main'
            }
            else if(lines[line].substring(1,8)=='<side>'){
              cardtype='side'
            }
            else if(lines[line].substring(1,9)=='<extra>'){
              cardtype='extra'
            }
            else if(lines[line].substring(3,10)=="card id"){

                let lineid = Number(lines[line].substring(12,19))
                let index = this.cards.find(obj => Number(obj.id) === lineid)
                  if (index) {
                    if(cardtype=='main'){
                          this.mainDeck.push(index)
                        }
                        else if(cardtype=='side'){
                          this.sideDeck.push(index)
                        }
                        else if(cardtype=='extra'){
                          this.extraDeck.push(index)
                        }
                  }
                  else{
                    console.log("lol")
                  }
               

                
            }
            
               
        }
        this.customcardsService.uploadDecklist(this.mainDeck,this.sideDeck,this.extraDeck)

        
        
      }
      this._router.navigate(['/deck-editor'])
      

    }


    fileReader.readAsText(this.file);
    


 
    // console.log(this.xml_file)
    // const myXML = new DOMParser().parseFromString(this.xml_file, 'text/xml');
    
    // const firstEmployee = myXML.getElementsByTagName('main');
    // console.log(myXML)

  }



  // exportList(){

  //   this.xml_file = '<?xml version="1.0" encoding="utf-8" ?> <deck name=".TriType"><main>';
 
  //  for(const card of this.mainDeck){
  //      this.xml_file+='<card id="' + String(card.id) +'" passcode="">'+card.name+'</card>'
  //  }
  //  this.xml_file+="</main><side>"   
  //  for(const card of this.sideDeck){
  //   this.xml_file+='<card id="' + String(card.id) +'" passcode="">'+card.name+'</card>'
  //  }
  //  this.xml_file+="</side><extra>"   
   
  //  for(const card of this.extraDeck){
  //      this.xml_file+='<card id="' + String(card.id) +'" passcode="">'+card.name+'</card>'
  //  }
  //  this.xml_file+="</extra></deck>"
  //  console.log(this.xml_file);
 
  //  let blob = new Blob([this.xml_file], {type: "text/xml"});
 
  //  FileSaver.saveAs(blob, "cardlist.xml");
 
 
   
   
 
 
 
  //  }
}
