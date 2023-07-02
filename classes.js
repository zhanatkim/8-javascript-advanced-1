
// ES6 classes альтернатива конструктору ООП, лучше использовать классы для упрощения чтения, вместо конструктора
//схожий синтаксис с java, Csharp. Позволяет инкапсулировать код, не использовать прототипы


// Особенности классов
// ___________________________


// 1. Классы не поднимаются

// 2. Классы как и функции мб возвращены и переданы, тк по сути они я являются функциями

// 3. Тело класса всегда в строгом режиме, даже если не указан 'use strict'


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


class BookClass {
  isRead = false;

  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
  read() {
    this.isRead = true;  
  }
}
  
const lotr = new BookClass('lotr', 'Tolkien');
console.log(lotr);

//   BookClass {isRead: false, title: 'lotr', author: 'Tolkien'}

console.log(lotr.__proto__);

// {constructor: ƒ, read: ƒ}
// constructor: class BookClass
// read: ƒ read()
// [[Prototype]]: Object

console.log(lotr instanceof BookClass);
//true

lotr.read();
console.log(lotr);

//BookClass {isRead: true, title: 'lotr', author: 'Tolkien'}





// Setters & Getters
//___________________

// По сути это методы, замаскированные под свойства объекта

//В обьекте метод для определения просроченности задачи:
//_________


const task = {
    title: 'task1',
    dueTo: new Date('2023/01/01'),

    isOverDue() {
        return this.dueTo < new Date();
    }
}

console.log(task.isOverDue());

//true


// Вариант с gettings & settings:

//getter - позволяет получить какое то значение, 
// по сути это некоторое скрытие реализации получения данных. 
// Те мы обращаемся к методу не как к ффункции, а как к свойству

const taskA = {
    title: 'task1',
    dueTo: new Date('2023/01/01'),

    get isOverDue() {
        return this.dueTo < new Date();
    },

    set isOverDue(isOverDueTask) {
        if(!isOverDueTask) {
            this.dueTo = new Date();
        }
    }
}

console.log(task.isOverDue);
//                     _____
//true


//setter - позволяет установить какое то значение
// в отличие от get, у которого можно не указывать аргумент, set должен принимать одно значение, кот должно быть установлено

taskA.isOverDue = false;

console.log(taskA.dueTo);
// Mon May 01 2023 14:58:31 GMT+0600 (Восточный Казахстан)


// ПРобуем в классах:

class TaskClass {
    constructor(title, dueTo) {
       this.title = title;
       this.dueTo = dueTo;
    }
    get isOverDue() {
        return this.dueTo < new Date();
    }
}


const task2 = new TaskClass('task2', new Date());

console.log(task2.isOverDue);

//true


//ES6 Classes  Наследование
// _______________________________

class Books {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }

    buy() {
        console.log('Buy!');
    }

}

//Создадим новый класс по прототипу Books:

class Audiobooks extends Books {
    constructor(title, author, lengthMin) {
        super(title, author);
        this.lengthMin = lengthMin;
    }
    log() {
        console.log(`${this.title} - ${this.lengthMin}`);
    }
}

const idiot = new Audiobooks('idiot', 'Dostoevsky', 2000);
console.log(idiot);
idiot.log();
idiot.buy();

// Audiobooks {title: 'idiot', author: 'Dostoevsky', lengthMin: 2000}
// idiot - 2000
// Buy!



// Overwrite methods - перезаписывание методов
//_________________
//При создании класса на прототипе другого, 
// можно не заводить новые методы взамен недостаточного существующего, а перезаписать его с учетом новых данных:
//При этом  изменять сильно метод или свойство нельзя, если метод возвращает строку, то так он и должен делать после перезаписывания, 
// принцип Лисков в SOLID. Исключение - приватные свойства. То есть обезопасить, чтобы к этому свойству не обращались
// не работает с приватными свойствами
class BooksA {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }

    info() {
        console.log(`${this.title} - ${this.author}`);
    }

}

//Создадим новый класс по прототипу Books:

class AudiobooksA extends BooksA {
    constructor(title, author, lengthMin) {
        super(title, author);
        this.lengthMin = lengthMin;
    }

