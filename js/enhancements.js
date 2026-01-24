<<<<<<< HEAD
// Scroll Progress Bar
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #a855f7, #f59e0b);
        z-index: 999;
        width: 0;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createProgressBar();

// Smooth page transitions
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="/"]');
    if (link) {
        e.preventDefault();
        document.body.style.opacity = '0.7';
        setTimeout(() => {
            window.location.href = link.href;
        }, 150);
    }
});

// Restore opacity on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Add hover effect to all links
document.querySelectorAll('a:not(.dark-mode-toggle)').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Parallax effect on hero sections
function createParallaxEffect() {
    const heroSections = document.querySelectorAll('.hero');
    
    if (heroSections.length === 0) return;
    
    window.addEventListener('scroll', () => {
        heroSections.forEach(hero => {
            const scrolled = window.scrollY;
            const sectionTop = hero.offsetTop;
            const windowHeight = window.innerHeight;
            
            if (scrolled + windowHeight > sectionTop) {
                const parallaxAmount = (scrolled - sectionTop) * 0.5;
                hero.style.backgroundPosition = `0 ${parallaxAmount}px`;
            }
        });
    });
}

createParallaxEffect();

// Add typing animation for headings
function addTypingAnimation() {
    const headings = document.querySelectorAll('h1:not(.logo-text), h2, h3');
    
    headings.forEach(heading => {
        heading.style.borderRight = '2px solid #2563eb';
        heading.style.whiteSpace = 'nowrap';
        heading.style.overflow = 'hidden';
        
        const text = heading.textContent;
        let index = 0;
        
        heading.textContent = '';
        
        const type = () => {
            if (index < text.length) {
                heading.textContent += text.charAt(index);
                index++;
                setTimeout(type, 30);
            } else {
                heading.style.borderRight = 'none';
            }
        };
        
        // Only animate on initial page load or when element enters viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && heading.textContent === '') {
                    type();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(heading);
    });
}

// Disable typing animation by default (it can be too much)
// Uncomment if you want it:
// createTypingAnimation();

// Enhanced intersection observer with stagger effect
function enhanceElementAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

enhanceElementAnimations();

// Add active link highlighting in navigation
function highlightActiveLink() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentUrl = window.location.pathname;
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentUrl || (href === '' && currentUrl === '/') || 
            (currentUrl.includes(href) && href !== '')) {
            link.style.color = '#2563eb';
            link.style.fontWeight = '700';
        }
    });
}

highlightActiveLink();

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== PRINT / PDF FUNCTIONALITY =====
function createPrintButton() {
    // Don't add on quiz page
    if (window.location.pathname.includes('quiz')) return;
    
    const printBtn = document.createElement('button');
    printBtn.className = 'print-btn';
    printBtn.innerHTML = '<span class="icon">🖨️</span> Print / PDF';
    printBtn.title = 'Printează sau salvează ca PDF';
    
    printBtn.onclick = () => {
        // Add print-specific header
        const printHeader = document.createElement('div');
        printHeader.className = 'print-only';
        printHeader.id = 'printHeader';
        printHeader.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px; padding: 20px; background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; border-radius: 10px;">
                <h1 style="margin: 0;">SistemOS</h1>
                <p style="margin: 10px 0 0;">Evoluția Sistemelor de Operare</p>
                <p style="margin: 5px 0 0; font-size: 0.9rem; opacity: 0.8;">Generat: ${new Date().toLocaleDateString('ro-RO')}</p>
            </div>
        `;
        document.body.insertBefore(printHeader, document.body.firstChild);
        
        // Trigger print dialog
        window.print();
        
        // Remove header after print
        setTimeout(() => {
            const header = document.getElementById('printHeader');
            if (header) header.remove();
        }, 1000);
    };
    
    document.body.appendChild(printBtn);
}

// Initialize print button
document.addEventListener('DOMContentLoaded', createPrintButton);

// ===== EXPORT AS PDF (using browser's print to PDF) =====
function exportToPDF() {
    // Show instructions for saving as PDF
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    modal.innerHTML = `
        <div style="background: white; padding: 40px; border-radius: 20px; max-width: 500px; text-align: center;">
            <h2 style="margin-top: 0;">📄 Salvează ca PDF</h2>
            <p>Pentru a salva această pagină ca PDF:</p>
            <ol style="text-align: left; margin: 20px 0;">
                <li>Apasă <strong>Ctrl + P</strong> (sau Cmd + P pe Mac)</li>
                <li>Selectează <strong>"Save as PDF"</strong> ca destinație</li>
                <li>Click pe <strong>Save</strong></li>
            </ol>
            <button onclick="this.parentElement.parentElement.remove(); window.print();" 
                style="background: #2563eb; color: white; border: none; padding: 15px 30px; border-radius: 10px; font-size: 1rem; cursor: pointer; margin-top: 10px;">
                🖨️ Deschide Print Dialog
            </button>
            <button onclick="this.parentElement.parentElement.remove();" 
                style="background: #e5e7eb; color: #333; border: none; padding: 15px 30px; border-radius: 10px; font-size: 1rem; cursor: pointer; margin-left: 10px; margin-top: 10px;">
                ✕ Închide
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

=======
// Scroll Progress Bar
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #a855f7, #f59e0b);
        z-index: 999;
        width: 0;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createProgressBar();

// Smooth page transitions
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="/"]');
    if (link) {
        e.preventDefault();
        document.body.style.opacity = '0.7';
        setTimeout(() => {
            window.location.href = link.href;
        }, 150);
    }
});

