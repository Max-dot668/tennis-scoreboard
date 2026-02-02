/* 
 * ===========================================================
 * IMPORTANT GLOBAL VARIABLES
 * ===========================================================
 */ 
let p1ScoreEl = document.getElementById("p1-score")
let p1Score = Number(p1ScoreEl.textContent)
let p1GameEl = document.getElementById("p1-total-games")
let p1GameScore = 0

let p2ScoreEl = document.getElementById("p2-score")
let p2Score = Number(p2ScoreEl.textContent)
let p2GameEl = document.getElementById("p2-total-games")
let p2GameScore = 0

/* 
 * ===========================================================
 * MAIN LOGIC
 * ===========================================================
 */ 
function playerOneScore() {
    p1Score = evaluateScore(p1Score)

    if (p1Score === "GAME") {
        p1GameScore += 1
        p1Score = 0
    }
    p1ScoreEl.textContent = p1Score
    p1GameEl.textContent = "GAMES: " + p1GameScore
}

function playerTwoScore() {
    p2Score = evaluateScore(p2Score)

    if (p2Score === "GAME") {
        p2GameScore += 1
        p2Score = 0
    }
    p2ScoreEl.textContent = p2Score
    p2GameEl.textContent = "GAMES: " + p2GameScore
}

/* 
 * ===========================================================
 * HELPER FUNCTIONS
 * ===========================================================
 */ 
function evaluateScore(score) {
    if (score === 0) score = 15
    else if (score === 15) score = 30
    else if (score === 30) score = 40
    else if (score === 40) {
        if (p2Score !== 40) {
            return "GAME"
        } else {
            return "AD"
        }
    } else if (score === "AD") {
        return "GAME"
    }
    return score
}
