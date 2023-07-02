// Solid - принципы, которые лежат в основании дизайна и проектирования приложений в ООП
// Принципы для построения классов:

// 1) S - single responsibility principal  - класс должен выполнять одну функцию
// 2) o - принцип открытости и закрытости - класс должен быть открыт к дополнению, но закрыт для модификации
// 3) l - принцип подстановки Барбары Лисков - если взять частный класс(подтип) и им заменить общий класс, 
//        то приложение не должно сломаться
// 4) i - принцип разделения интерфейса - как в функциях, лучше разделить класс на части
//        (несколько классов), если слишком большой
// 5) d - Принцип инверсии зависимостей - Нужно опираться на абстаркции, а не на конкретные реализации. 
//        Высшие модули не должны зависеть от низших

 

// 2) Пример:
class User {
    #role = 'user';

    getRole() {
        return this.#role;
    }
}


class Admin {
    #role = ['user', 'admin'];

    getRole() {
        return this.#role.join(',');
    }
}


function logRole(user) {
    console.log('User:' + user.getRole().toUpperCase());
}
logRole(new User());
// User:USER

logRole(new Admin());
// Ошибка, так как метод toUpperCase() не сработает с массивом

// Добавив .join(','), избавились от ошибки:
// User:USER,ADMIN


// 4) 
// ______

// class Weapon {
//     strike() {
//         //удар
//     }
//     shoot() {
//         // выстрел
//     }
// }

// class Rifle extends Weapon {
//     strike() {
//         //удар
//         // Возможно, но неэффективно
//     }
//     shoot() {
//         // выстрел
//         // Супер!
//     }
// }

// class Sword extends Weapon {
//     strike() {
//         //удар
//         // эффективно  и единсмтвенный вариант
//     }
//     shoot() {
//         // выстрел
//         // Невозможно
//     }
// }

// В изначанльный класс Weapon не нужно добавлять свойства и методы, которые не нужны в его подтипах.
// Правильно:

class Weapon {
    cost;
    //добавлять только те методы, которые нужны для всех подтипов

    dealDamage() {

    }



}

class Rifle extends Weapon {
    shoot() {
        this.dealDamage();
        // выстрел
        // Супер!
    }
}

class Sword extends Weapon {
    strike() {
        this.dealDamage();
        //удар
        // эффективно  и единсмтвенный вариант
    }
}


// 5)
// ____

//Реализуем процесс сохранения в Базу данных:

// class Db {
//     save(items) {
//         console.log(`Saved ${items}`)
//     }

// }

// class ToDoList {
//     items = [1,2,3];
//     db = new Db();

//     saveToDb() {
//         this.db.save(this.items);
//     }
// }

// const list = new ToDoList();

// list.saveToDb();
// //Saved 1,2,3    -  код рабочий, но нарушен принцип D |SOLID|
// // ToDoList зависит от совершенно другого по типу интерфейса класса  Db 

// Правильный вариант:


class Db {
    save(items) {
        console.log(`Saved: ${items}`)
    }
}

class MongoDb {
    save(items) {
        console.log(`Saved to Mongo: ${items}`)
    }
}


class ToDoList {
    items = [1,2,3];
    dataBase;
    constructor(db) {
        this.dataBase = db;
    }

    saveToDb() {
        this.dataBase.save(this.items);
    }
}

const list = new ToDoList(new Db());
const anotherList = new ToDoList(new MongoDb());

list.saveToDb();
// Saved: 1,2,3

anotherList.saveToDb();

// Saved to Mongo: 1,2,3

// таким образом, ToDoList не зависит от других классов

