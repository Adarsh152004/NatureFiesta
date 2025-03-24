/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { setupEventListeners } from './clickHack.js';

// Call the function to attach event listeners
setupEventListeners();

//DOM ELEMENTS
const loginForm = document.querySelector('.form');
const logOutBtn = document.querySelector('.user-logged-in');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}
