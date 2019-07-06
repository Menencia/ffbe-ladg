import { Chapter } from './chapter';
import { Model } from './model';

export class Season extends Model {

  uid: string;
  title: string;
  chapters: Chapter[];

  constructor(dataObj) {

    super(dataObj, {
      ref: null,
      title: null,
    });

    this.chapters = [];
  }

}
