import {activatePage} from './form.js';
import {generateMarkupCard} from './generate-markup-cards.js';

const inputAdress = document.querySelector('#address');
const adForm = document.querySelector('.ad-form');
const adFormFields = Array.from(adForm.children);
const filtersForm = document.querySelector('.map__filters');
const filtersFormFieldsets = Array.from(filtersForm.children);

const STARTING_LAT = 35.6894;
const STARTING_LNG = 139.692;
const ICON_SIZE = [40, 40];
const ICON_ANCHOR = [20, 40];
const ICON_URL = 'img/pin.svg';
const MAIN_ICON_SIZE = [52, 52];
const MAIN_ICON_ANCHOR = [26, 52];
const MAIN_ICON_URL = 'img/main-pin.svg';
const DECIMAL_PLACES = 5;

inputAdress.value = `${STARTING_LAT}, ${STARTING_LNG}`;

const addCard = (announcements) => {
  const mapCanvas = L.map('map-canvas')
    .on('load', () => {
      activatePage(filtersForm, filtersFormFieldsets);
      activatePage(adForm, adFormFields);
    })
    .setView({
      lat: STARTING_LAT,
      lng: STARTING_LNG,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(mapCanvas);

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

  announcements.forEach((point) => {
    const {lat, lng} = point.location;
    const marker = L.marker({
      lat: lat,
      lng: lng,
    },
    {
      icon: pinIcon,
    });

    marker
      .addTo(markerGroup)
      .bindPopup(
        generateMarkupCard(point),
        {
          keepInView: true,
        },
      );
  });
};

export {addCard};
