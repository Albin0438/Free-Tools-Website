// Get elements safely
const textInput = document.getElementById("textInput");
const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");

// Optional extra elements (if you add them in HTML)
const sentenceCount = document.getElementById("sentenceCount");
const readingTime = document.getElementById("readingTime");

// Update counts
function updateCounts() {
  const text = textInput.value;

  if (!text.trim()) {
    wordCount.textContent = 0;
    charCount.textContent = 0;

    if (sentenceCount) sentenceCount.textContent = 0;
    if (readingTime) readingTime.textContent = "0 sec";

    return;
  }

  // Word count
  const words = text.trim().split(/\s+/).filter(Boolean);

  // Sentence count (basic)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

  // Reading time (avg 200 words/min)
  const minutes = words.length / 200;

  wordCount.textContent = words.length;
  charCount.textContent = text.length;

  if (sentenceCount) sentenceCount.textContent = sentences.length;

  if (readingTime) {
    readingTime.textContent =
      minutes < 1
        ? `${Math.ceil(minutes * 60)} sec`
        : `${minutes.toFixed(1)} min`;
  }
}

// Listen for input
if (textInput) {
  textInput.addEventListener("input", updateCounts);
}

// Copy function
function copyText() {
  if (!textInput.value.trim()) return;
  copyToClipboard(textInput.value);
}
