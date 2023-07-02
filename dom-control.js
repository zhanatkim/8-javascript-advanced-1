const root = document.querySelector('.root');
const searchInput = document.querySelector('.searching');
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }


for (let i = 0; i <= 100; i++) {
    const el = document.createElement('div');
    const span = Math.floor(getRandom(1, 100));
    el.innerHTML = `User number ${i},  age ${span}`;
    el.setAttribute('data-id', `${i}`);
    root.append(el);
}

function search (event) {
    const inputValue = event.target.value;
    for (const el of [...root.children]) {
        if (el.innerHTML.includes(`age ${inputValue}`)) {
            el.classList.add('yellow');
            continue;
        }
        el.classList.remove('yellow');
    }
}

searchInput.addEventListener('change', search);