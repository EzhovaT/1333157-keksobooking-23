import { sendData } from './api.js';
import { openSuccessPopup, openErrorPopup } from './popup.js';
import { resetMapState } from './map.js';

const roomNumber = document.querySelector('#room_number');
const inputCapacity = document.querySelector('#capacity');
const typeHousing = document.querySelector('#type');
const inputPrice = document.querySelector('#price');
const adForm = document.querySelector('.ad-form');
const formResetButton = document.querySelector('.ad-form__reset');
const filtersForm = document.querySelector('.map__filters');

const MinimumCostHousing = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const setValidationRooms = (rooms, capacity) => {
  if (rooms.value === '100' && capacity.value !== '0') {
    capacity.setCustomValidity('Не для гостей');
  } else if (rooms.value < capacity.value) {
    capacity.setCustomValidity('Гостей больше чем комнат');
  } else if (rooms.value !=='100' && capacity.value === '0') {
    capacity.setCustomValidity('Укажите колличество гостей');
  }  else {
    capacity.setCustomValidity('');
  }
};

inputCapacity.addEventListener('change', () => {
  setValidationRooms(roomNumber, inputCapacity);
});

roomNumber.addEventListener('change', () => {
  setValidationRooms(roomNumber, inputCapacity);
});

typeHousing.addEventListener('change', () => {
  for (const key in MinimumCostHousing) {
    if (typeHousing.value === key) {
      inputPrice.placeholder = MinimumCostHousing[key];
    }
  }
});

inputPrice.addEventListener('change', () => {
  for (const key in MinimumCostHousing) {
    if (typeHousing.value === key) {
      inputPrice.min = MinimumCostHousing[key];
    }
  }
});

const checkInTime = document.querySelector('#timein');
const checkOutTime = document.querySelector('#timeout');

checkInTime.addEventListener('change', (event) => {
  checkOutTime.value = event.target.value;
});

checkOutTime.addEventListener('change', (event) => {
  checkInTime.value = event.target.value;
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

const resetForm = () => {
  openSuccessPopup();
  adForm.reset();
  resetMapState();
};

const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (event) => {
    event.preventDefault();
    sendData(
      () => resetForm(),
      () => openErrorPopup(),
      new FormData(event.target),
    );
  });
};

formResetButton.addEventListener('click', () => {
  adForm.reset();
  resetMapState();
  filtersForm.reset();
});

export { deactivatePage, activatePage, setUserFormSubmit };
