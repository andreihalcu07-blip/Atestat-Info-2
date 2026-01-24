
// Windows 98 Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
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

    // Update time
    function updateTime() {
        const timeElement = document.querySelector('.time');
        if (timeElement) {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            timeElement.textContent = `${hours}:${minutes}`;
        }
    }

    updateTime();
    setInterval(updateTime, 1000);

    // Window dragging
    const titleBar = document.querySelector('.title-bar');
    const window98 = document.querySelector('.window');
    let isDragging = false;
    let initialX, initialY;

    if (titleBar && window98) {
        titleBar.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('title-btn')) return;
            isDragging = true;
            window98.style.transition = 'none';
            
            const rect = window98.getBoundingClientRect();
            initialX = e.clientX - rect.left;
            initialY = e.clientY - rect.top;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            window98.style.left = (e.clientX - initialX) + 'px';
            window98.style.top = (e.clientY - initialY) + 'px';
            window98.style.transform = 'none';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    // Close button
    const closeBtn = document.querySelector('.title-btn.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            showWindowsDialog({
                title: 'Windows 98',
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

    // Minimize functionality
    const minimizeBtn = document.querySelector('.title-btn.minimize');
    const programButton = document.querySelector('.program-button');
    
    if (minimizeBtn && window98 && programButton) {
        minimizeBtn.addEventListener('click', () => {
            window98.style.display = 'none';
            programButton.classList.remove('active');
        });

        programButton.addEventListener('click', () => {
            if (window98.style.display === 'none') {
                window98.style.display = 'flex';
                programButton.classList.add('active');
            }
        });
    }

    // Start button with Start Menu
    const startButton = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');
    
    if (startButton && startMenu) {
        startButton.addEventListener('click', (e) => {
            e.stopPropagation();
            startMenu.classList.toggle('hidden');
            startButton.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!startMenu.contains(e.target) && e.target !== startButton) {
                startMenu.classList.add('hidden');
                startButton.classList.remove('active');
            }
        });
        
        const menuItems = startMenu.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', async () => {
                const action = item.getAttribute('data-action');
                startMenu.classList.add('hidden');
                startButton.classList.remove('active');
                
                switch(action) {
                    case 'programs':
                        windowsAlert('📁 Programs\n\n• Accessories\n• Games\n• Internet Explorer\n• Outlook Express\n• MS-DOS Prompt\n• Windows Explorer', 'Programs');
                        break;
                    case 'favorites':
                        windowsAlert('⭐ Favorites\n\n• Channels\n• Links\n• Software Updates', 'Favorites');
                        break;
                    case 'documents':
                        windowsAlert('📄 Documents\n\nRecent documents will appear here.', 'Documents');
                        break;
                    case 'settings':
                        windowsAlert('⚙️ Settings\n\n• Control Panel\n• Printers\n• Taskbar & Start Menu\n• Folder Options\n• Active Desktop', 'Settings');
                        break;
                    case 'find':
                        windowsAlert('🔍 Find\n\n• Files or Folders...\n• Computer...\n• On the Internet...\n• People...', 'Find');
                        break;
                    case 'help':
                        windowsAlert('❓ Windows Help\n\nWelcome to Windows 98!\n\n"Works Better, Plays Better"', 'Help');
                        break;
                    case 'run':
                        const cmd = await windowsPrompt('Type the name of a program:', '', 'Run');
                        if (cmd) windowsAlert(`Running: ${cmd}\n\n(This is a simulation)`, 'Run');
                        break;
                    case 'logoff':
                        windowsAlert('👤 Log Off\n\nThis would log off the current user.', 'Log Off');
                        break;
                    case 'shutdown':
                        // Shutdown is handled by windows-common.js
                        break;
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
                'My Computer': '💻 My Computer\n\n3½ Floppy (A:)\nLocal Disk (C:)\nCD-ROM (D:)\nControl Panel',
                'Internet Explorer': '🌐 Internet Explorer 4\n\nBrowserul integrat în Windows 98.\nActive Desktop enabled.',
                'My Documents': '📁 My Documents\n\nFolderul personal pentru documente.',
                'Recycle Bin': '🗑️ Recycle Bin\n\nCoșul de reciclare este gol.'
            };
            if (messages[iconName]) {
                windowsAlert(messages[iconName], iconName);
            }
        });
    });

    // Toolbar buttons
    const toolbarBtns = document.querySelectorAll('.toolbar-btn');
    toolbarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.textContent;
            if (text.includes('Home')) {
                navItems[0].click();
            } else if (text.includes('Search')) {
                windowsAlert('🔍 Find Files\n\nSearch for files and folders.', 'Find');
            }
        });
    });
});

