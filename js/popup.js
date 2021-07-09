const errorButton = document.querySelector('.error__button');

const isEscEvent = (event) => event.key === 'Escape' || event.key === 'Esc';

const closePopup = (popup) => {
  popup.classList.add('hidden');
};

const onPopupEscKeydown = (popup) => function (event) {
  if (isEscEvent(event)) {
    event.preventDefault();
    closePopup(popup);
  }
};

const onClickСlose = (popup) => function (event) {
  if (event.target === errorButton || event.target === popup) {
    closePopup(popup);
  }
};

const openPopup = (popup) => {
  popup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown(popup));
  popup.addEventListener('click', onClickСlose(popup));
};

export { openPopup, closePopup };
