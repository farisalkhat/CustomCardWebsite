import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomcardDbComponent } from './customcard-db/customcard-db.component';
import { DownloadDbComponent } from './download-db/download-db.component';
import { DraftsComponent } from './drafts/drafts.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
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
{
  path:'login',
  component:LoginComponent
},
{
  path:'signup',
  component:SignupComponent
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
{path:'pack-opener',
component:PackOpenerComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AuthModule],
  exports: [RouterModule,FormsModule,
    ReactiveFormsModule]
})
export class AppRoutingModule { }
