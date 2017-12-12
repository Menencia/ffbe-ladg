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

  public seasons: Season[] = [];
  public chapters: Chapter[] = [];
  public episodes: Episode[] = [];
  public events: Chapter[] = [];

  constructor(public http: HttpClient) {
    this.buildSeasons(STORY.seasons);
    this.buildEvents(STORY.events);
  }

  buildSeasons(dataSeasons) {
    dataSeasons.forEach((dSeason: any) => {
      const season = Season.load(dSeason);
      this.buildChapters(dSeason, season);
      this.seasons.push(season);
    });
  }

  buildChapters(dSeason, season) {
    // tslint:disable-next-line:curly
    if (!dSeason.chapters) return false;
    dSeason.chapters.forEach(dChapter => {
      const chapter = Chapter.load(dChapter);
      chapter.ref = season.ref + '/' + chapter.ref;
      this.buildEpisodes(dChapter, chapter);
      season.chapters.push(chapter);
    });
  }

  buildEpisodes(dChapter, chapter) {
    // tslint:disable-next-line:curly
    if (!dChapter.episodes) return false;
    dChapter.episodes.forEach((dEpisode: any, index: number) => {
      const episode = Episode.load(dEpisode);
      episode.ref = chapter.ref + '/' + (index + 1);
      chapter.episodes.push(episode);
    });
  }

  buildEvents(dataEvents) {
    dataEvents.forEach((dChapter: any) => {
      const chapter = Chapter.load(dChapter);
      this.buildChapters(dChapter, chapter);
      this.events.push(chapter);
    });
  }

  getSeasons() {
    return this.seasons;
  }

  getChapter(chapterRef) {
    const [seasonRef, ...others] = chapterRef.split('-');
    const season = _.find(this.seasons, {ref: seasonRef});
    const chapter = _.find(season.chapters, {ref: chapterRef.replace(/-/g, '/')});
    return chapter;
  }

  getEpisode(episodeRef) {
    const [seasonRef, ...others] = episodeRef.split('-');
    const season = _.find(this.seasons, {ref: seasonRef});
    const chapter = _.find(season.chapters, {ref: _.initial(episodeRef).replace(/-/g, '/')});
    const episode = _.find(chapter.episodes, {ref: episodeRef.replace(/-/g, '/')});
    return episode;
  }

  getEvents() {
    return this.events;
  }
}
