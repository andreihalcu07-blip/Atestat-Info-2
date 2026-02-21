// Custom Dialog Component - replaces native alert/confirm/prompt with styled modals
;(function(){
    // Create DOM elements once
    function createDialog() {
        if (document.getElementById('customDialogOverlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'customDialogOverlay';
        overlay.className = 'custom-dialog-overlay';

        const dialog = document.createElement('div');
        dialog.className = 'custom-dialog';
        dialog.setAttribute('role','dialog');
        dialog.setAttribute('aria-modal','true');

        dialog.innerHTML = `
            <div class="custom-dialog-body">
                <div class="custom-dialog-message" id="customDialogMessage"></div>
                <input class="custom-dialog-input" id="customDialogInput" style="display:none;" />
            </div>
            <div class="custom-dialog-actions" id="customDialogActions"></div>
        `;

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
    }

    function showDialog(options) {
        return new Promise((resolve) => {
            createDialog();
            const overlay = document.getElementById('customDialogOverlay');
            const dialog = overlay.querySelector('.custom-dialog');
            const messageEl = document.getElementById('customDialogMessage');
            const inputEl = document.getElementById('customDialogInput');
            const actions = document.getElementById('customDialogActions');

            // Set content
            messageEl.textContent = options.message || '';
            if (options.prompt) {
                inputEl.style.display = 'block';
                inputEl.value = options.defaultValue || '';
            } else {
                inputEl.style.display = 'none';
            }

            // Clear previous buttons
            actions.innerHTML = '';

            const prevActive = document.activeElement;

            function close(result) {
                overlay.classList.remove('open');
                // small delay to allow transition
                setTimeout(() => {
                    resolve(result);
                    if (prevActive && prevActive.focus) prevActive.focus();
                }, 150);
            }

            // Helper to create buttons
            function makeButton(text, cls, cb) {
                const btn = document.createElement('button');
                btn.className = 'btn ' + cls;
                btn.textContent = text;
                btn.addEventListener('click', cb);
                return btn;
            }

            // Configure buttons based on type
            if (options.type === 'alert') {
                const ok = makeButton(options.okText || 'OK', 'btn--primary', () => close());
                actions.appendChild(ok);
                overlay.classList.add('open');
                ok.focus();
            } else if (options.type === 'confirm') {
                const cancel = makeButton(options.cancelText || 'Cancel', 'btn--secondary', () => close(false));
                const ok = makeButton(options.okText || 'OK', 'btn--primary', () => close(true));
                actions.appendChild(cancel);
                actions.appendChild(ok);
                overlay.classList.add('open');
                ok.focus();
            } else if (options.type === 'prompt') {
                const cancel = makeButton(options.cancelText || 'Cancel', 'btn--secondary', () => close(null));
                const ok = makeButton(options.okText || 'OK', 'btn--primary', () => close(inputEl.value));
                actions.appendChild(cancel);
                actions.appendChild(ok);
                overlay.classList.add('open');
                inputEl.focus();
            }

            // Keyboard handling
            function keyHandler(e) {
                if (e.key === 'Escape') {
                    if (options.type === 'confirm') close(false);
                    else if (options.type === 'prompt') close(null);
                    else close();
                }
                if (e.key === 'Enter') {
                    if (options.type === 'prompt') {
                        const okBtn = actions.querySelector('.btn--primary');
                        if (okBtn) okBtn.click();
                    }
                }
            }
            document.addEventListener('keydown', keyHandler);

            // Remove listener on close by wrapping resolve
            const originalResolve = resolve;
            resolve = (v) => {
                document.removeEventListener('keydown', keyHandler);
                originalResolve(v);
            };
        });
    }

    // Public API
    window.customAlert = function(message) {
        return showDialog({ type: 'alert', message });
    };

    window.customConfirm = function(message) {
        return showDialog({ type: 'confirm', message });
    };

    window.customPrompt = function(message, defaultValue) {
        return showDialog({ type: 'prompt', message, prompt: true, defaultValue });
    };

    // Replace native dialogs with custom ones (async)
    window.alert = function(message) { customAlert(message); };
    window.confirm = function(message) { return customConfirm(message); };
    window.prompt = function(message, defaultValue) { return customPrompt(message, defaultValue); };
})();

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

    if (!this.checkValidity()) {
        this.reportValidity();
        return;
    }

    const submitBtn = this.querySelector('button[type="submit"]');
    const statusEl = this.querySelector('.contact-status');
    const actionUrl = this.getAttribute('action');
    const formData = new FormData(this);

    const showStatus = (message, type) => {
        if (!statusEl) return;
        statusEl.textContent = message;
        statusEl.style.color = type === 'error' ? '#ef4444' : '#22c55e';
        statusEl.hidden = false;
        statusEl.classList.remove('fade-in');
        void statusEl.offsetWidth;
        statusEl.classList.add('fade-in');
        statusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Se trimite...';
    submitBtn.disabled = true;

    try {
        const response = await fetch(actionUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        });

        let responseData = null;
        const responseType = response.headers.get('content-type') || '';
        if (responseType.includes('application/json')) {
            responseData = await response.json();
        } else {
            responseData = await response.text();
        }

        if (response.ok) {
            showStatus('Mesajul a fost trimis cu succes. Îți mulțumim!', 'success');
            this.reset();
        } else {
            const errorMessage = responseData && responseData.message ? responseData.message : 'Nu s-a putut trimite mesajul. Încearcă din nou.';
            showStatus(errorMessage, 'error');
        }
    } catch (error) {
        console.error('Eroare:', error);
        showStatus('Eroare la trimitere. Verifică conexiunea și încearcă din nou.', 'error');
    } finally {
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

// Mobile menu toggle (accessible, mobile-only)
function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const toggles = Array.from(document.querySelectorAll('.menu-toggle'));
    if (!navbar || !navLinks || toggles.length === 0) return;

    // Ensure ARIA attributes and attach handlers
    toggles.forEach(toggle => {
        toggle.setAttribute('aria-controls', 'main-nav');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.addEventListener('click', () => {
            // Only operate on mobile widths
            if (window.innerWidth > 768) return;
            const isOpen = navbar.classList.toggle('nav-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            // Keep focus on toggle for accessibility
            if (!isOpen) toggle.focus();
        });
    });

    // Ensure nav is visible on desktop and nav-open removed
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navbar.classList.remove('nav-open');
            toggles.forEach(t => t.setAttribute('aria-expanded', 'false'));
        }
    });
}

