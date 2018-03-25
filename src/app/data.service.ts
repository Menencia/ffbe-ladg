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

  init() {
    Observable.combineLatest([
      this.getSeasons(),
      this.getChaptersForSeasons(),
      this.getEpisodesForSeasons(),
    ]).subscribe(data => {
      const [dataSeasons, dataChapters, dataEpisodes] = data;

      const seasons = [];
      for (const e of dataSeasons) {
        const season = new Season(e);
        seasons.push(season);
        const chapters = _.filter(dataChapters, {seasonRef: season.ref});
        for (const f of chapters) {
          const chapter = new Chapter(f, season);
          this.storage.ref('images/ffbe_' + chapter.getRefForUrl() + '.jpg')
            .getDownloadURL().subscribe(k => chapter.image = k);
          season.chapters.push(chapter);
          const episodes = _.filter(dataEpisodes, {seasonRef: season.ref, chapterRef: chapter.ref});
          for (const g of episodes) {
            const episode = new Episode(g, chapter);
            chapter.episodes.push(episode);
          }
        }
      }

      this.seasons = seasons;

      this.resolve();
    });
  }

  getChapter(chapterRef) {
    let chapter;
    if (chapterRef.indexOf('SSE') > -1) {
      chapterRef = chapterRef.replace('-', '/');
      chapter = _.find(this.specialEvents, {ref: chapterRef});
    } else if (chapterRef.indexOf('SE') > -1) {
      chapterRef = chapterRef.replace('-', '/');
      chapter = _.find(this.storyEvents, {ref: chapterRef});
    } else {
      const [seasonRef, ...others] = chapterRef.split('-');
      const season = _.find(this.seasons, {ref: seasonRef});
      chapter = _.find(season.chapters, {ref: others.join('/')});
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

  getEvents() {
    return this.storyEvents;
  }

  getSpecial() {
    return this.specialEvents;
  }
}
