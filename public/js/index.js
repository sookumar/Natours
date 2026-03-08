/* eslint-disable*/

import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login } from './login';

// DOM ELEMENTS
const map = document.getElementById('map');

// DELEGATION
if (map) {
  const locations = JSON.parse(map.dataset.locations);
  console.log(locations);
  displayMap(locations);
}

const loginForm = document.querySelector('.form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
