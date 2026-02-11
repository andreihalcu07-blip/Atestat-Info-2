/*
 * Unified windows-ui.js
 * - Merged and deduplicated logic from windows-common.js
 * - Contains version config, boot/shutdown, dialogs, draggable windows, clock, sounds
 * - Contains the Windows gallery/simulation gating and the version switcher
 */

(function () {
    'use strict';
    // Prevent double initialization when this file is included more than once
    if (window.__sistemOS_windowsUI_initialized) { console.warn('[windows-ui] already initialized'); return; }
    window.__sistemOS_windowsUI_initialized = true;

    // ---------------------------------------------------------------------
    // VERSION CONFIG (from windows-common)
    // ---------------------------------------------------------------------
    const windowsConfig = {
        win95: { name: 'Windows 95', bootText: 'Starting Windows 95...', bootDuration: 2500, cursorClass: 'cursor-classic', clockStyle: 'classic', soundType: 'classic', didYouKnowFacts: [
            'Windows 95 a fost primul sistem de operare Microsoft cu butonul Start și taskbar. A fost lansat pe 24 august 1995 și s-a vândut în 7 milioane de copii în primele 5 săptămâni!',
            'Pentru lansarea Windows 95, Microsoft a licențiat cântecul "Start Me Up" de la Rolling Stones pentru 14 milioane de dolari!'
        ] },
        win98: { name: 'Windows 98', bootText: 'Starting Windows 98...', bootDuration: 2500, cursorClass: 'cursor-classic', clockStyle: 'classic', soundType: 'classic', didYouKnowFacts: [
            'Windows 98 a fost primul Windows cu suport nativ pentru USB și DVD!',
            'Internet Explorer 4.0 a fost integrat direct în Windows 98.'
        ] },
        winxp: { name: 'Windows XP', bootText: 'Starting Windows XP...', bootDuration: 3000, cursorClass: 'cursor-xp', clockStyle: 'xp', soundType: 'xp', didYouKnowFacts: [
            'Windows XP a fost cel mai longeviv Windows, fiind suportat oficial 13 ani (2001-2014).',
            'XP vine de la "eXPerience" și a fost primul Windows construit pe kernel-ul NT.'
        ] },
        vista: { name: 'Windows Vista', bootText: 'Starting Windows Vista...', bootDuration: 3000, cursorClass: 'cursor-aero', clockStyle: 'aero', soundType: 'modern', didYouKnowFacts: [] },
        win7: { name: 'Windows 7', bootText: 'Starting Windows 7...', bootDuration: 2500, cursorClass: 'cursor-aero', clockStyle: 'aero', soundType: 'modern', didYouKnowFacts: [] },
        win8: { name: 'Windows 8', bootText: 'Starting Windows 8...', bootDuration: 2000, cursorClass: 'cursor-modern', clockStyle: 'modern', soundType: 'modern', didYouKnowFacts: [] },
        win10: { name: 'Windows 10', bootText: 'Starting Windows 10...', bootDuration: 2000, cursorClass: 'cursor-modern', clockStyle: 'modern', soundType: 'modern', didYouKnowFacts: [] },
        win11: { name: 'Windows 11', bootText: 'Starting Windows 11...', bootDuration: 2000, cursorClass: 'cursor-modern', clockStyle: 'modern', soundType: 'modern', didYouKnowFacts: [] }
    };

    // ---------------------------------------------------------------------
    // VERSION DETECTION
    // ---------------------------------------------------------------------
    function detectWindowsVersion() {
        const bodyDataAttr = document.body.getAttribute('data-windows');
        if (bodyDataAttr && windowsConfig[bodyDataAttr]) return bodyDataAttr;
        const path = window.location.pathname.toLowerCase();
        if (path.includes('win95')) return 'win95';
        if (path.includes('win98')) return 'win98';
        if (path.includes('winxp')) return 'winxp';
        if (path.includes('vista')) return 'vista';
        if (path.includes('win7')) return 'win7';
        if (path.includes('win8')) return 'win8';
        if (path.includes('win10')) return 'win10';
        if (path.includes('win11')) return 'win11';
        return null;
    }

    const currentVersion = detectWindowsVersion();
    const config = currentVersion ? windowsConfig[currentVersion] : null;

    // ---------------------------------------------------------------------
    // BOOT SCREEN
    // ---------------------------------------------------------------------
    function createBootScreen() {
        if (!config) return;
        const bootKey = `bootShown_${currentVersion}`;
        if (sessionStorage.getItem(bootKey)) return;

        const bootScreen = document.createElement('div');
        bootScreen.id = 'bootScreen';
        bootScreen.className = `boot-screen boot-${currentVersion}`;

        let bootContent = '';
        if (currentVersion === 'win95' || currentVersion === 'win98') {
            bootContent = `\n                <img class="boot-bg-image" src="boot.jpg" alt="" style="display:block;width:100%;height:100%;object-fit:cover;">\n                <div class="boot-loader" aria-hidden="true" style="position:absolute;left:50%;transform:translateX(-50%);bottom:38px;width:60%;max-width:640px;height:14px;border:2px solid #888;background:#000;box-sizing:border-box;">\n                    <div class="boot-loader-fill" style="width:0%;height:100%;background:#2b6fb3;"></div>\n                </div>\n            `;
        } else if (currentVersion === 'winxp') {
            bootContent = `\n                <img class="boot-bg-image" src="boot.jpg" alt="" style="display:block;width:100%;height:100%;object-fit:cover;">\n                <div class="boot-loading-xp" aria-hidden="true" style="position:absolute;top:50%;left:50%;transform:translate(-50%,120px);width:520px;max-width:80%;height:18px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;border:2px solid #888;background:#000;padding:2px;">\n                </div>\n            `;
        } else if (currentVersion === 'vista' || currentVersion === 'win7') {
            bootContent = `\n                <div class="boot-logo-aero">...</div>\n                <div class="boot-text-aero">${config.bootText}</div>\n                <div class="boot-spinner-aero"></div>\n            `;
        } else {
            bootContent = `\n                <div class="boot-logo-modern">...</div>\n                <div class="boot-dots-modern"><span></span><span></span><span></span><span></span><span></span></div>\n            `;
        }

        bootScreen.innerHTML = bootContent;
        document.body.appendChild(bootScreen);

        // Inline behaviors for image-based flows
        if (currentVersion === 'win95' || currentVersion === 'win98') {
            const fill = bootScreen.querySelector('.boot-loader-fill');
            if (fill) {
                fill.style.transition = `width ${config.bootDuration}ms linear`;
                setTimeout(() => { fill.style.width = '100%'; }, 20);
            }
        }

        if (currentVersion === 'winxp') {
            const loaderContainer = bootScreen.querySelector('.boot-loading-xp');
            if (loaderContainer) {
                loaderContainer.innerHTML = '';
                const segments = 12; const gap = 4; const totalGap = gap * (segments - 1);
                const containerWidth = loaderContainer.clientWidth || 520;
                const segWidth = Math.max(6, Math.floor((containerWidth - totalGap) / segments));
                for (let i = 0; i < segments; i++) {
                    const s = document.createElement('div');
                    s.className = 'boot-xp-seg'; s.style.width = segWidth + 'px'; s.style.height = '100%'; s.style.marginRight = i === segments - 1 ? '0' : gap + 'px'; s.style.background = '#111'; s.style.boxSizing = 'border-box';
                    loaderContainer.appendChild(s);
                }
                const segEls = loaderContainer.querySelectorAll('.boot-xp-seg');
                const duration = Math.max(200, config.bootDuration || 2500); const interval = Math.floor(duration / segEls.length);
                segEls.forEach((el, idx) => setTimeout(() => el.style.background = '#2b6fb3', idx * interval));
            }
        }

        // Hide desktop while boot runs
        const desktop = document.querySelector('.desktop') || document.querySelector('.metro-interface');
        if (desktop) desktop.style.opacity = '0';

        setTimeout(() => {
            bootScreen.classList.add('fade-out');
            if (desktop) { desktop.style.transition = 'opacity 0.5s ease'; desktop.style.opacity = '1'; }
            setTimeout(() => bootScreen.remove(), 500);
            sessionStorage.setItem(bootKey, 'true');
        }, config.bootDuration);
    }

    // ---------------------------------------------------------------------
    // TASKBAR CLOCK
    // ---------------------------------------------------------------------
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
    // Ensure we don't create duplicate intervals across multiple initializations
    window.__sistemOS_intervals = window.__sistemOS_intervals || {};
    if (window.__sistemOS_intervals.taskbarClock) clearInterval(window.__sistemOS_intervals.taskbarClock);
    window.__sistemOS_intervals.taskbarClock = setInterval(updateClock, 60000);
    }

    // ---------------------------------------------------------------------
    // DRAGGABLE WINDOWS
    // ---------------------------------------------------------------------
    function initDraggableWindows() {
        const windows = document.querySelectorAll('.window');
        windows.forEach(win => {
            const titleBar = win.querySelector('.title-bar'); if (!titleBar) return;
            titleBar.style.cursor = 'move';
            let isDragging = false, startX = 0, startY = 0, initialX = 0, initialY = 0;
            const startDrag = (e) => {
                if (e.button !== undefined && e.button !== 0) return;
                if (e.target && e.target.closest && e.target.closest('.title-btn, .title-bar-controls, .title-buttons')) return;
                e.preventDefault();
                const rect = win.getBoundingClientRect();
                win.style.position = 'absolute'; win.style.left = rect.left + 'px'; win.style.top = rect.top + 'px'; win.style.transform = 'none'; win.style.zIndex = '1000';
                isDragging = true; startX = e.clientX; startY = e.clientY; initialX = rect.left; initialY = rect.top;
                if (e.pointerId && titleBar.setPointerCapture) try { titleBar.setPointerCapture(e.pointerId); } catch (err) {}
                document.addEventListener('pointermove', onMove); document.addEventListener('pointerup', endDrag); document.addEventListener('pointercancel', endDrag);
            };
            const onMove = (e) => { if (!isDragging) return; const deltaX = e.clientX - startX; const deltaY = e.clientY - startY; let newX = initialX + deltaX; let newY = initialY + deltaY; const maxX = window.innerWidth - win.offsetWidth; const maxY = window.innerHeight - win.offsetHeight - 40; newX = Math.max(0, Math.min(newX, maxX)); newY = Math.max(0, Math.min(newY, maxY)); win.style.left = newX + 'px'; win.style.top = newY + 'px'; };
            const endDrag = (e) => { if (!isDragging) return; isDragging = false; if (e.pointerId && titleBar.releasePointerCapture) try { titleBar.releasePointerCapture(e.pointerId); } catch (err) {} document.removeEventListener('pointermove', onMove); document.removeEventListener('pointerup', endDrag); document.removeEventListener('pointercancel', endDrag); };
            titleBar.addEventListener('pointerdown', startDrag); titleBar.addEventListener('mousedown', (e) => { if (window.PointerEvent) return; startDrag(e); });
        });
    }

    // ---------------------------------------------------------------------
    // DIALOGS (showWindowsDialog, alert/confirm/prompt wrappers)
    // ---------------------------------------------------------------------
    function showWindowsDialog(options) {
        return new Promise((resolve) => {
            const iconMap = { 'info': 'ℹ️', 'warning': '⚠️', 'error': '❌', 'question': '❓', 'success': '✅' };
            const settings = { title: options.title || config?.name || 'Windows', message: options.message || '', icon: iconMap[options.icon] || options.icon || 'ℹ️', type: options.type || 'alert', confirmText: options.confirmText || 'OK', cancelText: options.cancelText || 'Anulare', buttons: options.buttons || null, inputPlaceholder: options.inputPlaceholder || '', inputValue: options.inputValue || '', onConfirm: options.onConfirm || null, onCancel: options.onCancel || null };
            const existingDialog = document.getElementById('windowsDialog'); if (existingDialog) existingDialog.remove();
            const overlay = document.createElement('div'); overlay.id = 'windowsDialog'; overlay.className = 'windows-dialog-overlay';
            const dialog = document.createElement('div'); dialog.className = `windows-dialog dialog-${currentVersion || 'modern'}`;
            const header = document.createElement('div'); header.className = 'dialog-header'; const headerIcon = document.createElement('span'); headerIcon.className = 'dialog-header-icon'; headerIcon.textContent = '🪟'; const headerTitle = document.createElement('span'); headerTitle.className = 'dialog-header-title'; headerTitle.textContent = settings.title; header.appendChild(headerIcon); header.appendChild(headerTitle);
            const body = document.createElement('div'); body.className = 'dialog-body'; const messageIcon = document.createElement('div'); messageIcon.className = 'dialog-icon'; messageIcon.textContent = settings.icon; const messageContent = document.createElement('div'); messageContent.className = 'dialog-content'; const messageText = document.createElement('div'); messageText.className = 'dialog-message'; if (settings.message.includes('<') || settings.message.includes('\n')) messageText.innerHTML = settings.message.replace(/\n/g, '<br>'); else messageText.textContent = settings.message; messageContent.appendChild(messageText);
            let inputElement = null; if (settings.type === 'prompt') { inputElement = document.createElement('input'); inputElement.type = 'text'; inputElement.className = 'dialog-input'; inputElement.placeholder = settings.inputPlaceholder; inputElement.value = settings.inputValue; messageContent.appendChild(inputElement); }
            body.appendChild(messageIcon); body.appendChild(messageContent);
            const footer = document.createElement('div'); footer.className = 'dialog-footer';
            if (settings.buttons && settings.buttons.length > 0) {
                settings.buttons.forEach((btn, index) => { const button = document.createElement('button'); button.className = `dialog-btn btn-${currentVersion}`; if (btn.primary) button.classList.add('dialog-btn-confirm'); button.textContent = btn.text; button.addEventListener('click', () => closeDialog(btn.value !== undefined ? btn.value : index)); footer.appendChild(button); });
            } else if (settings.type === 'alert') {
                const okBtn = document.createElement('button'); okBtn.className = `dialog-btn dialog-btn-confirm btn-${currentVersion}`; okBtn.textContent = settings.confirmText; okBtn.addEventListener('click', () => closeDialog(true)); footer.appendChild(okBtn);
            } else if (settings.type === 'confirm') {
                const confirmBtn = document.createElement('button'); confirmBtn.className = `dialog-btn dialog-btn-confirm btn-${currentVersion}`; confirmBtn.textContent = settings.confirmText || 'Da'; confirmBtn.addEventListener('click', () => { if (settings.onConfirm) settings.onConfirm(); closeDialog(true); });
                const cancelBtn = document.createElement('button'); cancelBtn.className = `dialog-btn dialog-btn-cancel btn-${currentVersion}`; cancelBtn.textContent = settings.cancelText || 'Nu'; cancelBtn.addEventListener('click', () => { if (settings.onCancel) settings.onCancel(); closeDialog(false); }); footer.appendChild(confirmBtn); footer.appendChild(cancelBtn);
            } else if (settings.type === 'prompt') {
                const confirmBtn = document.createElement('button'); confirmBtn.className = `dialog-btn dialog-btn-confirm btn-${currentVersion}`; confirmBtn.textContent = settings.confirmText || 'OK'; confirmBtn.addEventListener('click', () => closeDialog(inputElement ? inputElement.value : '')); const cancelBtn = document.createElement('button'); cancelBtn.className = `dialog-btn dialog-btn-cancel btn-${currentVersion}`; cancelBtn.textContent = settings.cancelText || 'Anulare'; cancelBtn.addEventListener('click', () => closeDialog(null)); footer.appendChild(confirmBtn); footer.appendChild(cancelBtn);
            } else { const okBtn = document.createElement('button'); okBtn.className = `dialog-btn dialog-btn-confirm btn-${currentVersion}`; okBtn.textContent = 'OK'; okBtn.addEventListener('click', () => closeDialog(true)); footer.appendChild(okBtn); }
            dialog.appendChild(header); dialog.appendChild(body); dialog.appendChild(footer); overlay.appendChild(dialog); document.body.appendChild(overlay); setTimeout(() => overlay.classList.add('active'), 10);
            function closeDialog(result) { overlay.classList.remove('active'); setTimeout(() => { overlay.remove(); resolve(result); }, 300); }
            function handleEscape(e) { if (e.key === 'Escape') { if (settings.onCancel) settings.onCancel(); closeDialog(settings.type === 'prompt' ? null : false); document.removeEventListener('keydown', handleEscape); } if (e.key === 'Enter' && settings.type === 'prompt' && inputElement) { closeDialog(inputElement.value); document.removeEventListener('keydown', handleEscape); } }
            document.addEventListener('keydown', handleEscape);
            setTimeout(() => { if (inputElement) { inputElement.focus(); inputElement.select(); } else { const firstBtn = footer.querySelector('.dialog-btn-confirm') || footer.querySelector('.dialog-btn'); if (firstBtn) firstBtn.focus(); } }, 100);
        });
    }

    function windowsAlert(message, title, icon) { return showWindowsDialog({ type: 'alert', title: title || config?.name || 'Windows', message: message, icon: icon || 'info' }); }
    function windowsConfirm(message, title, icon) { return showWindowsDialog({ type: 'confirm', title: title || config?.name || 'Windows', message: message, icon: icon || 'question' }); }
    function windowsPrompt(message, defaultValue, title) { return showWindowsDialog({ type: 'prompt', title: title || config?.name || 'Windows', message: message, icon: 'question', inputValue: defaultValue || '' }); }

    // ---------------------------------------------------------------------
    // SOUNDS
    // ---------------------------------------------------------------------
    let audioContext = null;
    function initAudio() { if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)(); return audioContext; }
    function playWindowsSound(type) {
        const ctx = initAudio(); if (ctx.state === 'suspended') ctx.resume();
        const oscillator = ctx.createOscillator(); const gainNode = ctx.createGain(); oscillator.connect(gainNode); gainNode.connect(ctx.destination); gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        if (type === 'start') {
            if (config?.soundType === 'classic') { oscillator.frequency.setValueAtTime(800, ctx.currentTime); oscillator.frequency.setValueAtTime(1000, ctx.currentTime + 0.1); gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2); oscillator.start(ctx.currentTime); oscillator.stop(ctx.currentTime + 0.2); }
            else if (config?.soundType === 'xp') { oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(523, ctx.currentTime); oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1); oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2); gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4); oscillator.start(ctx.currentTime); oscillator.stop(ctx.currentTime + 0.4); }
            else { oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(600, ctx.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15); oscillator.start(ctx.currentTime); oscillator.stop(ctx.currentTime + 0.15); }
        } else if (type === 'shutdown') {
            if (config?.soundType === 'classic') { oscillator.frequency.setValueAtTime(600, ctx.currentTime); oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.5); gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5); oscillator.start(ctx.currentTime); oscillator.stop(ctx.currentTime + 0.5); }
            else if (config?.soundType === 'xp') { const notes = [784, 659, 523, 392]; notes.forEach((freq, i) => { const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.connect(gain); gain.connect(ctx.destination); osc.type = 'sine'; osc.frequency.value = freq; gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.15); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.2); osc.start(ctx.currentTime + i * 0.15); osc.stop(ctx.currentTime + i * 0.15 + 0.2); }); return; }
            else { oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(500, ctx.currentTime); oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.3); gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3); oscillator.start(ctx.currentTime); oscillator.stop(ctx.currentTime + 0.3); }
        }
    }

    function initSounds() {
        const startButton = document.querySelector('.start-button, #startButton, .start-btn');
        if (startButton && !startButton.dataset.sistemSoundHandler) { startButton.addEventListener('click', () => playWindowsSound('start')); startButton.dataset.sistemSoundHandler = '1'; }
        const shutdownItems = document.querySelectorAll('[data-action="shutdown"], .shutdown-btn, .menu-item:last-child');
        shutdownItems.forEach(item => { if ((item.textContent || '').toLowerCase().includes('shut') || item.dataset.action === 'shutdown') { if (!item.dataset.sistemShutdownHandler) { item.addEventListener('click', () => playWindowsSound('shutdown')); item.dataset.sistemShutdownHandler = '1'; } } });
    }

    // ---------------------------------------------------------------------
    // CURSOR UTILITY
    // ---------------------------------------------------------------------
    function applyCursor() { if (!config) return; document.body.classList.add(config.cursorClass); }

    // ---------------------------------------------------------------------
    // SHUTDOWN SCREEN
    // ---------------------------------------------------------------------
    function createShutdownScreen() {
        if (!config) return null;
        const shutdownScreen = document.createElement('div'); shutdownScreen.id = 'shutdownScreen'; shutdownScreen.className = `shutdown-screen shutdown-${currentVersion}`;
        let shutdownContent = `<div class="shutdown-fluent-container"><div class="shutdown-fluent-text">Shutting down</div></div>`;
        if (currentVersion === 'win95') shutdownContent = `<div class="shutdown-classic-container"><div class="shutdown-classic-text">It's now safe to turn off</div></div>`;
        if (currentVersion === 'winxp') shutdownContent = `<div class="shutdown-xp-container"><div class="shutdown-xp-text">Windows is shutting down...</div></div>`;
        shutdownScreen.innerHTML = shutdownContent; return shutdownScreen;
    }

    function triggerShutdown() { if (!config) return; playWindowsSound('shutdown'); const shutdownScreen = createShutdownScreen(); if (shutdownScreen) document.body.appendChild(shutdownScreen); setTimeout(() => { window.location.href = '../index.html'; }, 2500); }

    function initShutdownHandler() { document.addEventListener('click', function (e) { const shutdownItem = e.target.closest('[data-action="shutdown"]'); if (shutdownItem) { e.preventDefault(); e.stopPropagation(); triggerShutdown(); return; } const menuItem = e.target.closest('.menu-item'); if (menuItem) { const text = menuItem.textContent.toLowerCase(); if (text.includes('shut down') || text.includes('shutdown')) { e.preventDefault(); e.stopPropagation(); triggerShutdown(); } } }); }

    // ---------------------------------------------------------------------
    // DID YOU KNOW CARD
    // ---------------------------------------------------------------------
    function createDidYouKnowCard() {
        if (!config || !config.didYouKnowFacts) return;
        if (document.getElementById('didYouKnowCard')) return;
        const facts = config.didYouKnowFacts; const randomFact = facts[Math.floor(Math.random() * facts.length)]; const titleKey = 'dyk_title'; let title = 'Știai că...?'; if (window.t && typeof window.t === 'function') { const translatedTitle = window.t(titleKey); if (translatedTitle && translatedTitle !== titleKey) title = translatedTitle; }
        const card = document.createElement('div'); card.id = 'didYouKnowCard'; card.className = `did-you-know-card dyk-${currentVersion}`; card.innerHTML = `<div class="dyk-header"><span class="dyk-icon">💡</span><span class="dyk-title" data-i18n="dyk_title">${title}</span><button class="dyk-close" aria-label="Închide">×</button></div><div class="dyk-content"><p>${randomFact}</p></div>`;
        const closeBtn = card.querySelector('.dyk-close'); closeBtn.addEventListener('click', function () { card.classList.add('hidden'); sessionStorage.setItem(`dykClosed_${currentVersion}`, 'true'); }); if (sessionStorage.getItem(`dykClosed_${currentVersion}`) === 'true') card.classList.add('hidden'); const container = document.querySelector('.desktop') || document.querySelector('.metro-interface') || document.body; if (container) container.appendChild(card);
    }

    // ---------------------------------------------------------------------
    // INITIALIZATION (from windows-common)
    // ---------------------------------------------------------------------
    function initCommon() {
        if (!config) return;
        createBootScreen();
        const bootDuration = sessionStorage.getItem(`bootShown_${currentVersion}`) ? 0 : config.bootDuration + 500;
        setTimeout(() => { applyCursor(); initTaskbarClock(); initDraggableWindows(); createDidYouKnowCard(); if (typeof window.onLanguageChange === 'function') { window.onLanguageChange(function () { try { const existing = document.getElementById('didYouKnowCard'); if (existing) existing.remove(); createDidYouKnowCard(); } catch (e) { console.warn('[windows-ui] Error recreating DYK on language change', e); } }); } initSounds(); initShutdownHandler(); }, bootDuration);
    }

    // ---------------------------------------------------------------------
    // WINDOWS UI / GATING / SIMULATION - previously in windows-ui.js
    // ---------------------------------------------------------------------
    const UI_CONFIG = {
        selectors: { windowsContent: '.windows-content, .windows-desktop-simulation, .desktop, #desktop' },
        messages: {
            ro: { title: 'Secțiune disponibilă doar pe Windows Desktop', subtitle: 'Pentru cea mai bună experiență', description: 'Această secțiune interactivă simulează interfața Windows și este optimizată pentru a fi vizualizată pe un calculator cu sistem de operare Windows.', requirements: ['Sistem de operare: Windows', 'Rezoluție ecran: minim 1024px lățime', 'Browser modern (Chrome, Firefox, Edge)'], buttonHome: '← Înapoi la Galerie', buttonMain: '🏠 Pagina Principală' },
            en: { title: 'Section available only on Windows Desktop', subtitle: 'For the best experience', description: 'This interactive section simulates the Windows interface and is optimized to be viewed on a Windows computer.', requirements: ['Operating System: Windows', 'Screen resolution: minimum 1024px width', 'Modern browser (Chrome, Firefox, Edge)'], buttonHome: '← Back to Gallery', buttonMain: '🏠 Main Page' }
        }
    };

    function getCurrentLanguage() { const stored = localStorage.getItem('language'); if (stored && (stored === 'en' || stored === 'ro')) return stored; return navigator.language && navigator.language.startsWith('en') ? 'en' : 'ro'; }
    function isWindowsSimulationPage() { const path = window.location.pathname.toLowerCase(); const simulationFolders = ['win95', 'win98', 'winxp', 'vista', 'win7', 'win8', 'win10', 'win11']; return simulationFolders.some(folder => path.includes('/' + folder + '/')); }
    function isWindowsGalleryPage() { const path = window.location.pathname.toLowerCase(); return path.includes('/windows/index.html') || path.endsWith('/windows/'); }

    function createRestrictedMessage() { const lang = getCurrentLanguage(); const msgs = UI_CONFIG.messages[lang]; const os = window.OSDetect ? window.OSDetect.getOS() : { name: 'Unknown' }; const device = window.OSDetect ? window.OSDetect.getDevice() : { type: 'unknown', screenWidth: 0 }; const wrapper = document.createElement('div'); wrapper.className = 'windows-restricted-message show'; wrapper.innerHTML = `<div class="message-icon">🖥️</div><h2>${msgs.title}</h2><p class="subtitle">${msgs.subtitle}</p><p>${msgs.description}</p><div class="message-details"><p><strong>Sistemul tău detectat:</strong></p><ul><li>OS: ${os.name}</li><li>Dispozitiv: ${device.type}</li><li>Rezoluție: ${device.screenWidth}px</li></ul></div><div class="message-details"><p><strong>Cerințe:</strong></p><ul>${msgs.requirements.map(req => `<li>${req}</li>`).join('')}</ul></div><div class="message-actions"><a href="${isWindowsSimulationPage() ? '../index.html' : 'index.html'}" class="btn-home">${msgs.buttonHome}</a><a href="${isWindowsSimulationPage() ? '../../index.html' : '../index.html'}" class="btn-home" style="margin-left: 10px;">${msgs.buttonMain}</a></div>`; return wrapper; }

    function showRestrictionMessage() { const existingMessage = document.querySelector('.windows-restricted-message'); if (existingMessage) { existingMessage.classList.add('show'); document.body.classList.add('windows-restricted-active'); try { existingMessage.scrollTop = 0; } catch (e) {} try { window.scrollTo({ top: 0, behavior: 'auto' }); } catch (e) {} return; } const message = createRestrictedMessage(); document.body.insertBefore(message, document.body.firstChild); document.body.classList.add('windows-restricted-active'); setTimeout(() => { try { message.scrollTop = 0; } catch (e) {} try { window.scrollTo({ top: 0, behavior: 'auto' }); } catch (e) {} }, 0); }

    function hideWindowsContent() { const selectors = UI_CONFIG.selectors; document.querySelectorAll(selectors.windowsContent).forEach(el => { el.style.display = 'none'; el.classList.remove('show'); }); const main = document.querySelector('main'); if (main) main.style.display = 'none'; const header = document.querySelector('header:not(.main-header)'); if (header) header.style.display = 'none'; }

    function enableWindowsSimulation() { const selectors = UI_CONFIG.selectors; document.querySelectorAll(selectors.windowsContent).forEach(el => el.classList.add('show', 'enabled')); const main = document.querySelector('main'); if (main) main.style.display = ''; document.body.classList.remove('windows-restricted-active'); }

    function addTouchSupport() { const hasTouch = window.OSDetect ? window.OSDetect.hasTouch() : ('ontouchstart' in window); if (!hasTouch) return; document.querySelectorAll('.windows-card, .timeline-item, .btn').forEach(el => { el.addEventListener('touchstart', function () { this.classList.add('touch-active'); }, { passive: true }); el.addEventListener('touchend', function () { this.classList.remove('touch-active'); }, { passive: true }); }); let lastTouchEnd = 0; document.addEventListener('touchend', function (e) { const now = Date.now(); if (now - lastTouchEnd <= 300) e.preventDefault(); lastTouchEnd = now; }, false); }

    function applyWindowsRestrictions() { if (!window.OSDetect) { console.warn('OSDetect nu este încărcat. Încearcă să încarci os-detect.js înaintea windows-ui.js'); return; } const access = window.OSDetect.canAccessWindows(); const isSimulation = isWindowsSimulationPage(); const isGallery = isWindowsGalleryPage(); if (!isSimulation && !isGallery) return; if (isSimulation) { if (!access.canAccess) { showRestrictionMessage(); hideWindowsContent(); } else { enableWindowsSimulation(); } } }

    function debounce(func, wait) { let timeout; return function executedFunction(...args) { const later = () => { clearTimeout(timeout); func(...args); }; clearTimeout(timeout); timeout = setTimeout(later, wait); }; }

    function handleResize() { const message = document.querySelector('.windows-restricted-message'); if (window.OSDetect) { const access = window.OSDetect.canAccessWindows(); if (access.canAccess && message) { message.classList.remove('show'); enableWindowsSimulation(); } else if (!access.canAccess && isWindowsSimulationPage()) { showRestrictionMessage(); hideWindowsContent(); } } }

    function initUI() { applyWindowsRestrictions(); addTouchSupport(); window.addEventListener('osdetect:resize', handleResize); window.addEventListener('resize', debounce(handleResize, 200)); }

    // ---------------------------------------------------------------------
    // VERSION SWITCHER / SIMULATION AREA (small templates) 
    // The gallery page uses #windows-simulation and #windows-simulation-container
    // ---------------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', function () {
        const simulationSection = document.getElementById('windows-simulation');
        const container = document.getElementById('windows-simulation-container');
        const switcher = simulationSection && simulationSection.querySelector('.windows-version-switcher');
        // Show simulation section if present
        if (simulationSection) simulationSection.style.display = '';

        const templates = {
            winxp: `<div class="windows-desktop-simulation winxp" data-version="winxp"><div class="desktop">${windowsConfig.winxp.name}</div></div>`,
            vista: `<div class="windows-desktop-simulation vista" data-version="vista"><div class="desktop">${windowsConfig.vista.name}</div></div>`,
            win7: `<div class="windows-desktop-simulation win7" data-version="win7"><div class="desktop">${windowsConfig.win7.name}</div></div>`,
            win10: `<div class="windows-desktop-simulation win10" data-version="win10"><div class="desktop">${windowsConfig.win10.name}</div></div>`,
            win11: `<div class="windows-desktop-simulation win11" data-version="win11"><div class="desktop">${windowsConfig.win11.name}</div></div>`
        };

        function setVersion(version) {
            if (!switcher || !container) return;
            switcher.querySelectorAll('button').forEach(btn => btn.classList.toggle('active', btn.dataset.version === version));
            container.innerHTML = templates[version] || '';
        }

        if (switcher) switcher.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => setVersion(btn.dataset.version)));
        if (container) setVersion('winxp');
    });

    // ---------------------------------------------------------------------
    // BOOT & COMMON INIT
    // ---------------------------------------------------------------------
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { initCommon(); initUI(); });
    } else { initCommon(); initUI(); }

    // Exports
    window.WindowsCommon = { version: currentVersion, config: config, playSound: playWindowsSound };
    window.WindowsUI = { applyRestrictions: applyWindowsRestrictions, showMessage: showRestrictionMessage, hideContent: hideWindowsContent, enableSimulation: enableWindowsSimulation, isSimulationPage: isWindowsSimulationPage, isGalleryPage: isWindowsGalleryPage };

})();
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
            // Ensure the page body can scroll on mobile when the restriction message is visible
            document.body.classList.add('windows-restricted-active');
            // Make sure the message (and window) are scrolled to the top so the header is visible
            try {
                existingMessage.scrollTop = 0;
            } catch (e) {}
            try { window.scrollTo({ top: 0, behavior: 'auto' }); } catch (e) {}
            return;
        }
        
        const message = createRestrictedMessage();
        document.body.insertBefore(message, document.body.firstChild);
        // Allow scrolling while the message is visible (some windows pages set body overflow:hidden)
        document.body.classList.add('windows-restricted-active');
        // Ensure newly-inserted message is scrolled to top so user can reach the header
        setTimeout(() => {
            try { message.scrollTop = 0; } catch (e) {}
            try { window.scrollTo({ top: 0, behavior: 'auto' }); } catch (e) {}
        }, 0);
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
        // When we enable simulation remove the scroll override (restore original body overflow)
        document.body.classList.remove('windows-restricted-active');
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
// Removed conflict marker