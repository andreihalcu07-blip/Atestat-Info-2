// Windows 11 Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // ==================== START MENU ====================
    const startMenu = document.getElementById('startMenu');
    const startButton = document.getElementById('startButton');
    const powerButton = document.getElementById('powerButton');
    const startSearch = document.getElementById('startSearch');

    // Toggle Start Menu
    if (startButton && startMenu) {
        startButton.addEventListener('click', (e) => {
            e.stopPropagation();
            startMenu.classList.toggle('hidden');
            startButton.classList.toggle('active');
            if (!startMenu.classList.contains('hidden')) {
                startSearch.focus();
            }
        });
    }

    // Close Start Menu when clicking outside
    document.addEventListener('click', (e) => {
        if (startMenu && !startMenu.classList.contains('hidden')) {
            if (!startMenu.contains(e.target) && e.target !== startButton && !startButton.contains(e.target)) {
                startMenu.classList.add('hidden');
                startButton.classList.remove('active');
            }
        }
    });

    // Pinned apps click handlers
    const pinnedApps = document.querySelectorAll('.pinned-app');
    pinnedApps.forEach(app => {
        app.addEventListener('click', () => {
            const action = app.getAttribute('data-action');
            handleAppAction(action);
        });
    });

    function handleAppAction(action) {
        const actions = {
            'edge': '🌐 Microsoft Edge\n\nBrowse the web with the new Chromium-based Edge',
            'word': '📝 Microsoft Word\n\nCreate and edit documents',
            'excel': '📊 Microsoft Excel\n\nWork with spreadsheets and data',
            'powerpoint': '📈 Microsoft PowerPoint\n\nCreate stunning presentations',
            'outlook': '📧 Microsoft Outlook\n\n3 unread messages in Inbox',
            'teams': '👥 Microsoft Teams\n\nChat, meet, call, and collaborate',
            'store': '🛒 Microsoft Store\n\nDiscover apps you\'ll love',
            'photos': '📷 Photos\n\nView and edit your photos',
            'settings': '⚙️ Settings\n\nSystem, Devices, Network & internet, Personalization...',
            'explorer': '📁 File Explorer\n\nQuick access, OneDrive, This PC',
            'terminal': '⬛ Windows Terminal\n\nPowerShell, Command Prompt, WSL',
            'notepad': '📋 Notepad\n\nSimple text editor - now with tabs!'
        };

        if (actions[action]) {
            windowsAlert(actions[action], action.charAt(0).toUpperCase() + action.slice(1));
        }
        
        // Close menu after action
        startMenu.classList.add('hidden');
        startButton.classList.remove('active');
    }

    // Power button
    if (powerButton) {
        powerButton.addEventListener('click', (e) => {
            e.stopPropagation();
            startMenu.classList.add('hidden');
            startButton.classList.remove('active');
            
            showWindowsDialog({
                type: 'confirm',
                title: 'Shut Down Windows',
                message: 'Dorești să închizi Windows 11?',
                icon: '⏻',
                confirmText: 'Shut Down',
                cancelText: 'Cancel',
                onConfirm: () => {
                    if (window.triggerShutdown) {
                        window.triggerShutdown();
                    } else {
                        window.location.href = '../index.html';
                    }
                }
            });
        });
    }

    // All apps button
    const allAppsBtn = document.querySelector('.all-apps-btn');
    if (allAppsBtn) {
        allAppsBtn.addEventListener('click', () => {
            windowsAlert('📋 All apps\n\nA-Z list of all installed applications:\n\n• Calculator\n• Camera\n• Clock\n• Microsoft Edge\n• Microsoft Store\n• Notepad\n• Paint\n• Photos\n• Settings\n• Windows Terminal\n...', 'All Apps');
        });
    }

    // Search in Start Menu
    if (startSearch) {
        startSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && startSearch.value.trim()) {
                windowsAlert(`🔍 Searching for: "${startSearch.value}"\n\n• Best match: ${startSearch.value}\n• Apps\n• Documents\n• Web\n• Settings`, 'Search');
                startSearch.value = '';
                startMenu.classList.add('hidden');
                startButton.classList.remove('active');
            }
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Windows key
        if (e.key === 'Meta' || e.key === 'OS') {
            e.preventDefault();
            startMenu.classList.toggle('hidden');
            startButton.classList.toggle('active');
        }
        // Escape to close
        if (e.key === 'Escape' && !startMenu.classList.contains('hidden')) {
            startMenu.classList.add('hidden');
            startButton.classList.remove('active');
        }
    });

    // ==================== NAVIGATION ====================
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const sections = document.querySelectorAll('.section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            
            navItems.forEach(i => i.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            item.classList.add('active');
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Clock update
    function updateClock() {
        const timeEl = document.getElementById('clock-time');
        const dateEl = document.getElementById('clock-date');
        
        if (timeEl && dateEl) {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const year = now.getFullYear();
            
            timeEl.textContent = `${hours}:${minutes}`;
            dateEl.textContent = `${day}/${month}/${year}`;
        }
    }

    updateClock();
    setInterval(updateClock, 1000);

    // Window controls
    const closeBtn = document.querySelector('.title-btn.close');
    const windowEl = document.querySelector('.window');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            showWindowsDialog({
                title: 'Windows 11',
                message: 'Dorești să te întorci la galeria Windows?',
                icon: '❓',
                confirmText: 'Da',
                cancelText: 'Nu',
                onConfirm: () => {
                    window.location.href = '../index.html';
                }
            });
        });
    }

    // Minimize window
    const minimizeBtn = document.querySelector('.title-btn.min');
    const activeApp = document.querySelector('.taskbar-apps .app.active');

    if (minimizeBtn && windowEl && activeApp) {
        minimizeBtn.addEventListener('click', () => {
            windowEl.style.display = 'none';
            activeApp.classList.remove('active');
        });

        activeApp.addEventListener('click', () => {
            if (windowEl.style.display === 'none') {
                windowEl.style.display = 'flex';
                activeApp.classList.add('active');
            }
        });
    }

    // Search button
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            windowsPrompt('Enter search term:', '', 'Search Windows 11').then(query => {
                if (query) {
                    windowsAlert(`Searching for: "${query}"\n\n• Best match: ${query}\n• Apps\n• Documents\n• Web\n• Settings`, 'Search Results');
                }
            });
        });
    }

    // Task View
    const taskViewBtn = document.querySelector('.task-view-btn');
    if (taskViewBtn) {
        taskViewBtn.addEventListener('click', () => {
            windowsAlert('📋 Task View\n\n🖥️ Virtual Desktops:\n[Desktop 1] [Desktop 2] [+ New desktop]\n\nEach desktop can have its own wallpaper!', 'Task View');
        });
    }

    // Widgets button
    const widgetsBtn = document.querySelector('.widgets-btn');
    if (widgetsBtn) {
        widgetsBtn.addEventListener('click', () => {
            windowsAlert('📰 Widgets\n\n☀️ Weather: 22°C Sunny\n📰 Top Stories\n📅 Calendar: No events today\n📈 Stocks: MSFT +1.2%\n🏈 Sports scores\n\n[+ Add widgets]', 'Widgets');
        });
    }

    // Notification button
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            windowsAlert('🔔 Notification Center\n\n📅 ' + new Date().toLocaleDateString('ro-RO', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) + '\n\nNo new notifications\n\n[Focus] [Do not disturb] [Night light]', 'Notifications');
        });
    }

    // Clock click
    const clockArea = document.querySelector('.clock');
    if (clockArea) {
        clockArea.addEventListener('click', () => {
            const now = new Date();
            windowsAlert('📅 Calendar\n\n' + now.toLocaleDateString('ro-RO', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) + '\n\n' + now.toLocaleTimeString('ro-RO') + '\n\n🔔 No upcoming events', 'Calendar');
        });
    }

    // System tray icons
    const trayIcons = document.querySelector('.tray-icons');
    if (trayIcons) {
        trayIcons.addEventListener('click', () => {
            windowsAlert('⚡ Quick Settings\n\n[📶 WiFi: Connected]\n[🔵 Bluetooth: On]\n[✈️ Airplane mode: Off]\n[🔋 Battery saver: Off]\n[🔊 Volume: 65%]\n[☀️ Brightness: 80%]\n\n[Accessibility] [Cast] [Project]', 'Quick Settings');
        });
    }

    // Desktop icons
    const desktopIcons = document.querySelectorAll('.desktop-icon:not([href])');
    desktopIcons.forEach(icon => {
        icon.addEventListener('dblclick', () => {
            const iconName = icon.querySelector('span').textContent;
            const messages = {
                'Documents': '📁 Documents\n\nThis folder is empty\n\n[New folder] [Upload]',
                'Recycle Bin': '🗑️ Recycle Bin\n\nRecycle Bin is empty',
                'Microsoft Store': '🛒 Microsoft Store\n\n🎮 Gaming\n📱 Apps\n🎬 Movies & TV\n📚 Books\n\n"Discover apps you\'ll love"'
            };
            if (messages[iconName]) {
                windowsAlert(messages[iconName], iconName);
            }
        });
    });

    // Feature items animation on hover
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.style.cursor = 'pointer';
    });

    // Info cards click effect
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const desc = card.querySelector('p').textContent;
            windowsAlert(`${title}\n\n${desc}`, title);
        });
    });

    // Smooth scroll for sidebar navigation
    const sidebarSearch = document.querySelector('.sidebar-search');
    if (sidebarSearch) {
        sidebarSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            navItems.forEach(item => {
                const text = item.querySelector('.nav-text')?.textContent.toLowerCase() || '';
                if (query && !text.includes(query)) {
                    item.style.opacity = '0.5';
                } else {
                    item.style.opacity = '1';
                }
            });
        });
    }

    // Add ripple effect to buttons
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                width: 100px;
                height: 100px;
                left: ${x - 50}px;
                top: ${y - 50}px;
                transform: scale(0);
                animation: ripple 0.4s ease-out;
                pointer-events: none;
            `;
            
            if (!this.style.position || this.style.position === 'static') {
                this.style.position = 'relative';
            }
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 400);
        });
    });

    // Add ripple keyframe animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
