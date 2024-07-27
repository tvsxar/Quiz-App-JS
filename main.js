// searching for elements on a page
const startBtn = document.querySelector('.start-btn');
const nextBtn = document.querySelector('.next-btn');
const answerList = document.querySelector('.answers');
const answers = document.querySelectorAll('.answer');

const startPage = document.querySelector('.start-page');
const app = document.querySelector('.app');
const scoreMsg = document.querySelector('.score-msg');

// creating an array with questions and answers
const quiz = [
    {
        question: 'What language is most used in the world?',
        answers: ['Ukrainian', 'English', 'German', 'Italian'],
        correct: 'English',
    },
    {
        question: 'Which country has the largest population?',
        answers: ['India', 'China', 'Russia', 'USA'],
        correct: 'India',
    },
    {
        question: 'What is the largest continent on Earth?',
        answers: ['Africa', 'Australia', 'Eurasia', 'North America'],
        correct: 'Eurasia',
    },
];

// variables
let score, questionCounter, timer, seconds;

// functions
function startQuiz() {
    // hide the start button and show the quiz window
    startPage.classList.add('none');
    app.classList.remove('none');
    scoreMsg.classList.add('none');

    // reset values
    score = 0;
    questionCounter = 0;

    showQuestion()
}

function showQuestion() {
    if(questionCounter >= 3) finishQuiz();

    // adding questions and answer options to the page
    const countQuestion = document.querySelector('.counter');
    const question = document.querySelector('.question');

    countQuestion.innerText = `${questionCounter + 1} of ${quiz.length} Questions`
    question.innerText = quiz[questionCounter].question;
    answers.forEach((item, index) => {
        item.innerText = quiz[questionCounter].answers[index];
        item.disabled = false;
        item.classList.remove('right');
        item.classList.remove('wrong');
    })

    // stop timer
    clearInterval(timer);

    // start timer
    startTimer();

    nextBtn.disabled = true;
}

function startTimer() {
    const time = document.querySelector('.time');
    seconds = 15;

    time.innerText = `${seconds--}s`;

    // set timer
    timer = setInterval(() => {
        if(seconds < 1) timeIsOver();

        time.innerText = `${seconds}s`;
        seconds--;
    }, 1000);

}

function timeIsOver() {
    answers.forEach((item) => {
        if(item.innerText == quiz[questionCounter].correct) item.classList.add('right');

        item.disabled = true;
    })

    questionCounter++;
    nextBtn.disabled = false;
    clearInterval(timer);
}

function selectAnswer(event) {
    let pressed = event.target;
    if(!pressed.classList.contains('answer')) return;

    // checking whether the correct answer is pressed
    if(pressed.innerText == quiz[questionCounter].correct) {
        pressed.classList.add('right');
        score++;
    } else pressed.classList.add('wrong');

    answers.forEach(item => item.disabled = true)

    nextBtn.disabled = false;
    questionCounter++;
    clearInterval(timer);
}

function finishQuiz() {
    // hide the quiz window and show the restart button
    scoreMsg.classList.remove('none');
    startPage.classList.remove('none');
    app.classList.add('none');

    startBtn.innerText = 'RESTART';
    scoreMsg.innerText = `Your score is ${score} out of ${quiz.length}`
}

// listen events
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', showQuestion);
answerList.addEventListener('click', selectAnswer);