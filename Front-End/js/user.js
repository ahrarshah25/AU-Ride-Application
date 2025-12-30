console.log("Account Type Selecting!");


const riderBtn = document.getElementById("riderBtn");
riderBtn.addEventListener('click' , () => {
    localStorage.setItem("accountType" , "rider");
    window.location.href = "/login";
});

const driverBtn = document.getElementById("driverBtn");
driverBtn.addEventListener('click' , () => {
    localStorage.setItem("accountType" , "driver");
    window.location.href = "/login";
});