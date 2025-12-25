console.log("JS Connected!");

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const backend = "https://au-ride-backend.vercel.app/api/config";

const response = await fetch(backend);
const config = await response.json();

const supabaseUrl = config.supabaseUrl;
const supabaseKey = config.supabaseAnonKey;

const supabase = createClient(supabaseUrl , supabaseKey);

let numbers = localStorage.getItem("number")
let Sends = `
           <div id="Send">
         <p>Please Enter Your Name Here.</p>
    </div>
            `
document.getElementById("para").innerHTML = Sends;

function getInformation() {
    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();

    if (!firstName) {
        Swal.fire({
            title: "Error!",
            text: "Please Enter Your Name!",
            icon: "error"
        })
    } else {
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
    }
}

async function registerUser() {
    const userFirstName = localStorage.getItem("firstName");
    const userLastName = localStorage.getItem("lastName");
    const userPhoneLocal = localStorage.getItem("number");
    const userPhone = "+92"+userPhoneLocal

    const {data , error} = await supabase.auth.signInWithOtp({
        phone: userPhone,
        options: {
            data: {
                firstName: userFirstName,
                lastName: userLastName || ""
            }
        }
    });

    if(error){
        Swal.fire({
            title: "Error!",
            text: "Database Error: " + error.message,
            icon: "error",
        });

        Swal.fire({
            title: "OTP Sent!",
            text: "OTP To Your Number " + "92 " + userPhoneLocal + "Has Been Sent Successfully!",
            icon: "success"
        });

        setInterval(() => {
            window.location.href = `verify?phone=${userPhone}`;;
        }, 9000)
    }
}

const completeBtn = document.getElementById("completeBtn");
completeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const key = e.keyCode || e.which;
    if (key === 13) {
        getInformation();
        return;
    }
    getInformation();
});

const registerBrn = document.getElementById("registerBrn");
registerBrn.addEventListener('click' , registerUser());