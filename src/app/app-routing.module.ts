import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoryComponent } from './story/story.component';
import { EpisodeComponent } from './episode/episode.component';
import { ChapterComponent } from './chapter/chapter.component';
import { StoryEventComponent } from './story-event/story-event.component';
import { EpisodeSEComponent } from './episode-se/episode-se.component';
import { SpecialEventComponent } from './special-event/special-event.component';
import { EpisodeSSEComponent } from './episode-sse/episode-sse.component';

const appRoutes: Routes = [
  { path: 'story', component: StoryComponent },
  { path: 'chapter/:chapter', component: ChapterComponent },
  { path: 'episode/:episode', component: EpisodeComponent },
  { path: 'story-event/:storyEvent', component: StoryEventComponent },
  { path: 'episode-se/:episodeSE', component: EpisodeSEComponent },
  { path: 'special-event/:specialEvent', component: SpecialEventComponent },
  { path: 'episode-sse/:episodeSSE', component: EpisodeSSEComponent },
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
