import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomcardDbComponent } from './customcard-db/customcard-db.component';
import { DownloadDbComponent } from './download-db/download-db.component';
import { HomeComponent } from './home/home.component';

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


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
