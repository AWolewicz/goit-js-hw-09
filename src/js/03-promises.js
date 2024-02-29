import Notiflix from "notiflix";

const ourForm = document.querySelector('.form');

ourForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const delay = Number(e.target.elements[0].value);
  const step = Number(e.target.elements[1].value);
  const amount = Number(e.target.elements[2].value);

  for (let i = 0; i < amount; i++) {
    createPromise(i, delay + i * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position + 1} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
}
