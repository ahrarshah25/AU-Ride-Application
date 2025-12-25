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
         <p>We Have Send A Code To +92 ${numbers} Enter That code Here.</p>
    </div>
            `
document.getElementById("para").innerHTML = Sends;

const phone = new URLSearchParams(window.location.search).get("phone");

const verifyOtp = async () => {
    const otp = document.querySelector(".otp");
    const {data , error} = await supabase.auth.verifyOtp({
        phone: phone,
        token: otp,
        type: "sms"
    });

    if(error){
        Swal.fire({
            title: "Error!",
            text: "Invalid OTP.",
            icon: "error"
        });
    };

    Swal.fire({
        title: "Success!",
        text: "Registration Successfull",
        icon: "success"
    });

    setInterval(() => {
        window.location.href = "/dashboard/dashboard.html";
    }, 1200)
}