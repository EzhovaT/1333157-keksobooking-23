import { addCard } from './map.js';
import { showError } from './map.js';
import { getData } from './api.js';
import { setUserFormSubmit } from './form.js';

getData(addCard, showError);
setUserFormSubmit();
