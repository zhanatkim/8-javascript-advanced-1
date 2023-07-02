
//Функция - конструктор не мб записана как стрелочная

const User = function (email, password) {
    this.email = email;
    this.password = password + '$$$';
}

const user1 = new User('a@g', '123');
console.dir(user1);
console.log(user1 instanceof User);

//prototype, является прототипом для каждого инстанса, а не конструктора


const Book = function(title, author) {
  this.title = title;
  this.author = author;
  this.isRead = false;
}

Book.prototype.read = function() {
    this.isRead = true;
}

const lordOfTheRings = new Book('Lord of the rings', 'Tolkien');
lordOfTheRings.read();
console.log(lordOfTheRings);
// Book {title: 'Lord of the rings', author: 'Tolkien', isRead: true}
// author: "Tolkien"
// isRead: true
// title: "Lord of the rings"
// [[Prototype]]: Object


//для вывода прототипа в консоль: __proto__

console.log(lordOfTheRings.__proto__);
//{read: ƒ, constructor: ƒ}


// корзина товаров
const product1 = {id: 1, name: 'Bread', count: 1};

const Cart = function() {
    this.products = [];
}

Cart.prototype.addProduct = function(product) {
    if(this.products.find(product => product.id === product.id)) {
        return;
    }
    this.products.push(product);
}

Cart.prototype.increaseSum = function(id) {
    this.products.map(product => {
        if(product.id === id) {
            product.count++;
            return product;
        }
        return product;
    }) 
}

Cart.prototype.decreaseSum = function(id) {
    this.products = this.products
        .map(product => {
            if(product.id === id) {
                product.count--;
                return product;
            }
            return product;
        })
        .filter(product => product.count > 0);
}

const cart = new Cart();
console.log(cart);
cart.addProduct(product1);
console.log(cart);
cart.increaseSum(1);
console.log(cart);
cart.decreaseSum(1);
console.log(cart);
cart.decreaseSum(1);
console.log(cart);

//Цепочка прототипов. У прототипа функции конструктора есть свой прототип, это можно проверить:


console.log(Cart.prototype.__proto__);

// {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
// constructor: ƒ Object()
// hasOwnProperty: ƒ hasOwnProperty()
// isPrototypeOf: ƒ isPrototypeOf()
// и т д Это методы объекта. То есть  у Cart.prototype прототипом является Object.prototype


//Наследование
// ________________

// На практике этот способ не используется, чаще для этого используют классы ЕС6

const Books = function(title, author) {
    this.title = title;
    this.author = author; 
}

Books.prototype.buy = function() {
    console.log('Buy!');
}


const Audiobooks = function(title, author, lengthMin) {
    Books.call(this, title, author);
    this.lengthMin = lengthMin; 
}

Audiobooks.prototype = Object.create(Books.prototype);
//_________________________________
Audiobooks.prototype.constructor = Audiobooks;
//___________________________________________

Audiobooks.prototype.log = function() {
    console.log(`${this.title} - ${this.lengthMin}`);
}


const idiot = new Audiobooks('idiot', 'Dostoevsky', 2000);
console.log(idiot);

// Audiobooks {title: 'idiot', author: 'Dostoevsky', lengthMin: 2000}

idiot.log();
// idiot - 2000

idiot.buy();  

// Buy!


console.log(idiot instanceof Audiobooks);
// true

console.log(idiot instanceof Books);   // Наследование

// true