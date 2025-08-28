const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const error = document.getElementById("error");
const attemptsLeft = document.getElementById("attempts");
const historyList = document.getElementById("history");
const bestScoreDisplay = document.getElementById("bestScore");

let randomNumber, attempts, history, bestScore;

function initGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 5;
  history = [];
  attemptsLeft.textContent = attempts;
  historyList.innerHTML = "";
  message.textContent = "";
  error.textContent = "";
  guessInput.value = "";
  guessInput.disabled = false;
  guessBtn.disabled = false;

  bestScore = localStorage.getItem("bestScore");
  bestScoreDisplay.textContent = bestScore ? bestScore : "--";
}

function updateMessage(text, type) {
  message.textContent = text;
  message.className = type;
}

guessBtn.addEventListener("click", () => {
  const guess = parseInt(guessInput.value);

  // validation
  if (isNaN(guess) || guess < 1 || guess > 100) {
    error.textContent = "Please enter a number between 1 and 100!";
    return;
  } else {
    error.textContent = "";
  }

  if (attempts <= 0) return;

  attempts--;
  attemptsLeft.textContent = attempts;
  history.push(guess);
  const li = document.createElement("li");
  li.textContent = guess;
  historyList.appendChild(li);

  if (guess === randomNumber) {
    updateMessage("🎉 Correct! You win!", "success");
    guessBtn.disabled = true;
    guessInput.disabled = true;

    let usedAttempts = 10 - attempts;
    if (!bestScore || usedAttempts < bestScore) {
      localStorage.setItem("bestScore", usedAttempts);
      bestScoreDisplay.textContent = usedAttempts;
    }
  } else if (guess < randomNumber) {
    updateMessage("Too low! 📉", "fail");
  } else {
    updateMessage("Too high! 📈", "fail");
  }

  if (attempts === 0 && guess !== randomNumber) {
    updateMessage(`❌ Game Over! Number was ${randomNumber}`, "fail");
    guessBtn.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = "";
  guessInput.focus();
});

resetBtn.addEventListener("click", initGame);

guessInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && !guessBtn.disabled) {
    guessBtn.click();
  }
});
initGame();
