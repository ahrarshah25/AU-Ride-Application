console.log("Profile Page!");

const imageInput = document.getElementById("profileImage");
const preview = document.getElementById("profilePreview");
const nameInput = document.querySelector('input[placeholder="Name"]');
const phoneInput = document.querySelector('input[placeholder="300 1234567"]');
const saveBtn = document.querySelector(".continue button");

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;
  preview.src = URL.createObjectURL(file);
});

async function loadProfile() {
  try {
    const res = await fetch(
      "https://au-ride-backend.vercel.app/api/profile/get",
      { 
        method: "GET",
        credentials: "include" 
      }
    );

    if (res.status === 401) {
      Swal.fire("Login Required", "Please login first", "warning")
        .then(() => window.location.href = "/login");
      return;
    }

    const data = await res.json();

    if (!data.exists) return;

    nameInput.value = data.profile.name || "";
    phoneInput.value = data.profile.phone || "";

    if (data.profile.avatarId) {
      preview.src =
        `https://cloud.appwrite.io/v1/storage/buckets/profile-images/files/${data.profile.avatarId}/view?project=6952bae80027e91db515`;
    }
  } catch (err) {
    console.error(err);
  }
}

async function saveProfile() {
  const formData = new FormData();
  formData.append("name", nameInput.value);
  formData.append("phone", phoneInput.value);
  if (imageInput.files[0]) {
    formData.append("avatar", imageInput.files[0]);
  }

  const res = await fetch(
    "https://au-ride-backend.vercel.app/api/profile/save",
    {
      method: "POST",
      body: formData,
      credentials: "include"
    }
  );

  const data = await res.json();

  if (data.success) {
    Swal.fire("Saved!", "Profile updated successfully", "success");
    loadProfile();
  } else {
    Swal.fire("Error", data.error, "error");
  }
}

saveBtn.addEventListener("click", saveProfile);
loadProfile();
