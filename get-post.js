//dummyjson.com - бесплатная песочница 

// XMLHttpRequest() - старый метод для отправки/запроса данных на сервер
// _________________________________________________________________


const makeRequest  = function (id) {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://dummyjson.com/products/' + id);  //открывается запрос
    request.send();                                           //отправляется запрос

    // request.addEventListener('load', function() {             //обработка ответа, важно функция нестрелочная
    //     console.log(this.responseText);
    // });


    // ответ с сервера:

    // {"id":1,"title":"iPhone 9","description":"An apple mobile which is nothing like apple",
    // "price":549,"discountPercentage":12.96,"rating":4.69,"stock":94,"brand":"Apple","category":"smartphones",
    // "thumbnail":"https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    // "images":["https://i.dummyjson.com/data/products/1/1.jpg",
    // "https://i.dummyjson.com/data/products/1/2.jpg",
    // "https://i.dummyjson.com/data/products/1/3.jpg",
    // "https://i.dummyjson.com/data/products/1/4.jpg",
    // "https://i.dummyjson.com/data/products/1/thumbnail.jpg"]}

    request.addEventListener('load', function() {  
        const data =  JSON.parse(this.responseText);          //обработка ответа с помощью JSON.parse()
        return data;
    });
}

makeRequest(1);

makeRequest('');

makeRequest(2);

// ответ с сервера:


// {id: 1, title: 'iPhone 9', description: 'An apple mobile which is nothing like apple', 
// price: 549, discountPercentage: 12.96, …}

// {id: 2, title: 'iPhone X', description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD 
// di…lay with OLED technology A12 Bionic chip with ...', price: 899, discountPercentage: 17.94, …}

// {products: Array(30), total: 100, skip: 0, limit: 30}   //makeRequest('');



//makeRequest(''); выполнится позже, тк требуется больше времени на получение всего массива




// Упражнение
// получить среднюю цену 30ти товаров на сервере https://dummyjson.com/data/products


const newRequest  = function () {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://dummyjson.com/products/'); 
    request.send(); 
    request.addEventListener('load', function() {  
        const data =  JSON.parse(this.responseText).products; 
        const prices = data.map((item) => item.price);
        const medPrice = prices.reduce((acc, item) => acc += item, 0) / prices.length;
        console.log(`Средняя цена товаров ${medPrice} долл` );
    });
}   
newRequest();

// const array = Request();
// console.log(array);
// const prices = array.map((item) => item.price);
// console.log(prices);



// Упражнение

// Создать селект с опциями из категорий, полученных с сервера

// Мой вариант

 


// Вариант лектора
// в index.html  создается див с классом фильтр

const createSelect = (array) => {
    const el = document.querySelector('.filter');
    el.innerHTML = `<select>
    ${array.map(arrEl => `<option value=${arrEl}>${arrEl}
    </option>`)}
    </select>`
};

function showError (response) {
    if (!response.ok) {
        throw new Error (`Ошибка сервера ${response.status}`)
    }
}

function getCategories() {
    fetch('https://dummyjson.com/products/categories')
.then(response => {
    showError(response);
    response.json()
})
.then(data => {
    createSelect(data);
})
.catch(error => console.error(`Ошибка: ${error}`));
}

getCategories();