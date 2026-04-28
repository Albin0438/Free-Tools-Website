const grid = document.getElementById("grid");
const turnText = document.getElementById("turn");
const resultText = document.getElementById("result");
const modeLabel = document.getElementById("modeLabel");

let board = Array(9).fill("");
let current = "S";
let mode = "pvp";
let gameOver = false;

/* Create grid */
function createGrid() {
  grid.innerHTML = "";
  board = Array(9).fill("");
  gameOver = false;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("button");
    cell.dataset.index = i;

    cell.addEventListener("click", () => handleMove(i, cell));

    grid.appendChild(cell);
  }
}

/* Handle move */
function handleMove(i, cell) {
  if (board[i] || gameOver) return;

  board[i] = current;
  cell.textContent = current;

  const line = checkSOS();

  if (line) {
    drawLine(line);
    resultText.textContent = `${current} formed SOS! 🎉`;
    gameOver = true;
    return;
  }

  switchTurn();

  if (mode === "ai" && current === "O") {
    setTimeout(aiMove, 400);
  }
}

/* Turn logic */
function switchTurn() {
  current = current === "S" ? "O" : "S";
  turnText.textContent = current;
}

/* Active button helper */
function setActiveButton(groupSelector, clickedButton) {
  const buttons = document.querySelectorAll(groupSelector + " button");
  buttons.forEach(btn => btn.classList.remove("active"));
  clickedButton.classList.add("active");
}

/* Mode selection */
function selectMode(btn, modeType) {
  setActiveButton("#modeGroup", btn);
  setMode(modeType);
}

/* Mode setup */
function setMode(m) {
  mode = m;

  // Update label (IMPORTANT for UX)
  modeLabel.textContent =
    m === "pvp" ? "1 vs 1" :
    m === "ai" ? "Vs Computer" :
    "2 vs 2";

  resetGame();
}

/* SOS detection */
function checkSOS() {
  const patterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let p of patterns) {
    if (
      board[p[0]] === "S" &&
      board[p[1]] === "O" &&
      board[p[2]] === "S"
    ) return p;
  }
  return null;
}

/* Highlight win */
function drawLine(pattern) {
  pattern.forEach(i => {
    grid.children[i].classList.add("sos-win");
  });
}

/* AI move */
function aiMove() {
  const empty = board
    .map((v, i) => v === "" ? i : null)
    .filter(v => v !== null);

  if (empty.length === 0) return;

  const rand = empty[Math.floor(Math.random() * empty.length)];
  handleMove(rand, grid.children[rand]);
}

/* Reset */
function resetGame() {
  current = "S";
  turnText.textContent = current;
  resultText.textContent = "";
  createGrid();
}

/* Init */
createGrid();

/* Set default mode button active */
document.querySelector("#modeGroup button").classList.add("active");

/* Set default mode label */
modeLabel.textContent = "1 vs 1";