/* ==========================================================================
   QWICKDESK - PREMIUM JAVASCRIPT LOGIC
   Upgraded for Glitch-Free Performance & Smooth Animations
   ========================================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. MOBILE MENU LOGIC (Glitch-Free & Scroll Lock) ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon and prevent background scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                hamburger.innerHTML = '<i class="fas fa-times"></i>';
                body.style.overflow = 'hidden'; // Locks background scroll
            } else {
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                body.style.overflow = 'auto'; // Restores scroll
            }
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (hamburger) hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                body.style.overflow = 'auto'; // Restores scroll
            }
        });
    });


    // --- 2. PREMIUM NAVBAR SCROLL EFFECT ---
    const nav = document.querySelector('.navbar');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }, { passive: true }); // Passive true makes scrolling much smoother on mobile
    }


    // --- 3. ADVANCED SCROLL REVEAL (High-Performance IntersectionObserver) ---
    const revealElements = document.querySelectorAll(".reveal");
    
    const revealOptions = {
        threshold: 0.15, // Element reveals when 15% of it is visible on screen
        rootMargin: "0px 0px -30px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("active");
                // Stop observing once revealed to save CPU power
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
    
    // Fallback for very old browsers
    if (!window.IntersectionObserver) {
        revealElements.forEach(el => el.classList.add('active'));
    }


    // --- 4. FORM SUBMISSION LOGIC (AJAX & Smooth UI Transition) ---
    const form = document.getElementById("qwickdesk-form");
    if (form) {
        const successMessage = document.getElementById("success-message");
        const submitBtn = document.getElementById("submit-btn");
        const errorMsg = document.getElementById("error-msg");
        const formBox = document.getElementById("form-container-box");

        form.addEventListener("submit", function(event) {
            event.preventDefault(); 
            
            // Store original button text and set Loading State
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Processing Securely... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.style.opacity = '0.8';
            submitBtn.disabled = true;
            errorMsg.style.display = "none";

            const data = new FormData(event.target);
            
            fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    // Smooth Transition to Success State
                    formBox.style.opacity = '0'; // Fade out
                    
                    setTimeout(() => {
                        formBox.style.display = "none";
                        successMessage.style.display = "block";
                        
                        // Small delay to allow CSS display:block to apply before scrolling
                        setTimeout(() => {
                            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 50);
                    }, 300); // 300ms wait for fade out
                } else {
                    showError(originalBtnText);
                }
            }).catch(error => {
                showError(originalBtnText);
            });

            function showError(originalText) {
                errorMsg.style.display = "block";
                submitBtn.innerHTML = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            }
        });
    }
});


// --- 5. GLOBAL FUNCTIONS ---

// Copy UPI ID Function with Animation
window.copyUPI = function() {
    const upiText = document.getElementById("upi-text");
    if (upiText) {
        navigator.clipboard.writeText(upiText.innerText).then(function() {
            const copyBtn = document.getElementById("copy-btn-element");
            const originalHTML = copyBtn.innerHTML;
            
            // Success State
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.style.background = "var(--secondary)"; // Green color
            copyBtn.style.color = "white";
            copyBtn.style.transform = "scale(1.05)"; // Slight pop animation
            copyBtn.style.transition = "all 0.3s ease";
            
            // Revert back after 3 seconds
            setTimeout(function() {
                copyBtn.innerHTML = originalHTML;
                copyBtn.style.background = "var(--primary-light)"; // Back to Blue
                copyBtn.style.transform = "scale(1)";
            }, 3000);
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        });
    }
};
