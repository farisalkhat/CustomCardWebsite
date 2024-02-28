import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CustomcardsService } from 'src/app/customcards.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public _router: Router, public _authService: AuthService, public customcardsService: CustomcardsService) { }

  username: string | undefined;
  id: number | undefined
  currency!: number;

  ngOnInit(): void {
    if (this._authService.loggedIn()) {

      this._authService.getUser().subscribe(
        res => {
          console.log(res['username'])
          this.username = res['username']
          this.id = res['id']
          this.currency = res['currency']
        },
        err => {
          console.log(err)
          this.username = undefined
          this.id = undefined
        }
      )

    }
    else {
      this.username = undefined
      this.id = undefined
    }

  }


  goToSealedDraft() {
    this.customcardsService.setSealedDraftMode(true)
    this._router.navigate(['/packs'])
  }

  goToPackOpener() {
    this.customcardsService.setSealedDraftMode(false)
    this._router.navigate(['/packs'])
  }
  GoToDeckEditor() {
    this.customcardsService.SetDeckEditorDefault();
  }


}
