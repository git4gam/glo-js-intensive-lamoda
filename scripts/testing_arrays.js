'use strict';
//https://youtu.be/NF6DV-S9DEE
const ver = window.navigator.appVersion.match(/.*Chrome\/([0-9\.]+)/);
console.log(ver);

// proccess data
const practice = (data) => {
  //console.log(data);
  const forEachItemsProp = [];
  data.forEach((item) => forEachItemsProp.push(item.name));
  console.log('forEachItemsProp: ', forEachItemsProp);

  const mapItemsProp = data.map((item) => item.name);
  console.log('mapItemsProp: ', mapItemsProp);

  const mapItemsProps = data.map((item) => ({
    name: item.name,
    brand: item.brand,
    cost: item.cost,
  }));
  console.log('mapItemsProps: ', mapItemsProps);

  const mapItemsProps2 = data.map(({ name, brand, cost }) => ({
    name,
    brand,
    cost,
  }));
  console.log('mapItemsProps2: ', mapItemsProps2);

  const filterItemsByBrand = data.filter((item) => item.brand === 'Dali');
  console.log('filterItemsByBrand: ', filterItemsByBrand);

  const someItemByBrand = data.some((item) => item.brand === 'Dali');
  console.log('someItemByBrand: ', someItemByBrand);

  const findItemByBrand = data.find((item) => item.brand === 'Dali');
  console.log('findItemByBrand: ', findItemByBrand);

  const everyItemHasProp = data.every((item) => item.sizes);
  console.log('everyItemHasProp: ', everyItemHasProp);

  const filterItemWithoutProp = data.filter((item) => !item.sizes);
  console.log('filterItemWithNoProp: ', filterItemWithoutProp);

  const reduceItemsProps = data.reduce(
    (accum, item) => accum.concat(item.name),
    []
  );
  console.log('reduceItemsProps: ', reduceItemsProps);

  const uniqueReduceItemsProps = reduceItemsProps.filter(
    (item, index) => reduceItemsProps.indexOf(item) === index && item
  );
  console.log('uniqueReduceItemsProps: ', uniqueReduceItemsProps);

  const sortUniqueReduceItemsProps = uniqueReduceItemsProps.sort();
  console.log('sortUniqueReduceItemsProps: ', sortUniqueReduceItemsProps);
};

// get data
fetch('./db.json')
  .then((response) => response.json())
  .then((data) => practice(data))
  .catch((err) => console.error(err));
