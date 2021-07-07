'use strict';

const headerCityButton = document.querySelector('.header__city-button');
headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город?';

// Блокировка скролла
const disableScroll = () => {
    //document.body.style.overflow = 'hidden';
    document.body.dbScrollY = window.scrollY;
    const scrollWidth = window.innerWidth - document.body.offsetWidth;
    document.body.style.cssText = `
        overflow: hidden;
        padding-right: ${scrollWidth}px; 
        /* cross-browser support*/
        position: fixed;
        width: 100%;
        height: 100vh;
        left: 0;
        top: ${-window.scrollY}px;
    `;
};

const enableScroll = () => {
    document.body.style.cssText = '';
    window.scroll(
        {
            top: document.body.dbScrollY
        }
    );
};

// Модальное окно
const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const cartModalOpen = () => {
    cartOverlay.classList.add('cart-overlay-open');
    disableScroll();
}  

const cartModalClose = () => {
    cartOverlay.classList.remove('cart-overlay-open');
    enableScroll();
}

// Запрос базы данных
const getData = async (source) => {
    const data = await fetch(source);
    if (data.ok) {
        return data.json();
    } else {
        throw new Error(`Данные не были получены, ошибка ${data.status} ${data.statusText}`);
    }
};

const getGoods = (callback) => {
    getData('db.json')
        .then(data => {
            callback(data);
        })
        .catch(err => {
            console.error(err);
        });
};

// Event Listeners
headerCityButton.addEventListener('click', () => {
    const city = prompt('Укажите ваш город').trim() || 'Ваш город?';
    headerCityButton.textContent = city;
    localStorage.setItem('lomoda-location',city);    
});

subheaderCart.addEventListener('click', cartModalOpen);

cartOverlay.addEventListener('click', event => {
    const target = event.target;
    //console.dir(target.classList);
    //if (target.classList.contains('cart__btn-close') || target.classList.contains('cart-overlay')) {
    if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
        cartModalClose();
    }
});

document.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
        cartModalClose();
    }
});

// Вызовы
getGoods((data) => {
    console.warn(data);
});
