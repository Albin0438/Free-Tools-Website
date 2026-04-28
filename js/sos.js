/* ==========================
   ELEMENTS
========================== */

const grid = document.getElementById("grid");
const turnText = document.getElementById("turn");
const resultText = document.getElementById("result");
const modeLabel = document.getElementById("modeLabel");

/* ==========================
   STATE
========================== */

let board = [];
let current = "S";
let mode = "pvp";
let gameOver = false;

/* ==========================
   CONSTANTS
========================== */

const patterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

/* ==========================
   GRID SETUP
========================== */

function createGrid() {
  grid.innerHTML = "";
  board = Array(9).fill("");
  gameOver = false;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("button");
    cell.dataset.index = i;

    cell.addEventListener("click", () => handleMove(i));

    grid.appendChild(cell);
  }
}

/* ==========================
   MOVE HANDLER
========================== */

function handleMove(i) {
  if (board[i] || gameOver) return;

  const cell = grid.children[i];
  board[i] = current;
  cell.textContent = current;

  const line = checkSOS();

  if (line) {
    endGame(line);
    return;
  }

  if (isDraw()) {
    resultText.textContent = "It's a draw 🤝";
    gameOver = true;
    return;
  }

  switchTurn();

  if (mode === "ai" && current === "O") {
    setTimeout(aiMove, 400);
  }
}

/* ==========================
   TURN SWITCH
========================== */

function switchTurn() {
  current = current === "S" ? "O" : "S";
  turnText.textContent = current;
}

/* ==========================
   WIN / DRAW
========================== */

function checkSOS() {
  for (let p of patterns) {
    if (
      board[p[0]] === "S" &&
      board[p[1]] === "O" &&
      board[p[2]] === "S"
    ) return p;
  }
  return null;
}

function isDraw() {
  return board.every(cell => cell !== "");
}

function endGame(pattern) {
  drawLine(pattern);
  gameOver = true;

  let msg = "";

  if (mode === "ai") {
    msg = current === "S"
      ? "You win 🎉"
      : "Computer wins 🤖";
  } else if (mode === "team") {
    msg = current === "S"
      ? "Team S wins 🎉"
      : "Team O wins 🎉";
  } else {
    msg = `${current} wins 🎉`;
  }

  resultText.textContent = `${msg} (SOS formed)`;
}

/* ==========================
   VISUALS
========================== */

function drawLine(pattern) {
  pattern.forEach(i => {
    grid.children[i].classList.add("sos-win");
  });
}

/* ==========================
   AI (SMART)
========================== */

function aiMove() {
  if (gameOver) return;

  // 1. Try to WIN
  let move = findBestMove("O");
  if (move !== null) {
    handleMove(move);
    return;
  }

  // 2. Try to BLOCK player
  move = findBestMove("S");
  if (move !== null) {
    handleMove(move);
    return;
  }

  // 3. Random fallback
  const empty = getEmptyCells();
  const rand = empty[Math.floor(Math.random() * empty.length)];
  handleMove(rand);
}

/* Find move that creates SOS */
function findBestMove(player) {
  for (let i = 0; i < 9; i++) {
    if (board[i] !== "") continue;

    board[i] = player;

    const win = checkSOS();

    board[i] = "";

    if (win) return i;
  }
  return null;
}

function getEmptyCells() {
  return board
    .map((v, i) => v === "" ? i : null)
    .filter(v => v !== null);
}

/* ==========================
   MODE HANDLING
========================== */

function setActiveButton(groupSelector, clickedButton) {
  const buttons = document.querySelectorAll(groupSelector + " button");
  buttons.forEach(btn => btn.classList.remove("active"));
  clickedButton.classList.add("active");
}

function selectMode(btn, modeType) {
  setActiveButton("#modeGroup", btn);
  setMode(modeType);
}

function setMode(m) {
  mode = m;

  modeLabel.textContent =
    m === "pvp" ? "1 vs 1" :
    m === "ai" ? "Vs Computer" :
    "2 vs 2";

  resetGame();
}

/* ==========================
   RESET
========================== */

function resetGame() {
  current = "S";
  turnText.textContent = current;
  resultText.textContent = "";
  createGrid();
}

/* ==========================
   INIT
========================== */

window.onload = () => {
  createGrid();

  // default UI state
  const firstBtn = document.querySelector("#modeGroup button");
  if (firstBtn) firstBtn.classList.add("active");

  modeLabel.textContent = "1 vs 1";
  turnText.textContent = current;
};