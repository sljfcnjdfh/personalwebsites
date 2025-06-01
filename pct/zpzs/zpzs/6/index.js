let hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
    timer = null;

document.querySelector('.btn-start').addEventListener('click', startTimer);
document.querySelector('.btn-pause').addEventListener('click', pauseTimer);
document.querySelector('.btn-reset').addEventListener('click', resetTimer);

function startTimer() {
    if (timer) return;
    timer = setInterval(updateTimer, 10);
}

function pauseTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    document.getElementById('hours').textContent = formatTime(0);
    document.getElementById('minutes').textContent = formatTime(0);
    document.getElementById('seconds').textContent = formatTime(0);
    document.getElementById('milliseconds').textContent = formatTime(0);
}

function updateTimer() {
    milliseconds++;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    document.getElementById('milliseconds').textContent = formatTime(milliseconds);
    document.getElementById('seconds').textContent = formatTime(seconds);
    document.getElementById('minutes').textContent = formatTime(minutes);
    document.getElementById('hours').textContent = formatTime(hours);
}

function formatTime(value) {
    return value < 10 ? `0${value}` : `${value}`;
}
