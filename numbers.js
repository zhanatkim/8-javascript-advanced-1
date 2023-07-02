const getRandomInt = (min, max) => {
  const randomInt = Math.floor(Math.random()* (max - min + 1) + min);
  // console.log(randomInt);
};

getRandomInt(1, 20);


//Интернализация чисел: Валюта, проценты, градусы и др
const initialCurrency = document.querySelector('.initial-currency');
const convertCurrency = document.querySelector('.convert-currency');
const inputSum = document.querySelector('.amount')
const convertedSum = document.querySelector('.converted-sum');
const button = document.querySelector('.submit-button');
// const optionRub = {
//   style: 'currency',
//   currency: 'RUB'
// }

// const optionUsd = {
//   style: 'currency',
//   currency: 'USD'
// }

// const optionKzt = {
//   style: 'currency',
//   currency: 'KZT'
// }

// console.log(new Intl.NumberFormat('ru-RU', optionRub).format(23000));
// console.log(new Intl.NumberFormat('en-EN', optionUsd).format(5000));
// console.log(new Intl.NumberFormat('ru-RU', optionKzt).format(30000));


// 23 000,00 ₽
// $5,000.00
// 30 000,00 KZT


// Конвертация валюты
//3 валюты, с коэффициентом

const allCurrensies = [
  {
    name: 'KZT',
    ratio: 1
  },
  {
    name: 'USD',
    ratio: 500
  },
  {
    name: 'RUB',
    ratio: 5
  }

];


initialCurrency.onchange = function init () {
    let item = initialCurrency.value;
    console.log(item);
    return item;
}

convertCurrency.onchange = function conv () {
  let item = convertCurrency.value;
  console.log(item);
  return item;
}


// const initTextCurrency = initialCurrency.options[initialCurrency.selectedIndex].textContent;
// const convertTextCurrency = convertCurrency.options[convertCurrency.selectedIndex].textContent;
console.log(inputSum.value);
const getConvertedSum = () => {
  const initial = allCurrensies.find((el) => el.name === init());
  const converted = allCurrensies.find((el) => el.name === conv());
  // if (convertTextCurrency === 'USD') {
  //   return new Intl.NumberFormat('en-EN', {style: 'currency',
  // currency: convertCurrency.value}).format(Number(inputSum.value) * initial.ratio / converted.ratio);
  // }
  return new Intl.NumberFormat('ru-RU', {style: 'currency',
  currency: convertTextCurrency}).format(Number(inputSum.value) * initial.ratio / converted.ratio);
};

button.addEventListener('submit', (evt) => {
  evt.preventDefault();
  console.log(initTextCurrency);
  console.log(convertTextCurrency);
  console.log(getConvertedSum());
  convertedSum.textContent = getConvertedSum();
})

