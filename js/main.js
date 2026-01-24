// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    // Default to dark mode unless user explicitly disabled it
    const darkModeDisabled = localStorage.getItem('darkMode') === 'false';
    if (!darkModeDisabled) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
        // Add animation effect
        darkModeToggle.style.animation = 'none';
        setTimeout(() => {
            darkModeToggle.style.animation = '';
        }, 10);
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Parallel particle effect on hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, ' + (Math.random() * 0.5 + 0.3) + ')';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        particle.style.animation = `float ${Math.random() * 5 + 5}s ease-in-out infinite`;
        hero.appendChild(particle);
    }
}

createParticles();

// Form submission cu trimitere la server
document.querySelector('.contact-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    const submitBtn = this.querySelector('button[type="submit"]');
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Te rog completează toate câmpurile!');
        return;
    }

    // Dezactivează butonul și arată loading
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Se trimite...';
    submitBtn.disabled = true;

    try {
        // Trimite datele la server
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            alert(`Mulțumim, ${name}! ${data.message}`);
            this.reset();
        } else {
            alert('Eroare: ' + (data.error || 'Nu s-a putut trimite mesajul'));
        }
    } catch (error) {
        console.error('Eroare:', error);
        alert('Eroare la conectare cu serverul. Asigură-te că serverul rulează pe http://localhost:3000');
    } finally {
        // Re-activează butonul
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe timeline items, os cards, and feature cards
document.querySelectorAll('.timeline-item, .os-card, .feature-card').forEach((el) => {
    observer.observe(el);
});

// Mobile menu toggle
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar .container');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.menu-toggle')) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'menu-toggle';
            menuToggle.innerHTML = '☰';
            menuToggle.style.background = 'rgba(0, 0, 0, 0.1)';
            menuToggle.style.border = 'none';
            menuToggle.style.fontSize = '1.5rem';
            menuToggle.style.cursor = 'pointer';
            menuToggle.style.padding = '10px 15px';
            menuToggle.style.borderRadius = '8px';
            menuToggle.style.transition = 'all 0.3s ease';
            menuToggle.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                menuToggle.style.transform = navLinks.style.display === 'flex' ? 'rotate(90deg)' : 'rotate(0deg)';
            });
            navbar.appendChild(menuToggle);
        }
    } else {
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) menuToggle.remove();
        navLinks.style.display = 'flex';
    }
};

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// Enhanced scroll effect to navbar
let lastScrollY = 0;
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('header');
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        navbar.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollY = scrollY;
});

// Add mouse tracker effect
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.os-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const rotateX = (y - rect.height / 2) / 10;
        const rotateY = (rect.width / 2 - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

// Reset rotation on mouse leave
document.addEventListener('mouseleave', () => {
    const cards = document.querySelectorAll('.os-card');
    cards.forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});

// Add pulse effect on load
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.os-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = '';
            }, 10);
        }, index * 100);
    });
});

// Smooth numbers counter for stats (if any)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

