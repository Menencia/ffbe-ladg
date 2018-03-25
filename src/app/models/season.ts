import { Chapter } from './chapter';

export class Season {

  ref: string;
  title: string;
  chapters: Chapter[];

  constructor(data) {
    this.chapters = [];

    Object.assign(this, data);
  }

}
