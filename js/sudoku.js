const grid = document.getElementById("sudoku");
const statusText = document.getElementById("status");
const timerText = document.getElementById("timer");
const mistakesText = document.getElementById("mistakes");

let cells = [];
let solution = [];
let currentLevel = "easy";
let mistakes = 0;
let time = 0;
let timerInterval;

/* ==========================
   PUZZLES
========================== */

const puzzles = {
  easy: {
    board: [
      "530070000","600195000","098000060",
      "800060003","400803001","700020006",
      "060000280","000419005","000080079"
    ],
    solution: [
      "534678912","672195348","198342567",
      "859761423","426853791","713924856",
      "961537284","287419635","345286179"
    ]
  },
  medium: {
    board: [
      "000260701","680070090","190004500",
      "820100040","004602900","050003028",
      "009300074","040050036","703018000"
    ],
    solution: [
      "435269781","682571493","197834562",
      "826195347","374682915","951743628",
      "519326874","248957136","763418259"
    ]
  },
  hard: {
    board: [
      "000000907","000420180","000705026",
      "100904000","050000040","000507009",
      "920108000","034059000","507000000"
    ],
    solution: [
      "483651927","659423187","271795326",
      "162934875","795218643","348567219",
      "926178534","834259761","517346892"
    ]
  }
};

/* ==========================
   TIMER
========================== */

function startTimer() {
  clearInterval(timerInterval);
  time = 0;
  timerText.textContent = "0";

  timerInterval = setInterval(() => {
    time++;
    timerText.textContent = time;
  }, 1000);
}

/* ==========================
   GRID
========================== */

function createGrid() {
  grid.innerHTML = "";
  cells = [];

  for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");
    input.maxLength = 1;

    input.addEventListener("input", () => {
      // allow only numbers 1–9
      if (!/^[1-9]$/.test(input.value)) {
        input.value = "";
      }

      // remove previous color
      input.classList.remove("sudoku-correct", "sudoku-wrong", "sudoku-empty");
    });

    cells.push(input);
    grid.appendChild(input);
  }
}

/* ==========================
   LOAD GAME
========================== */

function loadGame(level) {
  currentLevel = level;
  createGrid();
  startTimer();

  mistakes = 0;
  mistakesText.textContent = "0";

  const puzzle = puzzles[level];
  solution = puzzle.solution;

  puzzle.board.forEach((row, r) => {
    row.split("").forEach((val, c) => {
      const index = r * 9 + c;

      if (val !== "0") {
        cells[index].value = val;
        cells[index].disabled = true;
      }
    });
  });

  statusText.textContent = "";
}

/* ==========================
   REVIEW (LIVE CHECK)
========================== */

function reviewSudoku() {
  let hasError = false;

  cells.forEach((cell, i) => {
    if (!cell.value || cell.disabled) return;

    const r = Math.floor(i / 9);
    const c = i % 9;
    const expected = solution[r][c];

    cell.classList.remove("sudoku-correct", "sudoku-wrong");

    if (cell.value === expected) {
      cell.classList.add("sudoku-correct");
    } else {
      cell.classList.add("sudoku-wrong");
      hasError = true;
    }
  });

  statusText.textContent = hasError
    ? "Some inputs are incorrect ❌"
    : "Looks good so far ✅";
}

/* ==========================
   FINAL CHECK
========================== */

function checkSudoku() {
  let correct = true;

  cells.forEach((cell, i) => {
    const r = Math.floor(i / 9);
    const c = i % 9;
    const expected = solution[r][c];

    cell.classList.remove("sudoku-correct", "sudoku-wrong", "sudoku-empty");

    if (!cell.value) {
      cell.classList.add("sudoku-empty");
      correct = false;
    } else if (cell.value !== expected) {
      cell.classList.add("sudoku-wrong");
      correct = false;
      mistakes++;
    } else {
      cell.classList.add("sudoku-correct");
    }
  });

  mistakesText.textContent = mistakes;

  if (correct) {
    clearInterval(timerInterval);
    statusText.textContent = `🎉 Completed in ${time}s!`;
  } else {
    statusText.textContent = "Still mistakes ⚠️";
  }
}

/* ==========================
   UI HELPERS
========================== */

function setActiveButton(groupSelector, clickedButton) {
  const buttons = document.querySelectorAll(groupSelector + " button");

  buttons.forEach(btn => btn.classList.remove("active"));
  clickedButton.classList.add("active");
}

function selectDifficulty(btn, level) {
  setActiveButton("#difficultyGroup", btn);
  loadGame(level);
}

/* ==========================
   RESET
========================== */

function resetGame() {
  loadGame(currentLevel);
}

/* ==========================
   INIT
========================== */

window.onload = () => {
  loadGame("easy");

  // set default active button
  const firstBtn = document.querySelector("#difficultyGroup button");
  if (firstBtn) firstBtn.classList.add("active");
};