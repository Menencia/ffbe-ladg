import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ChapterComponent } from './chapter/chapter.component';
import { EpisodeComponent } from './episode/episode.component';
import { DataService } from './data.service';
import { ChapterPipe } from './chapter.pipe';
import { PartPipe } from './part.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ExplorerComponent,
    ChapterComponent,
    EpisodeComponent,
    ChapterPipe,
    PartPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
