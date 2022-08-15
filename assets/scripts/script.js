const rockBtn = document.querySelector(".rock");
const paperBtn = document.querySelector(".paper");
const scissorsBtn = document.querySelector(".scissors");
const playerChoiceBtn = document.querySelector(".player-choice-img");
const computerChoiceBtn = document.querySelector(".computer-choice-img");
const resultBtn = document.querySelector(".result-btn");
const resultText = document.querySelector(".text-result");
const resetBtn = document.querySelector(".reset-btn");
const clearBtn = document.querySelector('.clear-btn');
const playerAvatar = document.querySelector('.player img');
const computerAvatar = document.querySelector('.computer img');
const playerPointsField = document.querySelector(".player-points");
const computerPointsField = document.querySelector(".computer-points");

let playerChoice = null, computerChoice = null;
let playerPoints = 0, computerPoints = 0;
let selectingBtnAfterCheckingResult = false;
const computerPossibleChoices = ["rock", "paper", "scissors"];

const gameResult = (player, computer) => {
  if (
    (player === "rock" && computer === "rock") ||
    (player === "paper" && computer === "paper") ||
    (player === "scissors" && computer === "scissors")
  ) return "Draw!";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "You won!";
  }
  if (
    (player === "scissors" && computer === "rock") ||
    (player === "rock" && computer === "paper") ||
    (player === "paper" && computer === "scissors")
  ) {
    return "You lost!";
  }
};

const addingPoints = async(player, computer) => {
  const result = gameResult(player, computer);
  if (result === 'You won!') {
    await loading(300);
    playerPoints += 1;
    playerPointsField.classList.add('hide');
    await loading(200);
    playerPointsField.textContent = playerPoints;
    playerPointsField.classList.remove('hide');
    playerAvatar.classList.add('zoom-in');
    await loading(400);
    playerAvatar.classList.remove('zoom-in');
  }
  if (result === 'You lost!') {
    await loading(300);
    computerPoints += 1;
    computerPointsField.classList.add('hide');
    await loading(200);
    computerPointsField.textContent = computerPoints;
    computerPointsField.classList.remove('hide');
    computerAvatar.classList.add('zoom-in');
    await loading(400);
    computerAvatar.classList.remove('zoom-in');
  }
};

const loading = (miliseconds) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, miliseconds);
  });
};

const selectHandler = async(choice) => {
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

const computerPick = () => {
  computerChoice = computerPossibleChoices[Math.floor(Math.random() * computerPossibleChoices.length)];
  setPaddingToBtnFn(computerChoice, computerChoiceBtn);
  computerChoiceBtn.src = `./assets/images/${computerChoice}.svg`;
  computerChoiceBtn.classList.add('choice-img-show');
  computerChoiceBtn.style.transform = "scaleX(-1)";
};

const newGame = async (btn) => {
  clearBtn.disabled = true;
  btn.classList.add('lds-dual-ring');
  await loading(800);
  playerChoice = null;
  computerChoice = null;
  if (resultText.classList.contains('text-result-show')) {
    resultText.classList.remove('text-result-show');
  }

  if (playerChoiceBtn.classList.contains('choice-img-show') || 
  computerChoiceBtn.classList.contains('choice-img-show')) {
    playerChoiceBtn.classList.remove('choice-img-show');
    computerChoiceBtn.classList.remove('choice-img-show');
  }
  await loading(450);
  playerChoiceBtn.src = `./assets/images/field.svg`;
  computerChoiceBtn.src = `./assets/images/field.svg`;
  resultText.textContent = null;
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
      return;
  }
};

rockBtn.addEventListener("click", selectHandler.bind(null, "rock"));
paperBtn.addEventListener("click", selectHandler.bind(null, "paper"));
scissorsBtn.addEventListener("click", selectHandler.bind(null, "scissors"));

resultBtn.addEventListener("click", async () => {
  if (!playerChoice) return;
  if (computerChoiceBtn.classList.contains('choice-img-show')) {
    computerChoiceBtn.classList.remove('choice-img-show');
  }

  selectingBtnAfterCheckingResult = true;

  resultBtn.disabled = true;
  resultBtn.classList.add('lds-dual-ring');
  resultBtn.textContent = '';
  await loading(800);
  computerPick();
  const result = gameResult(playerChoice, computerChoice);
  resultText.textContent = result;
  resultText.classList.add('text-result-show');
  resultBtn.classList.remove('lds-dual-ring');
  resultBtn.textContent = 'Run Game';
  clearBtn.disabled = false;

  await addingPoints(playerChoice, computerChoice);
  if (playerPoints > 0 || computerPoints > 0) {
    resetBtn.disabled = false;
  }
});

clearBtn.addEventListener("click", async () => {
  clearBtn.textContent = '';
  await newGame(clearBtn);
  clearBtn.textContent = 'New Game';
});

resetBtn.addEventListener('click', async () => {
  resetBtn.disabled = true;
  resetBtn.textContent = '';
  playerPoints = 0;
  computerPoints = 0;
  playerPointsField.classList.add('hide');
  computerPointsField.classList.add('hide');
  await newGame(resetBtn);
  playerPointsField.textContent = playerPoints;
  computerPointsField.textContent = computerPoints;
  playerPointsField.classList.remove('hide');
  computerPointsField.classList.remove('hide');
  resetBtn.textContent = 'Reset Game';
});
