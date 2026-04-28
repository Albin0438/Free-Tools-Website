// ==========================
// SEARCH FUNCTION (Homepage)
// ==========================
const searchInput = document.getElementById("search");

if (searchInput) {
  const toolCards = document.querySelectorAll(".tool-card");

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    toolCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(value) ? "block" : "none";
    });
  });
}


// ==========================
// COPY TO CLIPBOARD FUNCTION
// ==========================
function copyToClipboard(text) {
  if (!text) return;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => alert("Copied to clipboard!"))
      .catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

// Fallback method
function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
    alert("Copied to clipboard!");
  } catch {
    alert("Copy failed!");
  }

  document.body.removeChild(textarea);
}


// ==========================
// DARK / LIGHT MODE TOGGLE
// ==========================
function toggleTheme() {
  document.body.classList.toggle("light-mode");

  const isLight = document.body.classList.contains("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

// Load saved theme safely
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }
});


// ==========================
// SIMPLE INPUT VALIDATION
// ==========================
function isEmpty(input) {
  return !input || input.trim() === "";
}
