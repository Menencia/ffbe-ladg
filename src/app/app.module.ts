import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environments/firebase';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { CorrectionComponent } from './correction/correction.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    ChapterComponent,
    EpisodeComponent,
    ChapterPipe,
    PartPipe,
    TableChaptersComponent,
    VersionComponent,
    CorrectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    YoutubePlayerModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    DataService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
