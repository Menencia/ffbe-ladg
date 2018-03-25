import { Episode } from './episode';

import * as _ from 'lodash';
import * as moment from 'moment';
import 'moment-duration-format';
import { Season } from './season';

export class Chapter {

  title: string;
  season: Season|null;
  seasonRef: string;
  ref: string;
  fullRef: string;
  isStoryEvent: boolean;
  isSpecialEvent: boolean;
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

  constructor(data, season) {
    this.episodes = [];

    Object.assign(this, data);

    this.season = season;

    if (this.isSpecialEvent) {
      this.fullRef = 'SSE/' + this.ref;
    } else if (this.isStoryEvent) {
      this.fullRef = 'SE/' + this.ref;
    } else {
      this.fullRef = this.seasonRef + '/' + this.ref;
    }
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

  isStory(): boolean {
    console.log(this.season);
    return this.season !== undefined;
  }

  getRefForUrl() {
    return this.fullRef.replace(/\//g, '-');
  }

  getLabel(): string {
    let string = '';
    if (this.isSpecialEvent) {
      string += 'Autres histoires';
    } else if (this.isStoryEvent) {
      string += 'Événements de l\'histoire';
    } else {
      string += 'Saison ' + this.getSeasonNumber();
    }
    return string;
  }

  getTitle() {
    let string = '';
    if (this.isStoryEvent || this.isSpecialEvent) {
      string += this.title;
    } else {
      const [chapter, part] = this.ref.split('/');
      string += 'Chapitre ' + chapter;
      if (part) {
        string += ' - Partie ' + part;
      }
    }
    return string;
  }

  getTitleForBreadcrump() {
    let string = '';
    if (this.isStoryEvent || this.isSpecialEvent) {
      const refs = this.ref.split('/');
      string += '#' + _.last(refs) + ' - ' + this.title;
    } else {
      const [chapter, part] = this.ref.split('/');
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
        const res = _.sumBy(this.episodes, e => e.video.version >= 5);
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
