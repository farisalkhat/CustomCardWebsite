import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { DownloadDbComponent } from './download-db/download-db.component';
import { CustomcardDbComponent } from './customcard-db/customcard-db.component';
import { DraftsComponent } from './drafts/drafts.component';
import { DraftmodeComponent } from './drafts/draftmode/draftmode.component';
import { DraftFormComponent } from './drafts/draft-form/draft-form.component';
import { DraftMakerComponent } from './drafts/draft-maker/draft-maker.component';
import { DecklistsComponent } from './decklists/decklists.component';
import { BanlistComponent } from './banlist/banlist.component';
import { ArticlesComponent } from './articles/articles.component';
import { BindersComponent } from './binders/binders.component';
import { PacksComponent } from './packs/packs.component';
import { PackOpenerComponent } from './packs/pack-opener/pack-opener.component';
import { PackMakerComponent } from './packs/pack-maker/pack-maker.component';
import { SharedComponent } from './shared/shared.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { BottomNavComponent } from './shared/bottom-nav/bottom-nav.component';
import { AuthGuard } from './auth/auth.guard';
import { ExportxmlComponent } from './exportxml/exportxml.component';
import { DeckEditorComponent } from './deck-editor/deck-editor.component';
import { DecklistDetailsComponent } from './decklists/decklist-details/decklist-details.component';
import { DeckMasterComponent } from './deck-master/deck-master.component';
import { CollectionsComponent } from './collections/collections.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { PackDetailsComponent } from './packs/pack-details/pack-details.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { PlayerComponent } from './player/player.component';
import { PlayerDetailsComponent } from './player/player-details/player-details.component';
import { SubmitMatchComponent } from './submit-match/submit-match.component';
import { PackEditorComponent } from './packs/pack-editor/pack-editor.component';
import { MatchesComponent } from './matches/matches.component';
import { PlayerNavigationComponent } from './player/player-details/player-navigation/player-navigation.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SettingsComponent } from './settings/settings.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DownloadDbComponent,
    CustomcardDbComponent,
    DraftsComponent,
    DraftmodeComponent,
    DraftFormComponent,
    DraftMakerComponent,
    DecklistsComponent,
    BanlistComponent,
    ArticlesComponent,
    BindersComponent,
    PacksComponent,
    PackOpenerComponent,
    PackMakerComponent,
    SharedComponent,
    NavigationComponent,
    BottomNavComponent,
    ExportxmlComponent,
    DeckEditorComponent,
    DecklistDetailsComponent,
    DeckMasterComponent,
    CollectionsComponent,
    ChecklistComponent,
    PackDetailsComponent,
    CardDetailsComponent,
    PlayerComponent,
    PlayerDetailsComponent,
    SubmitMatchComponent,
    PackEditorComponent,
    MatchesComponent,
    PlayerNavigationComponent,
    SettingsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
