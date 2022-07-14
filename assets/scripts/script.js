const rockBtn = document.querySelector(".rock");
const paperBtn = document.querySelector(".paper");
const scissorsBtn = document.querySelector(".scissors");
const playerChoiceBtn = document.querySelector(".player-choice-img");
const computerChoiceBtn = document.querySelector(".computer-choice-img");
const resultBtn = document.querySelector(".result-btn");
const resultText = document.querySelector(".text-result");
const resetBtn = document.querySelector(".reset-btn");

let playerChoice = null;
let computerChoice = null;
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
    return "You won!";
  }
  if (
    (playerChoice === "scissors" && computerChoice === "rock") ||
    (playerChoice === "rock" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "scissors")
  ) {
    return "You lost!";
  }
};

let afterCheckingResult = false;

const selectHandler = (choice) => {
  if (afterCheckingResult) {
    return;
  }
  playerChoiceBtn.src = `../images/${choice}.png`;
  playerChoiceBtn.style.height = "130px";
  playerChoice = choice;
  resultBtn.disabled = false;
};

rockBtn.addEventListener("click", selectHandler.bind(null, "rock"));
paperBtn.addEventListener("click", selectHandler.bind(null, "paper"));
scissorsBtn.addEventListener("click", selectHandler.bind(null, "scissors"));

resultBtn.addEventListener("click", () => {
  if (!playerChoice) {
    return;
  }
  afterCheckingResult = true;
  computerChoice = computerChoices[Math.floor(Math.random() * computerChoices.length)];
  computerChoiceBtn.src = `../images/${computerChoice}.png`;
  const result = whoWin(playerChoice, computerChoice);
  resultText.textContent = result;
  resetBtn.disabled = false;
  resultBtn.disabled = true;
});

resetBtn.addEventListener("click", () => {
  playerChoice = null;
  computerChoice = null;
  resultText.textContent = null;
  resetBtn.disabled = true;
  resultBtn.disabled = true;
  afterCheckingResult = false;
  playerChoiceBtn.src = `../assets/images/question.png`;
  computerChoiceBtn.src = `../assets/images/question.png`;
});
