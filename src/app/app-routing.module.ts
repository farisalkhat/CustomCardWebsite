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
import { DuelistDecklistsComponent } from './decklists/duelist-decklists/duelist-decklists.component';
import { UploadDecklistComponent } from './upload-decklist/upload-decklist.component';
import {DatabaseComponent} from './database/database.component';
import {AdminComponent} from './admin/admin.component';
import {EditorComponent} from './editor/editor.component';
import { ArticleDetailsComponent } from './articles/article-details/article-details.component';
import { ArticleEditComponent } from './articles/article-edit/article-edit.component';
import { CollectionDeckEditorComponent } from './collection-deck-editor/collection-deck-editor.component';
import { StructureDecksComponent } from './structure-decks/structure-decks.component';
import { StructureDeckMakerComponent } from './structure-decks/structure-deck-maker/structure-deck-maker.component';
import { StructureDeckDetailsComponent } from './structure-decks/structure-deck-details/structure-deck-details.component';
import { StructureDeckEditorComponent } from './structure-decks/structure-deck-editor/structure-deck-editor.component';
import {FormatsComponent} from './formats/formats.component';
import {AboutsiteComponent} from './aboutsite/aboutsite.component';
import { DustingCollectionComponent } from './collections/dusting-collection/dusting-collection.component';
import { UploadCardImagesComponent } from './admin/upload-card-images/upload-card-images.component';
import { TopCardsComponent } from './top-cards/top-cards.component';
import { ViewDraftsComponent } from './drafts/view-drafts/view-drafts.component';
import { ViewDraftDetailsComponent } from './drafts/view-draft-details/view-draft-details.component';

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
{path:'draft-form/:draftid',
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
{path:'deck-editor',
component:DeckEditorComponent},
{path:'collection-deck-editor',
component:CollectionDeckEditorComponent},
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
component:SettingsComponent},
{path:'duelist-decklists',
component:DuelistDecklistsComponent},
{path:'upload-decklist',
component:UploadDecklistComponent},
{path:'database',
component:DatabaseComponent},
{path:'admin',
component:AdminComponent},
{path:'editor',
component:EditorComponent},
{path:'articles/:articleid',
component:ArticleDetailsComponent},
{path:'articles/edit/:articleid',
component:ArticleEditComponent},
{path:'structure-decks',
component:StructureDecksComponent},
{path:'structure-deck-maker',
component:StructureDeckMakerComponent},
{path:'structure-deck-details/:deckid',
component:StructureDeckDetailsComponent
},
{path:'structure-deck-editor/:deckid',
component:StructureDeckEditorComponent
},
{path:'formats',
component:FormatsComponent
},
{path:'about',
component:AboutsiteComponent},
{path:'collections/dusting',
component:DustingCollectionComponent},
{path:'admin/upload-card-images',
component:UploadCardImagesComponent},
{path:'top-cards',
  component:TopCardsComponent
},
{
  path:'drafts/draftlists',
  component:ViewDraftsComponent
},
{
  path:'drafts/draftlists/:draftid',
  component:ViewDraftDetailsComponent
}



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
