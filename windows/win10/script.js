
// Windows 10 Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // ==================== START MENU ====================
    const startMenu = document.getElementById('startMenu');
    const startButton = document.getElementById('startButton');

    // Toggle Start Menu
    if (startButton && startMenu) {
        startButton.addEventListener('click', (e) => {
            e.stopPropagation();
            startMenu.classList.toggle('hidden');
            startButton.classList.toggle('active');
        });
    }

    // Close Start Menu when clicking outside
    document.addEventListener('click', (e) => {
        if (startMenu && !startMenu.classList.contains('hidden')) {
            if (!startMenu.contains(e.target) && e.target !== startButton) {
                startMenu.classList.add('hidden');
                startButton.classList.remove('active');
            }
        }
    });

    // Menu items click handlers
    const menuItems = document.querySelectorAll('.start-menu .menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.getAttribute('data-action');
            handleMenuAction(action);
        });
    });

    // Tiles click handlers
    const tiles = document.querySelectorAll('.start-menu .tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const action = tile.getAttribute('data-action');
            handleMenuAction(action);
        });
    });

    function handleMenuAction(action) {
        const actions = {
            'explorer': '📁 File Explorer\n\nQuick access: Desktop, Downloads, Documents, Pictures',
            'settings': '⚙️ Settings\n\nSystem, Devices, Network, Personalization, Apps...',
            'documents': '📄 Documents\n\nYour documents folder',
            'pictures': '🖼️ Pictures\n\nYour pictures folder',
            'power': showPowerMenu,
            'weather': '🌤️ Weather\n\n22°C - Sunny\nHumidity: 45%',
            'calendar': '📅 Calendar\n\nNo upcoming events',
            'mail': '✉️ Mail\n\n3 unread messages',
            'photos': '📷 Photos\n\nYour photo collection',
            'store': '🛒 Microsoft Store\n\nDiscover apps, games, and more!',
            'edge': '🌐 Microsoft Edge\n\nBrowse the web with the new Edge',
            'xbox': '🎮 Xbox\n\nConnect with your gaming community',
            'groove': '🎵 Groove Music\n\nYour music, everywhere'
        };

        if (typeof actions[action] === 'function') {
            actions[action]();
        } else if (actions[action]) {
            windowsAlert(actions[action], action.charAt(0).toUpperCase() + action.slice(1));
        }
        
        // Close menu after action
        startMenu.classList.add('hidden');
        startButton.classList.remove('active');
    }

    function showPowerMenu() {
        showWindowsDialog({
            type: 'confirm',
            title: 'Shut Down Windows',
            message: 'Dorești să închizi Windows 10?',
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
    }

    // Keyboard shortcut - Windows key
    document.addEventListener('keydown', (e) => {
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
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            showWindowsDialog({
                title: 'Windows 10',
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

    const minimizeBtn = document.querySelector('.title-btn.min');
    const windowEl = document.querySelector('.window');
    const activeApp = document.querySelector('.app-btn.active');

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

    // Action Center
    const actionCenter = document.querySelector('.action-center');
    if (actionCenter) {
        actionCenter.addEventListener('click', () => {
            windowsAlert('💬 Action Center\n\n• No new notifications\n\n[Tablet mode] [Network] [All settings]\n[Night light] [Bluetooth] [VPN]', 'Action Center');
        });
    }

    // Task View
    const taskView = document.querySelector('.task-view');
    if (taskView) {
        taskView.addEventListener('click', () => {
            windowsAlert('📋 Task View\n\nVirtual Desktops:\n• Desktop 1 (active)\n• + New desktop\n\nTimeline:\nActivities from the past 30 days', 'Task View');
        });
    }

    // Desktop icons
    const desktopIcons = document.querySelectorAll('.desktop-icon:not([href])');
    desktopIcons.forEach(icon => {
        icon.addEventListener('dblclick', () => {
            const iconName = icon.querySelector('span').textContent;
            const messages = {
                'This PC': '💻 This PC\n\nDevices and drives:\n  Local Disk (C:) - 234 GB free of 500 GB\n  DVD Drive (D:)',
                'Documents': '📁 Documents\n\nQuick access:\n  Desktop\n  Downloads\n  Documents\n  Pictures',
                'Recycle Bin': '🗑️ Recycle Bin\n\nEmpty',
                'Microsoft Store': '🛒 Microsoft Store\n\nDiscover apps, games, and more!'
            };
            if (messages[iconName]) {
                windowsAlert(messages[iconName], iconName);
            }
        });
    });

    // Search box focus effect
    const searchBox = document.querySelector('.search-box');
    const searchInput = document.querySelector('.search-box input');
    
    if (searchBox && searchInput) {
        searchInput.addEventListener('focus', () => {
            searchBox.style.background = '#3d3d3d';
        });
        
        searchInput.addEventListener('blur', () => {
            searchBox.style.background = '#2d2d2d';
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && searchInput.value.trim()) {
                windowsAlert(`🔍 Searching for: "${searchInput.value}"\n\nBest match: ${searchInput.value}\nApps, Documents, Web results...`, 'Search');
                searchInput.value = '';
            }
        });
    }

    // Feature rows hover effect
    const featureRows = document.querySelectorAll('.feature-row');
    featureRows.forEach(row => {
        row.style.cursor = 'pointer';
    });

    // Edition cards hover
    const editionCards = document.querySelectorAll('.edition-card');
    editionCards.forEach(card => {
        card.style.cursor = 'pointer';
    });
});

// Windows 10 Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // ==================== START MENU ====================
    const startMenu = document.getElementById('startMenu');
    const startButton = document.getElementById('startButton');

    // Toggle Start Menu
    if (startButton && startMenu) {
        startButton.addEventListener('click', (e) => {
            e.stopPropagation();
            startMenu.classList.toggle('hidden');
            startButton.classList.toggle('active');
        });
    }

    // Close Start Menu when clicking outside
    document.addEventListener('click', (e) => {
        if (startMenu && !startMenu.classList.contains('hidden')) {
            if (!startMenu.contains(e.target) && e.target !== startButton) {
                startMenu.classList.add('hidden');
                startButton.classList.remove('active');
            }
        }
    });

    // Menu items click handlers
    const menuItems = document.querySelectorAll('.start-menu .menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.getAttribute('data-action');
            handleMenuAction(action);
        });
    });

    // Tiles click handlers
    const tiles = document.querySelectorAll('.start-menu .tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const action = tile.getAttribute('data-action');
            handleMenuAction(action);
        });
    });

    function handleMenuAction(action) {
        const actions = {
            'explorer': '📁 File Explorer\n\nQuick access: Desktop, Downloads, Documents, Pictures',
            'settings': '⚙️ Settings\n\nSystem, Devices, Network, Personalization, Apps...',
            'documents': '📄 Documents\n\nYour documents folder',
            'pictures': '🖼️ Pictures\n\nYour pictures folder',
            'power': showPowerMenu,
            'weather': '🌤️ Weather\n\n22°C - Sunny\nHumidity: 45%',
            'calendar': '📅 Calendar\n\nNo upcoming events',
            'mail': '✉️ Mail\n\n3 unread messages',
            'photos': '📷 Photos\n\nYour photo collection',
            'store': '🛒 Microsoft Store\n\nDiscover apps, games, and more!',
            'edge': '🌐 Microsoft Edge\n\nBrowse the web with the new Edge',
            'xbox': '🎮 Xbox\n\nConnect with your gaming community',
            'groove': '🎵 Groove Music\n\nYour music, everywhere'
        };

        if (typeof actions[action] === 'function') {
            actions[action]();
        } else if (actions[action]) {
            windowsAlert(actions[action], action.charAt(0).toUpperCase() + action.slice(1));
        }
        
        // Close menu after action
        startMenu.classList.add('hidden');
        startButton.classList.remove('active');
    }

    function showPowerMenu() {
        showWindowsDialog({
            type: 'confirm',
            title: 'Shut Down Windows',
            message: 'Dorești să închizi Windows 10?',
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
    }

    // Keyboard shortcut - Windows key
    document.addEventListener('keydown', (e) => {
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
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            showWindowsDialog({
                title: 'Windows 10',
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

    const minimizeBtn = document.querySelector('.title-btn.min');
    const windowEl = document.querySelector('.window');
    const activeApp = document.querySelector('.app-btn.active');

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

    // Action Center
    const actionCenter = document.querySelector('.action-center');
    if (actionCenter) {
        actionCenter.addEventListener('click', () => {
            windowsAlert('💬 Action Center\n\n• No new notifications\n\n[Tablet mode] [Network] [All settings]\n[Night light] [Bluetooth] [VPN]', 'Action Center');
        });
    }

    // Task View
    const taskView = document.querySelector('.task-view');
    if (taskView) {
        taskView.addEventListener('click', () => {
            windowsAlert('📋 Task View\n\nVirtual Desktops:\n• Desktop 1 (active)\n• + New desktop\n\nTimeline:\nActivities from the past 30 days', 'Task View');
        });
    }

    // Desktop icons
    const desktopIcons = document.querySelectorAll('.desktop-icon:not([href])');
    desktopIcons.forEach(icon => {
        icon.addEventListener('dblclick', () => {
            const iconName = icon.querySelector('span').textContent;
            const messages = {
                'This PC': '💻 This PC\n\nDevices and drives:\n  Local Disk (C:) - 234 GB free of 500 GB\n  DVD Drive (D:)',
                'Documents': '📁 Documents\n\nQuick access:\n  Desktop\n  Downloads\n  Documents\n  Pictures',
                'Recycle Bin': '🗑️ Recycle Bin\n\nEmpty',
                'Microsoft Store': '🛒 Microsoft Store\n\nDiscover apps, games, and more!'
            };
            if (messages[iconName]) {
                windowsAlert(messages[iconName], iconName);
            }
        });
    });

    // Search box focus effect
    const searchBox = document.querySelector('.search-box');
    const searchInput = document.querySelector('.search-box input');
    
    if (searchBox && searchInput) {
        searchInput.addEventListener('focus', () => {
            searchBox.style.background = '#3d3d3d';
        });
        
        searchInput.addEventListener('blur', () => {
            searchBox.style.background = '#2d2d2d';
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && searchInput.value.trim()) {
                windowsAlert(`🔍 Searching for: "${searchInput.value}"\n\nBest match: ${searchInput.value}\nApps, Documents, Web results...`, 'Search');
                searchInput.value = '';
            }
        });
    }

    // Feature rows hover effect
    const featureRows = document.querySelectorAll('.feature-row');
    featureRows.forEach(row => {
        row.style.cursor = 'pointer';
    });

    // Edition cards hover
    const editionCards = document.querySelectorAll('.edition-card');
    editionCards.forEach(card => {
        card.style.cursor = 'pointer';
    });
});

