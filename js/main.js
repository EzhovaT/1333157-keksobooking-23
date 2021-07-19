import { addCard, showError, setFilterValue } from './map.js';
import { getData } from './api.js';
import { setUserFormSubmit } from './form.js';

getData((offer) => {
  addCard(offer);
  setFilterValue(() => addCard(offer));
}, showError);

setUserFormSubmit();
