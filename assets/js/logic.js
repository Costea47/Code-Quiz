// Element selectors - accessing HTML elements by their IDs for manipulation
var startScreen = document.getElementById("start-screen");
var startButton = document.getElementById("start");
var questionEl = document.getElementById("question-title");
var choicesEl = document.getElementById("choices");
var endScreen = document.getElementById("end-screen");
var submitButton = document.getElementById("submit");
var feedbackEl = document.getElementById("feedback");
var timerEl = document.getElementById("time");
var timerText = document.getElementById("timer");

// Global variables to track the state of the quiz
var currentQuestionIndex = 0; // Index of the current question in the quiz
var timeLeft = 80; // Time left for the quiz in seconds
var timerInterval; // Reference for the timer interval to clear it later
var startTime; // Timestamp when the quiz starts
var scoreObj = {
    time: '', // Time to be recorded as the score
    initials: '' // Player's initials for the score board
};
var timePenalty = 0; // Additional time penalty for incorrect answers

// This variable counts the number of correct answers given by the user
var correctAnswersCount = 0;

// Function to calculate the final score
function calculateScore() {
  // The final score is the remaining time minus any time penalties
  // The score cannot go below zero
  return Math.max(timeLeft - timePenalty, 0);
}


// Function to start the quiz
function startQuiz() {
    // Hide the start screen and show the quiz question screen
    hideDiv("start-screen");
    showDiv("questions");
    // Initialize the timer and display the first question
    startTimer();
    showQuestion(currentQuestionIndex);
}

// Timer initialization function
function startTimer() {
    // Record the start time
  startTime = Date.now();
  // Set up a timer that updates every second
  timerInterval = setInterval(function () {
    updateTimer();
  }, 1000);
}
// Function to update the timer display
function updateTimer() {
    // Calculate elapsed time and update timeLeft
  var currentTime = Date.now();
  var elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
  timeLeft = Math.max(80 - elapsedSeconds - timePenalty, 0);
  // Update the timer element with the formatted time
  timerEl.textContent = formatTime(timeLeft);

     // If time has run out, end the quiz
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    endQuiz();
  }
}

// Function to format seconds into a "mm:ss" string
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

// Function to display a question and set up answer choices
function showQuestion(index) {
    // Get the question data and populate the question element
    var questionData = questions[index];
    questionEl.textContent = questionData.questionTitle;
    // Clear previous choices
    choicesEl.innerHTML = '';

    // Create a button for each answer choice
    questionData.answers.forEach(function(choice) {
        var button = document.createElement("button");
        button.textContent = choice;
        button.addEventListener("click", handleChoiceClick);
        choicesEl.appendChild(button);// Add the button to the choices container
    });
}
// Event handler for when an answer choice is clicked
function handleChoiceClick(event) {
  var selectedChoice = event.target.textContent;// Get the text content of the clicked button
  var correctAnswer = questions[currentQuestionIndex].correctAnswer;// Correct answer for the current question


  // Check if the selected choice is correct and provide feedback
  if (selectedChoice === correctAnswer) {
      feedbackEl.textContent = "Correct!";// Increment the count of correct answers
  } else {
      feedbackEl.textContent = "Wrong!";
      timePenalty += 10; // Increment penalty for a wrong answer
      updateTimer();
  }

  // Move to the next question or end the quiz if there are no more questions
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
      showQuestion(currentQuestionIndex);
  } else {
      endQuiz();
  }
}


// Function to end the quiz
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

// Function to submit the score
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