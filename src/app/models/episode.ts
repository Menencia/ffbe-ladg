import { Chapter } from './chapter';
import { Correction } from './correction';
import { Season } from './season';

interface Video {
  yt: string;
  duration: string;
  version: number;
}

export class Episode {

  // base attributes
  ref: string;
  title: string;
  originalTitle: string;
  region: string;
  isTown: boolean;
  video: Video;

  // calculated attributes
  chapter: Chapter;
  corrections: Correction[];

  /**
   * Build a new episode
   * @param data
   * @param chapter
   */
  constructor(data, chapter) {
    this.corrections = [];

    Object.assign(this, data);

    this.chapter = chapter;
  }

  /**
   * Converts and return chapter ref to URL format
   * Replace '/' by '-'
   */
  getRefForUrl() {
    return this.ref.replace(/\//g, '-');
  }

  /**
   * Return title of the chapter
   * @param breadcrump
   */
  getTitle(breadcrump = false) {
    let string = '';
    if (breadcrump) {
      const [number] = this.ref.split('/').slice(-1);
      string += '#' + number + ' - ';
    }
    if (this.title) {
      string += this.title;
    } else if (this.originalTitle) {
      string += this.originalTitle + ' (EN)';
    }
    return string;
  }

}
