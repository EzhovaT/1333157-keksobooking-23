import { sendData } from './api.js';
import { openPopup } from './popup.js';
import { resetStartingCoordinates } from './map.js';

const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const typeHousing = document.querySelector('#type');
const inputPrice = document.querySelector('#price');
const adForm = document.querySelector('.ad-form');
const errorPopup = document.querySelector('.error');
const successPopup = document.querySelector('.success');
const formResetButton = document.querySelector('.ad-form__reset');

const MINIMUM_COST_HOUSING = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

capacity.addEventListener('change', () => {
  if (roomNumber.value === '100' && capacity.value !== '0') {
    capacity.setCustomValidity('Не для гостей');
  } else if (roomNumber.value < capacity.value) {
    capacity.setCustomValidity('Гостей больше чем комнат');
  } else {
    capacity.setCustomValidity('');
  }
});

typeHousing.addEventListener('change', () => {
  for (const key in MINIMUM_COST_HOUSING) {
    if (typeHousing.value === key) {
      inputPrice.min = MINIMUM_COST_HOUSING[key];
      inputPrice.placeholder = MINIMUM_COST_HOUSING[key];
    }
  }
});

const deactivatePage = (form, fieldsets) => {
  form.classList.add('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const activatePage = (form, fieldsets) => {
  form.classList.remove('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (event) => {
    event.preventDefault();
    sendData(
      () => openPopup(successPopup),
      () => openPopup(errorPopup),
      new FormData(event.target),
      adForm,
    );
  });
};

formResetButton.addEventListener('click', () => {
  adForm.reset;
  resetStartingCoordinates();
});

export { deactivatePage, activatePage, setUserFormSubmit };
