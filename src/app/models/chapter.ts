import { Episode } from './episode';

import * as _ from 'lodash';
import * as moment from 'moment';
import 'moment-duration-format';
import { Season } from './season';

export class Chapter {

  title: string;
  season: Season|null;
  ref: string;
  episodes: Episode[] = [];
  yt: string;
  date: string;
  maxEpisodes: number;
  image: string;
  notAvailable: boolean;
  featured: boolean;

  _previousChapter: Chapter;
  _nextChapter: Chapter;

  static load(data) {
    const c = new this;
    c.title = data.title;
    c.ref = data.ref;
    c.yt = data.yt;
    c.date = data.date;
    c.maxEpisodes = data.maxEpisodes;
    c.image = data.image;
    c.notAvailable = data.notAvailable;
    c.featured = data.featured;
    return c;
  }

  get nbEpisodes() {
    return this.episodes.length;
  }

  get totalDuration() {
    const total = _.sumBy(this.episodes, (k: Episode) => {
      const {video: {duration}} = k;
      return moment.duration('00:' + duration);
    });
    return moment.duration(total, 'milliseconds').format();
  }

  getID() {
    return this.ref.replace(/\//g, '-');
  }

  getTitle() {
    let string = '';
    const [season, chapter, part] = this.ref.split('/');
    string += 'Chapitre ' + chapter;
    if (part) {
      string += ' - Partie ' + part;
    }
    if (this.title) {
      string += ' - ' + this.title;
    }
    return string;
  }

  getSeasonNumber() {
    const [season] = this.ref.split('/');
    return season;
  }

  get previousChapter() {
    if (!this._previousChapter) {
      const chapters = this.season.chapters;
      const index = _.findIndex(chapters, this);
      if (index >= 0) {
        this._previousChapter = chapters[index - 1];
      }
    }
    return this._previousChapter;
  }

  get nextChapter() {
    if (!this._nextChapter) {
      const chapters = this.season.chapters;
      const index = _.findIndex(chapters, this);
      if (index < chapters.length) {
        this._nextChapter = chapters[index + 1];
      }
    }
    return this._nextChapter;
  }

}
