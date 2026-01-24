/**
 * WINDOWS-UI.JS - Logică UI pentru secțiunea Windows
 * Proiect Atestat - Evoluția Sistemelor de Operare
 * 
 * Acest script gestionează:
 * - Afișarea/ascunderea conținutului Windows
 * - Mesaje pentru utilizatori non-Windows
 * - Interacțiuni touch-friendly
 */

(function() {
    'use strict';

    // =========================================================================
    // CONFIGURARE
    // =========================================================================
    
    const CONFIG = {
        // Lățimea minimă pentru a afișa interfața Windows
        minDesktopWidth: 1024,
        
        // Selectors pentru elementele UI
        selectors: {
            windowsContent: '.windows-content, .windows-desktop-simulation, .desktop, #desktop',
            restrictedMessage: '.windows-restricted-message',
            simulationMessage: '.simulation-not-available',
            mainContent: 'main',
            body: 'body'
        },
        
        // Mesaje pentru diferite scenarii
        messages: {
            ro: {
                title: 'Secțiune disponibilă doar pe Windows Desktop',
                subtitle: 'Pentru cea mai bună experiență',
                description: 'Această secțiune interactivă simulează interfața Windows și este optimizată pentru a fi vizualizată pe un calculator cu sistem de operare Windows.',
                requirements: [
                    'Sistem de operare: Windows',
                    'Rezoluție ecran: minim 1024px lățime',
                    'Browser modern (Chrome, Firefox, Edge)'
                ],
                alternatives: 'Poți explora în continuare:',
                alternativesList: [
                    { text: 'Galeria Windows', url: 'index.html' },
                    { text: 'Istoria Sistemelor de Operare', url: '../pages/history.html' },
                    { text: 'Pagina Principală', url: '../index.html' }
                ],
                buttonHome: '← Înapoi la Galerie',
                buttonMain: '🏠 Pagina Principală'
            },
            en: {
                title: 'Section available only on Windows Desktop',
                subtitle: 'For the best experience',
                description: 'This interactive section simulates the Windows interface and is optimized to be viewed on a Windows computer.',
                requirements: [
                    'Operating System: Windows',
                    'Screen resolution: minimum 1024px width',
                    'Modern browser (Chrome, Firefox, Edge)'
                ],
                alternatives: 'You can still explore:',
                alternativesList: [
                    { text: 'Windows Gallery', url: 'index.html' },
                    { text: 'History of Operating Systems', url: '../pages/history.html' },
                    { text: 'Main Page', url: '../index.html' }
                ],
                buttonHome: '← Back to Gallery',
                buttonMain: '🏠 Main Page'
            }
        }
    };

    // =========================================================================
    // UTILITĂȚI
    // =========================================================================
    
    /**
     * Obține limba curentă (din localStorage sau browser)
     */
    function getCurrentLanguage() {
        const stored = localStorage.getItem('language');
        if (stored && (stored === 'en' || stored === 'ro')) {
            return stored;
        }
        return navigator.language && navigator.language.startsWith('en') ? 'en' : 'ro';
    }

    /**
     * Verifică dacă suntem într-o pagină de simulare Windows
     */
    function isWindowsSimulationPage() {
        const path = window.location.pathname.toLowerCase();
        const simulationFolders = ['win95', 'win98', 'winxp', 'vista', 'win7', 'win8', 'win10', 'win11'];
        return simulationFolders.some(folder => path.includes('/' + folder + '/'));
    }

    /**
     * Verifică dacă suntem pe pagina principală Windows Gallery
     */
    function isWindowsGalleryPage() {
        const path = window.location.pathname.toLowerCase();
        return path.includes('/windows/index.html') || path.endsWith('/windows/');
    }

    // =========================================================================
    // CREARE MESAJ RESTRICȚIONAT
    // =========================================================================
    
    /**
     * Creează elementul HTML pentru mesajul de restricție
     */
    function createRestrictedMessage() {
        const lang = getCurrentLanguage();
        const msgs = CONFIG.messages[lang];
        const os = window.OSDetect ? window.OSDetect.getOS() : { name: 'Unknown' };
        const device = window.OSDetect ? window.OSDetect.getDevice() : { type: 'unknown', screenWidth: 0 };
        
        const wrapper = document.createElement('div');
        wrapper.className = 'windows-restricted-message show';
        wrapper.innerHTML = `
            <div class="message-icon">🖥️</div>
            <h2>${msgs.title}</h2>
            <p class="subtitle">${msgs.subtitle}</p>
            <p>${msgs.description}</p>
            
            <div class="message-details">
                <p><strong>Sistemul tău detectat:</strong></p>
                <ul>
                    <li>OS: ${os.name}</li>
                    <li>Dispozitiv: ${device.type}</li>
                    <li>Rezoluție: ${device.screenWidth}px</li>
                </ul>
            </div>
            
            <div class="message-details">
                <p><strong>Cerințe:</strong></p>
                <ul>
                    ${msgs.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>
            
            <div class="message-actions">
                <a href="${isWindowsSimulationPage() ? '../index.html' : 'index.html'}" class="btn-home">${msgs.buttonHome}</a>
                <a href="${isWindowsSimulationPage() ? '../../index.html' : '../index.html'}" class="btn-home" style="margin-left: 10px;">${msgs.buttonMain}</a>
            </div>
        `;
        
        return wrapper;
    }

    // =========================================================================
    // GESTIONARE AFIȘARE CONȚINUT
    // =========================================================================
    
    /**
     * Aplică restricțiile de afișare bazate pe OS și device
     */
    function applyWindowsRestrictions() {
        // Verifică dacă OSDetect este disponibil
        if (!window.OSDetect) {
            console.warn('OSDetect nu este încărcat. Încearcă să încarci os-detect.js înaintea windows-ui.js');
            return;
        }
        
        const access = window.OSDetect.canAccessWindows();
        const isSimulation = isWindowsSimulationPage();
        const isGallery = isWindowsGalleryPage();
        
        // Dacă nu suntem pe o pagină Windows, nu facem nimic
        if (!isSimulation && !isGallery) {
            return;
        }
        
        // CAZUL 1: Pagină de simulare Windows (ex: win95/index.html)
        if (isSimulation) {
            if (!access.canAccess) {
                showRestrictionMessage();
                hideWindowsContent();
            } else {
                enableWindowsSimulation();
            }
        }
        
        // CAZUL 2: Galeria Windows (windows/index.html)
        // Galeria este întotdeauna vizibilă, doar simulările sunt restricționate
        if (isGallery) {
            // Galeria se afișează normal pe toate dispozitivele
            // Nu aplicăm restricții aici
        }
    }

    /**
     * Afișează mesajul de restricție
     */
    function showRestrictionMessage() {
        const existingMessage = document.querySelector('.windows-restricted-message');
        if (existingMessage) {
            existingMessage.classList.add('show');
            return;
        }
        
        const message = createRestrictedMessage();
        document.body.insertBefore(message, document.body.firstChild);
    }

    /**
     * Ascunde conținutul Windows
     */
    function hideWindowsContent() {
        const selectors = CONFIG.selectors;
        
        // Ascunde toate elementele de simulare
        document.querySelectorAll(selectors.windowsContent).forEach(el => {
            el.style.display = 'none';
            el.classList.remove('show');
        });
        
        // Ascunde main dacă există
        const main = document.querySelector('main');
        if (main) {
            main.style.display = 'none';
        }
        
        // Ascunde header dacă există (pentru paginile de simulare)
        const header = document.querySelector('header:not(.main-header)');
        if (header) {
            header.style.display = 'none';
        }
    }

    /**
     * Activează simularea Windows
     */
    function enableWindowsSimulation() {
        const selectors = CONFIG.selectors;
        
        // Afișează conținutul Windows
        document.querySelectorAll(selectors.windowsContent).forEach(el => {
            el.classList.add('show', 'enabled');
        });
        
        // Asigură că main este vizibil
        const main = document.querySelector('main');
        if (main) {
            main.style.display = '';
        }
    }

    // =========================================================================
    // TOUCH SUPPORT
    // =========================================================================
    
    /**
     * Adaugă suport touch pentru elementele interactive
     */
    function addTouchSupport() {
        const hasTouch = window.OSDetect ? window.OSDetect.hasTouch() : ('ontouchstart' in window);
        
        if (!hasTouch) return;
        
        // Convertește click la touch pentru elemente specifice
        document.querySelectorAll('.windows-card, .timeline-item, .btn').forEach(el => {
            el.addEventListener('touchstart', function(e) {
                this.classList.add('touch-active');
            }, { passive: true });
            
            el.addEventListener('touchend', function(e) {
                this.classList.remove('touch-active');
            }, { passive: true });
        });
        
        // Previne zoom-ul pe double-tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(e) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    // =========================================================================
    // RESIZE HANDLER
    // =========================================================================
    
    /**
     * Gestionează redimensionarea ferestrei
     */
    function handleResize() {
        // Re-aplică restricțiile la redimensionare
        const message = document.querySelector('.windows-restricted-message');
        
        if (window.OSDetect) {
            const access = window.OSDetect.canAccessWindows();
            
            if (access.canAccess && message) {
                message.classList.remove('show');
                enableWindowsSimulation();
            } else if (!access.canAccess && isWindowsSimulationPage()) {
                showRestrictionMessage();
                hideWindowsContent();
            }
        }
    }

    // =========================================================================
    // INIȚIALIZARE
    // =========================================================================
    
    function init() {
        // Aplică restricțiile
        applyWindowsRestrictions();
        
        // Adaugă suport touch
        addTouchSupport();
        
        // Ascultă evenimentul de resize de la OSDetect
        window.addEventListener('osdetect:resize', handleResize);
        
        // Backup resize listener
        window.addEventListener('resize', debounce(handleResize, 200));
    }

    /**
     * Debounce helper
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Inițializează când DOM-ul este gata
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export pentru utilizare în alte scripturi
    window.WindowsUI = {
        applyRestrictions: applyWindowsRestrictions,
        showMessage: showRestrictionMessage,
        hideContent: hideWindowsContent,
        enableSimulation: enableWindowsSimulation,
        isSimulationPage: isWindowsSimulationPage,
        isGalleryPage: isWindowsGalleryPage
    };

})();
