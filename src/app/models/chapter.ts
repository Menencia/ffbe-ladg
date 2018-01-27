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
  _quality: number;

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

  getEpisodes() {
    return _.filter(this.episodes, e => e.video && e.video.yt !== '');
  }

  displayNbEpisodes() {
    const max = this.nbEpisodes;
    const availables = this.getEpisodes().length;
    if (max === 0) {
      return '-';
    } else if (max === availables) {
      return max;
    } else {
      return availables + '/' + max;
    }
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
    if (this.ref.indexOf('SE') > -1) {
      string += this.title;
    } else {
      const [season, chapter, part] = this.ref.split('/');
      string += 'Chapitre ' + chapter;
      if (part) {
        string += ' - Partie ' + part;
      }
    }
    return string;
  }

  getSeasonNumber() {
    let season;
    if (this.season) {
      season = this.ref.split('/');
      season = season[0];
    }
    return season;
  }

  get previousChapter() {
    if (!this._previousChapter && this.season) {
      const chapters = this.season.chapters;
      const index = _.findIndex(chapters, this);
      if (index >= 0) {
        this._previousChapter = chapters[index - 1];
      }
    }
    return this._previousChapter;
  }

  get nextChapter() {
    if (!this._nextChapter && this.season) {
      const chapters = this.season.chapters;
      const index = _.findIndex(chapters, this);
      if (index < chapters.length) {
        this._nextChapter = chapters[index + 1];
      }
    }
    return this._nextChapter;
  }

  get quality() {
    if (!this._quality) {
      if (this.episodes.length === 0) {
        this._quality = 0;
      } else {
        const res = _.sumBy(this.episodes, e => e.video.version >= 4);
        this._quality = Math.floor(res / this.nbEpisodes * 100);
      }
    }
    return this._quality;
  }

  getQualityColor() {
    if (this.quality >= 100) {
      return 'quality-blue';
    } else if (this.quality >= 50) {
      return 'quality-green';
    } else if (this.quality >= 25) {
      return 'quality-orange';
    } else {
      return 'quality-red';
    }
  }

}
