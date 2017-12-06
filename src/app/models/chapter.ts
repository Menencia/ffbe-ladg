import { Episode } from './episode';

import * as _ from 'lodash';
import * as moment from 'moment';
import 'moment-duration-format';

export class Chapter {

  title: string;
  ref: string;
  episodes: Episode[] = [];
  url: string;

  static load(data) {
    const c = new Chapter();
    c.title = data.title;
    c.ref = data.ref;
    c.url = data.url;
    return c;
  }

  get nbEpisodes() {
    return this.episodes.length;
  }

  get totalDuration() {
    const total = _.sumBy(this.episodes, (k: Episode) => {
      const {video: {duration}} = k;
      return moment.duration(duration);
    });
    return moment.duration(total, 'milliseconds').format();
  }

}
