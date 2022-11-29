import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days');
const hours = document.querySelector('[data-hours');
const minutes = document.querySelector('[data-minutes');
const seconds = document.querySelector('[data-seconds');
const insertData = document.querySelector('input[type="text"]')
let selectedTime = 0;
btnStart.setAttribute("disabled", true);

let currentTime = new Date;
let currTime = convertMs(currentTime.getTime());

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        // console.log(selectedDates[0].getTime());
        // console.log(currentTime);
        selectedTime = selectedDates[0].getTime();
        // const tempTime = convertMs(selectedTime)
        if ((selectedTime - currentTime.getTime()) <= 0) {
            btnStart.setAttribute("disabled", true);
            Notify.failure("Please choose a date in the future");
            //window.alert("Please choose a date in the future");
        } else {
            btnStart.removeAttribute("disabled");
        }
    },
};
const setedData = flatpickr(insertData, options);


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
let updateTime;
btnStart.addEventListener("click", () => {
    btnStart.setAttribute("disabled", true);
    insertData.setAttribute("disabled", true);
    updateTime = setInterval(() => {
        currentTime = new Date;
        currTime = convertMs(selectedTime - currentTime.getTime());

        days.textContent = (addLeadingZero(currTime.days)).padStart();
        hours.textContent = (addLeadingZero(currTime.hours)).padStart();
        minutes.textContent = (addLeadingZero(currTime.minutes)).padStart();
        seconds.textContent = (addLeadingZero(currTime.seconds)).padStart();
        console.log(selectedTime - currentTime.getTime());
        ((selectedTime - currentTime.getTime()) <= 1000) ? clearInterval(updateTime) : null;
    }, 1000);

});

const addLeadingZero = (value) => {
    const padStart = () => {
        if (value <= 9) {
            return "0" + value.toString();
        }
        else {
            return value.toString();
        }
    }
    return padStart();
}