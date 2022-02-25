/* This is the variables section. Here, I set up all the variables that will be
and also convert some IDs into uniform Javascript variables. I use an undersco
to represent that it is an html-javascript variable (html-javascript
is also known as Document Object Model)*/
let userScore = 0;
let computerScore = 0;
let initialRound = true;
let finalRound = false;
let initialResult;
let totalRock = 0;
let totalPaper = 0;
let totalScissors = 0;
let missedCount = 0;
let timerCount;
const form = document.getElementById('form');
const timer = setInterval(function () {return shoot()}, 500);
const submitButton = document.getElementById('submit-button');
const nameForm = document.getElementById('name-form');
const stats_div = document.getElementById('stats');
const text = document.getElementById('text');
const choices = document.getElementById('choices');
const scorePercent = document.getElementById('percent-score');
const numberMissed = document.getElementById('number-missed');
const secretMessage = document.getElementById('secret-message');
const startButton = document.getElementById('start-button');
const actionMessage = document.getElementById('action-message');
const userLabel_div = document.getElementById('user-label');
const computerLabel_div = document.getElementById('computer-label');
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const computerScore_div = document.querySelector('.scoreboard');
const result_div = document.querySelector('.result');
const rock_div = document.getElementById('Rock');
const paper_div = document.getElementById('Paper');
const scissors_div = document.getElementById('Scissors');

/* Function main sets up the event listeners necessary. Event listeners have two
arguments (inputs) they use: something to listen for, e.g. a click, and a function
 to execute when that event is heard. Here, the listeners are listening for clicks
 on any of the three images/choices, and then will execute an anonymous Function
 that then execute another function (event listeners are weird in that they cannot
directly call a function, only execute one of their own, so I had to create a funciton
that called a function). They then execute funtion game with an argument corollating
to the user's chosen symbol.*/
/*
function start() {
  startButton.addEventListener('click', function() {
    start();
  })}
*/
function main() {
  rock_div.addEventListener('click', function() {
    updateResults('Rock');
    game('Rock');
  })

  paper_div.addEventListener('click', function() {
    updateResults('Paper');
    game('Paper');
  })

  scissors_div.addEventListener('click', function() {
    updateResults('Scissors');
    game('Scissors');
  })
  resetTimer(1)
}
//The num here is because of the odd interaction the computer does when someone
//misses a round. They should get an extra half second if the missed the last
//Because then it also goes through all three.
function resetTimer (num) {
  clearInterval('timer');
  timerCount = num;
  timer;
}
function shoot() {
  if (finalRound == false) {
    switch (timerCount) {
      case 1: switchUI('Rock', "<img src='images/Rock.png' class='flash-message'>");
              hideChoices();
              break;
      case 2: switchUI('Paper', "<img src='images/Paper.png' class='flash-message'>");
              hideChoices();
              break;
      case 3: switchUI('Scissors', "<img src='images/Scissors.png' class='flash-message'>");
              hideChoices();
              break;
      case 4: switchUI('Shoot!', '');
              revealChoices();
              break;
      case 5: missedIt('Too Slow');
              resetTimer(0);
    }
  }
  timerCount++;
}
function switchUI (message, image){
  actionMessage.innerHTML = message;
  secretMessage.innerHTML = image;
}
function hideChoices() {
  rock_div.classList.add('hidden');
  paper_div.classList.add('hidden');
  scissors_div.classList.add('hidden');
}
function revealChoices() {
  rock_div.classList.remove('hidden');
  paper_div.classList.remove('hidden');
  scissors_div.classList.remove('hidden');
}
//If it is the first round of the game, then update results will  trigger from main
 function updateResults (choice) {
  if (initialRound == true) {
    initialResult = choice;
  }
  if (choice == 'Rock') {
    totalRock++;
  }
  else if (choice == 'Paper') {
    totalPaper++;
  }
  else if (choice == 'Scissors') {
    totalScissors++;
  }
}
/*Once function Game is executed by the event listeners, it then defines the
variable computerChoice with the function getComputerChoice, which randomly
generates rock, paper, or scissors. The computer then compares the user's
and the computer's choice to the nine possible outcomes of the game. When the
correct situation is found, it then executes the next function beneath it
and inserts both the computer's and the users's choice. All three functions
are oriented towards the player--the win and lose functions refer to the
player's win and loss*/
function game(userChoice) {
  const computerChoice = getComputerChoice();
  if (timerCount > 4) {
    switch (userChoice + computerChoice) {
      case 'RockScissors':
      case 'ScissorsPaper':
      case 'PaperRock':
        win(userChoice, computerChoice);
        break;
      case 'ScissorsRock':
      case 'PaperScissors':
      case 'RockPaper':
        lose(userChoice, computerChoice);
        break;
      case 'RockRock':
      case 'PaperPaper':
      case 'ScissorsScissors':
        draw(userChoice, computerChoice);
    }
  }
}
/* This is the function that randomly generates the computer's choice.
It works by defining the three choices--rock paper scissors--into an array,
or set of data (indicated by the brackets
). It then creates a random number between 0 and 3 exclusive, then rounds down--The first datum
in an array is considered number 0 (how computer numbering works). The random
number then determines the corresponding number: Rock=0 Paper=1 Scissors=2.*/
function getComputerChoice() {
  const choices = ['Rock', 'Paper', 'Scissors'];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}
