// Element selectors
var startScreen = document.getElementById("start-screen");
var startButton = document.getElementById("start");
var questionEl = document.getElementById("question-title");
var choicesEl = document.getElementById("choices");
var endScreen = document.getElementById("end-screen");
var submitButton = document.getElementById("submit");
var feedbackEl = document.getElementById("feedback");
var timerEl = document.getElementById("time");
var timerText = document.getElementById("timer");

// Global variables
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var startTime;
var scoreObj = {
    time: '',
    initials: ''
};
var timePenalty = 0;


// This variable should be incremented each time the user selects a correct answer.
var correctAnswersCount = 0;

function calculateScore() {
  // Calculate the final score based on the remaining time (timeLeft)
  return Math.max(timeLeft - timePenalty, 0);
}



// Start quiz function
function startQuiz() {
    hideDiv("start-screen");
    showDiv("questions");
    startTimer();
    showQuestion(currentQuestionIndex);
}

// Timer functions
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(function () {
    updateTimer();
  }, 1000);
}

function updateTimer() {
  var currentTime = Date.now();
  var elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
  timeLeft = Math.max(60 - elapsedSeconds - timePenalty, 0);
  timerEl.textContent = formatTime(timeLeft);

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    endQuiz();
  }
}

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;
  return minutes.toString().padStart(2, "0") + ":" + remainingSeconds.toString().padStart(2, "0");
}

// Show/hide div functions
function hideDiv(divId) {
    var element = document.getElementById(divId);
    element.classList.add("hide");
}

function showDiv(divId) {
    var element = document.getElementById(divId);
    element.classList.remove("hide");
}

// Display question and handle answer choice
function showQuestion(index) {
    var questionData = questions[index];
    questionEl.textContent = questionData.questionTitle;
    choicesEl.innerHTML = '';

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
      timePenalty += 10; // Increment penalty for a wrong answer
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
      showQuestion(currentQuestionIndex);
  } else {
      endQuiz();
  }
}


// End quiz function
function endQuiz() {
  // Stop the timer
  clearInterval(timerInterval);

  // Calculate the final score using the calculateScore() function
  var finalScore = calculateScore();
  scoreObj.time = formatTime(finalScore);
  // Display the final score with the remaining time
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = formatTime(finalScore);

  // Hide the questions and show the end screen
  hideDiv("questions");
  showDiv("end-screen");
}


function submitScore() {
  var userInitials = document.getElementById("initials").value;
  scoreObj.initials = userInitials;

  // Here, ensure scoreObj.time already has the final score set in endQuiz()
  var scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push(scoreObj);
  localStorage.setItem("scores", JSON.stringify(scores));


}


// Event listeners
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", submitScore);