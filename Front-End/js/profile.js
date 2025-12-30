console.log("Profile Page!");


const imageInput = document.getElementById("profileImage");
const preview = document.getElementById("profilePreview");

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
  };
  reader.readAsDataURL(file);
});
