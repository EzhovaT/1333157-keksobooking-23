import {activatePage} from './form.js';
import {generateMarkupCard} from './generate-markup-cards.js';

const inputAdress = document.querySelector('#address');
const adForm = document.querySelector('.ad-form');
const adFormFields = Array.from(adForm.children);
const filtersForm = document.querySelector('.map__filters');
const filtersFormFieldsets = Array.from(filtersForm.children);

const STARTCOORDINATES = {
  lat: 35.6894,
  lng: 139.692,
};

const DECIMALPLACES = 5;

inputAdress.value = `${STARTCOORDINATES.lat.toFixed(DECIMALPLACES)}, ${STARTCOORDINATES.lng.toFixed(DECIMALPLACES)}`;

const addCard = (announcements) => {
  const mapCanvas = L.map('map-canvas')
    .on('load', () => {
      activatePage(filtersForm, filtersFormFieldsets);
      activatePage(adForm, adFormFields);
    })
    .setView({
      lat: STARTCOORDINATES.lat,
      lng: STARTCOORDINATES.lng,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(mapCanvas);

  const markerGroup = L.layerGroup().addTo(mapCanvas);

  const ICONSIZE = [40, 40];
  const ICONANCHOR = [20, 40];
  const ICONURL = 'img/pin.svg';
  const MAINICONSIZE = [52, 52];
  const MAINICONANCHOR = [26, 52];
  const MAINICONURL = 'img/main-pin.svg';

  const pinIcon = L.icon({
    iconUrl: ICONURL,
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
  });

  const mainPinIcon = L.icon({
    iconUrl: MAINICONURL,
    iconSize: MAINICONSIZE,
    iconAnchor: MAINICONANCHOR,
  });

  const mainPinMarker = L.marker(
    {
      lat: STARTCOORDINATES.lat,
      lng: STARTCOORDINATES.lng,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(mapCanvas);

  mainPinMarker.on('moveend', (evt) => {
    const lat = evt.target.getLatLng().lat.toFixed(DECIMALPLACES);
    const lng = evt.target.getLatLng().lng.toFixed(DECIMALPLACES);
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
