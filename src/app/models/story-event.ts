import { Chapter } from './chapter';

export class StoryEvent extends Chapter {

  getTitle() {
    let string = '';
    const [number] = this.ref.split('/').slice(-1);
    string += `#${number} - ${this.title}`;
    return string;
  }

}
