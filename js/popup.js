const errorButton = document.querySelector('.error__button');
const errorPopup = document.querySelector('.error');
const successPopup = document.querySelector('.success');

const isEscEvent = (event) => event.key === 'Escape' || event.key === 'Esc';

const onSuccessPopupEscKeydown = (event) => {
  if (isEscEvent(event)) {
    event.preventDefault();
    successPopup.classList.add('hidden');
    document.removeEventListener('keydown', onSuccessPopupEscKeydown);
  }
};

const onErrorPopupEscKeydown = (event) => {
  if (isEscEvent(event)) {
    event.preventDefault();
    errorPopup.classList.add('hidden');
    document.removeEventListener('keydown', onErrorPopupEscKeydown);
  }
};

const closeErrorPopup = (event) => {
  if (event.target === errorButton || event.target === errorPopup) {
    errorPopup.classList.add('hidden');
    errorPopup.removeEventListener('click', closeErrorPopup);
  }
};

const closeSuccessPopup = (event) => {
  if (event.target === successPopup) {
    successPopup.classList.add('hidden');
    successPopup.removeEventListener('click', closeSuccessPopup);
  }
};

const openSuccessPopup = () => {
  successPopup.classList.remove('hidden');
  document.addEventListener('keydown', onSuccessPopupEscKeydown);
  successPopup.addEventListener('click', closeSuccessPopup);
};

const openErrorPopup = () => {
  errorPopup.classList.remove('hidden');
  document.addEventListener('keydown', onErrorPopupEscKeydown);
  errorPopup.addEventListener('click', closeErrorPopup);
};

export { openSuccessPopup, openErrorPopup };
