const googleLoginBtn = document.getElementById("googleLogin");

googleLoginBtn.addEventListener("click", () => {
  window.location.href =
    "https://au-ride-backend.vercel.app/api/auth/googleLogin";
});

const urlParams = new URLSearchParams(window.location.search);
const status = urlParams.get("status");

if (status === "success") {
    Swal.fire({
        title: "Success!",
        text: "Login Successfully!",
        icon: "success"
    }).then(() => {
        window.location.href = "/profile";
    });
} 
else if (status === "failed") {
    Swal.fire({
        title: "Error!",
        text: "Error While Logging In",
        icon: "error"
    });
}
