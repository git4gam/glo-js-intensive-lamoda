'use strict';

const headerCityButton = document.querySelector('button.header__city-button');

headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город?';

headerCityButton.addEventListener('click', () => {
    const city = prompt('Укажите ваш город').trim() || 'Ваш город?';
    headerCityButton.textContent = city;
    localStorage.setItem('lomoda-location',city);    
});



