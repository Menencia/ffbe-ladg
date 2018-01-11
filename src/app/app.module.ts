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
import { EpisodeSEComponent } from './episode-se/episode-se.component';
import { StoryEventComponent } from './story-event/story-event.component';
import { TableEventsComponent } from './table-events/table-events.component';
import { EpisodeSSEComponent } from './episode-sse/episode-sse.component';
import { SpecialEventComponent } from './special-event/special-event.component';
import { TableSpecialComponent } from './table-special/table-special.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    ChapterComponent,
    EpisodeComponent,
    ChapterPipe,
    PartPipe,
    TableChaptersComponent,
    EpisodeSEComponent,
    StoryEventComponent,
    EpisodeSSEComponent,
    SpecialEventComponent,
    TableEventsComponent,
    TableSpecialComponent
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
