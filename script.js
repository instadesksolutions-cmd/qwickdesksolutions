// --- Mobile Menu Toggle ---
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    if(navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#fff';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 10px rgba(0,0,0,0.1)';
    }
});

// --- Pre-select package from pricing table ---
function selectPackage(packageName) {
    const select = document.getElementById('packageSelect');
    select.value = packageName;
}

// --- Form Flow Logic ---
const formStep1 = document.getElementById('projectForm');
const paymentStep = document.getElementById('paymentStep');

// Handle Step 1 Submission
formStep1.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get values from Step 1
    const name = document.getElementById('fullName').value;
    const whatsapp = document.getElementById('whatsapp').value;
    
    // Set values to read-only inputs in Step 2 for confirmation
    document.getElementById('confirmName').value = name;
    document.getElementById('confirmWhatsapp').value = whatsapp;
    
    // Hide Step 1, Show Step 2
    formStep1.classList.add('hidden');
    paymentStep.classList.remove('hidden');
    
    // Scroll smoothly to form top
    document.getElementById('onboarding').scrollIntoView({ behavior: 'smooth' });
});

// Handle Back Button from Step 2
function backToStep1() {
    paymentStep.classList.add('hidden');
    formStep1.classList.remove('hidden');
}

// Handle UPI Copy
function copyUPI() {
    const upiText = document.getElementById('upiId').innerText;
    navigator.clipboard.writeText(upiText).then(() => {
        const btn = document.querySelector('.btn-copy');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.style.background = '#10b981';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = ''; // reset to CSS default
        }, 2000);
    }).catch(err => {
        alert('Failed to copy text. Please copy manually: ' + upiText);
    });
}

// Handle Final Submit
function submitFinal() {
    const utr = document.getElementById('utrNumber').value.trim();
    
    if(utr.length < 5) {
        alert('Please enter a valid UTR / Reference Number to confirm your payment.');
        return;
    }
    
    // Hide payment step, show success message
    paymentStep.classList.add('hidden');
    
    const successMsg = document.getElementById('successMessage');
    successMsg.classList.remove('hidden');
    
    // Reset message and interface after showing success
    setTimeout(() => {
        successMsg.innerHTML = '<i class="fas fa-check-circle"></i> We will contact you shortly on WhatsApp!';
    }, 3000);
}
