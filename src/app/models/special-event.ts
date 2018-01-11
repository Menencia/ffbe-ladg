import { Chapter } from './chapter';

export class SpecialEvent extends Chapter {

  getTitle() {
    let string = '';
    const [number] = this.ref.split('/').slice(-1);
    string += `#${number} - ${this.title}`;
    return string;
  }

}
