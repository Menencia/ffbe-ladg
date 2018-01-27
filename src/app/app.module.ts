import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StoryComponent } from './story/story.component';
import { ChapterComponent } from './chapter/chapter.component';
import { EpisodeComponent } from './episode/episode.component';
import { DataService } from './data.service';
import { ChapterPipe } from './chapter.pipe';
import { PartPipe } from './part.pipe';
import { TableChaptersComponent } from './table-chapters/table-chapters.component';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { VersionComponent } from './version/version.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    ChapterComponent,
    EpisodeComponent,
    ChapterPipe,
    PartPipe,
    TableChaptersComponent,
    VersionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    YoutubePlayerModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
