const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const output = document.getElementById("passwordOutput");

// Update length display
lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

// Generate password
function generatePassword() {
  const length = parseInt(lengthSlider.value);
  const useUpper = document.getElementById("uppercase").checked;
  const useLower = document.getElementById("lowercase").checked;
  const useNumbers = document.getElementById("numbers").checked;
  const useSymbols = document.getElementById("symbols").checked;
  const noSimilar = document.getElementById("noSimilar").checked;
  const separator = document.getElementById("separator").value;

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

  // Apply separator (optional)
  if (separator) {
    password = password.split("").join(separator);
  }

  output.value = password;

  // Auto resize textarea width feel
  output.style.height = "auto";
  output.style.height = (output.scrollHeight) + "px";
}

// Copy
function copyPassword() {
  navigator.clipboard.writeText(output.value)
    .then(() => alert("Copied!"));
}