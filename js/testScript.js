import * as data from '/js/data.js';

const currentPeriod = localStorage.getItem('currentPeriod');
const questions = data.getCertainTopic(currentPeriod);

const questionLabel = document.getElementById('question');
const answers = document.getElementById('answers');



