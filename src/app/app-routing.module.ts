import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoryComponent } from './story/story.component';
import { EpisodeComponent } from './episode/episode.component';
import { ChapterComponent } from './chapter/chapter.component';
import { VersionComponent } from './version/version.component';
import { CorrectionComponent } from './correction/correction.component';
import { AdminComponent } from './admin/admin.component';

import { AdminGuard } from './admin.guard';

const appRoutes: Routes = [
  { path: 'story', component: StoryComponent },
  { path: 'chapter/:chapter', component: ChapterComponent },
  { path: 'episode/:episode', component: EpisodeComponent },
  { path: 'correction', component: CorrectionComponent },
  { path: 'version', component: VersionComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
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
