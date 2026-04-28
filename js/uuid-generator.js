function generateUUID() {
  const output = document.getElementById("uuid");
  output.textContent = crypto.randomUUID();
}