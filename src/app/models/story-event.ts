import { EpisodeSE } from './episode-se';

import * as _ from 'lodash';
import * as moment from 'moment';
import 'moment-duration-format';

export class StoryEvent {

  title: string;
  ref: string;
  episodes: EpisodeSE[] = [];
  yt: string;
  date: string;
  maxEpisodes: number;
  notAvailable: boolean;

  static load(data) {
    const c = new StoryEvent();
    c.title = data.title;
    c.ref = data.ref;
    c.yt = data.yt;
    c.date = data.date;
    c.maxEpisodes = data.maxEpisodes;
    c.notAvailable = data.notAvailable;
    return c;
  }

  get nbEpisodes() {
    return this.episodes.length;
  }

  get totalDuration() {
    const total = _.sumBy(this.episodes, (k: EpisodeSE) => {
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
    const [number] = this.ref.split('/').slice(-1);
    string += `#${number} - ${this.title}`;
    return string;
  }

}
