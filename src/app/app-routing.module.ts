import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomcardDbComponent } from './customcard-db/customcard-db.component';
import { DownloadDbComponent } from './download-db/download-db.component';
import { DraftsComponent } from './drafts/drafts.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DraftmodeComponent } from './drafts/draftmode/draftmode.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { DraftMakerComponent } from './drafts/draft-maker/draft-maker.component';
import { DraftFormComponent } from './drafts/draft-form/draft-form.component';
import { DecklistsComponent } from './decklists/decklists.component';
import { BanlistComponent } from './banlist/banlist.component';
import { ArticlesComponent } from './articles/articles.component';
import { BindersComponent } from './binders/binders.component';
import { PacksComponent } from './packs/packs.component';
import { PackMakerComponent } from './packs/pack-maker/pack-maker.component';
import { PackOpenerComponent } from './packs/pack-opener/pack-opener.component';
import { CommonModule } from '@angular/common';
import { DeckEditorComponent } from './deck-editor/deck-editor.component';
import { DecklistDetailsComponent } from './decklists/decklist-details/decklist-details.component';
import { DeckMasterComponent } from './deck-master/deck-master.component';
import { CollectionsComponent } from './collections/collections.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { PackDetailsComponent } from './packs/pack-details/pack-details.component';
import { PlayerComponent } from './player/player.component';
import { PlayerDetailsComponent } from './player/player-details/player-details.component';
import { SubmitMatchComponent } from './submit-match/submit-match.component';
import { PackEditorComponent } from './packs/pack-editor/pack-editor.component';
import { MatchesComponent } from './matches/matches.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
 },
 {
  path:'home',
  component:HomeComponent
},
{
  path:'db-download',
  component:DownloadDbComponent
},
{
  path:'customcard-db',
  component:CustomcardDbComponent
},

{path:'drafts',
component:DraftsComponent},
{path:'draftmode',
component:DraftmodeComponent},
{path:'draft-maker',
component:DraftMakerComponent},
{path:'draft-form',
component:DraftFormComponent},
{path:'decklists',
component:DecklistsComponent},
{path:'banlist',
component:BanlistComponent},
{path:'articles',
component:ArticlesComponent},
{path:'binders',
component:BindersComponent},
{path:'packs',
component:PacksComponent},
{path:'pack-maker',
component:PackMakerComponent},
{path:'pack-opener/:packid',
component:PackOpenerComponent},
{path:'deck-editor',
component:DeckEditorComponent},
{path:'decklist/:deckid',
component:DecklistDetailsComponent},
{path:'deck-master',
component:DeckMasterComponent},
{path:'collections',
component:CollectionsComponent},
{path:'checklist',
component:ChecklistComponent},
{path:'cards/:cardid',
component:CardDetailsComponent},
{path:'packs/:packid',
component:PackDetailsComponent},
{path:'players',
component:PlayerComponent},
{path:'players/:playerid',
component:PlayerDetailsComponent},
{path:'submit-match',
component:SubmitMatchComponent},
{path:'pack-editor',
component:PackEditorComponent},
{path:'matches',
component:MatchesComponent},
{path:'settings',
component:SettingsComponent}


];


@NgModule({
  imports: [RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AuthModule,CommonModule ],
  exports: [RouterModule,FormsModule,
    ReactiveFormsModule]
})
export class AppRoutingModule { }
