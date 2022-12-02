const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
btnStop.setAttribute("disabled", true)
let timerInt;


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener("click", () => {
    console.log("Wciśnięto start")
    btnStart.setAttribute("disabled", true);
    btnStop.removeAttribute("disabled");
    timerInt = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();

    }, 1000);
});

btnStop.addEventListener("click", () => {
    btnStart.removeAttribute("disabled");
    btnStop.setAttribute("disabled", true);
    console.log("Wciśnięto stop")
    clearInterval(timerInt);
})
