import { addCard } from './map.js';
import { getData } from './api.js';
import { closePopup } from './popup.js';
import { setUserFormSubmit } from './form.js';

getData(addCard);
setUserFormSubmit(closePopup);
