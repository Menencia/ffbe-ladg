import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Season } from './models/season';
import { Chapter } from './models/chapter';
import { Episode } from './models/episode';
import { EpisodeSE } from './models/episode-se';
import { StoryEvent } from './models/story-event';

import { STORY } from './data/seasons';

import * as _ from 'lodash';

@Injectable()
export class DataService {

  public loaded: boolean;

  public seasons: Season[] = [];
  public chapters: Chapter[] = [];
  public episodes: EpisodeSE[] = [];
  public events: StoryEvent[] = [];
  public special: StoryEvent[] = [];

  constructor(public http: HttpClient) {
    this.buildSeasons(STORY.seasons);
    this.buildEvents(STORY.events);
    this.buildSpecial(STORY.special);
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
    dataEvents.forEach((dEvent: any) => {
      const event = StoryEvent.load(dEvent);
      this.buildEvent(dEvent, event);
      this.events.push(event);
    });
  }

  buildEvent(dEvent, event) {
    // tslint:disable-next-line:curly
    if (!dEvent.episodes) return false;
    dEvent.episodes.forEach((dEventEpisode: any, index: number) => {
      const eventEpisode = EpisodeSE.load(dEventEpisode);
      eventEpisode.ref = event.ref + '/' + (index + 1);
      event.episodes.push(eventEpisode);
    });
  }

  buildSpecial(dataSpecial) {
    dataSpecial.forEach((dSpecial: any) => {
      const event = StoryEvent.load(dSpecial);
      this.buildEvent(dSpecial, event);
      this.special.push(event);
    });
  }

  getChapter(chapterRef) {
    const [seasonRef, ...others] = chapterRef.split('-');
    const season = _.find(this.seasons, {ref: seasonRef});
    const chapter = _.find(season.chapters, {ref: chapterRef.replace(/-/g, '/')});
    return {season, chapter};
  }

  getStoryEvent(storyEventRef) {
    storyEventRef = storyEventRef.replace('-', '/');
    const storyEvent = _.find(this.events, {ref: storyEventRef});
    return {storyEvent};
  }

  getSpecialEvent(specialEventRef) {
    specialEventRef = specialEventRef.replace('-', '/');
    const specialEvent = _.find(this.special, {ref: specialEventRef});
    return {specialEvent};
  }

  getEpisode(episodeID) {
    const [seasonRef, ...others] = episodeID.split('-');
    const season = _.find(this.seasons, {ref: seasonRef});

    const chapterRef = _.concat([seasonRef], _.initial(others)).join('/');
    const chapter = _.find(season.chapters, {ref: chapterRef});

    const episodeRef = episodeID.replace(/-/g, '/');
    const episode = _.find(chapter.episodes, {ref: episodeRef});

    return {season, chapter, episode};
  }

  getEpisodeSE(episodeID) {
    const chapterRef = _.initial(episodeID.split('-')).join('/');
    const storyEvent = _.find(this.events, {ref: chapterRef});

    const episodeRef = episodeID.replace(/-/g, '/');
    const episodeSE = _.find(storyEvent.episodes, {ref: episodeRef});

    return {storyEvent, episodeSE};
  }

  getEpisodeSSE(episodeID) {
    const chapterRef = _.initial(episodeID.split('-')).join('/');
    const specialEvent = _.find(this.special, {ref: chapterRef});

    const episodeRef = episodeID.replace(/-/g, '/');
    const episodeSSE = _.find(specialEvent.episodes, {ref: episodeRef});

    return {specialEvent, episodeSSE};
  }

  getSeasons() {
    return this.seasons;
  }

  getEvents() {
    return this.events;
  }

  getSpecial() {
    return this.special;
  }
}
