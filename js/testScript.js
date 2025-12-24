import * as data from '/js/data.js';

document.addEventListener('DOMContentLoaded', function(){
    const periodIndex = parseInt(localStorage.getItem('periodIndex')) || 0;

    const questions = data.getCertainTopic(10, periodIndex);

    const questionLabel = document.getElementById('question');
    const answersSpan = document.getElementById('answers');

    for (const obj of questions){
        const questionText = obj.question;
        const answers = obj.options;
        const image = obj.image;
        const explanation = obj.explanation;
        questionLabel.innerHTML = questionText || "Текст вопроса отсутствует";
}});