// Windows 98 Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
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

    // Update time
    function updateTime() {
        const timeElement = document.querySelector('.time');
        if (timeElement) {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            timeElement.textContent = `${hours}:${minutes}`;
        }
    }

    updateTime();
    setInterval(updateTime, 1000);

    // Window dragging
    const titleBar = document.querySelector('.title-bar');
    const window98 = document.querySelector('.window');
    let isDragging = false;
    let initialX, initialY;

    if (titleBar && window98) {
        titleBar.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('title-btn')) return;
            isDragging = true;
            window98.style.transition = 'none';
            
            const rect = window98.getBoundingClientRect();
            initialX = e.clientX - rect.left;
            initialY = e.clientY - rect.top;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            window98.style.left = (e.clientX - initialX) + 'px';
            window98.style.top = (e.clientY - initialY) + 'px';
            window98.style.transform = 'none';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    // Close button
    const closeBtn = document.querySelector('.title-btn.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            showWindowsDialog({
                title: 'Windows 98',
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

    // Minimize functionality
    const minimizeBtn = document.querySelector('.title-btn.minimize');
    const programButton = document.querySelector('.program-button');
    
    if (minimizeBtn && window98 && programButton) {
        minimizeBtn.addEventListener('click', () => {
            window98.style.display = 'none';
            programButton.classList.remove('active');
        });

        programButton.addEventListener('click', () => {
            if (window98.style.display === 'none') {
                window98.style.display = 'flex';
                programButton.classList.add('active');
            }
        });
    }

    // Start button with Start Menu
    const startButton = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');
    
    if (startButton && startMenu) {
        startButton.addEventListener('click', (e) => {
            e.stopPropagation();
            startMenu.classList.toggle('hidden');
            startButton.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!startMenu.contains(e.target) && e.target !== startButton) {
                startMenu.classList.add('hidden');
                startButton.classList.remove('active');
            }
        });
        
        const menuItems = startMenu.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', async () => {
                const action = item.getAttribute('data-action');
                startMenu.classList.add('hidden');
                startButton.classList.remove('active');
                
                switch(action) {
                    case 'programs':
                        windowsAlert('📁 Programs\n\n• Accessories\n• Games\n• Internet Explorer\n• Outlook Express\n• MS-DOS Prompt\n• Windows Explorer', 'Programs');
                        break;
                    case 'favorites':
                        windowsAlert('⭐ Favorites\n\n• Channels\n• Links\n• Software Updates', 'Favorites');
                        break;
                    case 'documents':
                        windowsAlert('📄 Documents\n\nRecent documents will appear here.', 'Documents');
                        break;
                    case 'settings':
                        windowsAlert('⚙️ Settings\n\n• Control Panel\n• Printers\n• Taskbar & Start Menu\n• Folder Options\n• Active Desktop', 'Settings');
                        break;
                    case 'find':
                        windowsAlert('🔍 Find\n\n• Files or Folders...\n• Computer...\n• On the Internet...\n• People...', 'Find');
                        break;
                    case 'help':
                        windowsAlert('❓ Windows Help\n\nWelcome to Windows 98!\n\n"Works Better, Plays Better"', 'Help');
                        break;
                    case 'run':
                        const cmd = await windowsPrompt('Type the name of a program:', '', 'Run');
                        if (cmd) windowsAlert(`Running: ${cmd}\n\n(This is a simulation)`, 'Run');
                        break;
                    case 'logoff':
                        windowsAlert('👤 Log Off\n\nThis would log off the current user.', 'Log Off');
                        break;
                    case 'shutdown':
                        // Shutdown is handled by windows-common.js
                        break;
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
                'My Computer': '💻 My Computer\n\n3½ Floppy (A:)\nLocal Disk (C:)\nCD-ROM (D:)\nControl Panel',
                'Internet Explorer': '🌐 Internet Explorer 4\n\nBrowserul integrat în Windows 98.\nActive Desktop enabled.',
                'My Documents': '📁 My Documents\n\nFolderul personal pentru documente.',
                'Recycle Bin': '🗑️ Recycle Bin\n\nCoșul de reciclare este gol.'
            };
            if (messages[iconName]) {
                windowsAlert(messages[iconName], iconName);
            }
        });
    });

    // Toolbar buttons
    const toolbarBtns = document.querySelectorAll('.toolbar-btn');
    toolbarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.textContent;
            if (text.includes('Home')) {
                navItems[0].click();
            } else if (text.includes('Search')) {
                windowsAlert('🔍 Find Files\n\nSearch for files and folders.', 'Find');
            }
        });
    });
});

