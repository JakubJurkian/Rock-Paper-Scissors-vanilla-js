const rockBtn = document.querySelector(".rock");
const paperBtn = document.querySelector(".paper");
const scissorsBtn = document.querySelector(".scissors");
const playerChoiceBtn = document.querySelector(".player-choice-img");
const computerChoiceBtn = document.querySelector(".computer-choice-img");
const resultBtn = document.querySelector(".result-btn");
const resultText = document.querySelector(".text-result");
const resetBtn = document.querySelector(".reset-btn");
const clearBtn = document.querySelector('.clear-btn');
const playerPointsField = document.querySelector(".player-points");
const computerPointsField = document.querySelector(".computer-points");

let playerChoice = null;
let computerChoice = null;
let playerPoints = 0;
let computerPoints = 0;
const computerChoices = ["rock", "paper", "scissors"];

const whoWin = (playerChoice, computerChoice) => {
  if (
    (playerChoice === "rock" && computerChoice === "rock") ||
    (playerChoice === "paper" && computerChoice === "paper") ||
    (playerChoice === "scissors" && computerChoice === "scissors")
  ) {
    return "Draw!";
  }
  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    playerPoints += 1;
    playerPointsField.textContent = playerPoints;
    return "You won!";
  }
  if (
    (playerChoice === "scissors" && computerChoice === "rock") ||
    (playerChoice === "rock" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "scissors")
  ) {
    computerPoints += 1;
    computerPointsField.textContent = computerPoints;
    return "You lost!";
  }
};

let afterCheckingResult = false;

const selectHandler = (choice) => {
  if (afterCheckingResult) return;
  playerChoiceBtn.src = `./assets/images/${choice}.png`;
  playerChoice = choice;
  resultBtn.disabled = false;
};

const resetGame = () => {
  playerChoice = null;
  computerChoice = null;
  resultText.textContent = null;
  resetBtn.disabled = true;
  resultBtn.disabled = true;
  afterCheckingResult = false;
  playerChoiceBtn.src = `./assets/images/question.png`;
  computerChoiceBtn.src = `./assets/images/question.png`;
  computerChoiceBtn.style.transform = "scaleX(1)";
};

rockBtn.addEventListener("click", selectHandler.bind(null, "rock"));
paperBtn.addEventListener("click", selectHandler.bind(null, "paper"));
scissorsBtn.addEventListener("click", selectHandler.bind(null, "scissors"));

resultBtn.addEventListener("click", () => {
  if (!playerChoice) return;

  if (playerPoints > 0 || computerPoints > 0) {
    clearBtn.disabled = false;
  }
  
  afterCheckingResult = true;
  computerChoice = computerChoices[Math.floor(Math.random() * computerChoices.length)];
  computerChoiceBtn.src = `./assets/images/${computerChoice}.png`;
  computerChoiceBtn.style.transform = "scaleX(-1)";
  const result = whoWin(playerChoice, computerChoice);
  resultText.textContent = result;
  resetBtn.disabled = false;
  resultBtn.disabled = true;
});

resetBtn.addEventListener("click", () => {
 resetGame();
});

clearBtn.addEventListener('click', () => {
  playerPoints = 0;
  computerPoints = 0;
  playerPointsField.textContent = 0;
  computerPointsField.textContent = 0;
  clearBtn.disabled = true;
  resetGame();
});
