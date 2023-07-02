
//Даты можно задать строкой. неудобно, так как сложно оперировать и сравнивать
const now = new Date('2023.10.10')

//Даты можно задать числами. Месяцы считаются от 0, те декабрь - 11 мес

const tomorrow = new Date(2023, 9, 11);
const newnow = new Date(2023, 9, 10);

//.getTime() позволяет сравнивать даты, выдает time stamp - число миллисекунд от 01.01. 1970 года
console.log(newnow.getTime());
console.log(tomorrow.getTime());
console.log(newnow.getTime() === tomorrow.getTime());
//или
console.log(Number(newnow) === Number(tomorrow));

// 1696874400000
// 1696960800000
// false

// Отсчитывать кол-во дней с даты

console.log(new Date(2023, 9, 10 + 10));

//Tue Oct 20 2023 00:00:00 GMT+0600 (Восточный Казахстан)


//Date.now() - выдает тайм стэмп до настоящего момента

console.log(Date.now());
//1682866515026

console.log(new Date(Date.now()));
//Sun Apr 30 2023 20:55:47 GMT+0600 (Восточный Казахстан)

//Расчет числа дней между датами

console.log(tomorrow - newnow);
//86400000

//Для перевода в дни надо миллисекунды перевести в дни:
const getDays = () => {
    console.log((tomorrow - newnow) / (1000 * 60 * 60 * 24));
}
getDays();

//1

//Для подсчета числа месяцев лучше использовать библиотеки, тк в месяце мб 30/31/28/29 дней

// Задача: Функция сегодня ДР у Васи?
//.getMonth .getDate

const userVasya = {
    name: 'Vasya',
    birthday: '04/30/2023'
};


const checkBirthday = (user) => {
    const birthDay = new Date(user.birthday);
    const now = new Date();
    if(birthDay.getMonth() !== now.getMonth()) {
       console.log('ДР не сегодня');
    } else if(birthDay.getDate() !== now.getDate()) {
      console.log('ДР не сегодня');
      } else {
        console.log('У Васи сегодня ДР!');
      }

}
checkBirthday(userVasya);



//Интернационализация дат

const date = new Date();
console.log(date);

//Sun Apr 30 2023 21:26:32 GMT+0600 (Восточный Казахстан)

//ЧТобы убрать ненужные минуты и GMT:
console.log(new Intl.DateTimeFormat('ru-Ru').format(date));

//30.04.2023

//Опции для вывода дня недели, времени по жланию:
//_______________________________________________

const option1 = {
    hour: 'numeric',
    minute: 'numeric'
};

console.log(new Intl.DateTimeFormat('ru-RU', option1).format(date));
console.log(new Intl.DateTimeFormat('en-US', option1).format(date));

// 21:33
//9:33 PM

const option2 = {
    month: 'long',
    day: 'numeric',  
    year: '2-digit',
    weekday: 'short'
}
console.log(new Intl.DateTimeFormat('ru-RU', option2).format(date));
console.log(new Intl.DateTimeFormat('en-US', option2).format(date));


// вс, 30 апреля 23 г.
// Sun, April 30, 23


//local можно не вводить как 'ru-RU' или 'en-US',  а использовать язык  навигатора, на котором настроен браузер:
console.log(navigator.language);
console.log(new Intl.DateTimeFormat(navigator.language, option2).format(date));

// ru-RU
// вс, 30 апреля 23 г.
