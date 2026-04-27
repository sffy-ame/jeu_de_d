const dice = document.getElementById('dice');
const rollBtn = document.getElementById('roll-button');
const timerBtn = document.getElementById('timer-button');
const resetBtn = document.getElementById('reset-button');
const display = document.getElementById('time-display');
const hg = document.getElementById('hourglass');

let timeLeft = 180;
let timerId = null;

function showPage(pageId) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

rollBtn.addEventListener('click', () => {
    dice.classList.add('animate');
    setTimeout(() => {
        const res = Math.floor(Math.random() * 6) + 1;
        dice.className = 'face-' + res;
        dice.classList.remove('animate');
    }, 400);
});

timerBtn.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        timerBtn.innerText = "Reprendre";
        hg.classList.remove('flipping');
    } else {
        hg.classList.add('flipping');
        timerBtn.innerText = "Pause";
        timerId = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerId);
                timerId = null;
                hg.classList.remove('flipping');
                timerBtn.innerText = "Fin !";
                alert("Temps écoulé !");
                return;
            }
            timeLeft--;
            const m = Math.floor(timeLeft / 60);
            const s = timeLeft % 60;
            display.innerText = `${m}:${s.toString().padStart(2, '0')}`;
        }, 1000);
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 180;
    display.innerText = "03:00";
    timerBtn.innerText = "Démarrer";
    hg.classList.remove('flipping');
});