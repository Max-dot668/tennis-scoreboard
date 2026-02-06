/* 
 * ===========================================================
 * IMPORTANT GLOBAL VARIABLES
 * ===========================================================
 */ 
let p1ScoreEl = document.getElementById("p1-score")
let p1Score = 0
let p1GameEl = document.getElementById("p1-total-games")
let p1GameScore = 0
let p1SetEl = document.getElementById("p1-total-sets")
let p1SetScore = ""

let p2ScoreEl = document.getElementById("p2-score")
let p2Score = 0
let p2GameEl = document.getElementById("p2-total-games")
let p2GameScore = 0
let p2SetEl = document.getElementById("p2-total-sets")
let p2SetScore = ""

let isTieBreak = false

/* 
 * ===========================================================
 * MAIN LOGIC
 * ===========================================================
 */ 
function playerOneScore() {
    let p1CurrentScore = evaluateScore(p1Score, p2Score)
    const result = resolveTennisPoint(p1CurrentScore, p2Score, p1GameScore, p2GameScore, p1SetScore)

    p1Score = result.playerScore
    p2Score = result.opponentScore
    p1GameScore = result.playerGameScore
    p2GameScore = result.opponentGameScore
    p1SetScore = result.playerSetScore

    displayScore(p1Score, p2Score, p1GameScore, p2GameScore, p1ScoreEl, p2ScoreEl, p1GameEl, p2GameEl, p1SetScore, p1SetEl)
}

function playerTwoScore() {
    let p2CurrentScore = evaluateScore(p2Score, p1Score)
    const result = resolveTennisPoint(p2CurrentScore, p1Score, p2GameScore, p1GameScore, p2SetScore)

    p2Score = result.playerScore
    p1Score = result.opponentScore
    p2GameScore = result.playerGameScore
    p1GameScore = result.opponentGameScore
    p2SetScore = result.playerSetScore

    displayScore(p2Score, p1Score, p2GameScore, p1GameScore, p2ScoreEl, p1ScoreEl, p2GameEl, p1GameEl, p2SetScore, p2SetEl)
}

/* 
 * ===========================================================
 * HELPER FUNCTIONS
 * ===========================================================
 */ 
function evaluateScore(playerScore, opponentScore) {
    if (isTieBreak === true) {
        playerScore += 1
    }
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

function resolveTennisPoint(playerScore, opponentScore, playerGameScore, opponentGameScore, playerSetScore) {

    if (isTieBreak === true) {
        // TIEBREAK LOGIC HERE
        const result = handleTieBreak(playerSetScore, playerGameScore, opponentGameScore, playerScore, opponentScore, isTieBreak)
        playerGameScore = result.playerGameScore
        playerScore = result.playerScore
        opponentScore = result.opponentScore
        playerSetScore = result.playerSetScore
        isTieBreak = result.isTieBreak
    }
    else {
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
    
        if (checkSetPoint(playerGameScore, opponentGameScore) == "SETPOINT") {
            playerSetScore += "🎾 " + "(" + playerGameScore + "-" + opponentGameScore + "), "
            playerScore = 0
            opponentScore = 0
            playerGameScore = 0
            opponentGameScore = 0
        } else if (checkSetPoint(playerGameScore, opponentGameScore) == "TIEBREAK") {
            isTieBreak = true
            playerScore = 0
            opponentScore = 0
        }
    }

    return { playerScore, opponentScore, playerGameScore, opponentGameScore, playerSetScore }
}

function displayScore(playerScore, opponentScore, playerGameScore, opponentGameScore, playerScoreEl, opponentScoreEl, playerGameScoreEl, opponentGameScoreEl, playerSetScore, playerSetScoreEl) {
    opponentScoreEl.textContent = opponentScore
    playerScoreEl.textContent = playerScore
    playerGameScoreEl.textContent = "GAMES: " + playerGameScore
    opponentGameScoreEl.textContent = "GAMES: " + opponentGameScore
    playerSetScoreEl.textContent = "SETS: " + playerSetScore
}

function checkSetPoint(playerGameScore, opponentGameScore) {
    if (playerGameScore >= 6 && (playerGameScore - opponentGameScore) >= 2) {
        return "SETPOINT"
    }
    else if (playerGameScore === 6 && opponentGameScore === 6) {
        return "TIEBREAK"
    }
    return "NOTSETPOINT"
}

function handleTieBreak(playerSetScore, playerGameScore, opponentGameScore, playerScore, opponentScore, isTieBreak) {
    // CODE HERE
    if (playerScore >= 7 && (playerScore - opponentScore) >= 2) {
        playerScore = 0
        opponentScore = 0
        playerGameScore += 1
        playerSetScore += "🎾 " + "(" + playerGameScore + "-" + opponentGameScore + "), "
        isTieBreak = false
    }
    return { playerScore, opponentScore, playerGameScore, playerSetScore, isTieBreak }
}