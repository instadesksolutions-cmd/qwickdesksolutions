// --- Mobile Menu Toggle ---
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if(menuBtn) {
    menuBtn.addEventListener('click', () => {
        if(navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '75px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(255, 255, 255, 0.98)';
            navLinks.style.padding = '30px 20px';
            navLinks.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
            navLinks.style.backdropFilter = 'blur(10px)';
        }
    });
}

// --- Pre-select package from pricing table ---
function selectPackage(packageName) {
    const select = document.getElementById('packageSelect');
    if(select) {
        select.value = packageName;
    }
}

// --- Form Flow Logic ---
const formStep1 = document.getElementById('projectForm');
const paymentStep = document.getElementById('paymentStep');

if(formStep1 && paymentStep) {
    formStep1.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('fullName').value;
        document.getElementById('confirmName').value = name;
        
        formStep1.classList.add('hidden');
        paymentStep.classList.remove('hidden');
        
        document.getElementById('onboarding').scrollIntoView({ behavior: 'smooth' });
    });
}

function backToStep1() {
    paymentStep.classList.add('hidden');
    formStep1.classList.remove('hidden');
}

function copyUPI() {
    const upiText = document.getElementById('upiId').innerText;
    navigator.clipboard.writeText(upiText).then(() => {
        const btn = document.querySelector('.btn-copy');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.style.background = '#10b981';
        btn.style.color = '#fff';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = ''; 
            btn.style.color = '';
        }, 2000);
    }).catch(err => {
        alert('Failed to copy. UPI ID is: ' + upiText);
    });
}

function submitFinal() {
    const utr = document.getElementById('utrNumber').value.trim();
    
    if(utr.length < 5) {
        alert('Please enter a valid UTR / Reference Number to confirm.');
        return;
    }
    
    paymentStep.classList.add('hidden');
    const successMsg = document.getElementById('successMessage');
    successMsg.classList.remove('hidden');
    
    setTimeout(() => {
        successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Verified! Redirecting to WhatsApp...';
        // Auto redirect to WhatsApp after successful entry
        setTimeout(() => {
             window.location.href = "https://wa.me/917249828812?text=Hi,%20I%20have%20submitted%20my%20project%20details%20and%20paid%20the%20amount.%20My%20UTR%20is:%20" + utr;
        }, 1500);
    }, 2000);
}
