import { addCards, showError, setFilterValue } from './map.js';
import { getData } from './api.js';
import { setUserFormSubmit } from './form.js';
import { debounce } from './utils/debounce.js';

const RENDER_DELAY = 1500;

getData((offers) => {
  addCards(offers);
  setFilterValue(debounce(
    () => addCards(offers),
    RENDER_DELAY,
  ));
}, showError);

setUserFormSubmit();
