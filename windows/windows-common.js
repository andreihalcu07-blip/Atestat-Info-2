/*
 * windows-common.js shim
 * NOTE: The original common logic was merged into `js/windows-ui.js`.
 * This small shim remains to avoid breaking pages that still include
 * `windows/windows-common.js`. It forwards API stubs to the unified
 * implementation when available.
 */

(function () {
    'use strict';

    // If the unified file already loaded exports, reuse them.
    if (window.WindowsCommon) return;

    window.WindowsCommon = {
        version: null,
        config: null,
        playSound: function () { console.warn('playSound: unified js/windows-ui.js should provide this.'); }
    };

    // =========================================================================
    // DETECTARE VERSIUNE WINDOWS
    // =========================================================================
    
    function detectWindowsVersion() {
        // Prioritate 1: Atribut data-windows pe body
        const bodyDataAttr = document.body.getAttribute('data-windows');
        if (bodyDataAttr && windowsConfig[bodyDataAttr]) {
            return bodyDataAttr;
        }
        
        // Prioritate 2: Detectare din URL path
        const path = window.location.pathname.toLowerCase();
        if (path.includes('win95')) return 'win95';
        if (path.includes('win98')) return 'win98';
        if (path.includes('winxp')) return 'winxp';
        if (path.includes('vista')) return 'vista';
        if (path.includes('win7')) return 'win7';
        if (path.includes('win8')) return 'win8';
        if (path.includes('win10')) return 'win10';
        if (path.includes('win11')) return 'win11';
        
        // Nu s-a găsit versiune
        return null;
    }

    const currentVersion = detectWindowsVersion();
    const config = currentVersion ? windowsConfig[currentVersion] : null;

    // =========================================================================
    // 1. BOOT SCREEN
    // =========================================================================
    
    function createBootScreen() {
        if (!config) return;
        
        // Verifică dacă boot-ul a rulat deja în această sesiune
        const bootKey = `bootShown_${currentVersion}`;
        if (sessionStorage.getItem(bootKey)) return;
        
        // Creează overlay-ul de boot
        const bootScreen = document.createElement('div');
        bootScreen.id = 'bootScreen';
        bootScreen.className = `boot-screen boot-${currentVersion}`;
        
        // Conținut specific versiunii
        let bootContent = '';
        
        if (currentVersion === 'win95' || currentVersion === 'win98') {
            // Image-based boot screen (strict implementation for Win95/Win98)
            // - Use the existing boot.jpg placed in the same directory as the page (do NOT modify the image)
            // - Overlay a simple classic loading bar at the bottom-center
            // - Animate the loader for config.bootDuration, then remove the overlay

            // Build minimal DOM instead of SVG/text markup
            bootContent = `
                <img class="boot-bg-image" src="boot.jpg" alt="" style="display:block;width:100%;height:100%;object-fit:cover;">
                <div class="boot-loader" aria-hidden="true" style="position:absolute;left:50%;transform:translateX(-50%);bottom:38px;width:60%;max-width:640px;height:14px;border:2px solid #888;background:#000;box-sizing:border-box;">
                    <div class="boot-loader-fill" style="width:0%;height:100%;background:#2b6fb3;"></div>
                </div>
            `;
        } else if (currentVersion === 'winxp') {
            // Image-based Windows XP boot screen
            // - Use existing boot.jpg in the same folder (do NOT modify the image)
            // - Overlay a segmented classic XP loading bar centered (positioned per spec)
            // - No additional text or logos added
            bootContent = `
                <img class="boot-bg-image" src="boot.jpg" alt="" style="display:block;width:100%;height:100%;object-fit:cover;">
                <div class="boot-loading-xp" aria-hidden="true" style="position:absolute;top:50%;left:50%;transform:translate(-50%,120px);width:520px;max-width:80%;height:18px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;border:2px solid #888;background:#000;padding:2px;">
                    <!-- segments will be created by JS to avoid global CSS -->
                </div>
            `;
        } else if (currentVersion === 'vista' || currentVersion === 'win7') {
            bootContent = `
                <div class="boot-logo-aero">
                    <svg viewBox="0 0 100 100" width="100" height="100">
                        <defs>
                            <linearGradient id="bootGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#00bcf2"/>
                                <stop offset="100%" style="stop-color:#0078d4"/>
                            </linearGradient>
                        </defs>
                        <polygon points="5,10 45,5 45,45 5,45" fill="url(#bootGrad)" opacity="0.9"/>
                        <polygon points="55,4 95,0 95,44 55,44" fill="url(#bootGrad)" opacity="0.9"/>
                        <polygon points="5,55 45,55 45,95 5,88" fill="url(#bootGrad)" opacity="0.9"/>
                        <polygon points="55,56 95,56 95,100 55,94" fill="url(#bootGrad)" opacity="0.9"/>
                    </svg>
                </div>
                <div class="boot-text-aero">${config.bootText}</div>
                <div class="boot-spinner-aero"></div>
            `;
        } else {
            // Win8, Win10, Win11 - modern
            bootContent = `
                <div class="boot-logo-modern">
                    <svg viewBox="0 0 100 100" width="80" height="80">
                        <rect x="5" y="5" width="42" height="42" rx="${currentVersion === 'win11' ? '4' : '0'}" fill="#0078d4"/>
                        <rect x="53" y="5" width="42" height="42" rx="${currentVersion === 'win11' ? '4' : '0'}" fill="#0078d4"/>
                        <rect x="5" y="53" width="42" height="42" rx="${currentVersion === 'win11' ? '4' : '0'}" fill="#0078d4"/>
                        <rect x="53" y="53" width="42" height="42" rx="${currentVersion === 'win11' ? '4' : '0'}" fill="#0078d4"/>
                    </svg>
                </div>
                <div class="boot-dots-modern">
                    <span></span><span></span><span></span><span></span><span></span>
                </div>
            `;
        }

        // XP-specific: build segmented loader and animate (separate flow from 95/98)
        if (currentVersion === 'winxp') {
            // Ensure overlay covers viewport
            bootScreen.style.position = 'fixed';
            bootScreen.style.top = '0';
            bootScreen.style.left = '0';
            bootScreen.style.width = '100%';
            bootScreen.style.height = '100%';
            bootScreen.style.zIndex = '9999';
            bootScreen.style.backgroundColor = '#000';
            bootScreen.style.overflow = 'hidden';

            const loaderContainer = bootScreen.querySelector('.boot-loading-xp');
            if (loaderContainer) {
                // Clear any existing content (defensive)
                loaderContainer.innerHTML = '';
                // Create segments
                const segments = 12;
                const gap = 4; // px between segments
                const totalGap = gap * (segments - 1);
                // containerWidth in px is approximated by computed width
                const containerWidth = loaderContainer.clientWidth || 520;
                const segWidth = Math.max(6, Math.floor((containerWidth - totalGap) / segments));

                for (let i = 0; i < segments; i++) {
                    const s = document.createElement('div');
                    s.className = 'boot-xp-seg';
                    s.style.width = segWidth + 'px';
                    s.style.height = '100%';
                    s.style.marginRight = i === segments - 1 ? '0' : gap + 'px';
                    s.style.background = '#111';
                    s.style.boxSizing = 'border-box';
                    loaderContainer.appendChild(s);
                }

                // Animate segments sequentially to blue over config.bootDuration
                const segEls = loaderContainer.querySelectorAll('.boot-xp-seg');
                const duration = Math.max(200, config.bootDuration || 2500);
                const interval = Math.floor(duration / segments);
                segEls.forEach((el, idx) => {
                    setTimeout(() => {
                        el.style.background = '#2b6fb3';
                    }, idx * interval);
                });
            }
        }
        
        bootScreen.innerHTML = bootContent;
        document.body.appendChild(bootScreen);

        // If this is the image-based Win95/Win98 flow, ensure the overlay covers viewport
        if (currentVersion === 'win95' || currentVersion === 'win98') {
            // Inline styles only for this overlay (no global stylesheet changes)
            bootScreen.style.position = 'fixed';
            bootScreen.style.top = '0';
            bootScreen.style.left = '0';
            bootScreen.style.width = '100%';
            bootScreen.style.height = '100%';
            bootScreen.style.zIndex = '9999';
            bootScreen.style.backgroundColor = '#000';
            bootScreen.style.overflow = 'hidden';

            // Start the loader animation (fill width over config.bootDuration)
            const fill = bootScreen.querySelector('.boot-loader-fill');
            if (fill) {
                // Apply transition and then trigger it
                fill.style.transition = `width ${config.bootDuration}ms linear`;
                // Small timeout to ensure the element is rendered before changing width
                setTimeout(() => { fill.style.width = '100%'; }, 20);
            }
        }

        // Ascunde desktop-ul
        const desktop = document.querySelector('.desktop') || document.querySelector('.metro-interface');
        if (desktop) desktop.style.opacity = '0';
        
        // După durata de boot, fade out și afișare desktop
        setTimeout(() => {
            bootScreen.classList.add('fade-out');
            if (desktop) {
                desktop.style.transition = 'opacity 0.5s ease';
                desktop.style.opacity = '1';
            }
            
            setTimeout(() => {
                bootScreen.remove();
            }, 500);
            
            // Marchează boot-ul ca efectuat
            sessionStorage.setItem(bootKey, 'true');
        }, config.bootDuration);
    }

    // =========================================================================
    // 2. CEAS TASKBAR
    // =========================================================================
    
    function initTaskbarClock() {
        const clockElement = document.querySelector('.time, .clock, .system-time');
        if (!clockElement) return;
        
        function updateClock() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            clockElement.textContent = `${hours}:${minutes}`;
        }
        
        updateClock();
        setInterval(updateClock, 60000); // Update la fiecare minut
    }

    // =========================================================================
    // 3. FERESTRE DRAGGABLE
    // =========================================================================
    
    function initDraggableWindows() {
        const windows = document.querySelectorAll('.window');
        
        windows.forEach(win => {
            const titleBar = win.querySelector('.title-bar');
            if (!titleBar) return;
            
            // Use pointer events where available for better mouse/touch support
            let isDragging = false;
            let startX = 0, startY = 0, initialX = 0, initialY = 0;

            titleBar.style.cursor = 'move';

            const startDrag = (e) => {
                // Allow only primary button
                if (e.button !== undefined && e.button !== 0) return;
                // Don't start drag when clicking on control buttons
                if (e.target && e.target.closest && e.target.closest('.title-btn, .title-bar-controls, .title-buttons')) return;

                // Prevent text selection/other side-effects
                e.preventDefault();

                const rect = win.getBoundingClientRect();

                // Freeze current computed position by setting left/top and removing centering transform
                win.style.position = 'absolute';
                win.style.left = rect.left + 'px';
                win.style.top = rect.top + 'px';
                win.style.transform = 'none';
                win.style.zIndex = '1000';

                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                initialX = rect.left;
                initialY = rect.top;

                // If pointer events supported, capture pointer so we get move/up even if outside element
                if (e.pointerId && titleBar.setPointerCapture) {
                    try { titleBar.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
                }

                // attach move/up handlers specific to this window
                document.addEventListener('pointermove', onMove);
                document.addEventListener('pointerup', endDrag);
                document.addEventListener('pointercancel', endDrag);
            };

            const onMove = (e) => {
                if (!isDragging) return;

                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;

                let newX = initialX + deltaX;
                let newY = initialY + deltaY;

                // Constrain to viewport (taskbar assumed 40px high)
                const maxX = window.innerWidth - win.offsetWidth;
                const maxY = window.innerHeight - win.offsetHeight - 40;

                newX = Math.max(0, Math.min(newX, maxX));
                newY = Math.max(0, Math.min(newY, maxY));

                win.style.left = newX + 'px';
                win.style.top = newY + 'px';
            };

            const endDrag = (e) => {
                if (!isDragging) return;
                isDragging = false;

                // release pointer capture if any
                if (e.pointerId && titleBar.releasePointerCapture) {
                    try { titleBar.releasePointerCapture(e.pointerId); } catch (err) { /* ignore */ }
                }

                // remove handlers attached for this drag
                document.removeEventListener('pointermove', onMove);
                document.removeEventListener('pointerup', endDrag);
                document.removeEventListener('pointercancel', endDrag);
            };

            // Prefer pointer events, fall back to mouse for older browsers
            titleBar.addEventListener('pointerdown', startDrag);
            titleBar.addEventListener('mousedown', (e) => {
                // If pointer events are available, they will handle it; otherwise use the mouse path
                if (window.PointerEvent) return;
                startDrag(e);
            });
        });
    }

    // =========================================================================
    // 4. DIALOG MODAL WINDOWS - Sistem complet de dialoguri custom
    // =========================================================================
    
    /**
     * Afișează un dialog Windows custom - înlocuiește alert(), confirm(), prompt()
     * @param {Object} options - Opțiuni pentru dialog
     * @param {string} options.title - Titlul dialogului
     * @param {string} options.message - Mesajul de afișat
     * @param {string} options.icon - Icon emoji sau tip: 'info', 'warning', 'error', 'question'
     * @param {string} options.type - Tipul dialogului: 'alert', 'confirm', 'prompt'
     * @param {Array} options.buttons - Array de butoane custom [{text, value, primary}]
     * @param {string} options.inputPlaceholder - Placeholder pentru prompt input
     * @param {string} options.inputValue - Valoare inițială pentru prompt
     * @returns {Promise} - Rezolvă cu valoarea butonului apăsat sau text input
     */
    function showWindowsDialog(options) {
        return new Promise((resolve) => {
            // Mapare iconuri
            const iconMap = {
                'info': 'ℹ️',
                'warning': '⚠️',
                'error': '❌',
                'question': '❓',
                'success': '✅'
            };
            
            // Opțiuni default
            const settings = {
                title: options.title || config?.name || 'Windows',
                message: options.message || '',
                icon: iconMap[options.icon] || options.icon || 'ℹ️',
                type: options.type || 'alert',
                confirmText: options.confirmText || 'OK',
                cancelText: options.cancelText || 'Anulare',
                buttons: options.buttons || null,
                inputPlaceholder: options.inputPlaceholder || '',
                inputValue: options.inputValue || '',
                onConfirm: options.onConfirm || null,
                onCancel: options.onCancel || null
            };
            
            // Verifică dacă există deja un dialog
            const existingDialog = document.getElementById('windowsDialog');
            if (existingDialog) {
                existingDialog.remove();
            }
            
            // Creează overlay
            const overlay = document.createElement('div');
            overlay.id = 'windowsDialog';
            overlay.className = 'windows-dialog-overlay';
            
            // Creează dialog
            const dialog = document.createElement('div');
            dialog.className = `windows-dialog dialog-${currentVersion}`;
            
            // Header
            const header = document.createElement('div');
            header.className = 'dialog-header';
            
            const headerIcon = document.createElement('span');
            headerIcon.className = 'dialog-header-icon';
            headerIcon.textContent = '🪟';
            
            const headerTitle = document.createElement('span');
            headerTitle.className = 'dialog-header-title';
            headerTitle.textContent = settings.title;
            
            header.appendChild(headerIcon);
            header.appendChild(headerTitle);
            
            // Body
            const body = document.createElement('div');
            body.className = 'dialog-body';
            
            const messageIcon = document.createElement('div');
            messageIcon.className = 'dialog-icon';
            messageIcon.textContent = settings.icon;
            
            const messageContent = document.createElement('div');
            messageContent.className = 'dialog-content';
            
            const messageText = document.createElement('div');
            messageText.className = 'dialog-message';
            // Suportă HTML sau text simplu
            if (settings.message.includes('<') || settings.message.includes('\n')) {
                messageText.innerHTML = settings.message.replace(/\n/g, '<br>');
            } else {
                messageText.textContent = settings.message;
            }
            
            messageContent.appendChild(messageText);
            
            // Input pentru prompt
            let inputElement = null;
            if (settings.type === 'prompt') {
                inputElement = document.createElement('input');
                inputElement.type = 'text';
                inputElement.className = 'dialog-input';
                inputElement.placeholder = settings.inputPlaceholder;
                inputElement.value = settings.inputValue;
                messageContent.appendChild(inputElement);
            }
            
            body.appendChild(messageIcon);
            body.appendChild(messageContent);
            
            // Footer cu butoane
            const footer = document.createElement('div');
            footer.className = 'dialog-footer';
            
            if (settings.buttons && settings.buttons.length > 0) {
                // Butoane custom
                settings.buttons.forEach((btn, index) => {
                    const button = document.createElement('button');
                    button.className = `dialog-btn btn-${currentVersion}`;
                    if (btn.primary) button.classList.add('dialog-btn-confirm');
                    button.textContent = btn.text;
                    button.addEventListener('click', () => closeDialog(btn.value !== undefined ? btn.value : index));
                    footer.appendChild(button);
                });
            } else if (settings.type === 'alert') {
                // Un singur buton OK
                const okBtn = document.createElement('button');
                okBtn.className = `dialog-btn dialog-btn-confirm btn-${currentVersion}`;
                okBtn.textContent = settings.confirmText;
                okBtn.addEventListener('click', () => closeDialog(true));
                footer.appendChild(okBtn);
            } else if (settings.type === 'confirm') {
                // Butoane Da/Nu
                const confirmBtn = document.createElement('button');
                confirmBtn.className = `dialog-btn dialog-btn-confirm btn-${currentVersion}`;
                confirmBtn.textContent = settings.confirmText || 'Da';
                confirmBtn.addEventListener('click', () => {
                    if (settings.onConfirm) settings.onConfirm();
                    closeDialog(true);
                });
                
                const cancelBtn = document.createElement('button');
                cancelBtn.className = `dialog-btn dialog-btn-cancel btn-${currentVersion}`;
                cancelBtn.textContent = settings.cancelText || 'Nu';
                cancelBtn.addEventListener('click', () => {
                    if (settings.onCancel) settings.onCancel();
                    closeDialog(false);
                });
                
                footer.appendChild(confirmBtn);
                footer.appendChild(cancelBtn);
            } else if (settings.type === 'prompt') {
                // Butoane OK/Anulare pentru prompt
                const confirmBtn = document.createElement('button');
                confirmBtn.className = `dialog-btn dialog-btn-confirm btn-${currentVersion}`;
                confirmBtn.textContent = settings.confirmText || 'OK';
                confirmBtn.addEventListener('click', () => {
                    closeDialog(inputElement ? inputElement.value : '');
                });
                
                const cancelBtn = document.createElement('button');
                cancelBtn.className = `dialog-btn dialog-btn-cancel btn-${currentVersion}`;
                cancelBtn.textContent = settings.cancelText || 'Anulare';
                cancelBtn.addEventListener('click', () => closeDialog(null));
                
                footer.appendChild(confirmBtn);
                footer.appendChild(cancelBtn);
            } else {
                // Default: un buton OK
                const okBtn = document.createElement('button');
                okBtn.className = `dialog-btn dialog-btn-confirm btn-${currentVersion}`;
                okBtn.textContent = 'OK';
                okBtn.addEventListener('click', () => closeDialog(true));
                footer.appendChild(okBtn);
            }
            
            // Asamblare dialog
            dialog.appendChild(header);
            dialog.appendChild(body);
            dialog.appendChild(footer);
            overlay.appendChild(dialog);
            
            // Adaugă la body
            document.body.appendChild(overlay);
            
            // Trigger animație
            setTimeout(() => {
                overlay.classList.add('active');
            }, 10);
            
            // Funcție de închidere
            function closeDialog(result) {
                overlay.classList.remove('active');
                setTimeout(() => {
                    overlay.remove();
                    resolve(result);
                }, 300);
            }
            
            // Închide cu ESC
            function handleEscape(e) {
                if (e.key === 'Escape') {
                    if (settings.onCancel) settings.onCancel();
                    closeDialog(settings.type === 'prompt' ? null : false);
                    document.removeEventListener('keydown', handleEscape);
                }
                if (e.key === 'Enter' && settings.type === 'prompt' && inputElement) {
                    closeDialog(inputElement.value);
                    document.removeEventListener('keydown', handleEscape);
                }
            }
            document.addEventListener('keydown', handleEscape);
            
            // Focus pe input sau buton
            setTimeout(() => {
                if (inputElement) {
                    inputElement.focus();
                    inputElement.select();
                } else {
                    const firstBtn = footer.querySelector('.dialog-btn-confirm') || footer.querySelector('.dialog-btn');
                    if (firstBtn) firstBtn.focus();
                }
            }, 100);
        });
    }
    
    // Funcții helper pentru înlocuirea alert/confirm/prompt
    function windowsAlert(message, title, icon) {
        return showWindowsDialog({
            type: 'alert',
            title: title || config?.name || 'Windows',
            message: message,
            icon: icon || 'info'
        });
    }
    
    function windowsConfirm(message, title, icon) {
        return showWindowsDialog({
            type: 'confirm',
            title: title || config?.name || 'Windows',
            message: message,
            icon: icon || 'question'
        });
    }
    
    function windowsPrompt(message, defaultValue, title) {
        return showWindowsDialog({
            type: 'prompt',
            title: title || config?.name || 'Windows',
            message: message,
            icon: 'question',
            inputValue: defaultValue || ''
        });
    }
    
    // Export funcții pentru utilizare externă
    window.showWindowsDialog = showWindowsDialog;
    window.windowsAlert = windowsAlert;
    window.windowsConfirm = windowsConfirm;
    window.windowsPrompt = windowsPrompt;
    window.triggerShutdown = triggerShutdown;

    // =========================================================================
    // 5. CARD "ȘTIAI CĂ..." - Cu suport multiple facts și random selection
    // =========================================================================
    
    function createDidYouKnowCard() {
        if (!config || !config.didYouKnowFacts) return;
        
        // Verifică dacă există deja
        if (document.getElementById('didYouKnowCard')) return;
        
        // Selectează un fact random din array
        const facts = config.didYouKnowFacts;
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        
        // Obține textul tradus folosind sistemul i18n (dacă este disponibil)
        const titleKey = 'dyk_title';
        let title = 'Știai că...?';
        
        // Folosește traducerea dacă sistemul i18n este încărcat
        if (window.t && typeof window.t === 'function') {
            const translatedTitle = window.t(titleKey);
            if (translatedTitle && translatedTitle !== titleKey) {
                title = translatedTitle;
            }
        }
        
        const card = document.createElement('div');
        card.id = 'didYouKnowCard';
        card.className = `did-you-know-card dyk-${currentVersion}`;
        
        card.innerHTML = `
            <div class="dyk-header">
                <span class="dyk-icon">💡</span>
                <span class="dyk-title" data-i18n="dyk_title">${title}</span>
                <button class="dyk-close" aria-label="Închide">×</button>
            </div>
            <div class="dyk-content">
                <p>${randomFact}</p>
            </div>
        `;
        
        // Event listener pentru butonul de închidere
        const closeBtn = card.querySelector('.dyk-close');
        closeBtn.addEventListener('click', function() {
            card.classList.add('hidden');
            // Opțional: salvează în sessionStorage că a fost închis
            sessionStorage.setItem(`dykClosed_${currentVersion}`, 'true');
        });
        
        // Verifică dacă a fost deja închis în această sesiune
        if (sessionStorage.getItem(`dykClosed_${currentVersion}`) === 'true') {
            card.classList.add('hidden');
        }
        
        // Adaugă la desktop sau metro-interface (pentru Win8)
        const container = document.querySelector('.desktop') || document.querySelector('.metro-interface') || document.body;
        if (container) {
            container.appendChild(card);
        }
    }

    // =========================================================================
    // 6. SUNETE WINDOWS
    // =========================================================================
    
    let audioContext = null;
    
    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioContext;
    }
    
    function playWindowsSound(type) {
        const ctx = initAudio();
        if (ctx.state === 'suspended') {
            ctx.resume();
        }
        
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        // Volum redus
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        
        if (type === 'start') {
            // Sunet Start Menu
            if (config.soundType === 'classic') {
                // Win95/98 - sunet simplu
                oscillator.frequency.setValueAtTime(800, ctx.currentTime);
                oscillator.frequency.setValueAtTime(1000, ctx.currentTime + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.2);
            } else if (config.soundType === 'xp') {
                // XP - mai melodic
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(523, ctx.currentTime);
                oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
                oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.4);
            } else {
                // Modern - subtil
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(600, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.15);
            }
        } else if (type === 'shutdown') {
            // Sunet Shutdown
            if (config.soundType === 'classic') {
                oscillator.frequency.setValueAtTime(600, ctx.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.5);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.5);
            } else if (config.soundType === 'xp') {
                // XP shutdown melody
                const notes = [784, 659, 523, 392];
                notes.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.type = 'sine';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.15);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.2);
                    osc.start(ctx.currentTime + i * 0.15);
                    osc.stop(ctx.currentTime + i * 0.15 + 0.2);
                });
                return;
            } else {
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(500, ctx.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.3);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.3);
            }
        }
    }
    
    function initSounds() {
        // Start button
        const startButton = document.querySelector('.start-button, #startButton, .start-btn');
        if (startButton) {
            startButton.addEventListener('click', () => playWindowsSound('start'));
        }
        
        // Shutdown button
        const shutdownItems = document.querySelectorAll('[data-action="shutdown"], .shutdown-btn, .menu-item:last-child');
        shutdownItems.forEach(item => {
            if (item.textContent.toLowerCase().includes('shut') || item.dataset.action === 'shutdown') {
                item.addEventListener('click', () => playWindowsSound('shutdown'));
            }
        });
    }

    // =========================================================================
    // 7. CURSOR PERSONALIZAT (aplicat prin CSS)
    // =========================================================================
    
    function applyCursor() {
        if (!config) return;
        document.body.classList.add(config.cursorClass);
    }

    // =========================================================================
    // 8. SHUTDOWN SCREEN - ECRANE DE ÎNCHIDERE
    // =========================================================================
    
    function createShutdownScreen() {
        if (!config) return;
        
        const shutdownScreen = document.createElement('div');
        shutdownScreen.id = 'shutdownScreen';
        shutdownScreen.className = `shutdown-screen shutdown-${currentVersion}`;
        
        let shutdownContent = '';
        
        if (currentVersion === 'win95') {
            shutdownContent = `
                <div class="shutdown-classic-container">
                    <div class="shutdown-classic-text">It's now safe to turn off</div>
                    <div class="shutdown-classic-text">your computer.</div>
                </div>
            `;
        } else if (currentVersion === 'win98') {
            shutdownContent = `
                <div class="shutdown-classic-container">
                    <div class="shutdown-classic-text">It's now safe to turn off</div>
                    <div class="shutdown-classic-text">your computer.</div>
                    <div class="shutdown-classic-subtext">You may also press the power button.</div>
                </div>
            `;
        } else if (currentVersion === 'winxp') {
            shutdownContent = `
                <div class="shutdown-xp-bar-top"></div>
                <div class="shutdown-xp-container">
                    <div class="shutdown-xp-logo">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 100'%3E%3Cdefs%3E%3ClinearGradient id='flag1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23ff3e00'/%3E%3Cstop offset='100%25' stop-color='%23ff7a00'/%3E%3C/linearGradient%3E%3ClinearGradient id='flag2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2300b000'/%3E%3Cstop offset='100%25' stop-color='%2390d000'/%3E%3C/linearGradient%3E%3ClinearGradient id='flag3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230078d4'/%3E%3Cstop offset='100%25' stop-color='%2300c8ff'/%3E%3C/linearGradient%3E%3ClinearGradient id='flag4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23ffb900'/%3E%3Cstop offset='100%25' stop-color='%23ffe000'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M2 25 Q25 18 40 25 Q50 30 50 45 Q45 55 25 52 Q5 50 2 35 Z' fill='url(%23flag1)'/%3E%3Cpath d='M52 22 Q75 12 90 20 Q100 28 98 42 Q90 52 70 50 Q52 48 52 38 Z' fill='url(%23flag2)'/%3E%3Cpath d='M2 58 Q20 52 40 58 Q52 65 50 78 Q40 90 20 88 Q2 85 2 72 Z' fill='url(%23flag3)'/%3E%3Cpath d='M52 55 Q70 50 88 55 Q100 62 98 76 Q88 88 68 86 Q52 82 52 70 Z' fill='url(%23flag4)'/%3E%3Ctext x='115' y='45' font-family='Franklin Gothic Medium, Trebuchet MS, sans-serif' font-size='16' fill='%23888'%3EMicrosoft%3C/text%3E%3Ctext x='115' y='78' font-family='Franklin Gothic Medium, Trebuchet MS, sans-serif' font-size='36' font-weight='bold' font-style='italic'%3E%3Ctspan fill='%23000'%3EWindows%3C/tspan%3E%3Ctspan fill='%23ff6600' font-size='28' baseline-shift='super'%3EXP%3C/tspan%3E%3C/text%3E%3C/svg%3E" alt="Windows XP" class="xp-logo-img">
                    </div>
                    <div class="shutdown-xp-text">Windows is shutting down...</div>
                </div>
                <div class="shutdown-xp-bar-bottom"></div>
            `;
        } else if (currentVersion === 'vista' || currentVersion === 'win7') {
            shutdownContent = `
                <div class="shutdown-aero-container">
                    <div class="shutdown-aero-spinner"></div>
                    <div class="shutdown-aero-text">Shutting down...</div>
                </div>
            `;
        } else if (currentVersion === 'win8') {
            shutdownContent = `
                <div class="shutdown-metro-container">
                    <div class="shutdown-metro-spinner"></div>
                    <div class="shutdown-metro-text">Shutting down</div>
                </div>
            `;
        } else if (currentVersion === 'win10') {
            shutdownContent = `
                <div class="shutdown-fluent-container">
                    <div class="shutdown-fluent-dots">
                        <span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <div class="shutdown-fluent-text">Shutting down</div>
                </div>
            `;
        } else if (currentVersion === 'win11') {
            shutdownContent = `
                <div class="shutdown-win11-container">
                    <div class="shutdown-win11-logo">
                        <svg viewBox="0 0 100 100" width="80" height="80">
                            <rect x="5" y="5" width="42" height="42" rx="4" fill="#00a4ef"/>
                            <rect x="53" y="5" width="42" height="42" rx="4" fill="#7fba00"/>
                            <rect x="5" y="53" width="42" height="42" rx="4" fill="#ffb900"/>
                            <rect x="53" y="53" width="42" height="42" rx="4" fill="#f25022"/>
                        </svg>
                    </div>
                    <div class="shutdown-win11-ring"></div>
                    <div class="shutdown-win11-text">Shutting down</div>
                </div>
            `;
        }
        
        shutdownScreen.innerHTML = shutdownContent;
        return shutdownScreen;
    }
    
    function triggerShutdown() {
        if (!config) return;
        
        // Redă sunetul de shutdown
        playWindowsSound('shutdown');
        
        // Creează și afișează ecranul de shutdown
        const shutdownScreen = createShutdownScreen();
        document.body.appendChild(shutdownScreen);
        
        // După 2.5 secunde, redirecționează la galerie
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 2500);
    }
    
    function initShutdownHandler() {
        // Caută butoanele/elementele de shutdown
        document.addEventListener('click', function(e) {
            const shutdownItem = e.target.closest('[data-action="shutdown"]');
            if (shutdownItem) {
                e.preventDefault();
                e.stopPropagation();
                triggerShutdown();
                return;
            }
            
            // Verifică și pentru text "Shut Down"
            const menuItem = e.target.closest('.menu-item');
            if (menuItem) {
                const text = menuItem.textContent.toLowerCase();
                if (text.includes('shut down') || text.includes('shutdown')) {
                    e.preventDefault();
                    e.stopPropagation();
                    triggerShutdown();
                }
            }
        });
    }

    // =========================================================================
    // INIȚIALIZARE
    // =========================================================================
    
    function init() {
        if (!config) return;
        
        // Boot screen primul
        createBootScreen();
        
        // După boot, inițializează restul
        const bootDuration = sessionStorage.getItem(`bootShown_${currentVersion}`) ? 0 : config.bootDuration + 500;
        
        setTimeout(() => {
            applyCursor();
            initTaskbarClock();
            initDraggableWindows();
            createDidYouKnowCard();

            // Recreate Did-You-Know card when language changes so translated title/content updates
            if (typeof window.onLanguageChange === 'function') {
                window.onLanguageChange(function() {
                    try {
                        const existing = document.getElementById('didYouKnowCard');
                        if (existing) existing.remove();
                        createDidYouKnowCard();
                    } catch (e) {
                        console.warn('[windows-common] Error recreating DYK on language change', e);
                    }
                });
            }
            initSounds();
            initShutdownHandler();
        }, bootDuration);
    }
    
    // Rulează la încărcarea paginii
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Export pentru debugging
    window.WindowsCommon = {
        version: currentVersion,
        config: config,
        playSound: playWindowsSound
    };
    
})();

