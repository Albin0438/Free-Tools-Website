function formatJSON() {
  const inputEl = document.getElementById("jsonInput");
  const outputEl = document.getElementById("jsonOutput");

  try {
    const parsed = JSON.parse(inputEl.value);
    outputEl.value = JSON.stringify(parsed, null, 2);
  } catch {
    outputEl.value = "";
    alert("Invalid JSON");
  }
}