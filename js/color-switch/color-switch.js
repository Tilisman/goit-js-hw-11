const colors = [
    '#FFFFFF',
    '#2196F3',
    '#4CAF50',
    '#FF9800',
    '#009688',
    '#795548',
];

const randomIntegerFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-action="start"]');
const stopBtn = document.querySelector('button[data-action="stop"]');
let timerId = null;

startBtn.addEventListener('click', onStartColorSwitch);
stopBtn.addEventListener('click', onStopColorSwitch);

function onStartColorSwitch() {
    startBtn.disabled = true;
    timerId = setInterval(() => {
        const indexColor = randomIntegerFromInterval(0, colors.length);
        body.style.backgroundColor = colors[indexColor];
    }, 1000);
};

function onStopColorSwitch() {
    clearInterval(timerId);
    startBtn.disabled = false;
};