// Restore opacity on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Add hover effect to all links
document.querySelectorAll('a:not(.dark-mode-toggle)').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Parallax effect on hero sections
function createParallaxEffect() {
    const heroSections = document.querySelectorAll('.hero');
    
    if (heroSections.length === 0) return;
    
    window.addEventListener('scroll', () => {
        heroSections.forEach(hero => {
            const scrolled = window.scrollY;
            const sectionTop = hero.offsetTop;
            const windowHeight = window.innerHeight;
            
            if (scrolled + windowHeight > sectionTop) {
                const parallaxAmount = (scrolled - sectionTop) * 0.5;
                hero.style.backgroundPosition = `0 ${parallaxAmount}px`;
            }
        });
    });
}

createParallaxEffect();

// Add typing animation for headings
function addTypingAnimation() {
    const headings = document.querySelectorAll('h1:not(.logo-text), h2, h3');
    
    headings.forEach(heading => {
        heading.style.borderRight = '2px solid #2563eb';
        heading.style.whiteSpace = 'nowrap';
        heading.style.overflow = 'hidden';
        
        const text = heading.textContent;
        let index = 0;
        
        heading.textContent = '';
        
        const type = () => {
            if (index < text.length) {
                heading.textContent += text.charAt(index);
                index++;
                setTimeout(type, 30);
            } else {
                heading.style.borderRight = 'none';
            }
        };
        
        // Only animate on initial page load or when element enters viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && heading.textContent === '') {
                    type();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(heading);
    });
}

// Disable typing animation by default (it can be too much)
// Uncomment if you want it:
// createTypingAnimation();

// Enhanced intersection observer with stagger effect
function enhanceElementAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

enhanceElementAnimations();

// Add active link highlighting in navigation
function highlightActiveLink() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentUrl = window.location.pathname;
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentUrl || (href === '' && currentUrl === '/') || 
            (currentUrl.includes(href) && href !== '')) {
            link.style.color = '#2563eb';
            link.style.fontWeight = '700';
        }
    });
}

highlightActiveLink();

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== PRINT / PDF FUNCTIONALITY =====
function createPrintButton() {
    // Don't add on quiz page
    if (window.location.pathname.includes('quiz')) return;
    
    const printBtn = document.createElement('button');
    printBtn.className = 'print-btn';
    printBtn.innerHTML = '<span class="icon">🖨️</span> Print / PDF';
    printBtn.title = 'Printează sau salvează ca PDF';
    
    printBtn.onclick = () => {
        // Add print-specific header
        const printHeader = document.createElement('div');
        printHeader.className = 'print-only';
        printHeader.id = 'printHeader';
        printHeader.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px; padding: 20px; background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; border-radius: 10px;">
                <h1 style="margin: 0;">SistemOS</h1>
                <p style="margin: 10px 0 0;">Evoluția Sistemelor de Operare</p>
                <p style="margin: 5px 0 0; font-size: 0.9rem; opacity: 0.8;">Generat: ${new Date().toLocaleDateString('ro-RO')}</p>
            </div>
        `;
        document.body.insertBefore(printHeader, document.body.firstChild);
        
        // Trigger print dialog
        window.print();
        
        // Remove header after print
        setTimeout(() => {
            const header = document.getElementById('printHeader');
            if (header) header.remove();
        }, 1000);
    };
    
    document.body.appendChild(printBtn);
}

// Initialize print button
document.addEventListener('DOMContentLoaded', createPrintButton);

// ===== EXPORT AS PDF (using browser's print to PDF) =====
function exportToPDF() {
    // Show instructions for saving as PDF
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    modal.innerHTML = `
        <div style="background: white; padding: 40px; border-radius: 20px; max-width: 500px; text-align: center;">
            <h2 style="margin-top: 0;">📄 Salvează ca PDF</h2>
            <p>Pentru a salva această pagină ca PDF:</p>
            <ol style="text-align: left; margin: 20px 0;">
                <li>Apasă <strong>Ctrl + P</strong> (sau Cmd + P pe Mac)</li>
                <li>Selectează <strong>"Save as PDF"</strong> ca destinație</li>
                <li>Click pe <strong>Save</strong></li>
            </ol>
            <button onclick="this.parentElement.parentElement.remove(); window.print();" 
                style="background: #2563eb; color: white; border: none; padding: 15px 30px; border-radius: 10px; font-size: 1rem; cursor: pointer; margin-top: 10px;">
                🖨️ Deschide Print Dialog
            </button>
            <button onclick="this.parentElement.parentElement.remove();" 
                style="background: #e5e7eb; color: #333; border: none; padding: 15px 30px; border-radius: 10px; font-size: 1rem; cursor: pointer; margin-left: 10px; margin-top: 10px;">
                ✕ Închide
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

>>>>>>> abcbb6b6a5fde656692021ce6d66fcfecfde8768
