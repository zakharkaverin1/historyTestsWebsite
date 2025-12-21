import * as questions from '/js/data.js';

const currentPeriod = questions.questions862_1480;
const testButton = document.getElementById("start-test");

if (testButton) {
    testButton.addEventListener("click", function () {
        const url = `test.html?param1=${currentPeriod}`;
        window.location.href = 'test.html';
    });
}
