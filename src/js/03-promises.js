import { Notify } from 'notiflix';

const delayTime = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const sendBtn = document.querySelector('button');
let position = 1;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const setInter = setInterval(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve(success(`✅ Fulfilled promise ${position} in ${delay}ms`));
      } else {
        // Reject
        reject(failure(`❌ Rejected promise ${position} in ${delay}ms`));
      }

      clearInterval(setInter);
    }, delay);
  });
}

const success = (data) => {
  Notify.success(data);
  return data
}

const failure = (data) => {
  Notify.failure(data);
  return data;
}

let promises = [];
sendBtn.addEventListener("click", (event) => {
  console.clear();
  event.preventDefault();
  promises = [];
  
  sendBtn.setAttribute("disabled", true);
  let qunatity = parseInt(amount.value);
  let stepTime = parseInt(step.value);
  let timeDelay = parseInt(delayTime.value);
  let delay = timeDelay;

  for (let i = 0; i < qunatity; i++) {
    promises.push(createPromise(position, delay));
    delay = delay + stepTime;
    position++;
  }
  position = 1;
  console.log(promises);
  Promise.allSettled(promises)
    .then((val) => {
      console.log(val);
      sendBtn.removeAttribute("disabled");
    })

});