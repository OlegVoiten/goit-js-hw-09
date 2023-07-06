import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name=delay]');
  const stepInput = document.querySelector('input[name=step]');
  const amountInput = document.querySelector('input[name=amount]');

  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  createPromises(amount, delay, step);
}

function createPromises(amount, delay, step) {
  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const promiseDelay = delay + i * step;

    createPromise(position, promiseDelay);
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(position);
      } else {
        reject(position);
      }
    }, delay);
  });

  promise
    .then((position) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch((position) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
