console.log("Profile Page!");

const { Client, Account, Databases, Storage, ID, Query } = Appwrite;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6952bae80027e91db515");

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

const DATABASE_ID = "profiles";
const COLLECTION_ID = "users";
const BUCKET_ID = "profile-images";

const imageInput = document.getElementById("profileImage");
const preview = document.getElementById("profilePreview");
const nameInput = document.querySelector('input[placeholder="Name"]');
const phoneInput = document.querySelector('input[placeholder="300 1234567"]');
const saveBtn = document.querySelector(".continue button");

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
  };
  reader.readAsDataURL(file);
});

async function getCurrentUser() {
  try {
    return await account.get();
  } catch {
    Swal.fire("Login Required", "Please login first", "warning");
    throw new Error("User not logged in");
  }
}

async function loadProfile() {
  try {
    const user = await getCurrentUser();

    const res = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal("userId", user.$id)]
    );

    if (res.total === 0) {
      preview.src = "/Front-End/assets/default.png";
      return;
    }

    const profile = res.documents[0];

    nameInput.value = profile.name || "";
    phoneInput.value = profile.phone || "";

    if (profile.avatarId) {
      preview.src = storage.getFileView(BUCKET_ID, profile.avatarId);
    } else {
      preview.src = "/Front-End/assets/default.png";
    }
  } catch (err) {
    console.error(err);
    preview.src = "/Front-End/assets/default.png";
  }
}

async function saveProfile() {
  try {
    const user = await getCurrentUser();

    let avatarId = null;

    if (imageInput.files[0]) {
      const upload = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        imageInput.files[0]
      );
      avatarId = upload.$id;
    }

    const existing = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal("userId", user.$id)]
    );

    if (existing.total === 0) {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          userId: user.$id,
          name: nameInput.value,
          phone: phoneInput.value,
          avatarId
        }
      );
    } else {
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existing.documents[0].$id,
        {
          name: nameInput.value,
          phone: phoneInput.value,
          avatarId: avatarId ?? existing.documents[0].avatarId
        }
      );
    }

    Swal.fire("Saved!", "Profile updated successfully", "success");
    loadProfile();

  } catch (err) {
    console.error(err);
    Swal.fire("Error", err.message, "error");
  }
}

saveBtn.addEventListener("click", saveProfile);

loadProfile();
