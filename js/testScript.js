import * as data from '/js/data.js';

document.addEventListener('DOMContentLoaded', function () {
    const periodIndex = parseInt(localStorage.getItem('periodIndex')) || 0;
    const questions = data.getCertainTopic(10, periodIndex);
    const questionLabel = document.getElementById('question');
    const answersContainer = document.getElementById('answers');
    const ansDescription = document.getElementById('description');
    const questionsList = document.getElementById('questions-list');

    let currentQuestionIndex = 1;
    let score = 0;
    let answeredQuestions = {}; // true - answered, false - not answered

    function filling(questions) {
        questionsList.innerHTML = '';

        for (let i = 1; i <= questions.length; i++) {
            let btnClass = 'other-question';
            if (answeredQuestions[i]) {
                btnClass += ' answered';
            }
            questionsList.innerHTML += `<button class="${btnClass}" value="${i}">${i}</button>`;
        }

        const question = questions[currentQuestionIndex - 1];
        questionLabel.innerHTML = question.question || "Текст вопроса отсутствует";
        answersContainer.innerHTML = '';

        // create buttons for each answer
        question.options.forEach((option, i) => {
            const btn = document.createElement('button');
            btn.className = 'answer-option';
            btn.innerHTML = option.option;
            btn.dataset.isCorrect = option.isCorrect;
            btn.dataset.explanation = question.explanation || "";

            // answer was received earlier
            if (answeredQuestions[currentQuestionIndex]) {
                btn.disabled = true;
            } else {
                btn.onclick = function () {
                    answeredQuestions[currentQuestionIndex] = true;
                    document.querySelectorAll('.answer-option').forEach(b => b.disabled = true);
                    if (option.isCorrect) {
                        score++;
                        ansDescription.innerText = "Правильно! " + question.explanation;
                    } else {
                        ansDescription.innerText = "Неправильно! " + question.explanation;
                    }

                    const qBtn = document.querySelector(`.other-question[value="${currentQuestionIndex}"]`);
                    if (qBtn) {
                        qBtn.classList.add('answered');
                        qBtn.classList.add(option.isCorrect ? 'correct' : 'wrong');
                    }
                };
            }

            answersContainer.appendChild(btn);
        });
    }

    filling(questions);

    questionsList.addEventListener('click', function (event) {
        const button = event.target.closest('.other-question');
        if (button) {
            currentQuestionIndex = parseInt(button.value);
            filling(questions);
        }
    });
});
