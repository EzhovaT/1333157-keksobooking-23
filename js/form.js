const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const typeHousing = document.querySelector('#type');
const inputPrice = document.querySelector('#price');

const MINIMUMCOSTHOUSING = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

capacity.addEventListener('change',() => {
  if(roomNumber.value === '100' && capacity.value !== '0') {
    capacity.setCustomValidity('Не для гостей');
  } else if (roomNumber.value < capacity.value) {
    capacity.setCustomValidity('Гостей больше чем комнат');
  } else {
    capacity.setCustomValidity('');
  }
});

typeHousing.addEventListener('change', () => {
  for(const key in MINIMUMCOSTHOUSING){
    if(typeHousing.value === key){
      inputPrice.min = MINIMUMCOSTHOUSING[key];
      inputPrice.placeholder = MINIMUMCOSTHOUSING[key];
    }
  }
});

const deactivatingPage = (form, fieldsets) => {
  form.classList.add('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });
};

const activatingPage = (form, fieldsets) => {
  form.classList.remove('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });
};

export {deactivatingPage, activatingPage};
