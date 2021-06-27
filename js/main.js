import {ANNOUNCEMENT_COUNT} from './data.js';
import {createAnnouncement} from './create-announcement.js';
import {generateMarkupCards} from './generate-markup-cards.js';
import {deactivatingPage, activatingPage} from './form.js';

const map = document.querySelector('#map-canvas');
const adForm = document.querySelector('.ad-form');
const adFormFields = Array.from(adForm.children);
const filtersForm = document.querySelector('.map__filters');
const filtersFormFieldsets = Array.from(filtersForm.children);

const similarAnnouncements =  new Array(ANNOUNCEMENT_COUNT)
  .fill('')
  .map((currentValue, index) => createAnnouncement(index));

const markupCards = generateMarkupCards(similarAnnouncements);

map.appendChild(markupCards.children[1]);

deactivatingPage(adForm, adFormFields);
activatingPage(filtersForm, filtersFormFieldsets);
