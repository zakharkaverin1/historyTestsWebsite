import * as data from '/js/data.js';

const currentPeriod = 'questions862_1480';
const testButton = document.getElementById("start-test");

if (testButton) {
    testButton.addEventListener("click", function () {
        localStorage.setItem('currentPeriod', JSON.stringify(currentPeriod));
        window.location.href = 'test.html';
    });
}
