const refs = {
    startBtn: document.querySelector('button[data-start]'),
    inputData: document.getElementById("date-selector"),
    timerDays: document.querySelector('span[data-days]'),
    timerHours: document.querySelector('span[data-hours]'),
    timerMinutes: document.querySelector('span[data-minutes]'),
    timerSeconds: document.querySelector('span[data-seconds]'),
}

refs.inputData.addEventListener("input", onDataInput);

refs.startBtn.addEventListener('click', () => {
    if (finishTime <= Date.now()) {
        Swal.fire({
            icon: 'warning',
            title: 'Please choose a date in the future',
        })
        return;
    }
    timer.start();
});

let finishTime = 0;
function onDataInput() {
    const dateEntered = new Date(this.value);
    finishTime = dateEntered.getTime();
};

class Timer {
    constructor({ onTick }) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;
    }

    start() {
        if (this.isActive) { 
            return;
        }
        refs.startBtn.disabled = true; 
        this.intervalId = setInterval(() => {  
            const currentTime = Date.now();
            const deltaTime = finishTime - currentTime - 10800000;
            const time = this.convertMs(deltaTime); 
            if (deltaTime == null) {
                stop()
            };
            this.onTick(time);
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
        startBtn.disabled = false;
    }
    convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Remaining days
        const days = this.pad(Math.floor(ms / day));
        // Remaining hours
        const hours = this.pad(Math.floor((ms % day) / hour));
        // Remaining minutes
        const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
        // Remaining seconds
        const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

        return { days, hours, minutes, seconds };
    }

    pad(value) {
        return String(value).padStart(2, '0');
    };
}

const timer = new Timer({
    onTick: updateClockFace 
});

function updateClockFace({ days, hours, minutes, seconds }) {
    refs.timerDays.textContent = `${days}`;
    refs.timerHours.textContent = `${hours}`;
    refs.timerMinutes.textContent = `${minutes}`;
    refs.timerSeconds.textContent = `${seconds}`;
};
