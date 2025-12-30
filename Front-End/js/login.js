console.log("Login Page!");


const toggle = document.querySelector(".togglePassword");
toggle.addEventListener("click", () => {
  const password = document.getElementById("loginPassword");
  const type = password.type === "password" ? "text" : "password";
  password.type = type;
  toggle.classList.toggle("fa-eye-slash");
});

