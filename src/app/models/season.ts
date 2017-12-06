import { Chapter } from './chapter';

export class Season {

  title: string;
  ref: string;
  chapters: Chapter[] = [];

  static load(data) {
    const s = new Season();
    s.title = data.title;
    s.ref = data.ref;
    return s;
  }

}
