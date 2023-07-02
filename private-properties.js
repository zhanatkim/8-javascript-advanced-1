
//Приватные поля, которые инкапсулируют свойства обьекта

class Car {
    #vinNumber = 98798789797;
    speed = '300 km/h'

    #changeVinNumber() {
        console.log('changed')
    }

    test() {
        this.#changeVinNumber();
    }
}

const car1 = new Car();
console.log(car1);

// Car {speed: '300 km/h', #vinNumber: 98798789797}


// console.log(car1.#vinNumber); //выделяется красным тк нельзя обратиться к  приватному идентификатору

// car1.#changeVinNUmber();

// //Uncaught SyntaxError: Private field '#changeVinNUmber' must be declared 
// // in an enclosing class (at private-properties.js:25:5)



car1.test();  // обращаемся к приватному методу через общедоступный

// changed

// Аналогично работают  и статичные приватные методы и свойства. Очень удобно использовать статичные блоки, в которых 
// используются приватные свойства:

// class Notebook {
//     #serialNumber = 98798789797;
//     processor = '300mH'

//     #changeSerialNumber() {
//         console.log('changed');
//     }
//     static {
//         //код для проверки
//         this.#serialNumber = 38764783745763;
//     }
// }


// Ограничения приватных свойств:

// 1. Нельзя удалить через delete:


// class Notebook {
//     #serialNumber = 98798789797;
//     processor = '300mH'

//     constructor() {
//         delete this.#serialNumber;
//     }
// }


// 2. Нельзя обьявлять приватные свойства в конструкторе, но можно сначала объявить, а  затем присвоить значение:

class NotebookClass {
    #serialNumber;
    processor = '300mH';
    constructor() {
        this.#serialNumber = 98798789797;
    }
}


// console.log(NotebookClass);

// class NotebookClass {
//     #serialNumber;
//     processor = '300mH';
//     constructor() {
//         this.#serialNumber = 98798789797;
//     }
// }

class User {
    #password;
    #login;
    constructor(password, login) {
        this.#password = [...password].reverse().join();
        this.#login = login;
    }

    get showLogin() {
        console.log(this.#login);
    }

    checkPassword = (pw) => this.#password === [...pw].reverse().join();

    setNewPassword(pw, newPw) {
        if(this.#password === [...pw].reverse().join()) {
            this.#password = [...newPw].reverse().join();
        }
    }
}

const user1 = new User('123', 'Leo');
console.log(user1);
console.log(user1.showLogin);

console.log(user1.checkPassword('234'));

user1.setNewPassword('123', '234');
console.log(user1);

