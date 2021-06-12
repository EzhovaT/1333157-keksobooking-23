import {randomNumber, getRandomCoordinates} from './utils.js';
import {LIST_TYPE_OFFER, LIST_CHECKIN, LIST_CHECKOUT, LIST_FEATURES, LIST_PHOTOS, сreateListAvatar} from './data.js';

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

export {createAnnouncement};
