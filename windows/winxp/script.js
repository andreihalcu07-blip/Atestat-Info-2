<<<<<<< HEAD
// Windows XP Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const taskItems = document.querySelectorAll('.task-item');
    const sections = document.querySelectorAll('.section');

    taskItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            if (!sectionId) return;
            
            taskItems.forEach(i => i.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            item.classList.add('active');
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Update clock
    function updateClock() {
        const clockElement = document.querySelector('.clock');
        if (clockElement) {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            clockElement.textContent = `${hours}:${minutes}`;
        }
    }

    updateClock();
    setInterval(updateClock, 1000);

    // Window dragging
    const titleBar = document.querySelector('.title-bar');
    const windowXP = document.querySelector('.window');
    let isDragging = false;
    let initialX, initialY;

    if (titleBar && windowXP) {
        titleBar.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('title-btn')) return;
            isDragging = true;
            windowXP.style.transition = 'none';
            
            const rect = windowXP.getBoundingClientRect();
            initialX = e.clientX - rect.left;
            initialY = e.clientY - rect.top;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            windowXP.style.left = (e.clientX - initialX) + 'px';
            windowXP.style.top = (e.clientY - initialY) + 'px';
            windowXP.style.transform = 'none';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    // Title bar buttons
    const closeBtn = document.querySelector('.title-btn.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            showWindowsDialog({
                title: 'Windows XP',
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

    const minimizeBtn = document.querySelector('.title-btn.minimize');
    const programButton = document.querySelector('.program-button');
    
    if (minimizeBtn && windowXP && programButton) {
        minimizeBtn.addEventListener('click', () => {
            windowXP.style.display = 'none';
            programButton.classList.remove('active');
        });

        programButton.addEventListener('click', () => {
            if (windowXP.style.display === 'none') {
                windowXP.style.display = 'flex';
                programButton.classList.add('active');
            }
        });
    }

    // Start Menu
    const startButton = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');
    
    if (startButton && startMenu) {
        startButton.addEventListener('click', (e) => {
            e.stopPropagation();
            startMenu.classList.toggle('hidden');
            startButton.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!startMenu.contains(e.target) && e.target !== startButton && !startButton.contains(e.target)) {
                startMenu.classList.add('hidden');
                startButton.classList.remove('active');
            }
        });
        
        const menuItems = startMenu.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                if (!action) return;
                startMenu.classList.add('hidden');
                startButton.classList.remove('active');
                
                const actions = {
                    'internet': '🌐 Internet Explorer 6\n\nOpening your homepage...',
                    'email': '📧 Outlook Express\n\nYou have no new messages.',
                    'notepad': '📝 Notepad\n\n(Untitled)',
                    'paint': '🎨 Paint\n\nCreate your masterpiece!',
                    'calc': '🔢 Calculator\n\n0',
                    'mediaplayer': '🎵 Windows Media Player 9\n\nNow Playing: Nothing',
                    'programs': '📁 All Programs\n\n• Accessories\n• Games\n• Startup\n• Internet Explorer\n• Outlook Express\n• Windows Media Player',
                    'documents': '📄 My Documents\n\nMy Pictures | My Music | My Videos',
                    'pictures': '🖼️ My Pictures\n\nSample Pictures folder',
                    'music': '🎵 My Music\n\nSample Music folder',
                    'computer': '💻 My Computer\n\nLocal Disk (C:) | DVD Drive (D:)',
                    'control': '⚙️ Control Panel\n\n• Add/Remove Programs\n• Display\n• Network\n• System',
                    'help': '❓ Help and Support Center\n\nWelcome to Windows XP!',
                    'search': '🔍 Search Companion\n\nWhat do you want to search for?',
                    'run': null
                };
                
                if (action === 'run') {
                    windowsPrompt('Type the name of a program:', '', 'Run').then(cmd => {
                        if (cmd) windowsAlert(`Running: ${cmd}`, 'Run');
                    });
                } else if (action === 'logoff') {
                    windowsAlert('🔓 Log Off Windows\n\nThis would log off the current user.', 'Log Off');
                } else if (action === 'shutdown') {
                    // Shutdown is handled by windows-common.js
                } else if (actions[action]) {
                    windowsAlert(actions[action], action.charAt(0).toUpperCase() + action.slice(1));
                }
            });
        });
        
        // Footer buttons
        const footerBtns = startMenu.querySelectorAll('.footer-btn');
        footerBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                startMenu.classList.add('hidden');
                startButton.classList.remove('active');
                
                if (action === 'logoff') {
                    windowsAlert('🔓 Log Off Windows\n\nSwitching users...', 'Log Off');
                } else if (action === 'shutdown') {
                    // Shutdown is handled by windows-common.js
                }
            });
        });
    }

    // Desktop icons
    const desktopIcons = document.querySelectorAll('.desktop-icon:not([href])');
    desktopIcons.forEach(icon => {
        icon.addEventListener('dblclick', () => {
            const iconName = icon.querySelector('span').textContent;
            const messages = {
                'My Computer': '💻 My Computer\n\nLocal Disk (C:)\nDVD Drive (D:)\nControl Panel\nMy Network Places',
                'Internet Explorer': '🌐 Internet Explorer 6\n\nThe world\'s most popular web browser.\n\nMSN.com is your homepage.',
                'My Documents': '📁 My Documents\n\nMy Pictures\nMy Music\nMy Videos',
                'Recycle Bin': '🗑️ Recycle Bin\n\nCoșul de reciclare este gol.'
            };
            if (messages[iconName]) {
                windowsAlert(messages[iconName], iconName);
            }
        });
    });

    // Add hover sound effect simulation
    const featureBoxes = document.querySelectorAll('.feature-box, .edition-card, .stat-card');
    featureBoxes.forEach(box => {
        box.style.cursor = 'pointer';
    });
});
=======
// Windows XP Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const taskItems = document.querySelectorAll('.task-item');
    const sections = document.querySelectorAll('.section');

    taskItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            if (!sectionId) return;
            
            taskItems.forEach(i => i.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            item.classList.add('active');
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Update clock
    function updateClock() {
        const clockElement = document.querySelector('.clock');
        if (clockElement) {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            clockElement.textContent = `${hours}:${minutes}`;
        }
    }

    updateClock();
    setInterval(updateClock, 1000);

    // Window dragging
    const titleBar = document.querySelector('.title-bar');
    const windowXP = document.querySelector('.window');
    let isDragging = false;
    let initialX, initialY;

    if (titleBar && windowXP) {
        titleBar.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('title-btn')) return;
            isDragging = true;
            windowXP.style.transition = 'none';
            
            const rect = windowXP.getBoundingClientRect();
            initialX = e.clientX - rect.left;
            initialY = e.clientY - rect.top;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            windowXP.style.left = (e.clientX - initialX) + 'px';
            windowXP.style.top = (e.clientY - initialY) + 'px';
            windowXP.style.transform = 'none';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    // Title bar buttons
    const closeBtn = document.querySelector('.title-btn.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            showWindowsDialog({
                title: 'Windows XP',
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

    const minimizeBtn = document.querySelector('.title-btn.minimize');
    const programButton = document.querySelector('.program-button');
    
    if (minimizeBtn && windowXP && programButton) {
        minimizeBtn.addEventListener('click', () => {
            windowXP.style.display = 'none';
            programButton.classList.remove('active');
        });

        programButton.addEventListener('click', () => {
            if (windowXP.style.display === 'none') {
                windowXP.style.display = 'flex';
                programButton.classList.add('active');
            }
        });
    }

    // Start Menu
    const startButton = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');
    
    if (startButton && startMenu) {
        startButton.addEventListener('click', (e) => {
            e.stopPropagation();
            startMenu.classList.toggle('hidden');
            startButton.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!startMenu.contains(e.target) && e.target !== startButton && !startButton.contains(e.target)) {
                startMenu.classList.add('hidden');
                startButton.classList.remove('active');
            }
        });
        
        const menuItems = startMenu.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                if (!action) return;
                startMenu.classList.add('hidden');
                startButton.classList.remove('active');
                
                const actions = {
                    'internet': '🌐 Internet Explorer 6\n\nOpening your homepage...',
                    'email': '📧 Outlook Express\n\nYou have no new messages.',
                    'notepad': '📝 Notepad\n\n(Untitled)',
                    'paint': '🎨 Paint\n\nCreate your masterpiece!',
                    'calc': '🔢 Calculator\n\n0',
                    'mediaplayer': '🎵 Windows Media Player 9\n\nNow Playing: Nothing',
                    'programs': '📁 All Programs\n\n• Accessories\n• Games\n• Startup\n• Internet Explorer\n• Outlook Express\n• Windows Media Player',
                    'documents': '📄 My Documents\n\nMy Pictures | My Music | My Videos',
                    'pictures': '🖼️ My Pictures\n\nSample Pictures folder',
                    'music': '🎵 My Music\n\nSample Music folder',
                    'computer': '💻 My Computer\n\nLocal Disk (C:) | DVD Drive (D:)',
                    'control': '⚙️ Control Panel\n\n• Add/Remove Programs\n• Display\n• Network\n• System',
                    'help': '❓ Help and Support Center\n\nWelcome to Windows XP!',
                    'search': '🔍 Search Companion\n\nWhat do you want to search for?',
                    'run': null
                };
                
                if (action === 'run') {
                    windowsPrompt('Type the name of a program:', '', 'Run').then(cmd => {
                        if (cmd) windowsAlert(`Running: ${cmd}`, 'Run');
                    });
                } else if (action === 'logoff') {
                    windowsAlert('🔓 Log Off Windows\n\nThis would log off the current user.', 'Log Off');
                } else if (action === 'shutdown') {
                    // Shutdown is handled by windows-common.js
                } else if (actions[action]) {
                    windowsAlert(actions[action], action.charAt(0).toUpperCase() + action.slice(1));
                }
            });
        });
        
        // Footer buttons
        const footerBtns = startMenu.querySelectorAll('.footer-btn');
        footerBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                startMenu.classList.add('hidden');
                startButton.classList.remove('active');
                
                if (action === 'logoff') {
                    windowsAlert('🔓 Log Off Windows\n\nSwitching users...', 'Log Off');
                } else if (action === 'shutdown') {
                    // Shutdown is handled by windows-common.js
                }
            });
        });
    }

    // Desktop icons
    const desktopIcons = document.querySelectorAll('.desktop-icon:not([href])');
    desktopIcons.forEach(icon => {
        icon.addEventListener('dblclick', () => {
            const iconName = icon.querySelector('span').textContent;
            const messages = {
                'My Computer': '💻 My Computer\n\nLocal Disk (C:)\nDVD Drive (D:)\nControl Panel\nMy Network Places',
                'Internet Explorer': '🌐 Internet Explorer 6\n\nThe world\'s most popular web browser.\n\nMSN.com is your homepage.',
                'My Documents': '📁 My Documents\n\nMy Pictures\nMy Music\nMy Videos',
                'Recycle Bin': '🗑️ Recycle Bin\n\nCoșul de reciclare este gol.'
            };
            if (messages[iconName]) {
                windowsAlert(messages[iconName], iconName);
            }
        });
    });

    // Add hover sound effect simulation
    const featureBoxes = document.querySelectorAll('.feature-box, .edition-card, .stat-card');
    featureBoxes.forEach(box => {
        box.style.cursor = 'pointer';
    });
});
>>>>>>> abcbb6b6a5fde656692021ce6d66fcfecfde8768
