import { Chapter } from './chapter';
import { Correction } from './correction';
import { Model } from './model';

interface Video {
  yt: string;
  duration: string;
  version: number;
}

export class Episode extends Model {

  // base attributes
  uid: string;
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
   */
  constructor(dataObj) {
    super(dataObj, {
      title: null,
      originalTitle: null,
      region: null,
      isTown: null,
      video: null,
    });

    this.corrections = [];
  }

  /**
   * Converts and return chapter ref to URL format
   */
  getRefForUrl() {
    if (this.chapter) {
      if (this.chapter.season) {
        return [
          this.chapter.season.uid,
          this.chapter.uid,
          this.uid
        ].join('-');
      } else {
        return [
          this.chapter.uid,
          this.uid
        ].join('-');
      }
    } else {
      return this.uid;
    }
  }

  getRef() {
    if (this.chapter) {
      if (this.chapter.season) {
        return [
          this.chapter.season.uid,
          this.chapter.uid,
          this.uid
        ].join('-');
      } else {
        return [
          this.chapter.uid,
          this.uid
        ].join('-');
      }
    } else {
      return this.uid;
    }
  }

  /**
   * Return title of the chapter
   * @param breadcrump
   */
  getTitle(breadcrump = false) {
    let string = '';
    if (breadcrump) {
      string += '#' + this.uid + ' - ';
    }
    if (this.title) {
      string += this.title;
    } else if (this.originalTitle) {
      string += this.originalTitle + ' (EN)';
    }
    return string;
  }

}
