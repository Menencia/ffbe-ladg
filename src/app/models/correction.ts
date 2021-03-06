import { Episode } from './episode';

export class Correction {

  id?: string;
  ref: string;

  timecode: string;

  title?: string;
  message?: string;
  note?: string;

  verified: boolean;

  created: {
    author: string,
    date: Date
  };
  updated?: {
    author: string,
    date: Date
  };

  constructor(data) {
    Object.assign(this, data);
  }

}
