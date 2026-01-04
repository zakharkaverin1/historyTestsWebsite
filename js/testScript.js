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
    let answeredQuestions = {};

    function checkIfAllAnswered() {
        const answeredCount = Object.keys(answeredQuestions).length;
        if (answeredCount === questions.length) {
            showResults();
        }
    }

    function showResults() {
        const correct = score;
        const total = questions.length;
        //fill results and show modal window
        document.getElementById('finalScore').textContent = `${correct}/${total}`;
        document.getElementById('resultsModal').style.display = 'block';
    }

    function restartQuiz() {
        score = 0;
        answeredQuestions = {};
        currentQuestionIndex = 1;
        document.getElementById('resultsModal').style.display = 'none';
        filling(questions);
    }

function filling(questions) {
    questionsList.innerHTML = '';

    for (let i = 1; i <= questions.length; i++) {
        let btnClass = 'other-question';
        if (answeredQuestions[i]) {
            btnClass += ' answered';
            if (answeredQuestions[i].isCorrect) {
                btnClass += ' correct';
            } else {
                btnClass += ' wrong';
            }
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

            if (answeredQuestions[currentQuestionIndex].selectedOption === i) {
                btn.classList.add(answeredQuestions[currentQuestionIndex].isCorrect ? 'correct' : 'wrong');
            }

        } else {
            btn.onclick = function () {
                answeredQuestions[currentQuestionIndex] = {
                    answered: true,
                    isCorrect: option.isCorrect,
                    selectedOption: i
                };

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
                checkIfAllAnswered();
            };
        }

        answersContainer.appendChild(btn);
    });
}

function goToMainPage() {
    window.location.href = 'index.html';
}


    filling(questions);

    questionsList.addEventListener('click', function (event) {
        const button = event.target.closest('.other-question');
        if (button) {
            currentQuestionIndex = parseInt(button.value);
            filling(questions);
        }
    });
    window.restartQuiz = restartQuiz;
    window.goToMainPage = goToMainPage;
});
