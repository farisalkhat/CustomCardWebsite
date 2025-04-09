import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar, toHTML } from 'ngx-editor';
import { CustomcardsService } from 'src/app/customcards.service';

@Component({
  selector: 'app-submit-deck',
  templateUrl: './submit-deck.component.html',
  styleUrls: ['./submit-deck.component.css']
})
export class SubmitDeckComponent implements OnInit {
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  @Input() html!:any;
  @Input() html2!:any;

  @Input() editing:boolean = false;
  theInnerHTML!:any;
  articleInfo = new FormGroup({
    title: new FormControl(undefined,[
      Validators.required,
      Validators.minLength(5)]),
    about: new FormControl(undefined,[
      Validators.required
    ]),
    header_img: new FormControl(undefined,[
      Validators.required
    ]),
    editorContent: new FormControl(null, [Validators.required]),
    tag: new FormControl(undefined,
      [Validators.required])
  })
  get f(){return this.articleInfo.controls;}
  constructor(private customcardsService: CustomcardsService) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this.customcardsService.provideDecklistDetailsEvent.subscribe(data=>{
      
      this.theInnerHTML =  (this.articleInfo.controls['editorContent'].value);
      console.log(this.theInnerHTML)
      this.customcardsService.ReceiveDeckListDetails(this.theInnerHTML);
    })

    this.editor.setContent(this.html);

                this.articleInfo.setValue({
                  editorContent:this.html
                });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
