import { Notify } from 'notiflix';

const delayTime = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const sendBtn = document.querySelector('button');
let position = 1;

function createPromise(position, delay) {
  const setInter = setInterval(() => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      // Reject
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    }
   
    clearInterval(setInter);
  }, delay);
}


sendBtn.addEventListener("click", (event) => {
  console.clear();
  event.preventDefault();
  let qunatity = parseInt(amount.value);
  let stepTime = parseInt(step.value);
  let timeDelay = parseInt(delayTime.value);
  let delay = timeDelay;

    for (let i = 0; i < qunatity; i++) {
      createPromise(position, delay);
      delay = delay + stepTime;
      position++;
    }
  position = 1;

});