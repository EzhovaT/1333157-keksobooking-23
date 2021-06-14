import {ANNOUNCEMENT_COUNT} from './data.js';
import {createAnnouncement} from './create-announcement.js';

const similarAnnouncements =  new Array(ANNOUNCEMENT_COUNT)
  .fill('')
  .map((currentValue, index) => createAnnouncement(index));

similarAnnouncements;
