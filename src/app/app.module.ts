import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DownloadDbComponent } from './download-db/download-db.component';
import { CustomcardDbComponent } from './customcard-db/customcard-db.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DownloadDbComponent,
    CustomcardDbComponent
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
