/* 
 * ===========================================================
 * IMPORTANT GLOBAL VARIABLES
 * ===========================================================
 */ 
let p1ScoreEl = document.getElementById("p1-score")
let p1Score = 0
let p1GameEl = document.getElementById("p1-total-games")
let p1GameScore = 0

let p2ScoreEl = document.getElementById("p2-score")
let p2Score = 0
let p2GameEl = document.getElementById("p2-total-games")
let p2GameScore = 0

/* 
 * ===========================================================
 * MAIN LOGIC
 * ===========================================================
 */ 
function playerOneScore() {
    let p1CurrentScore = evaluateScore(p1Score, p2Score)
    const result = resolveTennisPoint(p1CurrentScore, p2Score, p1GameScore)

    p1Score = result.playerScore
    p2Score = result.opponentScore
    p1GameScore = result.playerGameScore

    displayScore(p1Score, p2Score, p1GameScore, p1ScoreEl, p2ScoreEl, p1GameEl)
}

function playerTwoScore() {
    let p2CurrentScore = evaluateScore(p2Score, p1Score)
    const result = resolveTennisPoint(p2CurrentScore, p1Score, p2GameScore)

    p2Score = result.playerScore
    p1Score = result.opponentScore
    p2GameScore = result.playerGameScore

    displayScore(p2Score, p1Score, p2GameScore, p2ScoreEl, p1ScoreEl, p2GameEl)
}

/* 
 * ===========================================================
 * HELPER FUNCTIONS
 * ===========================================================
 */ 
function evaluateScore(playerScore, opponentScore) {
    if (playerScore === 0) playerScore = 15
    else if (playerScore === 15) playerScore = 30
    else if (playerScore === 30) playerScore = 40
    else if (playerScore === 40) {
        if (opponentScore !== 40 && opponentScore !== "AD") {
            return "GAME"
        } else {
            if (opponentScore === 40) {
                return "AD"
            } else {
                return "DEUCE"
            }
        }  
    } else if (playerScore === "AD") {
        return "GAME"
    }
    return playerScore
}

function resolveTennisPoint(playerScore, opponentScore, playerGameScore) {
    if (playerScore === "GAME") {
        playerGameScore += 1
        playerScore = 0
        opponentScore = 0
    }
    if (playerScore === "DEUCE") {
        playerScore = 40
        opponentScore = 40
    }
    if (playerScore === "AD" && opponentScore === "AD") {
        playerScore = 40
    }
    return { playerScore, opponentScore, playerGameScore }
}

function displayScore(playerScore, opponentScore, playerGameScore, playerScoreEl, opponentScoreEl, playerGameScoreEl) {
    opponentScoreEl.textContent = opponentScore
    playerScoreEl.textContent = playerScore
    playerGameScoreEl.textContent = "GAMES: " + playerGameScore
}
