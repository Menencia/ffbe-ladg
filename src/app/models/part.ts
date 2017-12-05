import { Episode } from './episode';

import * as _ from 'lodash';
import * as moment from 'moment';
import 'moment-duration-format';

export class Part {

  title: string;
  episodes: Episode[] = [];
  url: string;

  static load(data) {
    const p = new Part();
    p.title = data.title;
    if (data.episodes) {
      data.episodes.forEach(episode => {
        p.episodes.push(Episode.load(episode));
      });
    }
    p.url = data.url;
    return p;
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
