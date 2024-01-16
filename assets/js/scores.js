// Select the button for clearing scores and the list element where high scores are displayed
var clear = document.getElementById('clear');
var highscoresList = document.getElementById('highscores');

// Add a click event listener to the clear button
clear.addEventListener('click', () => {
     // Ask for confirmation before clearing the high scores
    if (confirm("Are you sure you want to clear all high scores?")) {
        clearScores();// If confirmed, clear the high scores
    }
});

// Attempt to retrieve high scores from local storage
let highscores = localStorage.getItem('scores');
if (!highscores) {
    // If there are no high scores, display a message indicating this
    highscoresList.textContent = "No high scores yet.";
} else {
    // If there are high scores, parse them from the stored JSON string
    highscores = JSON.parse(highscores);

    /// Sort the high scores in descending order based on time
    highscores.sort((a, b) => {
        // Split the 'time' strings into parts and convert them to numbers
        let aTimeParts = a.time.split(':').map(Number);
        let bTimeParts = b.time.split(':').map(Number);

        // Calculate the total seconds for comparison
        let aTotalSeconds = aTimeParts[0] * 60 + aTimeParts[1];
        let bTotalSeconds = bTimeParts[0] * 60 + bTimeParts[1];

        // Perform the comparison for the sort
        return bTotalSeconds - aTotalSeconds;
    });
    
    // For each high score, create a list item and append it to the high scores list
    highscores.forEach((highscore) => {
        let score = document.createElement('li');

        // Determine the singular or plural of 'second' based on the time
        let denomination = (highscore.time === 1) ? 'second' : 'seconds';

        // Set the content of the list item with the player's initials and time
        score.innerHTML = `${highscore.initials} - ${highscore.time} ${denomination}`;

        // Add the list item to the high scores list on the page
        highscoresList.appendChild(score);
    });
}

// Function to clear high scores from local storage and update the display
function clearScores() {
    // Remove the high scores from local storage
    localStorage.removeItem('scores');

    // Update the high scores list to indicate that scores have been cleared
    highscoresList.innerHTML = 'High scores cleared.';
}
