// Random Number Generator

const minInput = document.getElementById("min");
const maxInput = document.getElementById("max");
const randomResult = document.getElementById("randomResult");
const noRepeatCheckbox = document.getElementById("noRepeat");

let usedNumbers = [];

function generateNumber() {
  const min = parseInt(minInput.value);
  const max = parseInt(maxInput.value);

  // Validation
  if (isNaN(min) || isNaN(max)) {
    showResult("Enter valid numbers 🎯");
    return;
  }

  if (min > max) {
    showResult("Min should be ≤ Max ⚠️");
    return;
  }

  const rangeSize = max - min + 1;

  // No repeat check
  if (noRepeatCheckbox.checked && usedNumbers.length >= rangeSize) {
    showResult("All numbers used 🔁 Reset to continue");
    return;
  }

  // Loading effect
  showResult("Generating... 🎲");

  setTimeout(() => {
    let num;

    do {
      num = Math.floor(Math.random() * rangeSize) + min;
    } while (noRepeatCheckbox.checked && usedNumbers.includes(num));

    if (noRepeatCheckbox.checked) {
      usedNumbers.push(num);
    }

    showResult(`Result: ${num}`, true);

  }, 300);
}

// Display helper
function showResult(text, highlight = false) {
  randomResult.textContent = text;
  randomResult.className = "output";

  if (highlight) {
    randomResult.classList.add("result-highlight");
  }

  // Re-trigger animation
  randomResult.style.animation = "none";
  randomResult.offsetHeight;
  randomResult.style.animation = "";
}

// Copy result
function copyResult() {
  const text = randomResult.textContent.replace("Result: ", "");

  if (!text || text.includes("Enter") || text.includes("Generating")) return;

  navigator.clipboard.writeText(text);

  showResult("Copied to clipboard ✅");
}

// Presets
function setRange(min, max) {
  minInput.value = min;
  maxInput.value = max;
}

// Reset no-repeat memory
function resetNumbers() {
  usedNumbers = [];
  showResult("Reset successful 🔄");
}