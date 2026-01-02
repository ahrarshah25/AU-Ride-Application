console.log("Profile Page!");

const imageInput = document.getElementById("profileImage");
const preview = document.getElementById("profilePreview");
const nameInput = document.querySelector('input[placeholder="Name"]');
const phoneInput = document.querySelector('input[placeholder="300 1234567"]');
const saveBtn = document.querySelector(".continue button");

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
});

async function loadProfile() {
  try {
    const backend = "https://au-ride-backend.vercel.app/api/profile/get";
    const res = await fetch(backend , {
      credentials: "include"
    });
    const data = await res.json();

    if (!data.exists) {
      preview.src = "/Front-End/assets/default.png";
      return;
    }

    if (data.profile.name) {
      nameInput.value = data.profile.name;
    }

    if (data.profile.phone) {
      phoneInput.value = data.profile.phone;
    }

    if (data.profile.avatarId) {
      preview.src = `https://fra.cloud.appwrite.io/v1/storage/buckets/profile-images/files/${data.profile.avatarId}/view?project=6952bae80027e91db515`;
    } else {
      preview.src = "/Front-End/assets/default.png";
    }
  } catch (err) {
    console.error("Error loading profile:", err);
    preview.src = "/Front-End/assets/default.png";
  }
}

async function saveProfile() {
  try {
    const formData = new FormData();
    formData.append("name", nameInput.value);
    formData.append("phone", phoneInput.value);

    const avatar = imageInput.files[0];
    if (avatar) {
      formData.append("avatar", avatar);
    }

    const backend = "https://au-ride-backend.vercel.app/api/profile/save";

    const res = await fetch(backend, {
      method: "POST",
      body: formData,
      credentials: "include"
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Profile updated successfully"
      });
      loadProfile();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to save profile: " + data.error
      });
    }
  } catch (err) {
    console.error("Error saving profile:", err);
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Something went wrong: " + err.message
    });
  }
}

saveBtn.addEventListener("click", saveProfile);

loadProfile();
