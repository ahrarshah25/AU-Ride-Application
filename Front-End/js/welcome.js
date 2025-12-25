function sahi() {
    let num = document.getElementById("number").value;
    if (num === "") {
        Swal.fire({
            title: "Error",
            text: "Please enter a ten-digit number",
            icon: "error"
        });
        return;
    }
    if (num[0] === "0") {
        Swal.fire({
            title: "Error!",
            text: "Do not enter 0 after 92. The number should not start with 920.",
            icon: "error"
        });
        return;
    }
    if (num.length !== 10) {
        Swa.fire({
            title: "Error!",
            text: "Number must be exactly 10 digits",
            icon: "error"
        });
        return;
    }
    else {
        localStorage.setItem("number", num);
        location.href = "/auth/finish";
    }
};

const continueBtn = document.getElementById("continueBtn");
continueBtn.addEventListener('click' , (e) =>{
    e.preventDefault();
    const key = e.keyCode || e.which;
    if(key === 13){
        sahi();
        return;
    }
    sahi();
})