import { activatePage } from './form.js';
import { generateMarkupCard } from './generate-markup-cards.js';

const inputAdress = document.querySelector('#address');
const adForm = document.querySelector('.ad-form');
const adFormFields = Array.from(adForm.children);
const filtersForm = document.querySelector('.map__filters');
const filtersFormFieldsets = Array.from(filtersForm.children);
const serverError = document.querySelector('.server-error');

const STARTING_LAT = 35.6894;
const STARTING_LNG = 139.692;
const ICON_SIZE = [40, 40];
const ICON_ANCHOR = [20, 40];
const ICON_URL = 'img/pin.svg';
const MAIN_ICON_SIZE = [52, 52];
const MAIN_ICON_ANCHOR = [26, 52];
const MAIN_ICON_URL = 'img/main-pin.svg';
const DECIMAL_PLACES = 5;
const MAP_SCALE = 10;
const NUMBER_OFFERS = 10;

inputAdress.value = `${STARTING_LAT}, ${STARTING_LNG}`;

const mapCanvas = L.map('map-canvas')
  .on('load', () => {
    activatePage(filtersForm, filtersFormFieldsets);
    activatePage(adForm, adFormFields);
  })
  .setView(
    {
      lat: STARTING_LAT,
      lng: STARTING_LNG,
    },
    MAP_SCALE,
  );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mapCanvas);

const markerGroup = L.layerGroup().addTo(mapCanvas);

const pinIcon = L.icon({
  iconUrl: ICON_URL,
  iconSize: ICON_SIZE,
  iconAnchor: ICON_ANCHOR,
});

const mainPinIcon = L.icon({
  iconUrl: MAIN_ICON_URL,
  iconSize: MAIN_ICON_SIZE,
  iconAnchor: MAIN_ICON_ANCHOR,
});

const mainPinMarker = L.marker(
  {
    lat: STARTING_LAT,
    lng: STARTING_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(mapCanvas);

mainPinMarker.on('moveend', (evt) => {
  const lat = evt.target.getLatLng().lat.toFixed(DECIMAL_PLACES);
  const lng = evt.target.getLatLng().lng.toFixed(DECIMAL_PLACES);
  inputAdress.value = `${lat}, ${lng}`;
});

const mapFeatures = document.querySelector('.map__features');
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
let housingTypeValue = housingType.value;
let housingPriceValue = housingPrice.value;
let housingRoomsValue = housingRooms.value;
let housingGuestsValue = housingGuests.value;

let selectedFeatures = [];

const setFilterValue = (cb) => {
  filtersForm.addEventListener('input', (event) => {
    switch (event.target){
      case housingType :
        housingTypeValue = event.target.value;
        break;
      case housingPrice :
        housingPriceValue = event.target.value;
        break;
      case housingRooms :
        housingRoomsValue = event.target.value;
        break;
      case housingGuests :
        housingGuestsValue = event.target.value;
        break;
    }

    const checkdFeature = Array.from(mapFeatures.querySelectorAll('input:checked'));
    selectedFeatures = checkdFeature.map((elem) => elem.value);

    cb();
  });
};

const getRank = ({ offer }) => {
  let rank = 0;
  selectedFeatures.forEach(() => {
    for (let num = 0; num < selectedFeatures.length; num++) {
      if (offer.features && offer.features.includes(selectedFeatures[num])) {
        rank += 2;
      }
    }
  });

  return rank;
};

const isFilterSelected = (filterValue, offerValue) => filterValue === offerValue || filterValue === 'any';

const filterType = ({ offer }) => {
  const housingTypeCompare = isFilterSelected(housingTypeValue, offer.type);
  const housingPriceCompare = isFilterSelected(housingPriceValue, offer.price);
  const housingRoomsCompare = isFilterSelected(housingRoomsValue, offer.rooms);
  const housingGuestsCompare = isFilterSelected(housingGuestsValue, offer.guests);

  return housingTypeCompare && housingPriceCompare && housingRoomsCompare && housingGuestsCompare;
};

const compareOffers = (offerA, offerB) => {
  const rankA = getRank(offerA);
  const rankB = getRank(offerB);

  return rankB - rankA;
};

const createMarker =(point) => {
  const { lat, lng } = point.location;
  const marker = L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      icon: pinIcon,
    },
  );
  marker.addTo(markerGroup).bindPopup(generateMarkupCard(point), {
    keepInView: true,
  });
};

const addCard = (announcements) => {
  markerGroup.clearLayers();

  const sortAnnouncements =  announcements.slice().sort(compareOffers);

  let countOffer =0;

  for(let num = 0; num<sortAnnouncements.length; num++) {
    if(countOffer === NUMBER_OFFERS) {
      break;
    }
    if(filterType(sortAnnouncements[num])) {
      createMarker(sortAnnouncements[num]);
      countOffer++;
    }
  }

  mapCanvas.closePopup();
};

const showError = () => {
  serverError.classList.remove('hidden');
};

const resetMapState = () => {
  mainPinMarker.setLatLng({
    lat: STARTING_LAT,
    lng: STARTING_LNG,
  });

  mapCanvas.closePopup();

  mapCanvas.setView(
    {
      lat: STARTING_LAT,
      lng: STARTING_LNG,
    },
    MAP_SCALE,
  );
  inputAdress.value = `${STARTING_LAT}, ${STARTING_LNG}`;
};

export { addCard, resetMapState, showError, setFilterValue };