    info() {
        console.log(`${this.title} - ${this.author} - ${this.lengthMin}`);
    }
}

const idiotA = new AudiobooksA('idiot', 'Dostoevsky', 2000);
console.log(idiotA);

// AudiobooksA {title: 'idiot', author: 'Dostoevsky', lengthMin: 2000}

idiotA.info();

// idiot - Dostoevsky - 2000

const idiotB = new BooksA('idiot', 'Dostoevsky');
console.log(idiotB);

// BooksA {title: 'idiot', author: 'Dostoevsky'}

idiotB.info();

// idiot - Dostoevsky

// Упражнение
// Класс врага, у кот есть здоровье и метод, с помощью которого здоровье уменьшается
// Класс меча, который имеет силу и метод нанесения урона , то есть вызывает метод врага
// Класс орка, который является подтипом класса врага, и у него метод урона вызывается только в 50% случаев

class Enemy {
    constructor(health) {
        this.health = health;
    }

    recieveDamage(damage) {
        this.health = this.health - damage;
        if(this.health <= 0) {
            console.log('Враг побежден!')
        }
        console.log(this.health);
    }
}

class Orgh extends Enemy {
    constructor(health) {
         super(health);
    }

    recieveDamage(damage) {
        if(Math.random() > 0.5) {
            this.health = this.health - damage;
        }
        if(this.health <= 0) {
            console.log('Враг побежден!')
        }
        console.log(this.health);
    } 
}

class Sword {
    constructor(power) {
        this.power = power;
    }

    hit(enemy) {
        enemy.recieveDamage(this.power);
    }
}

const enemy = new Enemy(10);
const sword = new Sword(3);
const orgh = new Orgh(10);
// sword.hit(orgh);
// sword.hit(orgh);
// sword.hit(orgh);
// sword.hit(orgh);
// sword.hit(orgh);
// sword.hit(orgh);


// Полиморфизм. ВИды:
// ___________________
// 1. Ad-hock - полиморфизм - промер: это различие между строкой '1' и цифрой 1
// 2. Параметрический полиморфизм - функции выполняются, независимо от типа параметров
// 3. Полиморфизм подтипов (вариант ООП)

// Например. Создадим тролля - новый подтип врагаб у которого в теле вообще ничего:


class Troll extends Enemy {
    
}
const troll = new Troll(20);

sword.hit(troll);
sword.hit(troll);
sword.hit(troll);
sword.hit(troll);
sword.hit(troll);
sword.hit(troll);
sword.hit(troll);
//Выполняться будет код по строке 253 у класса Enemy

// Полиморфизм предполалает, что мы можем ориентироваться на некий
//  "интерфейс" класса, и подтип, созданный на этом классе имеет его свойства



// Builder  и паттерн цепочки(chaining)
// _________________________________________


// chaining - синтаксис например, методы массовов записаны друг за другом или fetch()


class Wallet {
    balance = 0;
    add(sum) {
        this.balance += sum;
        return this;
    }
    delete(sum) {
        this.balance -= sum;
        return this;
    }
}

const wallet = new Wallet();
wallet
    .add(100)
    .delete(50)
    .add(100)
    .delete(50)
    .delete(10);
console.log(wallet);
// Wallet {balance: 90}


// Без return this работать не будет, так как 
// после первого вызова метода адд, не происходит возврата результата функции - метода адд()


// Таким образом работает Builder, то есть последовательно ваызваются методы класса, в цепочку.
// Построим дом:

class Builder {
    house = {};

    addRoof () {
        this.house.roof = 'Roof';
        return this;
    }
    addWalls () {
        this.house.walls = 'Walls';
        return this;
    }

    addFloor() {
        this.house.floor= 'Floor';
        return this;
    }
    execute() {
        return this.house;
    }
}

const building = new Builder().addFloor().addWalls().addRoof().execute();
console.log(building);
// {floor: 'Floor', walls: 'Walls', roof: 'Roof'}


// Фактически мы построили объект на основании готовых заготовок
// Такой билдер используют чтобы построить тестер, сложный объект на основании простых и др