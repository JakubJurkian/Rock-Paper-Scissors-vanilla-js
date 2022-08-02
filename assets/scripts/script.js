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
  
  if (choice === 'paper') {
    playerChoiceBtn.style.padding = '2px 0 0 0';
  }
  if (choice === 'scissors') {
    playerChoiceBtn.style.padding = '12px 0 0 0';
  } 
  if (choice === 'rock') {
    playerChoiceBtn.style.padding = '10px 14px 0 0';
  }

  playerChoiceBtn.src = `./assets/images/${choice}.svg`;
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
  playerChoiceBtn.src = `./assets/images/field.svg`;
  computerChoiceBtn.src = `./assets/images/field.svg`;
};

const loading = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 800);
  });
};

rockBtn.addEventListener("click", selectHandler.bind(null, "rock"));
paperBtn.addEventListener("click", selectHandler.bind(null, "paper"));
scissorsBtn.addEventListener("click", selectHandler.bind(null, "scissors"));

resultBtn.addEventListener("click", async () => {
  if (!playerChoice) return;

  resultBtn.textContent = 'Loading...';
  await loading();
  afterCheckingResult = true;
  computerChoice = computerChoices[Math.floor(Math.random() * computerChoices.length)];

  if (computerChoice === 'paper') {
    computerChoiceBtn.style.padding = '2px 0 0 0';
  }
  if (computerChoice === 'scissors') {
    computerChoiceBtn.style.padding = '12px 0 0 0';
  } 
  if (computerChoice === 'rock') {
    computerChoiceBtn.style.padding = '10px 14px 0 0';
  }


  computerChoiceBtn.src = `./assets/images/${computerChoice}.svg`;
  computerChoiceBtn.style.transform = "scaleX(-1)";
  const result = whoWin(playerChoice, computerChoice);

  if (playerPoints > 0 || computerPoints > 0) {
    clearBtn.disabled = false;
  }

  resultText.textContent = result;
  resultBtn.textContent = 'Run Game';
  resetBtn.disabled = false;
  resultBtn.disabled = true;
});

resetBtn.addEventListener("click", async () => {
  resetBtn.textContent = 'Loading...';
  await loading();
  resetGame();
  resetBtn.textContent = 'New Game';
});

clearBtn.addEventListener('click', async () => {
  clearBtn.textContent = 'Loading...';
  await loading();
  playerPoints = 0;
  computerPoints = 0;
  playerPointsField.textContent = 0;
  computerPointsField.textContent = 0;
  clearBtn.disabled = true;
  resetGame();
  clearBtn.textContent = 'Reset Score';
});
