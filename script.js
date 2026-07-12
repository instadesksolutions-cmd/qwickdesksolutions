/* ========================================================
   QWICKDESK SOLUTIONS - CORE JAVASCRIPT
======================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. NAVBAR SCROLL EFFECT --- */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- 2. MOBILE MENU TOGGLE --- */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-xmark');
                hamburger.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    /* --- 3. EMI CALCULATOR --- */
    const btnEmi = document.getElementById('btnEmi');
    if (btnEmi) {
        btnEmi.addEventListener('click', () => {
            const amount = parseFloat(document.getElementById('emiAmount').value);
            const rate = parseFloat(document.getElementById('emiRate').value);
            const years = parseFloat(document.getElementById('emiYears').value);
            const resultBox = document.getElementById('emiResult');

            if (isNaN(amount) || isNaN(rate) || isNaN(years) || amount <= 0 || rate <= 0 || years <= 0) {
                resultBox.style.color = "#ff4d4d";
                resultBox.style.borderColor = "#ff4d4d";
                resultBox.innerHTML = "Please enter valid numbers in all fields.";
                return;
            }

            const monthlyRate = rate / 12 / 100;
            const months = years * 12;
            const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

            resultBox.style.color = "#d4af37";
            resultBox.style.borderColor = "#d4af37";
            const formattedEmi = Math.round(emi).toLocaleString('en-IN');
            resultBox.innerHTML = `Estimated Monthly EMI: <strong>₹ ${formattedEmi}</strong>`;
        });
    }

    /* --- 4. ELIGIBILITY CHECKER --- */
    const btnElig = document.getElementById('btnElig');
    if (btnElig) {
        btnElig.addEventListener('click', () => {
            const income = parseFloat(document.getElementById('eligIncome').value);
            const emi = parseFloat(document.getElementById('eligEmi').value) || 0; 
            const profile = document.getElementById('eligProfile').value;
            const resultBox = document.getElementById('eligResult');

            if (isNaN(income) || income <= 0) {
                resultBox.style.color = "#ff4d4d";
                resultBox.style.borderColor = "#ff4d4d";
                resultBox.innerHTML = "Please enter a valid Monthly Income.";
                return;
            }

            const emiRatio = (emi / income) * 100;
            resultBox.style.borderColor = "#25d366";
            resultBox.style.color = "#25d366";
            
            if (emiRatio > 60) {
                resultBox.style.color = "#f7d774";
                resultBox.style.borderColor = "#f7d774";
                resultBox.innerHTML = `Profile: ${profile} <br> High existing EMI. Our expert will contact you for a custom solution.`;
            } else {
                resultBox.innerHTML = `Profile: ${profile} <br> Good chances of approval! Our expert will call you shortly.`;
            }
        });
    }

    /* --- 5. FOOTER DYNAMIC YEAR --- */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

