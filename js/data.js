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

export {LIST_TYPE_OFFER, LIST_CHECKIN, LIST_CHECKOUT, LIST_FEATURES, LIST_PHOTOS, ANNOUNCEMENT_COUNT, сreateListAvatar};
