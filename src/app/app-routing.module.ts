import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoryComponent } from './story/story.component';
import { EpisodeComponent } from './episode/episode.component';
import { ChapterComponent } from './chapter/chapter.component';
import { StoryEventComponent } from './story-event/story-event.component';
import { EpisodeSEComponent } from './episode-se/episode-se.component';

const appRoutes: Routes = [
  { path: 'story', component: StoryComponent },
  { path: 'chapter/:chapter', component: ChapterComponent },
  { path: 'episode/:episode', component: EpisodeComponent },
  { path: 'story-event/:storyEvent', component: StoryEventComponent },
  { path: 'episode-se/:episodeSE', component: EpisodeSEComponent },
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
