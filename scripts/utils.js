function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function findElementWithSameData(arr, element, key) {
  let result = arr.find((i) => i.dataset[key] === element.dataset[key]);
  return result;
}

export { getRandomInt, findElementWithSameData };
