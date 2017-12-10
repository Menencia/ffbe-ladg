import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExplorerComponent } from './explorer/explorer.component';
import { EpisodeComponent } from './episode/episode.component';
import { ChapterComponent } from './chapter/chapter.component';

const appRoutes: Routes = [
  { path: 'story', component: ExplorerComponent },
  { path: 'chapter/:chapter', component: ChapterComponent },
  { path: 'episode/:episode', component: EpisodeComponent },
  { path: '', redirectTo: '/story', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule {}
