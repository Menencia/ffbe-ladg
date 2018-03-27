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
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AuthService } from './auth.service';
import { CorrectionComponent } from './correction/correction.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin.guard';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LoadingComponent } from './loading/loading.component';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

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
    CorrectionComponent,
    AdminComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    YoutubePlayerModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    DataService,
    AuthService,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
