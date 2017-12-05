import { Part } from './part';
import { Episode } from './episode';

export class Chapter {

  id: number;
  title?: string;
  parts?: Part[];
  episodes?: Episode[];

}
