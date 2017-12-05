import { Part } from './part';
import { Episode } from './episode';

export class Chapter {

  title: string;
  parts: Part[] = [];
  episodes: Episode[] = [];
  url: string;

  static load(data) {
    const c = new Chapter();
    c.title = data.title;
    if (data.parts) {
      data.parts.forEach(part => {
        c.parts.push(Part.load(part));
      });
    }
    if (data.episodes) {
      data.episodes.forEach(episode => {
        c.episodes.push(Episode.load(episode));
      });
    }
    c.url = data.url;
    return c;
  }

}
