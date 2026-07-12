document.addEventListener("DOMContentLoaded", () => {
    
    // 1. MOBILE MENU
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    if(menuToggle) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // 2. LEAD GENERATION (HERO FORM -> WHATSAPP)
    const leadForm = document.getElementById("leadForm");
    if (leadForm) {
        leadForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Getting values by precise IDs
            const name = document.getElementById("leadName").value;
            const phone = document.getElementById("leadPhone").value;
            const state = document.getElementById("leadState").value;
            const district = document.getElementById("leadDistrict").value;
            const service = document.getElementById("leadService").value;
            
            // Creating WhatsApp Message
            let message = `Hello QwickDesk Solutions, I need a consultation.%0A%0A`;
            message += `*Name:* ${name}%0A`;
            message += `*Mobile:* ${phone}%0A`;
            message += `*Location:* ${district}, ${state}%0A`;
            message += `*Required Service:* ${service}`;

            // Open WhatsApp
            window.open(`https://wa.me/917249828812?text=${message}`, "_blank");
            leadForm.reset();
        });
    }

    // 3. EMI CALCULATOR
    const btnEmi = document.getElementById("btnEmi");
    if (btnEmi) {
        btnEmi.addEventListener("click", () => {
            const amount = parseFloat(document.getElementById("loanAmount").value);
            const rate = parseFloat(document.getElementById("loanRate").value);
            const years = parseFloat(document.getElementById("loanTenure").value);
            const resultBox = document.getElementById("emiResult");

            if (!amount || !rate || !years) {
                resultBox.innerText = "Please fill all EMI fields.";
                resultBox.style.color = "red";
                return;
            }

            const monthlyRate = rate / 12 / 100;
            const months = years * 12;
            const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

            resultBox.style.color = "#D4AF37";
            resultBox.innerText = "Monthly EMI: ₹" + Math.round(emi);
        });
    }

    // 4. ELIGIBILITY CHECKER (WORKING FIX)
    const btnEligibility = document.getElementById("btnEligibility");
    if(btnEligibility) {
        btnEligibility.addEventListener("click", () => {
            const income = document.getElementById("eligIncome").value;
            const emi = document.getElementById("eligEmi").value;
            const type = document.getElementById("eligType").value;
            const resultBox = document.getElementById("eligResult");

            if(!income || !emi) {
                resultBox.style.color = "red";
                resultBox.innerText = "Please enter Income and EMI.";
                return;
            }

            resultBox.style.color = "#25D366";
            resultBox.innerText = `Details captured for ${type} (Income: ₹${income}). Our expert will call you shortly to confirm approval!`;
        });
    }

    // 5. FOOTER YEAR
    const yearSpan = document.getElementById("year");
    if(yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }
});
