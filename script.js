/* ======================================================
   QWICKDESK SOLUTIONS - FINAL SCRIPT
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* --- 1. MOBILE MENU TOGGLE --- */
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    /* --- 2. HIDE MENU ON LINK CLICK --- */
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if(navLinks.classList.contains('active')){
                navLinks.classList.remove('active');
            }
        });
    });

    /* --- 3. BACK TO TOP BUTTON --- */
    const topBtn = document.getElementById("topBtn");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            topBtn.style.display = "flex";
        } else {
            topBtn.style.display = "none";
        }
    });
    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* --- 4. HERO FORM TO WHATSAPP --- */
    const heroForm = document.getElementById("lead-form");
    if (heroForm) {
        heroForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const inputs = heroForm.querySelectorAll("input, select");
            let message = "Hello QwickDesk Solutions, I need a consultation. My details:%0A%0A";
            
            inputs.forEach(input => {
                if (input.value && input.value !== "" && !input.value.includes("Select")) {
                    let label = input.name || input.placeholder;
                    message += `*${label}:* ${input.value}%0A`;
                }
            });

            window.open(`https://wa.me/917249828812?text=${message}`, "_blank");
            heroForm.reset();
        });
    }

    /* --- 5. EMI CALCULATOR --- */
    const emiBtn = document.getElementById("calculateEMI");
    if (emiBtn) {
        emiBtn.addEventListener("click", () => {
            const amount = parseFloat(document.getElementById("loanAmount").value);
            const rate = parseFloat(document.getElementById("interestRate").value);
            const years = parseFloat(document.getElementById("loanYears").value);

            if (!amount || !rate || !years) {
                document.getElementById("emiResult").innerHTML = "Please enter all values.";
                return;
            }

            const monthlyRate = rate / 12 / 100;
            const months = years * 12;
            const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

            document.getElementById("emiResult").innerHTML = "Monthly EMI: ₹" + emi.toFixed(0);
        });
    }

    /* --- 6. ELIGIBILITY BUTTON --- */
    const checkBtn = document.querySelector(".check-btn");
    if(checkBtn) {
        checkBtn.addEventListener("click", () => {
            alert("Request Submitted! Our team will verify and contact you shortly.");
        });
    }

    /* --- 7. FOOTER YEAR --- */
    const yearSpan = document.getElementById("year");
    if(yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }
});
