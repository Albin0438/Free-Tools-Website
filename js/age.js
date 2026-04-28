function calculateAge() {
  const dob = new Date(document.getElementById("dob").value);
  if (!dob.getTime()) return;

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();

  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  document.getElementById("ageResult").textContent = age + " years";
}