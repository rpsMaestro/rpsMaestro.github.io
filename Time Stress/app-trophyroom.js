//This is the variables section


import {userScore, computerScore, initialResult, totalRock, totalPaper, totalScissors,
missedCount} from "./main.js";
//This fills in the invisible field to submit when button pressed
text.value = 'Initial Round:' + initialResult + '. Rocks: ' + totalRock + '. Papers: ' + totalPaper + '. Scissors: ' + totalScissors;
//These are imported values from main.js
function main () {
  bigRedButton.addEventListener('click', function() {
    revealStats();
  })
}
function revealStats () {
  stats_div.classList.remove('hidden');
  finalScore.innerHTML = "Final Score " + userScore + ":" + computerScore;
  scorePercent.innerHTML = "Score Percent (your score over the computer's) " + userScore/computerScore + "%";
  numberMissed.innerHTML = "You missed" + missedCount + " rounds.";
}
window.onload = main();
