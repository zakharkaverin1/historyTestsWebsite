import * as data from '/js/data.js';

const testButton = document.getElementById("start-test");
const periodIndex = 2;

if (testButton) {
    testButton.addEventListener("click", function () {
        localStorage.setItem('periodIndex', periodIndex);
        window.location.href = 'test.html';
    });
}
