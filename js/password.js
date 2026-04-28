function generatePassword() {
  const length = document.getElementById("length").value;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  document.getElementById("passwordOutput").value = password;
}

function copyPassword() {
  const text = document.getElementById("passwordOutput").value;
  copyToClipboard(text);
}