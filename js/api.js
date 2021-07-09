import { resetStartingCoordinates } from './map.js';

const getData = (onSucces) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((announcement) => {
      onSucces(announcement);
    });
};

const sendData = (onSuccess, onFail, body, form) => {
  fetch('https://23.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        form.reset();
        resetStartingCoordinates();
      } else {
        onFail();
      }
    })
    .catch(() => onFail());
};

export { getData, sendData };
