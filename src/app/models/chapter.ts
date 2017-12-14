import { Episode } from './episode';

import * as _ from 'lodash';
import * as moment from 'moment';
import 'moment-duration-format';

export class Chapter {

  title: string;
  ref: string;
  episodes: Episode[] = [];
  yt: string;
  date: string;

  static load(data) {
    const c = new Chapter();
    c.title = data.title;
    c.ref = data.ref;
    c.yt = data.yt;
    c.date = data.date;
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

}
