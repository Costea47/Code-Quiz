// reate a code quiz that contains the following requirements:

// * A start button that when clicked a timer starts and the first question appears.
 
//   * Questions contain buttons for each answer.
//   * 
//   * When answer is clicked, the next question appears
//   * 
//   * If the answer clicked was incorrect then subtract time from the clock

// * The quiz should end when all questions are answered or the timer reaches 0.

//   * When the game ends, it should display their score and give the user the ability to save their initials and their score


// pseudo coding

// Create a list of questions with choices and answers
//Write a function that creates question and answer elements
//Loop through the questions until time runs out
//Save the score in the web browser's memory
//Retrieve score from storage and display on the high scores page
//End the game when timer reach 0

var startScreen = document.querySelector("#start-screen");
var startButton = document.querySelector("#start");
var questionEl = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var endScreen = document.querySelector("#end-screen");
var submitButton = document.querySelector("#submit");
var feedbackEl = document.querySelector("#feedback");
var timerEl = document.querySelector("#time");
var timerText = document.querySelector(".timer");


// Current question index
var currentQuestionIndex = 0;
// timer 
var timeLeft = 60; 
// Declare timerInterval in a broader scope
var timerInterval;

// function startQuiz() {
//     startScreen.classList.add("hide"); // Hide the start screen
//     startButton.classList.add("hide"); // Hide the start button
//     questionEl.classList.remove("hide"); // Show the question area
//     choicesEl.classList.remove("hide"); // Show the choices area

//     startTimer();
//     showQuestion(currentQuestionIndex);
// }

// Function to hide an element
function hideDiv(divId) {
    var element = document.getElementById(divId);
    element.classList.add("hide");
}

// Function to show an element
function showDiv(divId) {
    var element = document.getElementById(divId);
    element.classList.remove("hide");
}

// Event listener for the "Start Quiz" button
startButton.addEventListener("click", function () {
    hideDiv("start-screen"); // Hide the start screen
    showDiv("questions"); // Show the questions div
    startTimer();
    showQuestion(currentQuestionIndex);
});


function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function showQuestion(index) {
    var questionData = questions[index];
    questionEl.textContent = questionData.questionTitle;
    // Clear previous choices
    choicesEl.innerHTML = '';

    // Display new choices
    questionData.answers.forEach(function(choice) {
        var button = document.createElement("button");
        button.textContent = choice;
        button.addEventListener("click", handleChoiceClick);
        choicesEl.appendChild(button);
    });
}

function handleChoiceClick(event) {
    var selectedChoice = event.target.textContent;
    var correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (selectedChoice === correctAnswer) {
        feedbackEl.textContent = "Correct!";
    } else {
        feedbackEl.textContent = "Wrong!";
        timeLeft -= 10;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    questionEl.classList.add("hide");
    choicesEl.classList.add("hide");
    endScreen.classList.remove("hide");
    timerText.textContent = "Quiz Over!";
}

startButton.addEventListener('click', startQuiz);

