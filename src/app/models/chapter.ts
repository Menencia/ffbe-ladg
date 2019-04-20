import { Episode } from './episode';

import * as _ from 'lodash';
import * as moment from 'moment';
import 'moment-duration-format';
import { Season } from './season';

export class Chapter {

  // base attributes
  ref: string;
  title: string;
  yt: string;
  date: string;
  maxEpisodes: number;
  notAvailable: boolean;
  featured: boolean;

  // calculated attributes
  image: string;
  season: Season|null;
  episodes: Episode[] = [];

  // private attributes
  _previousChapter: Chapter;
  _nextChapter: Chapter;
  _quality: number;

  /**
   * Build a new chapter
   * @param data
   * @param season
   */
  constructor(data, season) {
    this.episodes = [];

    Object.assign(this, data);

    this.season = season;
  }

  /**
   * Return the total of episodes
   */
  get nbEpisodes(): number {
    return this.episodes.length;
  }

  /**
   * Return only episodes having a youtube link
   */
  getAvailableEpisodes(): Episode[] {
    return _.filter(this.episodes, e => e.video && e.video.yt !== '');
  }

  /**
   * Return '-' or 'Y' or 'X/Y'
   * where X is total available episodes
   * where Y is total episodes
   */
  displayNbEpisodes(): string {
    const max = this.nbEpisodes;
    const availables = this.getAvailableEpisodes().length;
    if (max === 0) {
      return '-';
    } else if (max === availables) {
      return max + '';
    } else {
      return availables + '/' + max;
    }
  }

  /**
   * Return total duration
   */
  get totalDuration(): string {
    const total = _.sumBy(this.episodes, (k: Episode) => {
      if (!k.video) {
        return false;
      }
      const {video: {duration}} = k;
      return moment.duration('00:' + duration);
    });
    return moment.duration(total, 'milliseconds').format();
  }

  /**
   * Return total duration
   */
  get totalCorrections(): number {
    const total = _.sumBy(this.episodes, (k: Episode) => {
      return k.corrections.length;
    });
    return total;
  }

  /**
   * Converts and return chapter ref to URL format
   * Replace '/' by '-'
   */
  getRefForUrl(): string {
    return this.ref.replace(/\//g, '-');
  }

  /**
   * Return category of the chapter
   */
  getCategory(): string {
    return 'Saison ' + this.getSeasonNumber();
  }

  /**
   * Return title of the chapter : 'Chapitre X( - Partie Y)'
   */
  getTitle(): string {
    const [season, chapter, part] = this.ref.split('/');
    let string = '';
    if (part && part === '1') {
      string += 'Chapitre ' + chapter + ' - Partie ' + part;
    } else if (part) {
      string += ' - Partie ' + part;
    } else {
      string += 'Chapitre ' + chapter;
    }
    return string;
  }

  /**
   * Returns only title chapter
   */
  getTitleChapter() {
    const [season, chapter, part] = this.ref.split('/');
    return 'Chapitre ' + chapter;
  }

  /**
   * Return season number of the chapter
   */
  getSeasonNumber(): string {
    const [season, ] = this.ref.split('/');
    return season;
  }

  /**
   * Return true if part is greater than one
   */
  isPartMoreThanOne() {
    const [season, chapter, part] = this.ref.split('/');
    return (part && part !== '1');
  }

  /**
   * Return previous chapter (can be null)
   */
  get previousChapter(): Chapter|null {
    if (!this._previousChapter && this.season) {
      const chapters = this.season.chapters;
      const index = _.findIndex(chapters, this);
      if (index >= 0) {
        this._previousChapter = chapters[index - 1];
      }
    }
    return this._previousChapter;
  }

  /**
   * Return nex chapter (can be null)
   */
  get nextChapter(): Chapter|null {
    if (!this._nextChapter && this.season) {
      const chapters = this.season.chapters;
      const index = _.findIndex(chapters, this);
      if (index < chapters.length) {
        this._nextChapter = chapters[index + 1];
      }
    }
    return this._nextChapter;
  }

  /**
   * Return quality of the chapter (based from all available episodes)
   */
  get quality(): number {
    if (!this._quality) {
      if (this.getAvailableEpisodes().length === 0) {
        this._quality = 0;
      } else {
        const res = _.sumBy(this.episodes, e => e.video && e.video.version >= 5);
        this._quality = Math.floor(res / this.getAvailableEpisodes().length * 100);
      }
    }
    return this._quality;
  }

  /**
   * Return quality color of the chapter
   */
  getQualityColor(): string {
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

  getImage(): string {
    const ref = this.getRefForUrl().toLocaleLowerCase();
    const path = this.getImagePath() + 'ffbe_' + ref + '.jpg';
    return `https://firebasestorage.googleapis.com/v0/b/ffbe-ladg.appspot.com/o/images%2F${path}?alt=media`;
  }

  /**
   * Return firebase folder path
   */
  getImagePath() {
    return 'story%2F';
  }

}
