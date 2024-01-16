// Get elements
var clear = document.getElementById('clear');
var highscoresList = document.getElementById('highscores');

// Add event listeners
clear.addEventListener('click', () => {
    if (confirm("Are you sure you want to clear all high scores?")) {
        clearScores();
    }
});

// Get scores from local storage
let highscores = localStorage.getItem('scores');
if (!highscores) {
    highscoresList.textContent = "No high scores yet.";
} else {
    highscores = JSON.parse(highscores);
    // Update the sorting logic if needed based on your scoring system
    highscores.sort((a, b) => {
        let aTimeParts = a.time.split(':').map(Number);
        let bTimeParts = b.time.split(':').map(Number);
        let aTotalSeconds = aTimeParts[0] * 60 + aTimeParts[1];
        let bTotalSeconds = bTimeParts[0] * 60 + bTimeParts[1];
        return bTotalSeconds - aTotalSeconds;
    });
    

    highscores.forEach((highscore) => {
        let score = document.createElement('li');
        let denomination = (highscore.time === 1) ? 'second' : 'seconds'; // Adjust if 'time' is not in seconds
        score.innerHTML = `${highscore.initials} - ${highscore.time} ${denomination}`;
        highscoresList.appendChild(score);
    });
}

function clearScores() {
    localStorage.removeItem('scores');
    highscoresList.innerHTML = 'High scores cleared.';
}
