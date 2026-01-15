import * as data from './js/data.js';

const practiceButton = document.getElementById("practice-mode");
const timelineTrack = document.querySelector(".timeline-track");
let periodIndex = 0;

if (practiceButton) {
    practiceButton.addEventListener("click", function () {
        localStorage.setItem('periodIndex', periodIndex);
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
