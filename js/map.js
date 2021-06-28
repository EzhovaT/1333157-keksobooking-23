import {activatingPage} from './form.js';
import {generateMarkupCards} from './generate-markup-cards.js';

const inputAdress = document.querySelector('#address');
const adForm = document.querySelector('.ad-form');
const adFormFields = Array.from(adForm.children);
const filtersForm = document.querySelector('.map__filters');
const filtersFormFieldsets = Array.from(filtersForm.children);

const addCard = (announcements) => {
  const mapCanvas = L.map('map-canvas')
    .on('load', () => {
      activatingPage(filtersForm, filtersFormFieldsets);
      activatingPage(adForm, adFormFields);
    })
    .setView({
      lat: 35.6894,
      lng: 139.692,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(mapCanvas);

  const markerGroup = L.layerGroup().addTo(mapCanvas);

  const pinIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    {
      lat: 35.6894,
      lng: 139.692,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(mapCanvas);

  mainPinMarker.on('moveend', (evt) => {
    inputAdress.value = evt.target.getLatLng();
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
        generateMarkupCards(point),
        {
          keepInView: true,
        },
      );
  });
};

export {addCard};
