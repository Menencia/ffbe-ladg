import { Chapter } from './chapter';

interface Video {
  yt: string;
  duration: string;
  version: number;
}

export class Episode {

  title: string;
  originalTitle: string;
  chapter: Chapter;
  ref: string;
  region: string;
  isTown: boolean;
  video: Video;

  static load(data) {
    const e = new this;
    e.title = data.title;
    e.originalTitle = data.originalTitle;
    e.region = data.region;
    e.isTown = data.isTown;
    e.video = data.video;
    return e;
  }

  getID() {
    return this.ref.replace(/\//g, '-');
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
