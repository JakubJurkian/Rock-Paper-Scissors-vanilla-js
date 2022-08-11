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

let playerChoice = null, computerChoice = null;
let playerPoints = 0, computerPoints = 0;
const computerPossibleChoices = ["rock", "paper", "scissors"];

const gameResult = (playerChoice, computerChoice) => {
  if (
    (playerChoice === "rock" && computerChoice === "rock") ||
    (playerChoice === "paper" && computerChoice === "paper") ||
    (playerChoice === "scissors" && computerChoice === "scissors")
  ) return "Draw!";
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

const loading = (miliseconds) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, miliseconds);
  });
};

let selectingBtnAfterCheckingResult = false;

let afterResult = false;

const selectHandler = async (choice) => {
  if (selectingBtnAfterCheckingResult) return;
  if (playerChoiceBtn.classList.contains('choice-img-show')) {
    playerChoiceBtn.classList.remove('choice-img-show');
    await loading(300);
  }

  setPaddingToBtnFn(choice, playerChoiceBtn);
  playerChoiceBtn.src = `./assets/images/${choice}.svg`;
  playerChoiceBtn.classList.add('choice-img-show');
  playerChoice = choice;
  resultBtn.disabled = false;
};

const resetGame = async (btn) => {
  btn.classList.add('lds-dual-ring');
  await loading(800);
  playerChoice = null;
  computerChoice = null;
  if (resultText.classList.contains('text-result-show')) {
    resultText.classList.remove('text-result-show');
  }

  if (playerChoiceBtn.classList.contains('choice-img-show') && computerChoiceBtn.classList.contains('choice-img-show')) {
    playerChoiceBtn.classList.remove('choice-img-show');
    computerChoiceBtn.classList.remove('choice-img-show');
  }
  await loading(450);
  playerChoiceBtn.src = `./assets/images/field.svg`;
  computerChoiceBtn.src = `./assets/images/field.svg`;
  resultText.textContent = null;
  clearBtn.disabled = true;
  resultBtn.disabled = true;
  selectingBtnAfterCheckingResult = false;
  btn.classList.remove('lds-dual-ring');
};

const setPaddingToBtnFn = (whoseChoice, whoseBtn) => {
  switch(whoseChoice) {
    case 'paper':
      whoseBtn.style.padding = '2px 0 0 0';
      break;
    case 'scissors':
      whoseBtn.style.padding = '14px 0 0 0';
      break;
    case 'rock':
      whoseBtn.style.padding = '10px 14px 0 0';
      break;
    default:
      //...
  }
};

rockBtn.addEventListener("click", selectHandler.bind(null, "rock"));
paperBtn.addEventListener("click", selectHandler.bind(null, "paper"));
scissorsBtn.addEventListener("click", selectHandler.bind(null, "scissors"));

let resultChecked = false;

resultBtn.addEventListener("click", async () => {
  if (!playerChoice) return;

  if (computerChoiceBtn.classList.contains('choice-img-show')) {
    computerChoiceBtn.classList.remove('choice-img-show');
  }

  resultBtn.classList.add('lds-dual-ring');
  resultBtn.textContent = '';
  await loading(800);
  selectingBtnAfterCheckingResult = true;

  computerChoice = computerPossibleChoices[Math.floor(Math.random() * computerPossibleChoices.length)];
  setPaddingToBtnFn(computerChoice, computerChoiceBtn);
  computerChoiceBtn.src = `./assets/images/${computerChoice}.svg`;
  computerChoiceBtn.classList.add('choice-img-show');
  computerChoiceBtn.style.transform = "scaleX(-1)";

  const result = gameResult(playerChoice, computerChoice);

  if (playerPoints > 0 || computerPoints > 0) {
    resetBtn.disabled = false;
  }

  resultText.textContent = result;
  resultText.classList.add('text-result-show');
  resultBtn.classList.remove('lds-dual-ring');
  resultBtn.textContent = 'Run Game';
  clearBtn.disabled = false;
  resultBtn.disabled = true;
});

clearBtn.addEventListener("click", async () => {
  clearBtn.textContent = '';
  await resetGame(clearBtn);
  clearBtn.textContent = 'New Game';
});

resetBtn.addEventListener('click', async () => {
  resetBtn.textContent = '';
  await resetGame(resetBtn);
  playerPoints = 0;
  computerPoints = 0;
  playerPointsField.textContent = 0;
  computerPointsField.textContent = 0;
  resetBtn.textContent = 'Reset Score';
  resetBtn.disabled = true;
});