document.addEventListener('DOMContentLoaded', initMobileMenu);

// Enhanced scroll effect to navbar + auto-hide
let lastScrollY = Math.max(0, window.scrollY || 0);
let lastToggleY = lastScrollY;
let isNavHidden = false;
let isScrollTicking = false;

function updateNavbarOnScroll(currentScrollY) {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (currentScrollY > 50) {
        navbar.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }

    if (navbar.classList.contains('nav-open')) {
        if (isNavHidden) {
            navbar.classList.remove('nav-hidden');
            isNavHidden = false;
        }
        lastScrollY = currentScrollY;
        lastToggleY = currentScrollY;
        return;
    }

    const topThreshold = 80;
    const jitterThreshold = 15;

    if (currentScrollY < topThreshold) {
        if (isNavHidden) {
            navbar.classList.remove('nav-hidden');
            isNavHidden = false;
        }
        lastScrollY = currentScrollY;
        lastToggleY = currentScrollY;
        return;
    }

    const delta = currentScrollY - lastScrollY;
    const distanceSinceToggle = Math.abs(currentScrollY - lastToggleY);

    if (distanceSinceToggle < jitterThreshold) {
        lastScrollY = currentScrollY;
        return;
    }

    if (delta > 0 && !isNavHidden) {
        navbar.classList.add('nav-hidden');
        isNavHidden = true;
        lastToggleY = currentScrollY;
    } else if (delta < 0 && isNavHidden) {
        navbar.classList.remove('nav-hidden');
        isNavHidden = false;
        lastToggleY = currentScrollY;
    }

    lastScrollY = currentScrollY;
}

window.addEventListener('scroll', function() {
    const currentScrollY = Math.max(0, window.scrollY || window.pageYOffset || 0);
    if (!isScrollTicking) {
        window.requestAnimationFrame(() => {
            updateNavbarOnScroll(currentScrollY);
            isScrollTicking = false;
        });
        isScrollTicking = true;
    }
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

/* ------------------------------------------------------------------
   Boot screen initialization
   - Single template: <div class="boot-screen windows95" data-version="95"></div>
   - Only the version text is changed by JS based on data-version
   ------------------------------------------------------------------ */
function initBootScreens() {
    document.querySelectorAll('.boot-screen').forEach(function(el) {
        const version = String(el.dataset.version || '');
        // Support ONLY Windows 95 and 98 as requested
        if (version !== '95' && version !== '98') return;

        // Remove any previously injected inner content (defensive)
        const prevInner = el.querySelector('.boot-inner');
        if (prevInner) prevInner.remove();

        // Ensure background image is controlled by CSS via [data-version] selectors

        // Inject only the loading bar element (no text, no logos)
        if (!el.querySelector('.boot-loader')) {
            const loader = document.createElement('div');
            loader.className = 'boot-loader';
            loader.setAttribute('aria-hidden', 'true');
            loader.innerHTML = '<div class="boot-loader-track"><div class="boot-loader-fill"></div></div>';
            el.appendChild(loader);
        }
    });
}

document.addEventListener('DOMContentLoaded', initBootScreens);

