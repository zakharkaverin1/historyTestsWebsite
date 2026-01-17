import * as data from './data.js';

const practiceButton = document.getElementById("practice-mode");
const testButton = document.getElementById("test-mode");
const timelineTrack = document.querySelector(".timeline-track");
let periodIndex = 0;

if (testButton) {
    testButton.addEventListener("click", function () {
        localStorage.setItem('periodIndex', periodIndex);
        localStorage.setItem('timer', true);
        window.location.href = 'test.html';
    });
}

if (practiceButton) {
    practiceButton.addEventListener("click", function () {
        localStorage.setItem('periodIndex', periodIndex);
        localStorage.setItem('timer', false);
        window.location.href = 'test.html';
    });
}

timelineTrack.addEventListener('click', function (event) {
    const button = event.target.closest('.timeline-button');
    if (button) {
        periodIndex = parseInt(button.dataset.era);
        document.querySelectorAll('.timeline-button').forEach(btn => {
            btn.classList.remove("current");
        });
        button.classList.add("current");
    }
});
