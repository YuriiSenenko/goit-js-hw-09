import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name=delay]'),
  step: document.querySelector('[name=step]'),
  amount: document.querySelector('[name=amount]'),
  createPromBTN: document.querySelector('button[type=submit]'),
};

// refs.createPromBTN.addEventListener('submit', createPromise);

// refs.form.addEventListener('input', onInputDelay);

let delay = 1000;
let step = 500;
let position = 5;

// function onInputDelay(event) {
//   const input = event.target.value;
//   delay.push(input);
// }

// const delay = 10;

// console.log(delay);
// console.log(step);
// console.log(position);
let sum = 0;
for (i = delay; i <= position; i += step) {
  sum += i;
  console.log(delay);
}
console.log(sum);

function createPromise(position, delay) {
  return (promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve('');
      } else {
        reject('');
      }
    }, delay);
  }));
}

createPromise(position, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  });

// function formInput(event) {
//   const input = event.target.name;

//   console.log(input + event.target.value);
// }
