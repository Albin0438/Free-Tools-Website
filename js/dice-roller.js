// Dice Roller

const diceInput = document.getElementById("diceCount");
const diceResult = document.getElementById("diceResult");

// Optional: dice sound (add audio element in HTML if you want)
const diceSound = document.getElementById("diceSound");

function rollDice() {
  const count = parseInt(diceInput.value);

  // Validation
  if (!count || count <= 0) {
    diceResult.textContent = "Enter a valid number of dice 🎯";
    diceResult.className = "output";
    return;
  }

  if (count > 10) {
    diceResult.textContent = "Max 10 dice allowed ⚠️";
    diceResult.className = "output";
    return;
  }

  // Show rolling effect
  diceResult.textContent = "Rolling... 🎲";
  diceResult.className = "output";

  // Play sound if available
  if (diceSound) {
    diceSound.currentTime = 0;
    diceSound.play();
  }

  setTimeout(() => {
    let results = [];
    let total = 0;

    for (let i = 0; i < count; i++) {
      const roll = Math.floor(Math.random() * 6) + 1;
      results.push(roll);
      total += roll;
    }

    // Dice emoji mapping
    const diceMap = ["⚀","⚁","⚂","⚃","⚄","⚅"];
    const emojiResults = results.map(n => diceMap[n - 1]);

    // Display result
    diceResult.textContent =
      `Rolls: ${emojiResults.join(" ")}  |  Total: ${total}`;

    // Re-trigger animation
    diceResult.style.animation = "none";
    diceResult.offsetHeight;
    diceResult.style.animation = "";

  }, 400); // delay for rolling effect
}