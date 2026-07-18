// 1. Mobile Menu Logic
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if(navLinks.classList.contains('active')){
            hamburger.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if(hamburger) hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// 2. Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if(nav) {
        if (window.scrollY > 20) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    }
});

// 3. Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 50; 
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

// 4. Copy UPI ID Function
function copyUPI() {
    var upiText = document.getElementById("upi-text");
    if(upiText) {
        navigator.clipboard.writeText(upiText.innerText).then(function() {
            var copyBtn = document.getElementById("copy-btn-element");
            var originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.style.background = "var(--secondary)";
            copyBtn.style.color = "white";
            
            setTimeout(function() {
                copyBtn.innerHTML = originalHTML;
                copyBtn.style.background = "var(--primary-light)";
            }, 3000);
        });
    }
}

// 5. Formspree Submission Logic (NO WhatsApp Auto-Redirect)
const form = document.getElementById("qwickdesk-form");
if(form) {
    var successMessage = document.getElementById("success-message");
    var submitBtn = document.getElementById("submit-btn");
    var errorMsg = document.getElementById("error-msg");
    var formBox = document.getElementById("form-container-box"); // Wrapper for smooth hide

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 
        
        submitBtn.innerHTML = 'Processing Securely... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;

        var data = new FormData(event.target);
        
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                // Fade out form and fade in success message
                formBox.style.display = "none";
                successMessage.style.display = "block";
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                showError();
            }
        }).catch(error => {
            showError();
        });

        function showError() {
            errorMsg.style.display = "block";
            submitBtn.innerHTML = 'Submit & Confirm Payment <i class="fas fa-paper-plane"></i>';
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
        }
    });
}
