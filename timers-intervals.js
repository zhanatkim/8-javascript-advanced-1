
//setInterval - устанавливает выполнение функции коллбэка через определенный интервал:

//setTimeout() - устанавливает задержку выполнения функции на определенное время

// const interval = setInterval(() => {
//     console.log(new Date());
// }, 1000);

// setTimeout(() => {
//     clearInterval(interval);
// }, 5000);

//Sun Apr 30 2023 22:28:55 GMT+0600 (Восточный Казахстан)
// Sun Apr 30 2023 22:28:56 GMT+0600 (Восточный Казахстан)
// Sun Apr 30 2023 22:28:57 GMT+0600 (Восточный Казахстан)
// Sun Apr 30 2023 22:28:58 GMT+0600 (Восточный Казахстан)
// Sun Apr 30 2023 22:28:59 GMT+0600 (Восточный Казахстан)

//вывод в консоль 5 раз, тк через 5000 удалется интервал с помощью метода clearInterval();


//Таймер пиццы
// время на готовку 5 секунд, по истечении вывод: Пицца готова!

const option = {
    minute: 'numeric',
    second: 'numeric'
};
// let datePizza = new Date(2000, 1, 1, 0, 0, 5);
// const intPizza = setInterval(() => {
//     console.log(new Intl.DateTimeFormat('ru-RU', option).format(datePizza));
//     const int = new Date(2000, 1, 1, 0, 0, 1);
//     datePizza = +datePizza + 100 - +int;
// }, 1000);

// const finishPizza = setTimeout(() => {
//     clearInterval(intPizza);
//     console.log('Пицца готова!');
// }, 5000);


const makePizza = (ms) => {
    const end = new Date().getTime() + ms;
    const int = setInterval(() => {
      console.log(
        new Intl.DateTimeFormat('ru-RU', option)
        .format(end + 100 - new Date())
      );
    }, 1000);
    setTimeout(() => {
        clearInterval(int);
        console.log('Пицца готова!');
    }, ms);
};

makePizza(5000);
