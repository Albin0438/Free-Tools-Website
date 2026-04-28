const passwordInput = document.getElementById("password");
const strengthOutput = document.getElementById("strength");

if (passwordInput) {
  passwordInput.addEventListener("input", () => {
    const val = passwordInput.value;
    let score = 0;

    if (val.length > 6) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const levels = ["Weak", "Medium", "Strong", "Very Strong"];
    strengthOutput.textContent = levels[score] || "Weak";
  });
}