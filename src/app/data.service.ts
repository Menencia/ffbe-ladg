import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Season } from './models/season';
import { Chapter } from './models/chapter';
import { Episode } from './models/episode';

import { STORY } from './data/seasons';

import * as _ from 'lodash';

@Injectable()
export class DataService {

  public loaded: boolean;

  // new variables
  story;
  storyEvents;
  specialEvents;

  // rename
  // season => folder
  // chapter => list
  // episode => episode

  constructor(public http: HttpClient) {
    this.story = this.buildSeasons(STORY.seasons);
    this.storyEvents = this.buildChapters(STORY.events);
    this.specialEvents = this.buildChapters(STORY.special);
  }

  buildSeasons(data) {
    const res = [];
    data.forEach((dSeason: any) => {
      const season = Season.load(dSeason);
      season.chapters = this.buildChapters(dSeason.chapters, season);
      res.push(season);
    });
    return res;
  }

  buildChapters(data, season = null) {
    const res = [];
    data.forEach(dChapter => {
      const chapter = Chapter.load(dChapter);
      if (season) {
        chapter.season = season;
        chapter.ref = season.ref + '/' + chapter.ref;
      }
      chapter.episodes = dChapter.episodes ? this.buildEpisodes(dChapter.episodes, chapter) : [];
      res.push(chapter);
    });
    return res;
  }

  buildEpisodes(data, chapter = null) {
    const res = [];
    data.forEach((dEpisode, index: number) => {
      const episode = Episode.load(dEpisode);
      if (chapter) {
        episode.chapter = chapter;
        episode.ref = chapter.ref + '/' + (index + 1);
      }
      res.push(episode);
    });
    return res;
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
      const season = _.find(this.story, {ref: seasonRef});
      chapter = _.find(season.chapters, {ref: chapterRef.replace(/-/g, '/')});
    }
    return chapter;
  }

  getEpisode(episodeRef) {
    const chapterRef = _.initial(episodeRef.split('-')).join('-');
    const chapter = this.getChapter(chapterRef);
    episodeRef = episodeRef.replace(/-/g, '/');
    return _.find(chapter.episodes, {ref: episodeRef});
  }

  getSeasons() {
    return this.story;
  }

  getEvents() {
    return this.storyEvents;
  }

  getSpecial() {
    return this.specialEvents;
  }
}
