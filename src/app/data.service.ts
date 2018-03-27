import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Season } from './models/season';
import { Chapter } from './models/chapter';
import { Episode } from './models/episode';

import * as _ from 'lodash';
import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { first } from 'rxjs/operator/first';
import { AngularFireStorage } from 'angularfire2/storage';
import { EpisodeSE } from './models/episode-se';
import { StoryEvent } from './models/story-event';
import { SpecialEvent } from './models/special-event';
import { EpisodeSSE } from './models/episode-sse';
import { Correction } from './models/correction';

@Injectable()
export class DataService {

  public loaded: boolean;

  seasons;
  storyEvents;
  specialEvents;

  _ready = new Promise((resolve, reject) => {
    this.resolve = resolve;
  });
  resolve;

  constructor(
    private db: AngularFirestore,
  ) {
    this.init();
  }

  ready() {
    return this._ready;
  }

  private getSeasons() {
    return this.db
      .collection('seasons')
      .valueChanges();
  }

  private getChaptersForSeasons() {
    return this.db
      .collection('chapters')
      .valueChanges();
  }

  private getEpisodesForSeasons() {
    return this.db
      .collection('episodes')
      .valueChanges();
  }

  private getStoryEvents() {
    return this.db
      .collection('story-events')
      .valueChanges();
  }

  private getEpisodesForStoryEvents() {
    return this.db
      .collection('episodes-se')
      .valueChanges();
  }

  private getSpecialEvents() {
    return this.db
      .collection('special-events')
      .valueChanges();
  }

  private getEpisodesForSpecialEvents() {
    return this.db
      .collection('episodes-sse')
      .valueChanges();
  }

  private getCorrections() {
    return this.db
      .collection('corrections')
      .valueChanges();
  }

  init() {
    Observable.combineLatest([
      this.getSeasons(),
      this.getChaptersForSeasons(),
      this.getEpisodesForSeasons(),
      this.getStoryEvents(),
      this.getEpisodesForStoryEvents(),
      this.getSpecialEvents(),
      this.getEpisodesForSpecialEvents(),
      this.getCorrections(),
    ]).subscribe(data => {
      const [
        dataSeasons, dataChapters, dataEpisodes,
        chaptersSE, episodesSE,
        chaptersSSE, episodesSSE,
        corrections
      ] = data;

      const seasons = [];
      for (const e of dataSeasons as Season[]) {
        const season = new Season(e);
        seasons.push(season);
      }
      for (const f of dataChapters as Chapter[]) {
        const season = _.find(seasons, s => f.ref.startsWith(s.ref));
        const chapter = new Chapter(f, season);
        season.chapters.push(chapter);
      }
      for (const g of dataEpisodes as Episode[]) {
        const season = _.find(seasons, s => g.ref.startsWith(s.ref));
        const chapter = _.find(season.chapters, c => g.ref.startsWith(c.ref));
        const episode = new Episode(g, chapter);
        chapter.episodes.push(episode);
      }
      this.seasons = seasons;

      const storyEvents = [];
      for (const f of chaptersSE as StoryEvent[]) {
        const chapter = new StoryEvent(f, null);
        storyEvents.push(chapter);
      }
      for (const g of episodesSE as EpisodeSE[]) {
        const chapter = _.find(storyEvents, se => g.ref.startsWith(se.ref));
        const episode = new EpisodeSE(g, chapter);
        chapter.episodes.push(episode);
      }
      this.storyEvents = storyEvents;

      const specialEvents = [];
      for (const f of chaptersSSE as SpecialEvent[]) {
        const chapter = new SpecialEvent(f, null);
        specialEvents.push(chapter);
      }
      for (const g of episodesSSE as EpisodeSSE[]) {
        const chapter = _.find(specialEvents, sse => g.ref.startsWith(sse.ref));
        const episode = new EpisodeSSE(g, chapter);
        chapter.episodes.push(episode);
      }
      this.specialEvents = specialEvents;

      for (const corr of corrections as Correction[]) {
        let episode;
        if (corr.ref.startsWith('SSE')) {
          const specialEvent = _.find(specialEvents, sse => corr.ref.startsWith(sse.ref));
          episode = _.find(specialEvent.episodes, {ref: corr.ref});
        } else if (corr.ref.startsWith('SE')) {
          const storyEvent = _.find(storyEvents, se => corr.ref.startsWith(se.ref));
          episode = _.find(storyEvent.episodes, {ref: corr.ref});
        } else {
          const season = _.find(seasons, s => corr.ref.startsWith(s.ref));
          const chapter = _.find(season.chapters, c => corr.ref.startsWith(c.ref));
          episode = _.find(chapter.episodes, {ref: corr.ref});
        }
        const correction = new Correction(corr);
        episode.corrections.push(correction);
      }

      this.resolve();
    });
  }

  getChapter(chapterRef) {
    let chapter;
    if (chapterRef.indexOf('SSE') === 0) {
      const ref = chapterRef.replace(/-/g, '/');
      chapter = _.find(this.specialEvents, {ref: ref});
    } else if (chapterRef.indexOf('SE') === 0) {
      const ref = chapterRef.replace(/-/g, '/');
      chapter = _.find(this.storyEvents, {ref: ref});
    } else {
      const [seasonNb, ] = chapterRef.split('-');
      const season = _.find(this.seasons, {ref: seasonNb});
      const ref = chapterRef.replace(/-/g, '/');
      chapter = _.find(season.chapters, {ref: ref});
    }
    return chapter;
  }

  getEpisode(episodeRef) {
    const chapterRef = _.initial(episodeRef.split('-')).join('-');
    const chapter = this.getChapter(chapterRef);
    episodeRef = episodeRef.replace(/-/g, '/');
    return _.find(chapter.episodes, {ref: episodeRef});
  }

  getAllSeasons() {
    return this.seasons;
  }

  getAllStoryEvents() {
    return this.storyEvents;
  }

  getAllSpecialEvents() {
    return this.specialEvents;
  }
}
