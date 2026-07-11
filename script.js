// Mobile Menu Open/Close
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// FAQ Accordion 
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
        
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.style.maxHeight = '0px';
            ans.style.padding = '0 20px';
        });
        
        if (!isOpen) {
            answer.style.maxHeight = answer.scrollHeight + 40 + 'px';
            answer.style.padding = '15px 20px 20px';
        }
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Animated Counters (For 100+ Projects etc)
const counters = document.querySelectorAll('.counter');
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = Math.ceil(target / 50);

                    if (count < target) {
                        counter.innerText = count + inc;
                        setTimeout(updateCount, 30);
                    } else {
                        counter.innerText = target + '+';
                    }
                };
                updateCount();
            });
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

if(document.getElementById('stats')) {
    observer.observe(document.getElementById('stats'));
}

// Hero Lead Generation Form Alert
document.getElementById('leadForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your details have been submitted. The QwickDesk Solutions team will contact you shortly.');
    document.getElementById('leadForm').reset();
});

// Bottom Contact Form Alert
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for contacting QwickDesk Solutions! Our executive team will reach out within 24 operational hours.');
    document.getElementById('contactForm').reset();
});
