// Yes / No Picker

const questionInput = document.getElementById("question");
const answerResult = document.getElementById("answerResult");

function pickAnswer() {
  const question = questionInput.value.trim();

  if (!question) {
    answerResult.textContent = "Ask a question first 🤔";
    answerResult.className = "output"; // reset style
    return;
  }

  const answers = [
    { text: "Yes 👍", type: "yes" },
    { text: "No 👎", type: "no" },
    { text: "Maybe 🤔", type: "maybe" },
    { text: "Definitely yes 🔥", type: "yes" },
    { text: "Not a great idea 😬", type: "no" }
  ];

  const random = answers[Math.floor(Math.random() * answers.length)];

  // Set text
  answerResult.textContent = `Answer: ${random.text}`;

  // Reset + apply class
  answerResult.className = "output"; 
  answerResult.classList.add(`answer-${random.type}`);

  // Re-trigger animation
  answerResult.style.animation = "none";
  answerResult.offsetHeight; // force reflow
  answerResult.style.animation = "";
}