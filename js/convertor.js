function convert() {
  const value = parseFloat(document.getElementById("inputValue").value);
  const type = document.getElementById("conversionType").value;

  if (!value) return;

  let result = 0;

  if (type === "cmToIn") result = value * 0.3937;
  if (type === "kgToLb") result = value * 2.20462;
  if (type === "kmToMi") result = value * 0.621371;

  document.getElementById("result").textContent = result.toFixed(2);
}