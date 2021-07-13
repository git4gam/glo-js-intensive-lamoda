'use strict';
//https://youtu.be/NF6DV-S9DEE

// proccess data
const practice = (data) => {
  //console.log(data);
  const allNames = [];
  data.forEach((item) => allNames.push(item.name));
  console.log('allNames: ', allNames);

  const allNames2 = data.map((item) => item.name);
  console.log('allNames2: ', allNames2);

  const allSelectedProps = data.map((item) => ({
    name: item.name,
    brand: item.brand,
    cost: item.cost,
  }));
  console.log('allSelectedProps: ', allSelectedProps);

  const allSelectedProps2 = data.map(({ name, brand, cost }) => ({
    name,
    brand,
    cost,
  }));
  console.log('allSelectedProps2: ', allSelectedProps2);

  const filteredGoods = data.filter((item) => item.brand === 'Dali');
  console.log('filteredGoods: ', filteredGoods);

  const someItemByBrand = data.some((item) => item.brand === 'Dali');
  console.log('someItemByBrand: ', someItemByBrand);

  const findItemByBrand = data.find((item) => item.brand === 'Dali');
  console.log('findItemByBrand: ', findItemByBrand);
};

// get data
fetch('./db.json')
  .then((response) => response.json())
  .then((data) => practice(data))
  .catch((err) => console.error(err));
