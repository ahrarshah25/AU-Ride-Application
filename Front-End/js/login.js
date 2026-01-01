console.log("Login Page!");

async function userLogin() {
  let userEmail = document.getElementById("loginEmail");
  let userPassword = document.getElementById("loginPassword");
  const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;

  if (!userEmail.value.trim() || !userPassword.value.trim()) {
    Swal.fire({
      title: "Error!",
      text: "Please fill all the feilds.",
      icon: "error"
    });
    userEmail.value = "";
    userPassword.value = "";
    return;
  }

  if (!regex.test(userEmail.value)) {
    Swal.fire({
      title: "Error!",
      text: "Please enter email with correct syntax.\nFor Example: name@domain.com",
      icon: "error"
    });
    userEmail.value = "";
    userPassword.value = "";
    return;
  }

  try {
    const backend = "https://au-ride-backend.vercel.app/api/auth/login";

    const response = await fetch(backend, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userEmail.value,
        password: userPassword.value
      })

    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        title: "Success!",
        text: "Login Successful.",
        icon: "success"
      }).then(() => {
        window.location.href = "/profile";
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Error While Loggining: " + data.error,
        icon: "error"
      });
      return;
    }
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Error: " + error.message,
      icon: "error"
    });
    return;
  }

}

const userLoginBtn = document.getElementById("userLogin");
userLoginBtn.addEventListener('click' , (e)=>{
  e.preventDefault();
  const key = e.keyCode || e.which;
  if(key === 13){
    userLogin();
    return;
  };
  userLogin();
})

const toggle = document.querySelector(".togglePassword");
toggle.addEventListener("click", () => {
  const password = document.getElementById("loginPassword");
  const type = password.type === "password" ? "text" : "password";
  password.type = type;
  toggle.classList.toggle("fa-eye-slash");
});