/*If the user wins, this function is triggered. It increases the user's score by
1 and updates all of the scores unnecessarily. It also temporarily changes the
user's badge name green by adding the green glow class and removing shortly
after.*/
function win (userChoice, computerChoice) {
  userScore++;
  updateScoreboard(' won');
  result_div.innerHTML = userChoice + ' beats ' + computerChoice + '. You win.';
  userLabel_div.classList.add('green-glow');
  setTimeout (function() {userLabel_div.classList.remove('green-glow')}, 500);
}
/* This function does the same as the previous one except the computer's score
goes up by one and the computer's badge flashes green/ */
function lose (userChoice, computerChoice) {
  computerScore++;
  updateScoreboard(' lost');
  result_div.innerHTML = computerChoice + ' beats ' + userChoice + '. You lost...';
  computerLabel_div.classList.add('green-glow');
  setTimeout (function() {computerLabel_div.classList.remove('green-glow')}, 500);
}
function missedIt (message) {
  updateScoreboard('miss');
  actionMessage.innerHTML = message;
  result_div.innerHTML = 'You missed it.';
  missedCount++;
}
/* With this function, nobody's score is updated and both badges flash orange */
function draw () {
  updateScoreboard(' drew');
  result_div.innerHTML = 'It\'s a draw.';
  userLabel_div.classList.add('orange-glow');
  computerLabel_div.classList.add('orange-glow');
  setTimeout (function() {userLabel_div.classList.remove('orange-glow')}, 500);
  setTimeout (function() {computerLabel_div.classList.remove('orange-glow')}, 500);
}
/*This will reset the timer when any three of the end conditions are met, will
update the scoreboard, and checks the initial round to insert the data.*/
function updateScoreboard (result) {
  resetTimer(1);
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  checkInitialRound(result);
  checkFinalRound();
}
/*This will only trigger if they do not miss the round, and it is indeed
the first round. It merely appends "won", "lost", or "drew" onto the chosen
chosen symbol of initial result.*/
function checkInitialRound(result) {
  if (initialRound == true && result != 'miss') {
    initialResult += result;
    initialRound = false;
  }
}
function checkFinalRound () {
  if (userScore == 10 || computerScore == 10) {
  console.log('Initial Round:' + initialResult + '. Number missed: ' + missedCount + '. Rocks: ' + totalRock + '. Papers: ' + totalPaper + '. Scissors: ' + totalScissors);
  finalRound = true;
  activateTrophyroom();
  }
}
function activateTrophyroom () {
  stats_div.classList.remove('away');
  submitButton.classList.remove('away');
  nameForm.classList.remove('away');
  choices.classList.add('away');
  actionMessage.classList.add('away');
  setTimeout(function () {return result_div.innerHTML = 'The results are in.'}, 500);
  numberMissed.innerHTML = 'You missed ' + missedCount + ' rounds.';
  scorePercent.innerHTML = 'Game rating: ' + (userScore * 100 - computerScore * 100 - missedCount * 50);
  text.value = 'Game Rating: ' + (userScore * 100 - computerScore * 100 - missedCount * 50) + '. Initial Round:' + initialResult + '. Number missed: ' + missedCount + '. Rocks: ' + totalRock + '. Papers: ' + totalPaper + '. Scissors: ' + totalScissors;
}
//Running the function
main();
