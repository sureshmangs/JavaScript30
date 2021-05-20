let countDown;

const displayTime = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countDown);
    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(then);

    countDown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countDown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display__time = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
    displayTime.textContent = display__time;
    document.title = display__time;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back @ ${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' : ''}${minutes} ${(hours % 24) >= 12 ? 'PM' : 'AM'}`
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(buttons => buttons.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const minutes = parseInt(this.minutes.value);
    const seconds = minutes * 60
    timer(seconds);
    this.reset();
})
