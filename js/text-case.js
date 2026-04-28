// Get elements safely
const input = document.getElementById("textInput");
const output = document.getElementById("outputText");

// Helper: check empty
function isEmpty(text) {
  return !text || text.trim() === "";
}

// UPPERCASE
function toUpper() {
  if (isEmpty(input.value)) return;
  output.value = input.value.toUpperCase();
}

// lowercase
function toLower() {
  if (isEmpty(input.value)) return;
  output.value = input.value.toLowerCase();
}

// Capitalize Each Word (better handling)
function toCapitalized() {
  if (isEmpty(input.value)) return;

  output.value = input.value
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}

// Sentence case (improved)
function toSentenceCase() {
  if (isEmpty(input.value)) return;

  output.value = input.value
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s*\w)/g, char => char.toUpperCase());
}

// Clear text
function clearText() {
  input.value = "";
  output.value = "";
}

// Copy result
function copyResult() {
  if (isEmpty(output.value)) return;
  copyToClipboard(output.value);
}
