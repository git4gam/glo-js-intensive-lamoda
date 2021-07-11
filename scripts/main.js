'use strict';

let hash = location.hash.substring(1);

const headerCityButton = document.querySelector('.header__city-button');
headerCityButton.textContent =
  localStorage.getItem('lomoda-location') || 'Ваш город?';

// Работа с корзиной
const getLocalStorage = (key = 'cart-lomoda') =>
  JSON?.parse(localStorage.getItem(key)) || [];
const setLocalStorage = (value, key = 'cart-lomoda') =>
  localStorage.setItem(key, JSON.stringify(value));

const cartListGoods = document.querySelector('.cart__list-goods');
const cartTotalCost = document.querySelector('.cart__total-cost');

const renderCart = () => {
  cartListGoods.textContent = '';
  let totalPrice = 0;
  const cartItems = getLocalStorage();
  cartItems.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.brand} ${item.title}</td>
      ${item.color ? `<td>${item.color}</td>` : `<td>-</td>`}
      ${item.size ? `<td>${item.size}</td>` : `<td>-</td>`}
      <td>${item.cost} &#8381;</td>
      <td><button class="btn-delete" data-id="${item.id}">&times;</button></td>
    `;
    totalPrice += item.cost;
    cartListGoods.append(tr);
  });
  cartTotalCost.textContent = totalPrice + '  ₽';
};

const deleteItemCart = (id) => {
  const cartItems = getLocalStorage();
  const newCartItems = cartItems.filter((item) => item.id !== id);
  setLocalStorage(newCartItems);
};

cartListGoods.addEventListener('click', (event) => {
  if (event.target.matches('.btn-delete')) {
    deleteItemCart(event.target.dataset.id);
    renderCart();
  }
});

// Блокировка скролла
const disableScroll = () => {
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
  window.scroll({
    top: document.body.dbScrollY,
  });
};

// Модальное окно
const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const cartModalOpen = () => {
  cartOverlay.classList.add('cart-overlay-open');
  disableScroll();
  renderCart();
};

const cartModalClose = () => {
  cartOverlay.classList.remove('cart-overlay-open');
  enableScroll();
};

// Вывод имени категории
const goodsTitle = document.querySelector('.goods__title');
const changeTitle = () => {
  goodsTitle.textContent = document.querySelector(
    `[href*="#${hash}"]`
  ).textContent;
};

// Запрос базы данных
const getData = async (source) => {
  const data = await fetch(source);
  if (data.ok) {
    return data.json();
  } else {
    throw new Error(
      `Данные не были получены, ошибка ${data.status} ${data.statusText}`
    );
  }
};

const getGoods = (callback, prop, value) => {
  getData('db.json')
    .then((data) => {
      if (value) {
        callback(data.filter((item) => item[prop] === value));
      } else {
        callback(data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

// Event Listeners
headerCityButton.addEventListener('click', () => {
  const city = prompt('Укажите ваш город').trim() || 'Ваш город?';
  headerCityButton.textContent = city;
  localStorage.setItem('lomoda-location', city);
});

subheaderCart.addEventListener('click', cartModalOpen);

cartOverlay.addEventListener('click', (event) => {
  const target = event.target;
  if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
    cartModalClose();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'Escape') {
    cartModalClose();
  }
});

// Страница категорий товаров
try {
  const goodsList = document.querySelector('.goods__list');
  if (!goodsList) {
    throw 'This is not a goods page!';
  }

  const createCard = ({ id, preview, name: title, cost, brand, sizes }) => {
    const li = document.createElement('li');
    li.classList.add('goods__item');

    li.innerHTML = `
            <article class="good">
                <a class="good__link-img" href="card-good.html#${id}">
                    <img class="good__img" src="goods-image/${preview}" alt="${title}">
                 </a>
                 <div class="good__description">
                    <p class="good__price">${cost} &#8381;</p>
                    <h3 class="good__title">${brand} <span class="good__title__grey">/ ${title} </span></h3>
                    ${
                      sizes
                        ? `
                    <p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(
                      ' '
                    )}</span></p>
                    `
                        : ''
                    }
                    <a class="good__link" href="card-good.html#${id}">Подробнее</a>
                 </div>
            </article>
        `;

    return li;
  };

  const renderGoodsList = (data) => {
    goodsList.textContent = '';
    data.forEach((item) => {
      const card = createCard(item);
      goodsList.append(card);
    });
  };

  window.addEventListener('hashchange', () => {
    hash = location.hash.substring(1);
    getGoods(renderGoodsList, 'category', hash);
    changeTitle();
  });

  getGoods(renderGoodsList, 'category', hash);
  changeTitle();
} catch (err) {
  console.warn(err);
}

// Страница товара
try {
  if (!document.querySelector('.card-good')) {
    throw 'This is not a card-good page!';
  }
  const cardGoodImage = document.querySelector('.card-good__image');
  const cardGoodBrand = document.querySelector('.card-good__brand');
  const cardGoodTitle = document.querySelector('.card-good__title');
  const cardGoodPrice = document.querySelector('.card-good__price');
  const cardGoodColor = document.querySelector('.card-good__color');
  const cardGoodColorList = document.querySelector('.card-good__color-list');
  const cardGoodSizes = document.querySelector('.card-good__sizes');
  const cardGoodSizesList = document.querySelector('.card-good__sizes-list');
  const cardGoodBuy = document.querySelector('.card-good__buy');
  const cardGoodSelectWrapper = document.querySelectorAll(
    '.card-good__select__wrapper'
  );

  const generateList = (data) =>
    data.reduce(
      (acc, item, index) =>
        acc +
        `<li class="card-good__select-item" data-id="${index}">${item}</li>`,
      ''
    );

  const renderCardGood = ([
    { id, photo, name: title, cost, brand, sizes, color },
  ]) => {
    const data = { brand, title, cost, id };
    cardGoodImage.src = `goods-image/${photo}`;
    cardGoodImage.alt = `${brand} ${title}`;
    cardGoodBrand.textContent = brand;
    cardGoodTitle.textContent = title;
    cardGoodPrice.innerHTML = `${cost} ₽`;
    if (sizes) {
      cardGoodSizes.textContent = sizes[0];
      cardGoodSizes.dataset.id = 0;
      cardGoodSizesList.innerHTML = generateList(sizes);
    } else {
      cardGoodSizes.style.display = 'none';
    }
    if (color) {
      cardGoodColor.textContent = color[0];
      cardGoodColor.dataset.id = 0;
      cardGoodColorList.innerHTML = generateList(color);
    } else {
      cardGoodColor.style.display = 'none';
    }

    cardGoodBuy.addEventListener('click', () => {
      if (color) data.color = cardGoodColor.textContent;
      if (sizes) data.size = cardGoodSizes.textContent;
      const cardData = getLocalStorage();
      cardData.push(data);
      setLocalStorage(cardData);
    });
  };

  cardGoodSelectWrapper.forEach((item) => {
    item.addEventListener('click', (event) => {
      const target = event.target;
      if (target.closest('.card-good__select')) {
        target.classList.toggle('card-good__select__open');
      }
      if (target.closest('.card-good__select-item')) {
        const cardGoodSelect = item.querySelector('.card-good__select');
        cardGoodSelect.classList.remove('card-good__select__open');
        cardGoodSelect.textContent = target.textContent;
        cardGoodSelect.dataset.id = target.dataset.id;
      }
    });
  });

  getGoods(renderCardGood, 'id', hash);
} catch (err) {
  console.warn(err);
}
