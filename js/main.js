const randomNumber = (firstNumber, lastNumber) => {
  if (firstNumber < 0 || lastNumber < 0 || lastNumber <= firstNumber) {
    return 'Ошибка';
  } else {
    return (
      Math.floor(Math.random() * (lastNumber - firstNumber + 1)) + firstNumber
    );
  }
};

randomNumber(1, 8);

const getRandomCoordinates = (firstNumber, lastNumber, decimalPlaces) => {
  if (firstNumber < 0 || lastNumber < 0 || lastNumber <= firstNumber) {
    return 'Ошибка';
  } else {
    const count = Math.random() * (lastNumber - firstNumber + 1) + firstNumber;
    return count.toFixed(decimalPlaces);
  }
};

getRandomCoordinates(2, 8, 2);

const LIST_TYPE_OFFER = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const LIST_CHECKIN = ['12:00', '13:00', '14:00'];
const LIST_CHECKOUT = ['12:00', '13:00', '14:00'];
const LIST_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const LIST_PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const ANNOUNCEMENT_COUNT = 10;

const сreateListAvatar = () => {
  const listAvatar = [];
  for (let count = 1; count <= ANNOUNCEMENT_COUNT; count++) {
    listAvatar.push(`img/avatars/user0${count}.png`);
  }
  return listAvatar;
};

const createAnnouncement = (index) => {
  const locationLat = getRandomCoordinates(35.65, 35.7, 5);
  const locationLng = getRandomCoordinates(139.7, 139.8, 5);

  return {
    author: {
      avatar: сreateListAvatar()[index],
    },
    offer: {
      title: 'Объявление',
      adress: `${locationLat}, ${locationLng}`,
      price: randomNumber(1, 100),
      type: LIST_TYPE_OFFER[randomNumber(0, LIST_TYPE_OFFER.length - 1)],
      rooms: randomNumber(1, 10),
      guests: randomNumber(1, 10),
      checkin: LIST_CHECKIN[randomNumber(0, LIST_CHECKIN.length - 1)],
      checkout: LIST_CHECKOUT[randomNumber(0, LIST_CHECKOUT.length - 1)],
      features: new Array(randomNumber(1, LIST_FEATURES.length))
        .fill('')
        .map((feature, indexFeature) => LIST_FEATURES[indexFeature]),
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, repellat voluptas.',
      photos: new Array(randomNumber(1, LIST_PHOTOS.length))
        .fill('')
        .map(() => LIST_PHOTOS[randomNumber(0, LIST_PHOTOS.length - 1)]),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
};

const similarAnnouncements =  new Array(ANNOUNCEMENT_COUNT)
  .fill('')
  .map((currentValue, index) => createAnnouncement(index));

similarAnnouncements;
