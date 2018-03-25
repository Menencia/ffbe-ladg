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

}
