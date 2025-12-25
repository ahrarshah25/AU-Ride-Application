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

const getInformation = () => {
    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();

    if (!firstName) {
        Swal.fire({
            title: "Error!",
            text: "Please Enter Your Name!",
            icon: "error"
        })
    } else {
        localStorage.setItem("firstName", firstName)
        localStorage.setItem("lastName", lastName)
        window.location.href = "verify.html"
    }
}

const registerUser = async () => {
    const userFirstName = localStorage.getItem("firstName");
    const userLastName = localStorage.getItem("lastName");
    const userPhone = localStorage.getItem("number");

    const {data , error} = await supabase.signInWithOtp({
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
            text: "OTP To Your Number " + "92 " + userPhone + "Has Been Sent Successfully!",
            icon: "success"
        });

        setInterval(() => {
            window.location.href = `verify?phone=${userPhone}`;;
        }, 1200)
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