/**
 * Windows Common JS - Funcționalități comune pentru toate versiunile Windows
 * Proiect Atestat - Evoluția Sistemelor de Operare
 */

(function() {
    'use strict';

    // =========================================================================
    // CONFIGURARE PER VERSIUNE WINDOWS
    // =========================================================================
    
    const windowsConfig = {
        win95: {
            name: 'Windows 95',
            bootText: 'Starting Windows 95...',
            bootDuration: 2500,
            cursorClass: 'cursor-classic',
            clockStyle: 'classic',
            soundType: 'classic',
            didYouKnowFacts: [
                'Windows 95 a fost primul sistem de operare Microsoft cu butonul Start și taskbar. A fost lansat pe 24 august 1995 și s-a vândut în 7 milioane de copii în primele 5 săptămâni!',
                'Pentru lansarea Windows 95, Microsoft a licențiat cântecul "Start Me Up" de la Rolling Stones pentru 14 milioane de dolari!',
                'Windows 95 a fost primul sistem de operare cu nume de cod "Chicago" și a necesitat minim 4 MB de RAM pentru a funcționa.',
                'Peste 1 milion de copii ale Windows 95 au fost vândute în primele 4 zile de la lansare!'
            ]
        },
        win98: {
            name: 'Windows 98',
            bootText: 'Starting Windows 98...',
            bootDuration: 2500,
            cursorClass: 'cursor-classic',
            clockStyle: 'classic',
            soundType: 'classic',
            didYouKnowFacts: [
                'Windows 98 a fost primul Windows cu suport nativ pentru USB și DVD! De asemenea, a introdus Windows Update pentru actualizări automate prin internet.',
                'Internet Explorer 4.0 a fost integrat direct în Windows 98, marcând începutul erei "browser wars".',
                'Windows 98 SE (Second Edition) a adăugat suportul pentru Internet Connection Sharing, permițând mai multor PC-uri să împartă o conexiune la internet.',
                'Celebra "demonstrație eșuată" a lui Bill Gates la COMDEX 1998, când Windows 98 a avut blue screen, a devenit un moment iconic în istorie!'
            ]
        },
        winxp: {
            name: 'Windows XP',
            bootText: 'Starting Windows XP...',
            bootDuration: 3000,
            cursorClass: 'cursor-xp',
            clockStyle: 'xp',
            soundType: 'xp',
            didYouKnowFacts: [
                'Windows XP a fost cel mai longeviv Windows, fiind suportat oficial 13 ani (2001-2014). Imaginea de fundal "Bliss" este cea mai vizualizată fotografie din istorie!',
                'XP vine de la "eXPerience" și a fost primul sistem Windows construit pe kernel-ul NT, combinând stabilitatea Windows 2000 cu interfața prietenoasă.',
                'Sunetul de pornire al Windows XP a fost compus de Brian Eno și durează exact 6 secunde.',
                'La sfârșitul suportului în 2014, Windows XP încă rula pe aproximativ 30% din computerele din lume!'
            ]
        },
        vista: {
            name: 'Windows Vista',
            bootText: 'Starting Windows Vista...',
            bootDuration: 3000,
            cursorClass: 'cursor-aero',
            clockStyle: 'aero',
            soundType: 'modern',
            didYouKnowFacts: [
                'Windows Vista a introdus interfața Aero Glass cu efecte de transparență și a fost primul Windows cu User Account Control (UAC) pentru securitate îmbunătățită.',
                'Vista necesita minimum 1 GB RAM, ceea ce era mult pentru 2007. Multe PC-uri au fost vândute ca "Vista Capable" dar nu puteau rula Aero Glass.',
                'Windows Vista a avut peste 50 de ediții diferite în întreaga lume, incluzând versiuni pentru diverse piețe internaționale!',
                'Interfața Aero Glass consuma atât de multe resurse încât mulți utilizatori au dezactivat-o pentru performanță mai bună.'
            ]
        },
        win7: {
            name: 'Windows 7',
            bootText: 'Starting Windows 7...',
            bootDuration: 2500,
            cursorClass: 'cursor-aero',
            clockStyle: 'aero',
            soundType: 'modern',
            didYouKnowFacts: [
                'Windows 7 este considerat de mulți cel mai bun Windows ever. A introdus Snap pentru aranjarea ferestrelor și a vândut 100 milioane de licențe în primele 6 luni!',
                'Tastatura Windows + Săgeată pentru snap a fost introdusă în Windows 7 și a devenit una dintre cele mai folosite funcții!',
                'Windows 7 a fost atât de popular încât mulți utilizatori au refuzat să facă upgrade la Windows 8, ducând la suport extins până în 2020.',
                'Biblioteca (Libraries) pentru Documents, Music, Pictures a fost o inovație majoră care organiza fișierele din locații diferite.'
            ]
        },
        win8: {
            name: 'Windows 8',
            bootText: 'Starting Windows 8...',
            bootDuration: 2000,
            cursorClass: 'cursor-modern',
            clockStyle: 'modern',
            soundType: 'modern',
            didYouKnowFacts: [
                'Windows 8 a introdus interfața Metro (Modern UI) optimizată pentru touch și a eliminat butonul Start clasic, ceea ce a provocat controverse majore.',
                'Windows 8 se pornește semnificativ mai rapid decât Windows 7 datorită funcției "Hybrid Boot" care salvează kernel-ul în hibernare.',
                'Microsoft a oferit upgrade de la Windows 8 la 8.1 gratuit, recunoscând feedback-ul negativ al utilizatorilor despre lipsa meniului Start.',
                'Windows 8 a fost primul Windows care funcționa pe arhitectura ARM, deschizând drumul pentru tablete Windows!'
            ]
        },
        win10: {
            name: 'Windows 10',
            bootText: 'Starting Windows 10...',
            bootDuration: 2000,
            cursorClass: 'cursor-modern',
            clockStyle: 'modern',
            soundType: 'modern',
            didYouKnowFacts: [
                'Windows 10 a fost oferit gratuit primul an! Este primul Windows „as a Service" cu actualizări continue. Cortana, asistentul vocal, a debutat aici.',
                'Microsoft a sărit de la Windows 8.1 direct la Windows 10, nu a existat niciodată "Windows 9"! Motivul oficial: probleme de compatibilitate cu cod care verifica "Windows 9x".',
                'Windows 10 primește actualizări majore bi-anuale numite după anul și luna (ex: 1909, 2004), fiecare cu nume de cod intern.',
                'Peste 1 miliard de dispozitive active rulează Windows 10, făcându-l cea mai răspândită versiune de Windows vreodată!'
            ]
        },
        win11: {
            name: 'Windows 11',
            bootText: 'Starting Windows 11...',
            bootDuration: 2000,
            cursorClass: 'cursor-modern',
            clockStyle: 'modern',
            soundType: 'modern',
            didYouKnowFacts: [
                'Windows 11 a adus un design complet nou cu colțuri rotunjite și taskbar centrat. Este primul Windows care suportă aplicații Android nativ prin Amazon Appstore!',
                'Windows 11 necesită TPM 2.0 (Trusted Platform Module) pentru securitate îmbunătățită, ceea ce a făcut multe PC-uri vechi incompatibile.',
                'Snap Layouts și Snap Groups permit organizarea avansată a ferestrelor în configurații predefinite, îmbunătățind productivitatea.',
                'Sunetul de pornire a revenit în Windows 11 după ce a lipsit din Windows 8! Toate sunetele de sistem au fost reproiectate să fie mai calme și relaxante.'
            ]
        }
    };

    // =========================================================================
    // DETECTARE VERSIUNE WINDOWS
    // =========================================================================
    
    function detectWindowsVersion() {
        // Prioritate 1: Atribut data-windows pe body
        const bodyDataAttr = document.body.getAttribute('data-windows');
        if (bodyDataAttr && windowsConfig[bodyDataAttr]) {
            return bodyDataAttr;
        }
        
        // Prioritate 2: Detectare din URL path
        const path = window.location.pathname.toLowerCase();
        if (path.includes('win95')) return 'win95';
        if (path.includes('win98')) return 'win98';
        if (path.includes('winxp')) return 'winxp';
        if (path.includes('vista')) return 'vista';
        if (path.includes('win7')) return 'win7';
        if (path.includes('win8')) return 'win8';
        if (path.includes('win10')) return 'win10';
        if (path.includes('win11')) return 'win11';
        
        // Nu s-a găsit versiune
        return null;
    }

    const currentVersion = detectWindowsVersion();
    const config = currentVersion ? windowsConfig[currentVersion] : null;

    // =========================================================================
    // 1. BOOT SCREEN
    // =========================================================================
    
    function createBootScreen() {
        if (!config) return;
        
        // Verifică dacă boot-ul a rulat deja în această sesiune
        const bootKey = `bootShown_${currentVersion}`;
        if (sessionStorage.getItem(bootKey)) return;
        
        // Creează overlay-ul de boot
        const bootScreen = document.createElement('div');
        bootScreen.id = 'bootScreen';
        bootScreen.className = `boot-screen boot-${currentVersion}`;
        
        // Conținut specific versiunii
        let bootContent = '';
        
        if (currentVersion === 'win95' || currentVersion === 'win98') {
            // Image-based boot screen (strict implementation for Win95/Win98)
            // - Use the existing boot.jpg placed in the same directory as the page (do NOT modify the image)
            // - Overlay a simple classic loading bar at the bottom-center
            // - Animate the loader for config.bootDuration, then remove the overlay

            // Build minimal DOM instead of SVG/text markup
            bootContent = `
                <img class="boot-bg-image" src="boot.jpg" alt="" style="display:block;width:100%;height:100%;object-fit:cover;">
                <div class="boot-loader" aria-hidden="true" style="position:absolute;left:50%;transform:translateX(-50%);bottom:38px;width:60%;max-width:640px;height:14px;border:2px solid #888;background:#000;box-sizing:border-box;">
                    <div class="boot-loader-fill" style="width:0%;height:100%;background:#2b6fb3;"></div>
                </div>
            `;
        } else if (currentVersion === 'winxp') {
            // Image-based Windows XP boot screen
            // - Use existing boot.jpg in the same folder (do NOT modify the image)
            // - Overlay a segmented classic XP loading bar centered (positioned per spec)
            // - No additional text or logos added
            bootContent = `
                <img class="boot-bg-image" src="boot.jpg" alt="" style="display:block;width:100%;height:100%;object-fit:cover;">
                <div class="boot-loading-xp" aria-hidden="true" style="position:absolute;top:50%;left:50%;transform:translate(-50%,120px);width:520px;max-width:80%;height:18px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;border:2px solid #888;background:#000;padding:2px;">
                    <!-- segments will be created by JS to avoid global CSS -->
                </div>
            `;
        } else if (currentVersion === 'vista' || currentVersion === 'win7') {
            bootContent = `
                <div class="boot-logo-aero">
                    <svg viewBox="0 0 100 100" width="100" height="100">
                        <defs>
                            <linearGradient id="bootGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#00bcf2"/>
                                <stop offset="100%" style="stop-color:#0078d4"/>
                            </linearGradient>
                        </defs>
                        <polygon points="5,10 45,5 45,45 5,45" fill="url(#bootGrad)" opacity="0.9"/>
                        <polygon points="55,4 95,0 95,44 55,44" fill="url(#bootGrad)" opacity="0.9"/>
                        <polygon points="5,55 45,55 45,95 5,88" fill="url(#bootGrad)" opacity="0.9"/>
                        <polygon points="55,56 95,56 95,100 55,94" fill="url(#bootGrad)" opacity="0.9"/>
                    </svg>
                </div>
                <div class="boot-text-aero">${config.bootText}</div>
                <div class="boot-spinner-aero"></div>
            `;
        } else {
            // Win8, Win10, Win11 - modern
            bootContent = `
                <div class="boot-logo-modern">
                    <svg viewBox="0 0 100 100" width="80" height="80">
                        <rect x="5" y="5" width="42" height="42" rx="${currentVersion === 'win11' ? '4' : '0'}" fill="#0078d4"/>
                        <rect x="53" y="5" width="42" height="42" rx="${currentVersion === 'win11' ? '4' : '0'}" fill="#0078d4"/>
                        <rect x="5" y="53" width="42" height="42" rx="${currentVersion === 'win11' ? '4' : '0'}" fill="#0078d4"/>
                        <rect x="53" y="53" width="42" height="42" rx="${currentVersion === 'win11' ? '4' : '0'}" fill="#0078d4"/>
                    </svg>
                </div>
                <div class="boot-dots-modern">
                    <span></span><span></span><span></span><span></span><span></span>
                </div>
            `;
        }

        // XP-specific: build segmented loader and animate (separate flow from 95/98)
        if (currentVersion === 'winxp') {
            // Ensure overlay covers viewport
            bootScreen.style.position = 'fixed';
            bootScreen.style.top = '0';
            bootScreen.style.left = '0';
            bootScreen.style.width = '100%';
            bootScreen.style.height = '100%';
            bootScreen.style.zIndex = '9999';
            bootScreen.style.backgroundColor = '#000';
            bootScreen.style.overflow = 'hidden';

            const loaderContainer = bootScreen.querySelector('.boot-loading-xp');
            if (loaderContainer) {
                // Clear any existing content (defensive)
                loaderContainer.innerHTML = '';
                // Create segments
                const segments = 12;
                const gap = 4; // px between segments
                const totalGap = gap * (segments - 1);
                // containerWidth in px is approximated by computed width
                const containerWidth = loaderContainer.clientWidth || 520;
                const segWidth = Math.max(6, Math.floor((containerWidth - totalGap) / segments));

                for (let i = 0; i < segments; i++) {
                    const s = document.createElement('div');
                    s.className = 'boot-xp-seg';
                    s.style.width = segWidth + 'px';
                    s.style.height = '100%';
                    s.style.marginRight = i === segments - 1 ? '0' : gap + 'px';
                    s.style.background = '#111';
                    s.style.boxSizing = 'border-box';
                    loaderContainer.appendChild(s);
                }

                // Animate segments sequentially to blue over config.bootDuration
                const segEls = loaderContainer.querySelectorAll('.boot-xp-seg');
                const duration = Math.max(200, config.bootDuration || 2500);
                const interval = Math.floor(duration / segments);
                segEls.forEach((el, idx) => {
                    setTimeout(() => {
                        el.style.background = '#2b6fb3';
                    }, idx * interval);
                });
            }
        }
        
        bootScreen.innerHTML = bootContent;
        document.body.appendChild(bootScreen);

        // If this is the image-based Win95/Win98 flow, ensure the overlay covers viewport
        if (currentVersion === 'win95' || currentVersion === 'win98') {
            // Inline styles only for this overlay (no global stylesheet changes)
            bootScreen.style.position = 'fixed';
            bootScreen.style.top = '0';
            bootScreen.style.left = '0';
            bootScreen.style.width = '100%';
            bootScreen.style.height = '100%';
            bootScreen.style.zIndex = '9999';
            bootScreen.style.backgroundColor = '#000';
            bootScreen.style.overflow = 'hidden';

            // Start the loader animation (fill width over config.bootDuration)
            const fill = bootScreen.querySelector('.boot-loader-fill');
            if (fill) {
                // Apply transition and then trigger it
                fill.style.transition = `width ${config.bootDuration}ms linear`;
                // Small timeout to ensure the element is rendered before changing width
                setTimeout(() => { fill.style.width = '100%'; }, 20);
            }
        }

        // Ascunde desktop-ul
        const desktop = document.querySelector('.desktop') || document.querySelector('.metro-interface');
        if (desktop) desktop.style.opacity = '0';
        
        // După durata de boot, fade out și afișare desktop
        setTimeout(() => {
            bootScreen.classList.add('fade-out');
            if (desktop) {
                desktop.style.transition = 'opacity 0.5s ease';
                desktop.style.opacity = '1';
            }
            
            setTimeout(() => {
                bootScreen.remove();
            }, 500);
            
            // Marchează boot-ul ca efectuat
            sessionStorage.setItem(bootKey, 'true');
        }, config.bootDuration);
    }

    // =========================================================================
    // 2. CEAS TASKBAR
    // =========================================================================
    
    function initTaskbarClock() {
        const clockElement = document.querySelector('.time, .clock, .system-time');
        if (!clockElement) return;
        
        function updateClock() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            clockElement.textContent = `${hours}:${minutes}`;
        }
        
        updateClock();
        setInterval(updateClock, 60000); // Update la fiecare minut
    }

    // =========================================================================
    // 3. FERESTRE DRAGGABLE
    // =========================================================================
    
    function initDraggableWindows() {
        const windows = document.querySelectorAll('.window');
        
        windows.forEach(win => {
            const titleBar = win.querySelector('.title-bar');
            if (!titleBar) return;
            
            // Use pointer events where available for better mouse/touch support
            let isDragging = false;
            let startX = 0, startY = 0, initialX = 0, initialY = 0;

            titleBar.style.cursor = 'move';

            const startDrag = (e) => {
                // Allow only primary button
                if (e.button !== undefined && e.button !== 0) return;
                // Don't start drag when clicking on control buttons
                if (e.target && e.target.closest && e.target.closest('.title-btn, .title-bar-controls, .title-buttons')) return;

                // Prevent text selection/other side-effects
                e.preventDefault();

                const rect = win.getBoundingClientRect();

                // Freeze current computed position by setting left/top and removing centering transform
                win.style.position = 'absolute';
                win.style.left = rect.left + 'px';
                win.style.top = rect.top + 'px';
                win.style.transform = 'none';
                win.style.zIndex = '1000';

                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                initialX = rect.left;
                initialY = rect.top;

                // If pointer events supported, capture pointer so we get move/up even if outside element
                if (e.pointerId && titleBar.setPointerCapture) {
                    try { titleBar.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
                }

                // attach move/up handlers specific to this window
                document.addEventListener('pointermove', onMove);
                document.addEventListener('pointerup', endDrag);
                document.addEventListener('pointercancel', endDrag);
            };

            const onMove = (e) => {
                if (!isDragging) return;

                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;

                let newX = initialX + deltaX;
                let newY = initialY + deltaY;

                // Constrain to viewport (taskbar assumed 40px high)
                const maxX = window.innerWidth - win.offsetWidth;
                const maxY = window.innerHeight - win.offsetHeight - 40;

                newX = Math.max(0, Math.min(newX, maxX));
                newY = Math.max(0, Math.min(newY, maxY));

                win.style.left = newX + 'px';
                win.style.top = newY + 'px';
            };

            const endDrag = (e) => {
                if (!isDragging) return;
                isDragging = false;

                // release pointer capture if any
                if (e.pointerId && titleBar.releasePointerCapture) {
                    try { titleBar.releasePointerCapture(e.pointerId); } catch (err) { /* ignore */ }
                }

                // remove handlers attached for this drag
                document.removeEventListener('pointermove', onMove);
                document.removeEventListener('pointerup', endDrag);
                document.removeEventListener('pointercancel', endDrag);
            };

            // Prefer pointer events, fall back to mouse for older browsers
            titleBar.addEventListener('pointerdown', startDrag);
            titleBar.addEventListener('mousedown', (e) => {
                // If pointer events are available, they will handle it; otherwise use the mouse path
                if (window.PointerEvent) return;
                startDrag(e);
            });
        });
    }

    // =========================================================================
    // 4. DIALOG MODAL WINDOWS - Sistem complet de dialoguri custom
    // =========================================================================
    
    /**
     * Afișează un dialog Windows custom - înlocuiește alert(), confirm(), prompt()
     * @param {Object} options - Opțiuni pentru dialog
     * @param {string} options.title - Titlul dialogului
     * @param {string} options.message - Mesajul de afișat
     * @param {string} options.icon - Icon emoji sau tip: 'info', 'warning', 'error', 'question'
     * @param {string} options.type - Tipul dialogului: 'alert', 'confirm', 'prompt'
     * @param {Array} options.buttons - Array de butoane custom [{text, value, primary}]
     * @param {string} options.inputPlaceholder - Placeholder pentru prompt input
     * @param {string} options.inputValue - Valoare inițială pentru prompt
     * @returns {Promise} - Rezolvă cu valoarea butonului apăsat sau text input
     */
    function showWindowsDialog(options) {
        return new Promise((resolve) => {
            // Mapare iconuri
            const iconMap = {
                'info': 'ℹ️',
                'warning': '⚠️',
                'error': '❌',
                'question': '❓',
                'success': '✅'
            };
            
            // Opțiuni default
            const settings = {
                title: options.title || config?.name || 'Windows',
                message: options.message || '',
                icon: iconMap[options.icon] || options.icon || 'ℹ️',
                type: options.type || 'alert',
                confirmText: options.confirmText || 'OK',
                cancelText: options.cancelText || 'Anulare',
                buttons: options.buttons || null,
                inputPlaceholder: options.inputPlaceholder || '',
                inputValue: options.inputValue || '',
                onConfirm: options.onConfirm || null,
                onCancel: options.onCancel || null
            };
            
            // Verifică dacă există deja un dialog
            const existingDialog = document.getElementById('windowsDialog');
            if (existingDialog) {
                existingDialog.remove();
            }
            
            // Creează overlay
            const overlay = document.createElement('div');
            overlay.id = 'windowsDialog';
            overlay.className = 'windows-dialog-overlay';
            
            // Creează dialog
            const dialog = document.createElement('div');
            dialog.className = `windows-dialog dialog-${currentVersion}`;
            
            // Header
            const header = document.createElement('div');
            header.className = 'dialog-header';
            
            const headerIcon = document.createElement('span');
            headerIcon.className = 'dialog-header-icon';
            headerIcon.textContent = '🪟';
            
            const headerTitle = document.createElement('span');
            headerTitle.className = 'dialog-header-title';
            headerTitle.textContent = settings.title;
            
            header.appendChild(headerIcon);
            header.appendChild(headerTitle);
            
            // Body
            const body = document.createElement('div');
            body.className = 'dialog-body';
            
            const messageIcon = document.createElement('div');
            messageIcon.className = 'dialog-icon';
            messageIcon.textContent = settings.icon;
            
            const messageContent = document.createElement('div');
            messageContent.className = 'dialog-content';
            
            const messageText = document.createElement('div');
            messageText.className = 'dialog-message';
            // Suportă HTML sau text simplu
            if (settings.message.includes('<') || settings.message.includes('\n')) {
                messageText.innerHTML = settings.message.replace(/\n/g, '<br>');
            } else {
                messageText.textContent = settings.message;
            }
            
            messageContent.appendChild(messageText);
            
            // Input pentru prompt
            let inputElement = null;
            if (settings.type === 'prompt') {
                inputElement = document.createElement('input');
                inputElement.type = 'text';
                inputElement.className = 'dialog-input';
                inputElement.placeholder = settings.inputPlaceholder;
                inputElement.value = settings.inputValue;
                messageContent.appendChild(inputElement);
            }
            
            body.appendChild(messageIcon);
            body.appendChild(messageContent);
            
            // Footer cu butoane
            const footer = document.createElement('div');
            footer.className = 'dialog-footer';
            
            if (settings.buttons && settings.buttons.length > 0) {
                // Butoane custom
                settings.buttons.forEach((btn, index) => {
                    const button = document.createElement('button');
                    button.className = `dialog-btn btn-${currentVersion}`;
                    if (btn.primary) button.classList.add('dialog-btn-confirm');
                    button.textContent = btn.text;
                    button.addEventListener('click', () => closeDialog(btn.value !== undefined ? btn.value : index));
                    footer.appendChild(button);
                });
            } else if (settings.type === 'alert') {
                // Un singur buton OK
                const okBtn = document.createElement('button');
                okBtn.className = `dialog-btn dialog-btn-confirm btn-${currentVersion}`;
                okBtn.textContent = settings.confirmText;
                okBtn.addEventListener('click', () => closeDialog(true));
                footer.appendChild(okBtn);
            } else if (settings.type === 'confirm') {
                // Butoane Da/Nu
                const confirmBtn = document.createElement('button');
                confirmBtn.className = `dialog-btn dialog-btn-confirm btn-${currentVersion}`;
                confirmBtn.textContent = settings.confirmText || 'Da';
                confirmBtn.addEventListener('click', () => {
                    if (settings.onConfirm) settings.onConfirm();
                    closeDialog(true);
                });
                
                const cancelBtn = document.createElement('button');
                cancelBtn.className = `dialog-btn dialog-btn-cancel btn-${currentVersion}`;
                cancelBtn.textContent = settings.cancelText || 'Nu';
                cancelBtn.addEventListener('click', () => {
                    if (settings.onCancel) settings.onCancel();
                    closeDialog(false);
                });
                
                footer.appendChild(confirmBtn);
                footer.appendChild(cancelBtn);
            } else if (settings.type === 'prompt') {
                // Butoane OK/Anulare pentru prompt
                const confirmBtn = document.createElement('button');
                confirmBtn.className = `dialog-btn dialog-btn-confirm btn-${currentVersion}`;
                confirmBtn.textContent = settings.confirmText || 'OK';
                confirmBtn.addEventListener('click', () => {
                    closeDialog(inputElement ? inputElement.value : '');
                });
                
                const cancelBtn = document.createElement('button');
                cancelBtn.className = `dialog-btn dialog-btn-cancel btn-${currentVersion}`;
                cancelBtn.textContent = settings.cancelText || 'Anulare';
                cancelBtn.addEventListener('click', () => closeDialog(null));
                
                footer.appendChild(confirmBtn);
                footer.appendChild(cancelBtn);
            } else {
                // Default: un buton OK
                const okBtn = document.createElement('button');
                okBtn.className = `dialog-btn dialog-btn-confirm btn-${currentVersion}`;
                okBtn.textContent = 'OK';
                okBtn.addEventListener('click', () => closeDialog(true));
                footer.appendChild(okBtn);
            }
            
            // Asamblare dialog
            dialog.appendChild(header);
            dialog.appendChild(body);
            dialog.appendChild(footer);
            overlay.appendChild(dialog);
            
            // Adaugă la body
            document.body.appendChild(overlay);
            
            // Trigger animație
            setTimeout(() => {
                overlay.classList.add('active');
            }, 10);
            
            // Funcție de închidere
            function closeDialog(result) {
                overlay.classList.remove('active');
                setTimeout(() => {
                    overlay.remove();
                    resolve(result);
                }, 300);
            }
            
            // Închide cu ESC
            function handleEscape(e) {
                if (e.key === 'Escape') {
                    if (settings.onCancel) settings.onCancel();
                    closeDialog(settings.type === 'prompt' ? null : false);
                    document.removeEventListener('keydown', handleEscape);
                }
                if (e.key === 'Enter' && settings.type === 'prompt' && inputElement) {
                    closeDialog(inputElement.value);
                    document.removeEventListener('keydown', handleEscape);
                }
            }
            document.addEventListener('keydown', handleEscape);
            
            // Focus pe input sau buton
            setTimeout(() => {
                if (inputElement) {
                    inputElement.focus();
                    inputElement.select();
                } else {
                    const firstBtn = footer.querySelector('.dialog-btn-confirm') || footer.querySelector('.dialog-btn');
                    if (firstBtn) firstBtn.focus();
                }
            }, 100);
        });
    }
    
    // Funcții helper pentru înlocuirea alert/confirm/prompt
    function windowsAlert(message, title, icon) {
        return showWindowsDialog({
            type: 'alert',
            title: title || config?.name || 'Windows',
            message: message,
            icon: icon || 'info'
        });
    }
    
    function windowsConfirm(message, title, icon) {
        return showWindowsDialog({
            type: 'confirm',
            title: title || config?.name || 'Windows',
            message: message,
            icon: icon || 'question'
        });
    }
    
    function windowsPrompt(message, defaultValue, title) {
        return showWindowsDialog({
            type: 'prompt',
            title: title || config?.name || 'Windows',
            message: message,
            icon: 'question',
            inputValue: defaultValue || ''
        });
    }
    
    // Export funcții pentru utilizare externă
    window.showWindowsDialog = showWindowsDialog;
    window.windowsAlert = windowsAlert;
    window.windowsConfirm = windowsConfirm;
    window.windowsPrompt = windowsPrompt;
    window.triggerShutdown = triggerShutdown;

    // =========================================================================
    // 5. CARD "ȘTIAI CĂ..." - Cu suport multiple facts și random selection
    // =========================================================================
    
    function createDidYouKnowCard() {
        if (!config || !config.didYouKnowFacts) return;
        
        // Verifică dacă există deja
        if (document.getElementById('didYouKnowCard')) return;
        
        // Selectează un fact random din array
        const facts = config.didYouKnowFacts;
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        
        // Obține textul tradus folosind sistemul i18n (dacă este disponibil)
        const titleKey = 'dyk_title';
        let title = 'Știai că...?';
        
        // Folosește traducerea dacă sistemul i18n este încărcat
        if (window.t && typeof window.t === 'function') {
            const translatedTitle = window.t(titleKey);
            if (translatedTitle && translatedTitle !== titleKey) {
                title = translatedTitle;
            }
        }
        
        const card = document.createElement('div');
        card.id = 'didYouKnowCard';
        card.className = `did-you-know-card dyk-${currentVersion}`;
        
        card.innerHTML = `
            <div class="dyk-header">
                <span class="dyk-icon">💡</span>
                <span class="dyk-title" data-i18n="dyk_title">${title}</span>
                <button class="dyk-close" aria-label="Închide">×</button>
            </div>
            <div class="dyk-content">
                <p>${randomFact}</p>
            </div>
        `;
        
        // Event listener pentru butonul de închidere
        const closeBtn = card.querySelector('.dyk-close');
        closeBtn.addEventListener('click', function() {
            card.classList.add('hidden');
            // Opțional: salvează în sessionStorage că a fost închis
            sessionStorage.setItem(`dykClosed_${currentVersion}`, 'true');
        });
        
        // Verifică dacă a fost deja închis în această sesiune
        if (sessionStorage.getItem(`dykClosed_${currentVersion}`) === 'true') {
            card.classList.add('hidden');
        }
        
        // Adaugă la desktop sau metro-interface (pentru Win8)
        const container = document.querySelector('.desktop') || document.querySelector('.metro-interface') || document.body;
        if (container) {
            container.appendChild(card);
        }
    }

    // =========================================================================
    // 6. SUNETE WINDOWS
    // =========================================================================
    
    let audioContext = null;
    
    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioContext;
    }
    
    function playWindowsSound(type) {
        const ctx = initAudio();
        if (ctx.state === 'suspended') {
            ctx.resume();
        }
        
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        // Volum redus
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        
        if (type === 'start') {
            // Sunet Start Menu
            if (config.soundType === 'classic') {
                // Win95/98 - sunet simplu
                oscillator.frequency.setValueAtTime(800, ctx.currentTime);
                oscillator.frequency.setValueAtTime(1000, ctx.currentTime + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.2);
            } else if (config.soundType === 'xp') {
                // XP - mai melodic
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(523, ctx.currentTime);
                oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
                oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.4);
            } else {
                // Modern - subtil
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(600, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.15);
            }
        } else if (type === 'shutdown') {
            // Sunet Shutdown
            if (config.soundType === 'classic') {
                oscillator.frequency.setValueAtTime(600, ctx.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.5);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.5);
            } else if (config.soundType === 'xp') {
                // XP shutdown melody
                const notes = [784, 659, 523, 392];
                notes.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.type = 'sine';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.15);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.2);
                    osc.start(ctx.currentTime + i * 0.15);
                    osc.stop(ctx.currentTime + i * 0.15 + 0.2);
                });
                return;
            } else {
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(500, ctx.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.3);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.3);
            }
        }
    }
    
    function initSounds() {
        // Start button
        const startButton = document.querySelector('.start-button, #startButton, .start-btn');
        if (startButton) {
            startButton.addEventListener('click', () => playWindowsSound('start'));
        }
        
        // Shutdown button
        const shutdownItems = document.querySelectorAll('[data-action="shutdown"], .shutdown-btn, .menu-item:last-child');
        shutdownItems.forEach(item => {
            if (item.textContent.toLowerCase().includes('shut') || item.dataset.action === 'shutdown') {
                item.addEventListener('click', () => playWindowsSound('shutdown'));
            }
        });
    }

    // =========================================================================
    // 7. CURSOR PERSONALIZAT (aplicat prin CSS)
    // =========================================================================
    
    function applyCursor() {
        if (!config) return;
        document.body.classList.add(config.cursorClass);
    }

    // =========================================================================
    // 8. SHUTDOWN SCREEN - ECRANE DE ÎNCHIDERE
    // =========================================================================
    
    function createShutdownScreen() {
        if (!config) return;
        
        const shutdownScreen = document.createElement('div');
        shutdownScreen.id = 'shutdownScreen';
        shutdownScreen.className = `shutdown-screen shutdown-${currentVersion}`;
        
        let shutdownContent = '';
        
        if (currentVersion === 'win95') {
            shutdownContent = `
                <div class="shutdown-classic-container">
                    <div class="shutdown-classic-text">It's now safe to turn off</div>
                    <div class="shutdown-classic-text">your computer.</div>
                </div>
            `;
        } else if (currentVersion === 'win98') {
            shutdownContent = `
                <div class="shutdown-classic-container">
                    <div class="shutdown-classic-text">It's now safe to turn off</div>
                    <div class="shutdown-classic-text">your computer.</div>
                    <div class="shutdown-classic-subtext">You may also press the power button.</div>
                </div>
            `;
        } else if (currentVersion === 'winxp') {
            shutdownContent = `
                <div class="shutdown-xp-bar-top"></div>
                <div class="shutdown-xp-container">
                    <div class="shutdown-xp-logo">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 100'%3E%3Cdefs%3E%3ClinearGradient id='flag1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23ff3e00'/%3E%3Cstop offset='100%25' stop-color='%23ff7a00'/%3E%3C/linearGradient%3E%3ClinearGradient id='flag2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2300b000'/%3E%3Cstop offset='100%25' stop-color='%2390d000'/%3E%3C/linearGradient%3E%3ClinearGradient id='flag3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230078d4'/%3E%3Cstop offset='100%25' stop-color='%2300c8ff'/%3E%3C/linearGradient%3E%3ClinearGradient id='flag4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23ffb900'/%3E%3Cstop offset='100%25' stop-color='%23ffe000'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M2 25 Q25 18 40 25 Q50 30 50 45 Q45 55 25 52 Q5 50 2 35 Z' fill='url(%23flag1)'/%3E%3Cpath d='M52 22 Q75 12 90 20 Q100 28 98 42 Q90 52 70 50 Q52 48 52 38 Z' fill='url(%23flag2)'/%3E%3Cpath d='M2 58 Q20 52 40 58 Q52 65 50 78 Q40 90 20 88 Q2 85 2 72 Z' fill='url(%23flag3)'/%3E%3Cpath d='M52 55 Q70 50 88 55 Q100 62 98 76 Q88 88 68 86 Q52 82 52 70 Z' fill='url(%23flag4)'/%3E%3Ctext x='115' y='45' font-family='Franklin Gothic Medium, Trebuchet MS, sans-serif' font-size='16' fill='%23888'%3EMicrosoft%3C/text%3E%3Ctext x='115' y='78' font-family='Franklin Gothic Medium, Trebuchet MS, sans-serif' font-size='36' font-weight='bold' font-style='italic'%3E%3Ctspan fill='%23000'%3EWindows%3C/tspan%3E%3Ctspan fill='%23ff6600' font-size='28' baseline-shift='super'%3EXP%3C/tspan%3E%3C/text%3E%3C/svg%3E" alt="Windows XP" class="xp-logo-img">
                    </div>
                    <div class="shutdown-xp-text">Windows is shutting down...</div>
                </div>
                <div class="shutdown-xp-bar-bottom"></div>
            `;
        } else if (currentVersion === 'vista' || currentVersion === 'win7') {
            shutdownContent = `
                <div class="shutdown-aero-container">
                    <div class="shutdown-aero-spinner"></div>
                    <div class="shutdown-aero-text">Shutting down...</div>
                </div>
            `;
        } else if (currentVersion === 'win8') {
            shutdownContent = `
                <div class="shutdown-metro-container">
                    <div class="shutdown-metro-spinner"></div>
                    <div class="shutdown-metro-text">Shutting down</div>
                </div>
            `;
        } else if (currentVersion === 'win10') {
            shutdownContent = `
                <div class="shutdown-fluent-container">
                    <div class="shutdown-fluent-dots">
                        <span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <div class="shutdown-fluent-text">Shutting down</div>
                </div>
            `;
        } else if (currentVersion === 'win11') {
            shutdownContent = `
                <div class="shutdown-win11-container">
                    <div class="shutdown-win11-logo">
                        <svg viewBox="0 0 100 100" width="80" height="80">
                            <rect x="5" y="5" width="42" height="42" rx="4" fill="#00a4ef"/>
                            <rect x="53" y="5" width="42" height="42" rx="4" fill="#7fba00"/>
                            <rect x="5" y="53" width="42" height="42" rx="4" fill="#ffb900"/>
                            <rect x="53" y="53" width="42" height="42" rx="4" fill="#f25022"/>
                        </svg>
                    </div>
                    <div class="shutdown-win11-ring"></div>
                    <div class="shutdown-win11-text">Shutting down</div>
                </div>
            `;
        }
        
        shutdownScreen.innerHTML = shutdownContent;
        return shutdownScreen;
    }
    
    function triggerShutdown() {
        if (!config) return;
        
        // Redă sunetul de shutdown
        playWindowsSound('shutdown');
        
        // Creează și afișează ecranul de shutdown
        const shutdownScreen = createShutdownScreen();
        document.body.appendChild(shutdownScreen);
        
        // După 2.5 secunde, redirecționează la galerie
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 2500);
    }
    
    function initShutdownHandler() {
        // Caută butoanele/elementele de shutdown
        document.addEventListener('click', function(e) {
            const shutdownItem = e.target.closest('[data-action="shutdown"]');
            if (shutdownItem) {
                e.preventDefault();
                e.stopPropagation();
                triggerShutdown();
                return;
            }
            
            // Verifică și pentru text "Shut Down"
            const menuItem = e.target.closest('.menu-item');
            if (menuItem) {
                const text = menuItem.textContent.toLowerCase();
                if (text.includes('shut down') || text.includes('shutdown')) {
                    e.preventDefault();
                    e.stopPropagation();
                    triggerShutdown();
                }
            }
        });
    }

    // =========================================================================
    // INIȚIALIZARE
    // =========================================================================
    
    function init() {
        if (!config) return;
        
        // Boot screen primul
        createBootScreen();
        
        // După boot, inițializează restul
        const bootDuration = sessionStorage.getItem(`bootShown_${currentVersion}`) ? 0 : config.bootDuration + 500;
        
        setTimeout(() => {
            applyCursor();
            initTaskbarClock();
            initDraggableWindows();
            createDidYouKnowCard();

            // Recreate Did-You-Know card when language changes so translated title/content updates
            if (typeof window.onLanguageChange === 'function') {
                window.onLanguageChange(function() {
                    try {
                        const existing = document.getElementById('didYouKnowCard');
                        if (existing) existing.remove();
                        createDidYouKnowCard();
                    } catch (e) {
                        console.warn('[windows-common] Error recreating DYK on language change', e);
                    }
                });
            }
            initSounds();
            initShutdownHandler();
        }, bootDuration);
    }
    
    // Rulează la încărcarea paginii
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Export pentru debugging
    window.WindowsCommon = {
        version: currentVersion,
        config: config,
        playSound: playWindowsSound
    };
    
})();

