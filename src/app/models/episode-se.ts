import { Episode } from './episode';

export class EpisodeSE extends Episode {

  getTitle() {
    let string = '';
    const [number] = this.ref.split('/').slice(-1);
    string += `#${number} - ${this.title}`;
    return string;
  }

}
