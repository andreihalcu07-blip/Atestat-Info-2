// Windows 7 Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const sections = document.querySelectorAll('.section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            
            navItems.forEach(i => i.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            item.classList.add('active');
            const secEl = document.getElementById(sectionId);
            if (secEl) secEl.classList.add('active');
        });
    });

    // Clock update
    function updateClock() {
        const clockElement = document.getElementById('clock');
        if (clockElement) {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            clockElement.textContent = `${hours}:${minutes}`;
        }
    }

    updateClock();
    window.__sistemOS_intervals = window.__sistemOS_intervals || {};
    if (window.__sistemOS_intervals.win7_clock) clearInterval(window.__sistemOS_intervals.win7_clock);
    window.__sistemOS_intervals.win7_clock = setInterval(updateClock, 1000);

    // Window dragging
    const titleBar = document.querySelector('.title-bar');
    const win7Window = document.querySelector('.window');
    let isDragging = false;
    let initialX, initialY;

    if (titleBar && win7Window) {
        titleBar.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('ctrl-btn')) return;
            isDragging = true;
            win7Window.style.transition = 'none';
            
            const rect = win7Window.getBoundingClientRect();
            initialX = e.clientX - rect.left;
            initialY = e.clientY - rect.top;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            win7Window.style.left = (e.clientX - initialX) + 'px';
            win7Window.style.top = (e.clientY - initialY) + 'px';
            win7Window.style.transform = 'none';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    // Window controls
    const closeBtn = document.querySelector('.ctrl-btn.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            showWindowsDialog({
                title: 'Windows 7',
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

    const minimizeBtn = document.querySelector('.ctrl-btn.minimize');
    const activeApp = document.querySelector('.pinned-app.active');
    
    if (minimizeBtn && win7Window && activeApp) {
        minimizeBtn.addEventListener('click', () => {
            win7Window.style.display = 'none';
            activeApp.classList.remove('active');
        });

        activeApp.addEventListener('click', () => {
            if (win7Window.style.display === 'none') {
                win7Window.style.display = 'block';
                activeApp.classList.add('active');
            }
        });
    }

    // Start Menu
    const startOrb = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');
    
    if (startOrb && startMenu) {
        if (!startOrb.dataset.sistemHandler) {
            startOrb.addEventListener('click', (e) => {
                e.stopPropagation();
                startMenu.classList.toggle('hidden');
                startOrb.classList.toggle('active');
            });
            startOrb.dataset.sistemHandler = '1';
        }
        
        document.addEventListener('click', (e) => {
            if (!startMenu.contains(e.target) && e.target !== startOrb && !startOrb.contains(e.target)) {
                startMenu.classList.add('hidden');
                startOrb.classList.remove('active');
            }
        });
        
        const menuItems = startMenu.querySelectorAll('.menu-item, .all-programs-btn');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                if (!action) return;
                startMenu.classList.add('hidden');
                startOrb.classList.remove('active');
                
                const actions = {
                    'internet': '🌐 Internet Explorer 8\n\nOpening your homepage...',
                    'documents': '📄 Documents Library\n\nMy Documents | Public Documents',
                    'media': '🎵 Windows Media Player 12\n\nNow Playing Library',
                    'notepad': '📝 Notepad\n\n(Untitled)',
                    'calc': '🔢 Calculator\n\nStandard | Scientific | Programmer',
                    'snipping': '✂️ Snipping Tool\n\nCapture a screenshot',
                    'sticky': '📋 Sticky Notes\n\nWrite a quick note',
                    'programs': '📁 All Programs\n\n• Accessories\n• Games\n• Maintenance\n• Startup',
                    'mydocs': '📄 Documents\n\nYour document library',
                    'pictures': '🖼️ Pictures\n\nYour picture library',
                    'music': '🎵 Music\n\nYour music library',
                    'games': '🎮 Games\n\nChess Titans, Solitaire, Minesweeper...',
                    'computer': '💻 Computer\n\nLocal Disk (C:) | DVD Drive (D:)',
                    'control': '⚙️ Control Panel\n\n• System and Security\n• Network\n• Programs\n• Appearance',
                    'devices': '🖨️ Devices and Printers\n\nManage your devices',
                    'help': '❓ Help and Support\n\nWindows 7 Help'
                };
                
                if (actions[action]) {
                    windowsAlert(actions[action], action.charAt(0).toUpperCase() + action.slice(1));
                }
            });
        });
        
        // Shutdown buttons
        const shutdownBtn = startMenu.querySelector('.shutdown-btn');
        const shutdownArrow = startMenu.querySelector('.shutdown-arrow');
        
        if (shutdownBtn) {
            shutdownBtn.addEventListener('click', () => {
                startMenu.classList.add('hidden');
                startOrb.classList.remove('active');
                // Shutdown is handled by windows-common.js
            });
        }
        
        if (shutdownArrow) {
            shutdownArrow.addEventListener('click', () => {
                windowsAlert('Power Options:\n\n• Switch user\n• Log off\n• Lock\n• Restart\n• Sleep\n• Hibernate\n• Shut down', 'Power Options');
            });
        }
        
        // Search
        const searchInput = document.getElementById('startSearch');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && searchInput.value.trim()) {
                    windowsAlert(`🔍 Searching for: "${searchInput.value}"\n\nSearching programs, files, and settings...`, 'Search');
                    searchInput.value = '';
                }
            });
        }
    }

    // Show desktop button
    const showDesktopBtn = document.querySelector('.show-desktop');
    if (showDesktopBtn && win7Window) {
        showDesktopBtn.addEventListener('mouseenter', () => {
            win7Window.style.opacity = '0.1';
        });
        
        showDesktopBtn.addEventListener('mouseleave', () => {
            win7Window.style.opacity = '1';
        });
        
        showDesktopBtn.addEventListener('click', () => {
            if (win7Window.style.display === 'none') {
                win7Window.style.display = 'block';
            } else {
                win7Window.style.display = 'none';
            }
        });
    }

    // Desktop icons
    const desktopIcons = document.querySelectorAll('.desktop-icon:not([href])');
    desktopIcons.forEach(icon => {
        icon.addEventListener('dblclick', () => {
            const iconName = icon.querySelector('span').textContent;
            const messages = {
                'Computer': '💻 Computer\n\nHard Disk Drives (2)\nDevices with Removable Storage (1)\nNetwork Location (1)',
                'Documents': '📁 Documents Library\n\nIncludes: My Documents, Public Documents',
                'Recycle Bin': '🗑️ Recycle Bin\n\n0 items'
            };
            if (messages[iconName]) {
                windowsAlert(messages[iconName], iconName);
            }
        });
    });

    // Pinned apps hover effect (simulating jump list preview)
    const pinnedApps = document.querySelectorAll('.pinned-app:not(.active)');
    pinnedApps.forEach(app => {
        app.addEventListener('click', () => {
            const iconText = app.querySelector('.app-icon').textContent;
            const names = {
                '🌐': 'Internet Explorer',
                '📁': 'Windows Explorer',
                '🎵': 'Windows Media Player'
            };
            windowsAlert(`${iconText} ${names[iconText] || 'Application'}\n\nClick to open`, names[iconText] || 'Application');
        });
    });
});