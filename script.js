/* ======================================================
   QWICKDESK SOLUTIONS
   SCRIPT.JS - COMPLETE MASTER FILE
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

    /* --- 2. STICKY NAVBAR --- */
    const navbar = document.querySelector(".navbar");
    if(navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("sticky");
            } else {
                navbar.classList.remove("sticky");
            }
        });
    }

    /* --- 3. BACK TO TOP BUTTON --- */
    const topBtn = document.getElementById("topBtn");
    if(topBtn) {
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
    }

    /* --- 4. SMOOTH SCROLL & AUTO-CLOSE MENU --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
                // Close mobile menu if open
                if(navLinks && navLinks.classList.contains("active")) {
                    navLinks.classList.remove("active");
                }
            }
        });
    });

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

    /* --- 6. LOAN ELIGIBILITY ALERT --- */
    const eligibilityBtn = document.querySelector(".eligibility-box button");
    if (eligibilityBtn) {
        eligibilityBtn.addEventListener("click", () => {
            alert("Your details have been captured. Our financial expert will call you shortly to confirm your eligibility.");
        });
    }

    /* --- 7. HERO LEAD FORM TO WHATSAPP --- */
    const heroForm = document.getElementById("lead-form");
    if (heroForm) {
        heroForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const inputs = heroForm.querySelectorAll("input, select, textarea");
            let message = "Hello QwickDesk Solutions, I need a consultation. Here are my details:%0A%0A";
            
            inputs.forEach(input => {
                if (input.value && input.value !== "" && input.value !== "Select State" && input.value !== "Select Service") {
                    let label = input.name || input.placeholder || "Detail";
                    message += `*${label}:* ${input.value}%0A`;
                }
            });

            // Redirect to WhatsApp
            window.open(`https://wa.me/917249828812?text=${message}`, "_blank");
            heroForm.reset();
        });
    }

    /* --- 8. FAQ ACCORDION --- */
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        item.addEventListener("click", () => {
            const answer = item.querySelector("p");
            
            // Close others
            faqItems.forEach(faq => {
                if (faq !== item) {
                    const p = faq.querySelector("p");
                    if (p) p.style.display = "none";
                    faq.style.borderColor = "rgba(255,255,255,.08)";
                }
            });
            
            // Toggle current
            if (answer.style.display === "none" || answer.style.display === "") {
                answer.style.display = "block";
                item.style.borderColor = "#D4AF37";
            } else {
                answer.style.display = "none";
                item.style.borderColor = "rgba(255,255,255,.08)";
            }
        });
    });

    /* --- 9. AUTO YEAR UPDATE --- */
    const yearElement = document.getElementById("year");
    if(yearElement){
        yearElement.innerHTML = new Date().getFullYear();
    }
});
