import { Chapter } from './chapter';
import { Correction } from './correction';
import { Season } from './season';

interface Video {
  yt: string;
  duration: string;
  version: number;
}

export class Episode {

  title: string;
  originalTitle: string;
  chapter: Chapter;
  chapterRef: string;
  seasonRef: string;
  ref: string;
  fullRef: string;
  region: string;
  isTown: boolean;
  video: Video;
  isStoryEvent: boolean;
  isSpecialEvent: boolean;
  corrections: Correction[];

  constructor(data, chapter) {
    this.corrections = [];

    Object.assign(this, data);

    this.chapter = chapter;

    if (chapter.isSpecialEvent) {
      this.fullRef = [chapter.fullRef, this.ref].join('/');
    } else if (chapter.isStoryEvent) {
      this.fullRef = [chapter.fullRef, this.ref].join('/');
    } else {
      this.fullRef = [chapter.season.ref, chapter.ref, this.ref].join('/');
    }
  }

  getRefForUrl() {
    return this.fullRef.replace(/\//g, '-');
  }

  getTitle() {
    let string = '';
    if (this.title) {
      string += this.title;
    } else if (this.originalTitle) {
      string += '<em>' + this.originalTitle + '</em>';
    }
    return string;
  }

  getTitleForBreadcrump() {
    let string = '';
    const [number] = this.ref.split('/').slice(-1);
    string += '#' + number;
    if (this.title) {
      string += ' - ' + this.title;
    } else if (this.originalTitle) {
      string += ' - ' + this.originalTitle;
    }
    return string;
  }

}
