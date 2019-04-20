import { Chapter } from './chapter';

export class StoryEvent extends Chapter {

  constructor(data, season) {
    super(data, season);
  }

  /**
   * Return category of the chapter
   */
  getCategory(): string {
    return 'Événements de l\'histoire';
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
    return 'se%2F';
  }

}
