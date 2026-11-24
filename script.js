const choiceButtons = document.querySelectorAll(".choice-btn");
const userScoreEl = document.getElementById("user-score");
const compScoreEl = document.getElementById("comp-score");
const userChoiceEl = document.getElementById("user-choice");
const compChoiceEl = document.getElementById("comp-choice");
const resultBannerEl = document.getElementById("result-banner");
const roundMessageEl = document.getElementById("round-message");
const restartBtn = document.getElementById("restart-btn");

const options = ["rock", "paper", "scissors"];

const labels = {
  rock: "🪨 Rock",
  paper: "📄 Paper",
  scissors: "✂️ Scissors",
};

const beats = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

let userScore = 0;
let compScore = 0;

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function setResultBanner(text, type) {
  resultBannerEl.textContent = text;
  resultBannerEl.className = `result-banner ${type}`;
}

function playRound(userChoice) {
  const compChoice = getComputerChoice();

  userChoiceEl.textContent = labels[userChoice];
  compChoiceEl.textContent = labels[compChoice];

  if (userChoice === compChoice) {
    setResultBanner("Draw!", "draw");
    roundMessageEl.textContent = `Both picked ${labels[userChoice]}. Nobody scores this round!`;
    return;
  }

  if (beats[userChoice] === compChoice) {
    userScore++;
    userScoreEl.textContent = userScore;
    setResultBanner("You Win!", "win");
    roundMessageEl.textContent = `${labels[userChoice]} beats ${labels[compChoice]} — nice move!`;
  } else {
    compScore++;
    compScoreEl.textContent = compScore;
    setResultBanner("You Lose!", "lose");
    roundMessageEl.textContent = `${labels[compChoice]} beats ${labels[userChoice]} — computer takes this point.`;
  }
}

function resetGame() {
  userScore = 0;
  compScore = 0;
  userScoreEl.textContent = "0";
  compScoreEl.textContent = "0";
  userChoiceEl.textContent = "-";
  compChoiceEl.textContent = "-";
  setResultBanner("Make your first move!", "neutral");
  roundMessageEl.textContent = "Game reset! Pick Rock, Paper, or Scissors to start fresh.";
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedChoice = button.dataset.choice;
    playRound(selectedChoice);
  });
});

restartBtn.addEventListener("click", resetGame);