const getData = (onSucces, onError) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((announcement) => {
      onSucces(announcement);
    })
    .catch(() => {
      onError();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://23.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => onFail());
};

export { getData, sendData };
