import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Season } from './models/season';
import { Chapter } from './models/chapter';

import * as _ from 'lodash';
import { AngularFirestore, QueryFn } from 'angularfire2/firestore';

import 'rxjs/add/observable/combineLatest';
import { StoryEvent } from './models/story-event';
import { SpecialEvent } from './models/special-event';
import { Episode } from './models/episode';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { EpisodeSE } from './models/episode-se';
import { EpisodeSSE } from './models/episode-sse';

@Injectable()
export class DataService {

  constructor(
    private db: AngularFirestore,
  ) {

  }

  /**
   * Generic function to query a collection
   * @param col
   * @param options
   */
  collection(col: string, options?: QueryFn) {
    return this.db
      .collection(col, options)
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const uid = a.payload.doc.id;
          const data = a.payload.doc.data();
          return {uid, ...data};
        }))
      );
  }

  /**
   * Generif function to query a doc
   * @param doc
   */
  doc(doc: string) {
    return this.db
      .doc(doc)
      .snapshotChanges()
      .pipe(
        map(a => {
          const uid = a.payload.id;
          const data = a.payload.data();
          return {uid, ...data};
        })
      );
  }

  getSeason(s) {
    return this.doc(`seasons/${s}`)
      .pipe(
        map(seasonObj => new Season(seasonObj))
      );
  }

  getCompleteChapter(s, c) {
    if (s === 'SSE') { // Special event
      return this.getSpecialEvent(c);
    } else if (s === 'SE') { // Story event
      return this.getStoryEvent(c);
    } else { // Season chapter
      return combineLatest([
        this.getChapter(s, c),
        this.getSeason(s),
      ]).pipe(
        map((data: [Chapter, Season]) => {
          const [chapter, season] = data;
          chapter.season = season;
          return chapter;
        })
      );
    }
  }

  getChapter(s, c) {
    return this.doc(`seasons/${s}/chapters/${c}`)
      .pipe(
        map(a => {
          const chapter = new Chapter(a);

          // get chapters episodes
          this.collection(`seasons/${s}/chapters/${c}/episodes`)
            .pipe(
              map(episodes => episodes.map(episodeObj => {
                const episode = new Episode(episodeObj);
                episode.chapter = chapter;
                return episode;
              }) )
            )
            .subscribe(episodes => chapter.episodes = episodes);

          return chapter;
        })
      );
  }

  getStoryEvent(c) {
    return this.doc(`story-events/SE-${c}`)
      .pipe(
        map(a => {
          const chapter = new StoryEvent(a);

          // get story events episodes
          this.collection(`story-events/SE-${c}/episodes`)
            .pipe(
              map(episodes => episodes.map(episodeObj => {
                const episode = new EpisodeSE(episodeObj);
                episode.chapter = chapter;
                return episode;
              }) )
            )
            .subscribe(episodes => chapter.episodes = episodes);

          return chapter;
        })
      );
  }

  getSpecialEvent(c) {
    return this.doc(`special-events/SSE-${c}`)
      .pipe(
        map(a => {
          const chapter = new SpecialEvent(a);

          // get special events episodes
          this.collection(`special-events/SSE-${c}/episodes`)
            .pipe(
              map(episodes => episodes.map(episodeObj => {
                const episode = new EpisodeSSE(episodeObj);
                episode.chapter = chapter;
                return episode;
              }) )
            )
            .subscribe(episodes => chapter.episodes = episodes);

          return chapter;
        })
      );
  }

  getCompleteEpisode(s, c, e) {
    let reqs;
    if (s === 'SSE') { // Special event
      reqs = [
        this.getEpisodeSSE(c, e),
        this.getSpecialEvent(c),
      ];
    } else if (s === 'SE') { // Story event
      reqs = [
        this.getEpisodeSE(c, e),
        this.getStoryEvent(c),
      ];
    } else { // Season episode
      reqs = [
        this.getEpisode(s, c, e),
        this.getCompleteChapter(s, c),
      ];
    }
    return combineLatest(reqs).pipe(
      map((data: [Episode, Chapter]) => {
        const [episode, chapter] = data;
        episode.chapter = chapter;
        return episode;
      })
    );
  }

  getEpisode(s, c, e) {
    return this.doc(`seasons/${s}/chapters/${c}/episodes/${e}`)
      .pipe(
        map(episodeObj => new Episode(episodeObj))
      );
  }
  getEpisodeSE(c, e) {
    return this.doc(`story-events/SE-${c}/episodes/${e}`)
      .pipe(
        map(episodeObj => new EpisodeSE(episodeObj))
      );
  }
  getEpisodeSSE(c, e) {
    return this.doc(`special-events/SSE-${c}/episodes/${e}`)
      .pipe(
        map(episodeObj => new EpisodeSSE(episodeObj))
      );
  }

  getSeasons() {
    return this.collection('seasons')
      .pipe(
        map(seasons => seasons.map(seasonObj => {
          const season = new Season(seasonObj);
          this.collection(`seasons/${season.uid}/chapters`)
            .pipe(
              map(chapters => chapters.map(chapterObj => {
                const chapter = new Chapter(chapterObj);
                chapter.season = season;
                return chapter;
              }) )
            )
            .subscribe(chapters => season.chapters = chapters);
          return season;
        }) )
      );
  }

  getStoryEvents() {
    return this.collection('story-events')
      .pipe(
        map(data => data.map(dataObj => new StoryEvent(dataObj)) )
      );
  }

  getSpecialEvents() {
    return this.collection('special-events')
      .pipe(
        map(data => data.map(dataObj => new SpecialEvent(dataObj)) )
      );
  }
}
