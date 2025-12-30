console.log("SIGNUP PAGE!");

async function userSignup(){
    let userName = document.getElementById("userName");
    let userEmail = document.getElementById("signupEmail");
    let userPassword = document.getElementById("signupPassword");
    let confirmPassword = document.getElementById("signupConfirm");
    const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;
    const accType = localStorage.getItem("accountType");

    if(!userName.value.trim() || !userEmail.value.trim() || !userPassword.value.trim() || !confirmPassword.value.trim()){
        Swal.fire({
            title: "Error!",
            text: "Please fill all the feilds.",
            icon: "error"
        });
        userName.value = "";
        userEmail.value = "";
        userPassword.value = "";
        confirmPassword.value = "";
        return;
    }

    if(!regex.test(userEmail.value)){
        Swal.fire({
            title: "Error!",
            text: "Please enter email with correct syntax.\nFor Example: name@domain.com",
            icon: "error"
        });
        userEmail.value = "";
        return;
    }

    if(userPassword.value.trim().lenght < 8){
        Swal.fire({
            title: "Error!",
            text: "Password should contain 8 character.",
            icon: "error"
        });
        userPassword.value = "";
        confirmPassword.value = "";
        return;
    }

    if(userPassword.value !== confirmPassword.value){
        Swal.fire({
            title: "Error!",
            text: "Confirm password should be equal to your password.\nGuide: Please enter correct password in confirm password section.",
            icon: "error"
        });
        userPassword.value = "";
        confirmPassword.value = "";
        return;
    }

    try {
        const backend = "https://au-ride-backend.vercel.app/auth/signup";

        const response = await fetch(backend , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                userEmail,
                userPassword,
                accountType: accType
            })
        });

        const data = await response.json();

        if(response.ok){
            Swal.fire({
                title: "Success!",
                text: "Signup Successfully!\nWelcome: " + userName,
                icon: "success"
            });
            window.location.href = "/profile";
        } else {
            Swal.fire({
                title: "Error!",
                text: "Error While Creating Account: " + data.error,
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

const toggles = document.querySelectorAll(".togglePassword");
toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const input = toggle.previousElementSibling;
    const type = input.type === "password" ? "text" : "password";
    input.type = type;
    toggle.classList.toggle("fa-eye-slash");
  });
});

const userSignupBtn = document.getElementById("userSignup");
userSignupBtn.addEventListener('click' , (e) => {
    e.preventDefault();
    const key = e.keyCode || e.which;
    if(key === 13){
        userSignup();
        return;
    };
    userSignup()
})