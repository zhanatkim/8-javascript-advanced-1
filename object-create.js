//Object.create() используется редко, но важно для наследования. По сути этим способом создается объект по прототипу:

const User = {
    log() {
        console.log('Log');
    }
};

const user1 = Object.create(User);
console.log(user1);
// {}
// [[Prototype]]: Object
// log: ƒ log()

console.log(user1.__proto__ == User);
// true

//Задать свойства придется через метод или извне к нужному созданному объекту:
const UserA = {
    init(login, password) {
        this.login = login;
        this.password = password;
    },

    log() {
        console.log('Log');
    }
};

const user2 = Object.create(UserA);

console.log(user2.init('a@a.net', '123'));
// {}
// login: "a@a.net"
// password: "123"



//или:


user1.login = 'a@a.net';
user1.password = '123';

console.log(user1);

// {login: 'a@a.net', password: '123'}


// тк этот способ важен для наследования создадим новый объект на основе user1 / user2
//его цепочка прототипов удлинится:

const admin = Object.create(user1);
console.log(admin);

// {}
// [[Prototype]]: Object     ------  прототип user1
//    login: "a@a.net"
//    password: "123"
//    [[Prototype]]: Object    ------- прототип User
//       log: ƒ log()
//       [[Prototype]]: Object  -------- прототип Object

// все свойства будут работать 