import { Chapter } from './chapter';

export class Season {

  title: string;
  chapters: Chapter[] = [];

  static load(data) {
    const s = new Season();
    s.title = data.title;
    if (data.chapters) {
      data.chapters.forEach(chapter => {
        s.chapters.push(Chapter.load(chapter));
      });
    }
    return s;
  }

}
