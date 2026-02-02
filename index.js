let p1ScoreEl = document.getElementById("p1-score");
let p2ScoreEl = document.getElementById("p2-score");

function playerOneScore() {
    let currentScore = Number(p1ScoreEl.textContent)
    
    if (currentScore === 0) {
        currentScore = 15;
    } else if (currentScore === 15) {
        currentScore = 30;
    } else if (currentScore === 30) {
        currentScore = 40;
    } else if (currentScore === 40) {
        currentScore = "Game";
    }
    p1ScoreEl.textContent = currentScore;
}

function playerTwoScore() {
    let currentScore = Number(p2ScoreEl.textContent)
    
    if (currentScore === 0) {
        currentScore = 15;
    } else if (currentScore === 15) {
        currentScore = 30;
    } else if (currentScore === 30) {
        currentScore = 40;
    } else if (currentScore === 40) {
        currentScore = "Game";
    }
    p2ScoreEl.textContent = currentScore;
}

