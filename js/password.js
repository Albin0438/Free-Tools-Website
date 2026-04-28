const output = document.getElementById("passwordOutput");
const lengthInput = document.getElementById("length");
const lengthMessage = document.getElementById("lengthMessage");

// Live warning while typing
lengthInput.addEventListener("input", () => {
  let length = parseInt(lengthInput.value);

  if (!length || length <= 0) {
    lengthMessage.textContent = "Enter a valid length";
    lengthMessage.style.color = "#ef4444";
    return;
  }

  if (length > 260) {
    lengthMessage.textContent = "❌ Max allowed is 260";
    lengthMessage.style.color = "#ef4444";
  } else if (length > 160) {
    lengthMessage.textContent = "⚠ Very long password may be impractical";
    lengthMessage.style.color = "#facc15";
  } else {
    lengthMessage.textContent = "Recommended: 8–128 characters";
    lengthMessage.style.color = "#94a3b8";
  }
});

// Generate password
function generatePassword() {
  let length = parseInt(lengthInput.value);

  if (!length || length <= 0 || length > 260) {
    alert("Enter a valid length (1–260)");
    return;
  }

  const useUpper = document.getElementById("uppercase").checked;
  const useLower = document.getElementById("lowercase").checked;
  const useNumbers = document.getElementById("numbers").checked;
  const useSymbols = document.getElementById("symbols").checked;
  const noSimilar = document.getElementById("noSimilar").checked;

  let chars = "";

  if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (useLower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (useNumbers) chars += "0123456789";
  if (useSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

  if (noSimilar) {
    chars = chars.replace(/[l1O0]/g, "");
  }

  if (!chars) {
    alert("Select at least one option!");
    return;
  }

  let password = "";

  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  output.value = password;

  // Auto resize textarea
  output.style.height = "auto";
  output.style.height = output.scrollHeight + "px";
}

// Copy
function copyPassword() {
  if (!output.value) return;

  navigator.clipboard.writeText(output.value)
    .then(() => alert("Copied!"))
    .catch(() => alert("Failed to copy"));
}