import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DownloadDbComponent } from './download-db/download-db.component';
import { CustomcardDbComponent } from './customcard-db/customcard-db.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DownloadDbComponent,
    CustomcardDbComponent,
    LoginComponent,
    SignupComponent,
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
    PackMakerComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
