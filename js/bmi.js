// Get elements safely
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const bmiResult = document.getElementById("bmiResult");
const bmiStatus = document.getElementById("bmiStatus");
const bmiAdvice = document.getElementById("bmiAdvice"); // optional

// Calculate BMI
function calculateBMI() {
  if (!weightInput || !heightInput) return;

  const weight = parseFloat(weightInput.value);
  const heightCm = parseFloat(heightInput.value);

  // Reset if invalid
  if (
    !Number.isFinite(weight) ||
    !Number.isFinite(heightCm) ||
    weight <= 0 ||
    heightCm <= 0
  ) {
    bmiResult.textContent = "0";
    bmiStatus.textContent = "-";
    bmiStatus.style.color = "";
    if (bmiAdvice) bmiAdvice.textContent = "";
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);

  // Guard against absurd values
  if (!Number.isFinite(bmi) || bmi > 100) {
    bmiResult.textContent = "0";
    bmiStatus.textContent = "-";
    bmiStatus.style.color = "";
    if (bmiAdvice) bmiAdvice.textContent = "";
    return;
  }

  bmiResult.textContent = bmi.toFixed(2);

  let status = "";
  let color = "";
  let advice = "";

  if (bmi < 18.5) {
    status = "Underweight";
    color = "#facc15";
    advice = "Consider a balanced diet and consult a professional if needed.";
  } else if (bmi < 24.9) {
    status = "Normal";
    color = "#22c55e";
    advice = "You are in a healthy range. Keep it up!";
  } else if (bmi < 29.9) {
    status = "Overweight";
    color = "#facc15";
    advice = "Regular exercise and a balanced diet may help.";
  } else {
    status = "Obese";
    color = "#ef4444";
    advice = "Consider lifestyle changes and professional guidance.";
  }

  bmiStatus.textContent = status;
  bmiStatus.style.color = color;

  if (bmiAdvice) {
    bmiAdvice.textContent = advice;
  }
}

// Auto-calculate while typing
if (weightInput && heightInput) {
  weightInput.addEventListener("input", calculateBMI);
  heightInput.addEventListener("input", calculateBMI);
}
