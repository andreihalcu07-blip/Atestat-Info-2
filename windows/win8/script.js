// Windows 8 Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    const startScreen = document.getElementById('startScreen');
    const desktopMode = document.getElementById('desktopMode');
    const charmsBar = document.getElementById('charmsBar');
    const startCharm = document.getElementById('startCharm');
    const startButton = document.getElementById('startButton');
    const winxMenu = document.getElementById('winxMenu');

    // Start in desktop mode
    desktopMode.classList.remove('hidden');
    startScreen.classList.remove('active');

    // Toggle between Start Screen and Desktop
    function toggleStartScreen() {
        if (startScreen.classList.contains('active')) {
            startScreen.classList.remove('active');
            desktopMode.classList.remove('hidden');
        } else {
            startScreen.classList.add('active');
            desktopMode.classList.add('hidden');
        }
        charmsBar.classList.remove('visible');
        winxMenu.classList.add('hidden');
    }

    // Left click on Start button - toggle Start Screen
    if (startButton) {
        startButton.addEventListener('click', (e) => {
            if (winxMenu.classList.contains('hidden')) {
                toggleStartScreen();
            } else {
                winxMenu.classList.add('hidden');
            }
        });

        // Right click on Start button - show Win+X menu
        startButton.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            winxMenu.classList.toggle('hidden');
            startButton.classList.toggle('active', !winxMenu.classList.contains('hidden'));
            // Make sure we're in desktop mode
            if (!winxMenu.classList.contains('hidden')) {
                startScreen.classList.remove('active');
                desktopMode.classList.remove('hidden');
            }
        });
    }

    // Win+X menu items
    const winxItems = document.querySelectorAll('.winx-item');
    winxItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.getAttribute('data-action');
            handleWinXAction(action);
            winxMenu.classList.add('hidden');
            startButton.classList.remove('active');
        });
    });

    function handleWinXAction(action) {
        const messages = {
            'programs': '📦 Programs and Features\n\nInstalled programs list...',
            'power': '⚡ Power Options\n\nBalanced | High performance | Power saver',
            'event': '📋 Event Viewer\n\nWindows Logs, Application Logs...',
            'system': '💻 System\n\nWindows 8 Pro\nProcessor: Intel Core i5\nRAM: 8 GB',
            'device': '🔧 Device Manager\n\nManage hardware devices',
            'disk': '💾 Disk Management\n\nPartitions and volumes',
            'computer': '🖥️ Computer Management\n\nSystem tools, Storage, Services',
            'cmd': '⬛ Command Prompt\n\nC:\\Users\\User>_',
            'cmdadmin': '⬛ Command Prompt (Administrator)\n\nC:\\Windows\\system32>_',
            'task': '📊 Task Manager\n\nProcesses | Performance | App history',
            'control': '⚙️ Control Panel\n\nSystem and Security, Network, Programs...',
            'explorer': '📁 File Explorer\n\nQuick access, This PC, Network',
            'search': '🔍 Search\n\nApps | Settings | Files',
            'run': '▶️ Run\n\nType the name of a program...',
            'shutdown': null
        };

        if (action === 'shutdown') {
            // Shutdown is handled by windows-common.js
        } else if (messages[action]) {
            windowsAlert(messages[action], action.charAt(0).toUpperCase() + action.slice(1));
        }
    }

    // Close Win+X menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!winxMenu.classList.contains('hidden')) {
            if (!winxMenu.contains(e.target) && e.target !== startButton && !startButton.contains(e.target)) {
                winxMenu.classList.add('hidden');
                startButton.classList.remove('active');
            }
        }
    });

    // Start charm
    if (startCharm) {
        startCharm.addEventListener('click', toggleStartScreen);
    }

    // Charms bar - show on right edge hover
    document.addEventListener('mousemove', (e) => {
        if (e.clientX > window.innerWidth - 10) {
            charmsBar.classList.add('visible');
        } else if (e.clientX < window.innerWidth - 100) {
            charmsBar.classList.remove('visible');
        }
    });

    // Tiles click - navigate to section
    const tiles = document.querySelectorAll('.tile[data-section]');
    const sections = document.querySelectorAll('.section');

    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const sectionId = tile.getAttribute('data-section');
            if (sectionId) {
                // Switch to desktop and show section
                startScreen.classList.remove('active');
                desktopMode.classList.remove('hidden');
                
                sections.forEach(s => s.classList.remove('active'));
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            }
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
    setInterval(updateClock, 1000);

    // Window controls
    const closeBtn = document.querySelector('.win-btn.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            showWindowsDialog({
                title: 'Windows 8',
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

    const minimizeBtn = document.querySelector('.win-btn.minimize');
    const taskbarApp = document.querySelector('.taskbar-app');
    const windowEl = document.querySelector('.window');

    if (minimizeBtn && windowEl && taskbarApp) {
        minimizeBtn.addEventListener('click', () => {
            windowEl.style.display = 'none';
            taskbarApp.classList.remove('active');
        });

        taskbarApp.addEventListener('click', () => {
            if (windowEl.style.display === 'none') {
                windowEl.style.display = 'flex';
                taskbarApp.classList.add('active');
            }
        });
    }

    // Ribbon tabs
    const ribbonTabs = document.querySelectorAll('.ribbon-tab');
    ribbonTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            ribbonTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Keyboard shortcut - Windows key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Meta' || e.key === 'OS') {
            e.preventDefault();
            toggleStartScreen();
        }
    });

    // Search charm
    const searchCharm = document.querySelector('.charm:first-child');
    if (searchCharm) {
        searchCharm.addEventListener('click', () => {
            windowsAlert('🔍 Search\n\nSearch everywhere: Apps, Settings, Files', 'Search');
        });
    }

    // Settings charm
    const settingsCharm = document.querySelector('.charm:last-child');
    if (settingsCharm) {
        settingsCharm.addEventListener('click', () => {
            windowsAlert('⚙️ Settings\n\nNetwork, Volume, Brightness, Notifications, Power', 'Settings');
        });
    }

    // Tile hover animation
    tiles.forEach(tile => {
        tile.addEventListener('mouseenter', () => {
            tile.style.transform = 'scale(0.98)';
        });
        tile.addEventListener('mouseleave', () => {
            tile.style.transform = 'scale(1)';
        });
    });

    // Live tile simulation
    const liveTiles = document.querySelectorAll('.demo-tile');
    let liveInterval;
    
    function animateLiveTiles() {
        liveTiles.forEach(tile => {
            const badges = ['New', '3', '5', '!', '12', '22°', '📧'];
            const badge = tile.querySelector('.badge');
            if (badge) {
                badge.textContent = badges[Math.floor(Math.random() * badges.length)];
            }
        });
    }

    liveInterval = setInterval(animateLiveTiles, 3000);
});
