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

const listTypeOffer = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const listCheckin = ['12:00', '13:00', '14:00'];
const listCheckout = ['12:00', '13:00', '14:00'];
const listFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const listPhotos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const CreateListAvatar = () => {
  const listAvatar = [];
  for (let count = 1; count <= 10; count++) {
    count <= 8 ? listAvatar.push(`img/avatars/user0${count}.png`) : listAvatar.push('');
  }
  return listAvatar;
};

const getRandomElement = (arr) => arr[randomNumber(0, arr.length - 1)];

const getRandomLengthArray = (arr) =>  randomNumber(1, arr.length - 1);

const createAnnouncement = (index) => {
  const locationArr = [getRandomCoordinates(35.65, 35.7, 5), getRandomCoordinates(139.7, 139.8, 5)];

  return {
    author: {
      avatar: CreateListAvatar()[index],
    },
    offer: {
      title: 'Объявление',
      adress: `${locationArr[0]}, ${locationArr[1]}`,
      price: randomNumber(1, 100),
      type: listTypeOffer[randomNumber(0, listTypeOffer.length - 1)],
      rooms: randomNumber(1, 10),
      guests: randomNumber(1, 10),
      checkin: listCheckin[randomNumber(0, listCheckin.length - 1)],
      checkout: listCheckout[randomNumber(0, listCheckout.length - 1)],
      features: new Array(getRandomLengthArray(listFeatures))
        .fill('')
        .map((feature, indexFeature) => listFeatures[indexFeature]),
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, repellat voluptas.',
      photos: new Array(getRandomLengthArray(listPhotos))
        .fill('')
        .map(() => getRandomElement(listPhotos)),
    },
    location: {
      lat: locationArr[0],
      lng: locationArr[1],
    },
  };
};

const similarAnnouncement =  new Array(10)
  .fill('')
  .map((currentValue, index) => createAnnouncement(index));


similarAnnouncement;
