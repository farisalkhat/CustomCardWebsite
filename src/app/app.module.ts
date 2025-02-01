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
import { PlayerProfileComponent } from './player/player-details/player-profile/player-profile.component';
import { PlayerCollectionComponent } from './player/player-details/player-collection/player-collection.component';
import { PlayerDecklistsComponent } from './player/player-details/player-decklists/player-decklists.component';
import { PlayerPacksComponent } from './player/player-details/player-packs/player-packs.component';
import { PlayerMatchesComponent } from './player/player-details/player-matches/player-matches.component';
import { DuelistDecklistsComponent } from './decklists/duelist-decklists/duelist-decklists.component';
import { UploadDecklistComponent } from './upload-decklist/upload-decklist.component';
import { AboutComponent } from './settings/about/about.component';
import { AccountComponent } from './settings/account/account.component';
import { DatabaseComponent } from './database/database.component';
import { AdminComponent } from './admin/admin.component';
import { EditorComponent } from './editor/editor.component';
import { NgxEditorModule } from 'node_modules/ngx-editor';
import { ArticleDetailsComponent } from './articles/article-details/article-details.component';
import { ArticleEditComponent } from './articles/article-edit/article-edit.component';
import { CollectionDeckEditorComponent } from './collection-deck-editor/collection-deck-editor.component';
import { StructureDecksComponent } from './structure-decks/structure-decks.component';
import { StructureDeckDetailsComponent } from './structure-decks/structure-deck-details/structure-deck-details.component';
import { StructureDeckEditorComponent } from './structure-decks/structure-deck-editor/structure-deck-editor.component';
import { StructureDeckMakerComponent } from './structure-decks/structure-deck-maker/structure-deck-maker.component';
import { StructureDeckEditComponent } from './structure-decks/structure-deck-edit/structure-deck-edit.component';
import { FormatsComponent } from './formats/formats.component';
import { AboutsiteComponent } from './aboutsite/aboutsite.component';
import { DatePipe } from '@angular/common';
import { HoverCardComponent } from './hover-card/hover-card.component';
import { DustingCollectionComponent } from './collections/dusting-collection/dusting-collection.component';
import { UploadCardImagesComponent } from './admin/upload-card-images/upload-card-images.component';
import { SubmitDeckComponent } from './deck-editor/submit-deck/submit-deck.component';
import { PlayerSearchComponent } from './player/player-search/player-search.component';
import { PlayerHomeComponent } from './player/player-home/player-home.component';
import { ViewDraftsComponent } from './drafts/view-drafts/view-drafts.component';
import { TopCardsComponent } from './top-cards/top-cards.component';
import { ViewDraftDetailsComponent } from './drafts/view-draft-details/view-draft-details.component';
import { CardlistViewComponent } from './cardlist-view/cardlist-view.component';
import { CardlistTableComponent } from './cardlist-view/cardlist-table/cardlist-table.component';
import { CardlistTextviewComponent } from './cardlist-view/cardlist-textview/cardlist-textview.component';
import { CardlistImageviewComponent } from './cardlist-view/cardlist-imageview/cardlist-imageview.component';
import { CardlistChangelogComponent } from './cardlist-view/cardlist-changelog/cardlist-changelog.component';
import { CardlistReportComponent } from './cardlist-view/cardlist-report/cardlist-report.component';

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
    SettingsComponent,
    PlayerProfileComponent,
    PlayerCollectionComponent,
    PlayerDecklistsComponent,
    PlayerPacksComponent,
    PlayerMatchesComponent,
    DuelistDecklistsComponent,
    UploadDecklistComponent,
    AboutComponent,
    AccountComponent,
    DatabaseComponent,
    AdminComponent,
    EditorComponent,
    ArticleDetailsComponent,
    ArticleEditComponent,
    CollectionDeckEditorComponent,
    StructureDecksComponent,
    StructureDeckDetailsComponent,
    StructureDeckEditorComponent,
    StructureDeckMakerComponent,
    StructureDeckEditComponent,
    FormatsComponent,
    AboutsiteComponent,
    HoverCardComponent,
    DustingCollectionComponent,
    UploadCardImagesComponent,
    SubmitDeckComponent,
    PlayerSearchComponent,
    PlayerHomeComponent,
    ViewDraftsComponent,
    TopCardsComponent,
    ViewDraftDetailsComponent,
    CardlistViewComponent,
    CardlistTableComponent,
    CardlistTextviewComponent,
    CardlistImageviewComponent,
    CardlistChangelogComponent,
    CardlistReportComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',

        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    }),

  ],
  providers: [AuthGuard,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
