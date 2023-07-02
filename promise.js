const prom = new Promise((resolve) => {               // resolve, reject - условно зарезервированы слова, аналогично return

    resolve('Success');
}); 

prom
    .then((data) => console.log(data));                    // data = 'Success' в консоль выведется мгновенно


const prom2 = new Promise((resolve, reject) => { 
    if(new Date() < new Date('01.01.2025'))  {
        reject(new Error('Error'));                //   new Error() - хорошая практика, только так лучше создавать ошибку
    }                                             // если есть  reject, то обязательно нужно обработать эту ошибку в .catch() 

    resolve('Success');
}); 

prom2
    .then((data) => console.log(data))         
    .catch((error) => console.log(error));     //



// статические методы промисов
// _____________________________

Promise.resolve('Success').then(data => console.log(data));
    // __________      resolve - метод, кот возвращает положительный результат
    // reject() -- o трицательный


// Упражнение


const myFetch = function (method, url) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open(method, url);
        req.send();
        req.addEventListener('load', function() {
            resolve(this.responseText);
        });
        req.addEventListener('error', function() {
            reject(new Error(this.status))
        })
    }) 
  
};

myFetch('GET', 'https://dummyjson.com/products/')
   .then((data) => {
        JSON.parse(data);
        console.log(data);
        return data;
   })
   .catch((err) => {
    console.error(err)
    });