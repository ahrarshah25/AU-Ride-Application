console.log("Google Login!");

function isAppWebView() {
  return (
    navigator.userAgent.includes("wv") ||
    navigator.userAgent.includes("AppsGeyser") ||
    navigator.userAgent.includes("WebView")
  );
}


const googleLoginBtn = document.getElementById("googleLogin");

googleLoginBtn.addEventListener("click", () => {

  const loginURL =
    "https://au-ride-backend.vercel.app/api/auth/googleLogin";

  if (isAppWebView()) {
    // 🔥 AppsGeyser → open in REAL browser
    window.open(loginURL, "_blank");
  } else {
    // 🌐 Normal website
    window.location.href = loginURL;
  }
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
