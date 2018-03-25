import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Season } from './models/season';
import { Chapter } from './models/chapter';
import { Episode } from './models/episode';

import { STORY } from './data/seasons';

import * as _ from 'lodash';
import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { first } from 'rxjs/operator/first';
import { AngularFireStorage } from 'angularfire2/storage';

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
    private storage: AngularFireStorage
  ) {
    this.init();
  }

  ready() {
    return this._ready;
  }

  getSeasons() {
    return this.db
      .collection('seasons')
      .valueChanges();
  }

  getChaptersForSeasons() {
    return this.db
      .collection('chapters', options => options.orderBy('seasonRef'))
      .valueChanges();
  }

  getEpisodesForSeasons() {
    return this.db
      .collection('episodes', options => options.orderBy('seasonRef'))
      .valueChanges();
  }

  getStoryEvents() {
    return this.db
      .collection('chapters', options => options.orderBy('isStoryEvent'))
      .valueChanges();
  }

  getEpisodesForStoryEvents() {
    return this.db
      .collection('episodes', options => options.orderBy('storyEventRef'))
      .valueChanges();
  }

  getSpecialEvents() {
    return this.db
      .collection('chapters', options => options.orderBy('isSpecialEvent'))
      .valueChanges();
  }

  getEpisodesForSpecialEvents() {
    return this.db
      .collection('episodes', options => options.orderBy('specialEventRef'))
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
    ]).subscribe(data => {
      const [
        dataSeasons, dataChapters, dataEpisodes,
        chaptersSE, episodesSE,
        chaptersSSE, episodesSSE
      ] = data;

      const seasons = [];
      for (const e of dataSeasons) {
        const season = new Season(e);
        seasons.push(season);
        const chapters = _(dataChapters)
          .filter({seasonRef: season.ref})
          .orderBy('partRef', 'ref')
          .value();
        for (const f of chapters) {
          const chapter = new Chapter(f, season);
          this.storage.ref('images/ffbe_' + chapter.getRefForUrl() + '.jpg')
            .getDownloadURL().subscribe(k => chapter.image = k);
          season.chapters.push(chapter);
          const episodes = _(dataEpisodes)
            .filter({seasonRef: season.ref, chapterRef: chapter.ref, partRef: chapter.partRef})
            .orderBy('ref')
            .value();
          for (const g of episodes) {
            const episode = new Episode(g, chapter);
            chapter.episodes.push(episode);
          }
        }
      }
      this.seasons = seasons;

      const storyEvents = [];
      for (const f of chaptersSE) {
        const chapter = new Chapter(f, null);
        this.storage.ref('images/ffbe_' + chapter.getRefForUrl().toLowerCase() + '.jpg')
          .getDownloadURL().subscribe(k => chapter.image = k);
        storyEvents.push(chapter);
        const episodes = _(episodesSE)
          .filter({storyEventRef: chapter.ref})
          .orderBy('ref')
          .value();
        for (const g of episodes) {
          const episode = new Episode(g, chapter);
          chapter.episodes.push(episode);
        }
      }
      this.storyEvents = storyEvents;

      const specialEvents = [];
      for (const f of chaptersSSE) {
        const chapter = new Chapter(f, null);
        this.storage.ref('images/ffbe_' + chapter.getRefForUrl().toLowerCase() + '.jpg')
          .getDownloadURL().subscribe(k => chapter.image = k);
          specialEvents.push(chapter);
        const episodes = _(episodesSSE)
          .filter({specialEventRef: chapter.ref})
          .orderBy('ref')
          .value();
        for (const g of episodes) {
          const episode = new Episode(g, chapter);
          chapter.episodes.push(episode);
        }
      }
      this.specialEvents = specialEvents;

      this.resolve();
    });
  }

  getChapter(chapterRef) {
    let chapter;
    if (chapterRef.indexOf('SSE') > -1) {
      chapterRef = chapterRef.replace('-', '/');
      chapter = _.find(this.specialEvents, {ref: chapterRef.slice(4)});
    } else if (chapterRef.indexOf('SE') > -1) {
      chapterRef = chapterRef.replace('-', '/');
      chapter = _.find(this.storyEvents, {ref: chapterRef.slice(3)});
    } else {
      const [s, c, p] = chapterRef.split('-');
      const season = _.find(this.seasons, {ref: s});
      const options = p ? {ref: c, partRef: p} : {ref: c};
      chapter = _.find(season.chapters, options);
    }
    return chapter;
  }

  getEpisode(episodeRef) {
    const chapterRef = _.initial(episodeRef.split('-')).join('-');
    const chapter = this.getChapter(chapterRef);
    episodeRef = episodeRef.replace(/-/g, '/');
    return _.find(chapter.episodes, {fullRef: episodeRef});
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
