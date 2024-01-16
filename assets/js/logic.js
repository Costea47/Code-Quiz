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
var question = document.querySelector("#question-title");
var choices = document.querySelector("#choices");
var endScreen = document.querySelector("#end-screen");
var submit = document.querySelector("#submit");
var feedback = document.querySelector("#feedback")

console.log(startScreen);
console.log(startButton);
console.log(question);
console.log(choices);
console.log(endScreen);
console.log(submit);
console.log(feedback);
