const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('article');
const ListTypeOfferTranslation = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const generateMarkupCard = ({ offer, author }) => {
  const element = template.cloneNode(true);

  const title = element.querySelector('.popup__title');
  title.textContent = offer.title;

  const address = element.querySelector('.popup__text--address');
  address.textContent = offer.address;

  const price = element.querySelector('.popup__text--price');
  price.textContent = `${offer.price} ₽/ночь`;

  const type = element.querySelector('.popup__type');
  type.textContent = `${ListTypeOfferTranslation[offer.type]}`;

  const capacity = element.querySelector('.popup__text--capacity');
  capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;

  const time = element.querySelector('.popup__text--time');
  time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const avatar = element.querySelector('.popup__avatar');
  avatar.src = author.avatar;

  const description = element.querySelector('.popup__description');
  if (offer.description === '') {
    description.classList.add('hidden');
  } else {
    description.textContent = offer.description;
  }

  const features = element.querySelector('.popup__features');
  if (offer.features === undefined) {
    features.classList.add('hidden');
  } else {
    const modifiersFeatures = offer.features.map(
      (feature) => `popup__feature--${feature}`,
    );
    features.querySelectorAll('.popup__feature').forEach((item) => {
      const secondClass = item.classList[1];
      if (!modifiersFeatures.includes(secondClass)) {
        item.remove();
      }
    });
  }

  const photos = element.querySelector('.popup__photos');
  if (offer.photos === undefined) {
    photos.classList.add('hidden');
  } else {
    offer.photos.forEach((photoSrc) => {
      const photo = photos.children[0].cloneNode(true);
      photo.src = photoSrc;
      photos.appendChild(photo);
    });
    photos.children[0].remove();
  }
  return element;
};

export { generateMarkupCard };
