import { Chapter } from './chapter';

export class SpecialEvent extends Chapter {

  constructor(data, season) {
    super(data, season);
  }

  /**
   * Return category of the chapter
   */
  getCategory(): string {
    return 'Autres histoires';
  }

  /**
   * Return title of the chapter : 'Chapitre X( - Partie Y)'
   */
  getTitle(): string {
    return this.title;
  }

  /**
   * Return firebase folder path
   */
  getImagePath() {
    return 'sse%2F';
  }

}
