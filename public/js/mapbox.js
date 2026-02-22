/* eslint-disable */

console.log('Hello from the client side');

const locations = JSON.parse(document.getElementById('map').dataset.locations);

console.log(locations);

if (document.getElementById('map')) {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {
      lat: locations[0].coordinates[1],
      lng: locations[0].coordinates[0],
    },
  });

  locations.forEach((loc) => {
    new google.maps.Marker({
      position: {
        lat: loc.coordinates[1],
        lng: loc.coordinates[0],
      },
      map: map,
    });
  });
}