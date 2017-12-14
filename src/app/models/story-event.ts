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

  static load(data) {
    const c = new StoryEvent();
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
    const total = _.sumBy(this.episodes, (k: EpisodeSE) => {
      const {video: {duration}} = k;
      return moment.duration('00:' + duration);
    });
    return moment.duration(total, 'milliseconds').format();
  }

  getID() {
    return this.ref.replace(/\//g, '-');
  }

}
