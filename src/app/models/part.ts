import { Episode } from './episode';

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

}
