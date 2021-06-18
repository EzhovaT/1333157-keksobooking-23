const generationMarkupCards = (similarAnnouncements) => {
  const templateFragment = document.querySelector('#card').content;
  const template = templateFragment.querySelector('article');
  const fragment = document.createDocumentFragment();
  const LIST_TYPE_OFFER_TRANSLATION = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало',
    hotel: 'Отель',
  };

  similarAnnouncements.forEach(({offer, author}) => {
    const element = template.cloneNode(true);
    const title = element.querySelector('.popup__title');
    const address = element.querySelector('.popup__text--address');
    const price = element.querySelector('.popup__text--price');
    const type = element.querySelector('.popup__type');
    const capacity = element.querySelector('.popup__text--capacity');
    const time = element.querySelector('.popup__text--time');
    const features = element.querySelector('.popup__features');
    const description = element.querySelector('.popup__description');
    const photos = element.querySelector('.popup__photos');
    const avatar = element.querySelector('.popup__avatar');

    title.innerHTML = offer.title;
    address.innerHTML = offer.address;
    price.innerHTML = `${offer.price} ₽/ночь`;
    type.innerHTML = `${LIST_TYPE_OFFER_TRANSLATION[offer.type]}`;
    capacity.innerHTML = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    time.innerHTML = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    avatar.src = author.avatar;

    offer.description === '' ? description.classList.add('hidden') : description.innerHTML = offer.description;

    if(offer.features === ''){
      features.classList.add('hidden');
    } else {
      const modifiersFeatures = offer.features.map((feature) => `popup__feature--${feature}`);
      features.querySelectorAll('.popup__feature').forEach((item) => {
        const secondClass = item.classList[1];
        if(!modifiersFeatures.includes(secondClass)){
          item.remove();
        }
      });
    }

    if(offer.photos ===''){
      photos.classList.add('hidden');
    } else {
      offer.photos.forEach((photoSrc) => {
        const photo = photos.children[0].cloneNode(true);
        photo.src = photoSrc;
        photos.appendChild(photo);
      });
      photos.children[0].remove();
    }

    fragment.appendChild(element);
  });
  return fragment;
};

export {generationMarkupCards};
