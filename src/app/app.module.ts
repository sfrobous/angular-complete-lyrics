import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompleteLyricsComponent } from './components/complete-lyrics/complete-lyrics.component';
import { HttpClientModule } from '@angular/common/http';
import { YoutubeComponent } from './components/youtube/youtube.component';

@NgModule({
  declarations: [
    AppComponent,
    CompleteLyricsComponent,
    YoutubeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
