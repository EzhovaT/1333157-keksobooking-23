import {ANNOUNCEMENT_COUNT} from './data.js';
import {createAnnouncement} from './create-announcement.js';
import {generateMarkupCards} from './generate-markup-cards.js';
import {checkingNumberOfGuests, addMinimumCostHousing} from './form.js';

const map = document.querySelector('#map-canvas');

const similarAnnouncements =  new Array(ANNOUNCEMENT_COUNT)
  .fill('')
  .map((currentValue, index) => createAnnouncement(index));

const markupCards = generateMarkupCards(similarAnnouncements);

map.appendChild(markupCards.children[1]);

const buttonFormSubmit = document.querySelector('.ad-form__submit');
buttonFormSubmit.addEventListener('click', checkingNumberOfGuests);
buttonFormSubmit.addEventListener('click', addMinimumCostHousing);
