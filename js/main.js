import {ANNOUNCEMENT_COUNT} from './data.js';
import {createAnnouncement} from './create-announcement.js';
import {addCard} from './map.js';

const similarAnnouncements =  new Array(ANNOUNCEMENT_COUNT)
  .fill('')
  .map((currentValue, index) => createAnnouncement(index));

addCard(similarAnnouncements);
