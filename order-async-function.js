// Порядок выполнения асинхронных и других функций в массе
// ___________________________________________________________


const asyncArrow = async () => {
    const response = await fetch('https://dummyjson.com/products');
    console.log(await response.json());
}
console.log('1');
asyncArrow();
console.log('2');

//1
// 2
// {products: Array(30), total: 100, skip: 0, limit: 30}


// Асинх функция всегда будет после простых функций выполняться
// Можно изменить так:


const asyncArrow2 = async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
}
console.log('1');
asyncArrow2()
    .then((data) => console.log(data))
    .finally (() => console.log('2'));

// Но это нехорошая практика, тк 
// миксовать промисы с async-await не очень

const asyncArrow3 = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        return data;

    } catch (e) {
        console.error(e);
        throw e;            //бросаем ошибку, чтобы передать ее дальше, например, чтобы вызвать модалку
    }
}

// Далее создаем новую анонимную асинх функцию, где пропишем порядок вызова в консоль и сразу ее вызовем:

(async () => {

    try {
        console.log('1');
        const res = await asyncArrow3();
        console.log(res);
        console.log('2');
    } catch (e) {
        console.error(e);
    }
})();



// Параллельное выполнение функций
// _______________________________


const getAllProducts = async () => {
    const response = await fetch('https://dummyjson.com/products');
    return response.json();
};

const getProduct = async (id) => {
    const response = await fetch('https://dummyjson.com/products/' + id);
    return response.json();
}

const getProductError = async () => {
    const response = await fetch('https://dummyjsonsssss.com/products/' + id);
    return response.json();

}
// async function main () {
//     const { products } = await getAllProducts(); //деструктуризация тк ответ содержит обьект с ключом products
//     for (const product of products) {
//         const res = await getProduct(product.id);
//         console.log(res);
//     }
// }

// main();

// Эта последовательность функций запустит цикл, который будет выполняться последовательно
// продукт за продуктом. Займет прилично времени


// Чтобы запустить одновременное выполнение (параллельное):
// ____________________________________________

// const res = await Promise.all([
//     getProduct(1);
//     getProduct(2);
//     getProduct(3);
// ]);                - резолвит все одновременно(ограничено только пропускной способностью)

// Если один из запросов упадет, упадут все, то есть, не выполнятся все запросы
// Когда использовать? когда нужно получить все запросы сразу, и если что то пошло не так
// то просить перезапустить все запросы(например загрузить карточки товаров)


// Promise.allSettled() - зарезолвит одновременно все запросы, и те
// которые реджекнуты. Ответы будут сложно вложенными обьектами.

// Promise.race() - зарезолвит самый первый загруженный обьект( гонка),
//  неважно резолв или реджект



async function main2 () {
    const { products } = await getAllProducts();
    const res = await Promise.all(products.map((product) => getProduct(product.id)));
    const res2 = await Promise.allSettled(products.map((product) => getProductError(product.id)));
    const res3 = await Promise.race(products.map((product) => getProduct(product.id)));
    console.log(res);
    console.log(res2);
    console.log(res3);
}
main2();

// Promise.allSettled() - зарезолвит одновременно все запросы, и те
// которые реджекнуты. Ответы будут сложно вложенными обьектами:

// {status: 'rejected', reason: ReferenceError: id is not defined at getProductError (http://127.0.0.1:5501/order-async-functio…}
//          -----------

// Promise.race() - зарезолвит самый первый загруженный обьект( гонка),
//  неважно резолв или реджект:

// {id: 1, title: 'iPhone 9', description: 'An apple mobile which is nothing like apple', price: 549, discountPercentage: 12.96, …}



// Упражнение

// Отрисовать кнопку, после нажатия открываются три карточки, 
// созданные после запроса на сервер https://www.boredapi.com/api/activity

const getCard = async () => {
    const res = await fetch('https://www.boredapi.com/api/activity');
    const data = res.json();
    console.log(data);
    return data;
}
getCard();


