// Более удобный и линейный спсоб записи асинхронных функций
// не нужно цепочти промисов с коллбэками внутри них


async function getProducts () {
    const productsResponse = await fetch('https://dummyjson.com/products/');
    const { products } = await productsResponse.json();                      //деструктуризация, тк это объект, в кот есть ключ products
    console.log(products);

    const productResponse = await fetch('https://dummyjson.com/products/' + products[0].id);
    const product = await productResponse.json();
    console.log(product);
}
getProducts();

// try catch - обработка ошибок
// ______________________________

// можно было бы сделать так:

// getProducts()
//     .catch(() => {});   но так лучше не делать


async function getProducts2 () {
    try {
        const productsResponse = await fetch('https://dummyjson.com/products/');
        if(!productsResponse.ok) {
            throw new Error(productsResponse.status)
        }
        const { products } = await productsResponse.json();                      //деструктуризация, тк это объект, в кот есть ключ products
        console.log(products);

        const productResponse = await fetch('https://dummyjson.com/products/' + products[0].id);
        if(!productResponse.status > 400) {
            throw new Error(productResponse.status)
        }
        const product = await productResponse.json();
        console.log(product);
    } catch (e) {
        console.error(e);

    } finally {
        console.log('finally end!')
    }
}
getProducts2();
console.log('End');

// try-catch работает не только с промисами, но и с обычными функциями

// try {
//     const a = 1;
//     a = 2
//  } catch(e) {       //если не было бы catch, то необработанное исключение остановило бы дальнейшее выполнение вышестоящ асинхронки
//     console.error(e);       // сработает строка 57 вывод в консоль ошибки
// }



//Упражнение 
// получить геолокаццию 
// и определить город по  https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=00&longitude=00

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

async function success(pos) {
    try {
        const coords = pos.coords;
        console.log('Ваше текущее местоположение:');
        console.log(`Широта: ${coords.latitude}`);
        console.log(`Долгота: ${coords.longitude}`);
        const crdResponse = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${Math.floor(coords.latitude)}&longitude=${Math.floor(coords.longitude)}`);
        const crd = await crdResponse.json();
        console.log( `Вы находитесь в ${crd.principalSubdivision}, ${crd.countryCode}`);
    } catch(e) {
        console.error(e);

    }
};
  
navigator.geolocation.getCurrentPosition(success, error);



