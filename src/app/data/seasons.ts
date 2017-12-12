import { CHAPTERS as CHAPTERS_S1 } from './chapters.1';
import { CHAPTERS as CHAPTERS_S2 } from './chapters.2';
import { CHAPTERS as CHAPTERS_EVENTS } from './events';

export const STORY = {
  seasons: [
    {
      title: 'Lapis',
      ref: '1',
      chapters: CHAPTERS_S1
    },
    {
      title: 'Paladia',
      ref: '2',
      chapters: CHAPTERS_S2
    }
  ],
  events: CHAPTERS_EVENTS
};
