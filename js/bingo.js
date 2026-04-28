const numberDisplay = document.getElementById("number");
const historyDisplay = document.getElementById("history");

let numbers = [];
let history = [];

/* Initialize numbers 1–75 */
function initGame() {
  numbers = [];
  history = [];

  for (let i = 1; i <= 75; i++) {
    numbers.push(i);
  }

  numberDisplay.textContent = 'Click "Draw Number"';
  historyDisplay.textContent = "-";
}

/* Draw a number */
function drawNumber() {
  if (numbers.length === 0) {
    numberDisplay.textContent = "All numbers drawn!";
    return;
  }

  const randIndex = Math.floor(Math.random() * numbers.length);
  const num = numbers.splice(randIndex, 1)[0];

  const letter = getBingoLetter(num);
  const result = `${letter} - ${num}`;

  history.push(result);

  numberDisplay.textContent = result;
  historyDisplay.textContent = history.join(", ");
}

/* Get B I N G O letter */
function getBingoLetter(num) {
  if (num <= 15) return "B";
  if (num <= 30) return "I";
  if (num <= 45) return "N";
  if (num <= 60) return "G";
  return "O";
}

/* Reset game */
function resetGame() {
  initGame();
}

/* Init on load */
initGame();