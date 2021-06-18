import {ANNOUNCEMENT_COUNT} from './data.js';
import {createAnnouncement} from './create-announcement.js';
import {generationMarkupCards} from './generating-markup-cards.js';

const map = document.querySelector('#map-canvas');

const similarAnnouncements =  new Array(ANNOUNCEMENT_COUNT)
  .fill('')
  .map((currentValue, index) => createAnnouncement(index));

const markupCards = generationMarkupCards(similarAnnouncements);

map.appendChild(markupCards.children[0]);
