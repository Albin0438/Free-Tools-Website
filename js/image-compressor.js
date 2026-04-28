function compressImage() {
  const file = document.getElementById("imageInput").files[0];
  if (!file) return alert("Select image");

  const img = new Image();
  const reader = new FileReader();

  reader.onload = e => img.src = e.target.result;

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width * 0.7;
    canvas.height = img.height * 0.7;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.getElementById("downloadLink");

      link.href = url;
      link.download = "compressed.jpg";
      link.style.display = "block";
      link.textContent = "Download Image";
    }, "image/jpeg", 0.7);
  };

  reader.readAsDataURL(file);
}