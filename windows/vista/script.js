
// Windows Vista Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const sections = document.querySelectorAll('.section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            
            navItems.forEach(i => i.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            item.classList.add('active');
            document.getElementById(sectionId).classList.add('active');
            
            // Update breadcrumb
            const breadcrumb = document.querySelector('.crumb.active');
            if (breadcrumb) {
                const names = {
                    'overview': 'Informații Sistem',
                    'aero': 'Aero Glass',
                    'features': 'Caracteristici',
                    'editions': 'Ediții',
                    'legacy': 'Moștenire'
                };
                breadcrumb.textContent = names[sectionId] || sectionId;
            }
        });
    });

    // Update clocks
    function updateClocks() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeStr = `${hours}:${minutes}`;
        
        const gadgetTime = document.getElementById('gadget-time');
        const taskbarTime = document.getElementById('taskbar-time');
        
        if (gadgetTime) gadgetTime.textContent = timeStr;
        if (taskbarTime) taskbarTime.textContent = timeStr;
    }

    updateClocks();
    setInterval(updateClocks, 1000);

    // Window dragging
    const titleBar = document.querySelector('.title-bar');
    const windowVista = document.querySelector('.window');
    let isDragging = false;
    let initialX, initialY;

    if (titleBar && windowVista) {
        titleBar.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('title-btn')) return;
            isDragging = true;
            windowVista.style.transition = 'none';
            
            const rect = windowVista.getBoundingClientRect();
            initialX = e.clientX - rect.left;
            initialY = e.clientY - rect.top;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            windowVista.style.left = (e.clientX - initialX) + 'px';
            windowVista.style.top = (e.clientY - initialY) + 'px';
            windowVista.style.transform = 'none';
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
                title: 'Windows Vista',
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
    const taskButton = document.querySelector('.task-button');
    const windowFrame = document.querySelector('.window-frame');
    
    if (minimizeBtn && windowVista && taskButton) {
        minimizeBtn.addEventListener('click', () => {
            windowVista.style.display = 'none';
            taskButton.classList.remove('active');
        });

        taskButton.addEventListener('click', () => {
            if (windowVista.style.display === 'none') {
                windowVista.style.display = 'block';
                taskButton.classList.add('active');
            }
        });
    }

    // Start Menu
    const startOrb = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');
    
    if (startOrb && startMenu) {
        startOrb.addEventListener('click', (e) => {
            e.stopPropagation();
            startMenu.classList.toggle('hidden');
            startOrb.classList.toggle('active');
        });
        
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
                    'internet': '🌐 Internet Explorer 7\n\nOpening your homepage...',
                    'email': '📧 Windows Mail\n\nYou have no new messages.',
                    'media': '🎵 Windows Media Center\n\nTV + Movies, Music, Pictures',
                    'photo': '📷 Windows Photo Gallery\n\nOrganize your photos',
                    'notepad': '📝 Notepad\n\n(Untitled)',
                    'paint': '🎨 Paint\n\nCreate your masterpiece!',
                    'calc': '🔢 Calculator\n\n0',
                    'programs': '📁 All Programs\n\n• Accessories\n• Games\n• Maintenance\n• Windows Media Center\n• Windows Photo Gallery\n• Windows Mail',
                    'documents': '📄 Documents\n\nYour personal documents folder',
                    'pictures': '🖼️ Pictures\n\nSample Pictures',
                    'music': '🎵 Music\n\nSample Music',
                    'games': '🎮 Games Explorer\n\nChess, Solitaire, Minesweeper...',
                    'computer': '💻 Computer\n\nLocal Disk (C:) | DVD Drive (D:)',
                    'control': '⚙️ Control Panel\n\n• System\n• Network\n• Programs\n• Appearance',
                    'help': '❓ Help and Support\n\nWelcome to Windows Vista!'
                };
                
                if (actions[action]) {
                    windowsAlert(actions[action], action.charAt(0).toUpperCase() + action.slice(1));
                }
            });
        });
        
        // Power buttons
        const powerBtns = startMenu.querySelectorAll('.power-btn');
        powerBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                startMenu.classList.add('hidden');
                startOrb.classList.remove('active');
                
                if (action === 'lock') {
                    windowsAlert('🔒 Computer Locked\n\nPress Ctrl+Alt+Delete to unlock.', 'Lock Computer');
                } else if (action === 'shutdown') {
                    // Shutdown is handled by windows-common.js
                }
            });
        });
        
        // Search box
        const searchInput = document.getElementById('startSearch');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && searchInput.value.trim()) {
                    windowsAlert(`🔍 Searching for: "${searchInput.value}"\n\nSearching programs and files...`, 'Search');
                    searchInput.value = '';
                }
            });
        }
    }

    // Desktop icons
    const desktopIcons = document.querySelectorAll('.desktop-icon:not([href])');
    desktopIcons.forEach(icon => {
        icon.addEventListener('dblclick', () => {
            const iconName = icon.querySelector('span').textContent;
            const messages = {
                'Computer': '💻 Computer\n\nLocal Disk (C:)\nDVD Drive (D:)\nNetwork\nControl Panel',
                'User': '👤 User Folder\n\nDocuments\nPictures\nMusic\nVideos\nDownloads',
                'Recycle Bin': '🗑️ Recycle Bin\n\nCoșul de reciclare este gol.'
            };
            if (messages[iconName]) {
                windowsAlert(messages[iconName], iconName);
            }
        });
    });

    // Gadget interactions
    const weatherGadget = document.querySelector('.weather-gadget');
    if (weatherGadget) {
        weatherGadget.addEventListener('click', () => {
            const temps = ['18°C', '22°C', '25°C', '20°C'];
            const icons = ['☀️', '⛅', '🌤️', '☁️'];
            const randomIndex = Math.floor(Math.random() * temps.length);
            
            const tempEl = weatherGadget.querySelector('.weather-temp');
            const iconEl = weatherGadget.querySelector('.weather-icon');
            
            if (tempEl) tempEl.textContent = temps[randomIndex];
            if (iconEl) iconEl.textContent = icons[randomIndex];
        });
    }

    // Aero demo animations
    const flip3dDemo = document.querySelector('.flip3d-demo');
    if (flip3dDemo) {
        let flipState = 0;
        flip3dDemo.addEventListener('click', () => {
            const windows = flip3dDemo.querySelectorAll('.flip-window');
            flipState = (flipState + 1) % 3;
            
            windows.forEach((w, i) => {
                w.style.transition = 'transform 0.3s';
                const offset = (i - flipState + 3) % 3 - 1;
                const scale = offset === 0 ? 1.1 : 1;
                const zIndex = offset === 0 ? 1 : 0;
                w.style.transform = `translateX(${offset * 30}px) rotateY(${offset * 20}deg) scale(${scale})`;
                w.style.zIndex = zIndex;
            });
        });
    }
});

// Windows Vista Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const sections = document.querySelectorAll('.section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            
            navItems.forEach(i => i.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            item.classList.add('active');
            document.getElementById(sectionId).classList.add('active');
            
            // Update breadcrumb
            const breadcrumb = document.querySelector('.crumb.active');
            if (breadcrumb) {
                const names = {
                    'overview': 'Informații Sistem',
                    'aero': 'Aero Glass',
                    'features': 'Caracteristici',
                    'editions': 'Ediții',
                    'legacy': 'Moștenire'
                };
                breadcrumb.textContent = names[sectionId] || sectionId;
            }
        });
    });

    // Update clocks
    function updateClocks() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeStr = `${hours}:${minutes}`;
        
        const gadgetTime = document.getElementById('gadget-time');
        const taskbarTime = document.getElementById('taskbar-time');
        
        if (gadgetTime) gadgetTime.textContent = timeStr;
        if (taskbarTime) taskbarTime.textContent = timeStr;
    }

    updateClocks();
    setInterval(updateClocks, 1000);

    // Window dragging
    const titleBar = document.querySelector('.title-bar');
    const windowVista = document.querySelector('.window');
    let isDragging = false;
    let initialX, initialY;

    if (titleBar && windowVista) {
        titleBar.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('title-btn')) return;
            isDragging = true;
            windowVista.style.transition = 'none';
            
            const rect = windowVista.getBoundingClientRect();
            initialX = e.clientX - rect.left;
            initialY = e.clientY - rect.top;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            windowVista.style.left = (e.clientX - initialX) + 'px';
            windowVista.style.top = (e.clientY - initialY) + 'px';
            windowVista.style.transform = 'none';
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
                title: 'Windows Vista',
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
    const taskButton = document.querySelector('.task-button');
    const windowFrame = document.querySelector('.window-frame');
    
    if (minimizeBtn && windowVista && taskButton) {
        minimizeBtn.addEventListener('click', () => {
            windowVista.style.display = 'none';
            taskButton.classList.remove('active');
        });

        taskButton.addEventListener('click', () => {
            if (windowVista.style.display === 'none') {
                windowVista.style.display = 'block';
                taskButton.classList.add('active');
            }
        });
    }

    // Start Menu
    const startOrb = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');
    
    if (startOrb && startMenu) {
        startOrb.addEventListener('click', (e) => {
            e.stopPropagation();
            startMenu.classList.toggle('hidden');
            startOrb.classList.toggle('active');
        });
        
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
                    'internet': '🌐 Internet Explorer 7\n\nOpening your homepage...',
                    'email': '📧 Windows Mail\n\nYou have no new messages.',
                    'media': '🎵 Windows Media Center\n\nTV + Movies, Music, Pictures',
                    'photo': '📷 Windows Photo Gallery\n\nOrganize your photos',
                    'notepad': '📝 Notepad\n\n(Untitled)',
                    'paint': '🎨 Paint\n\nCreate your masterpiece!',
                    'calc': '🔢 Calculator\n\n0',
                    'programs': '📁 All Programs\n\n• Accessories\n• Games\n• Maintenance\n• Windows Media Center\n• Windows Photo Gallery\n• Windows Mail',
                    'documents': '📄 Documents\n\nYour personal documents folder',
                    'pictures': '🖼️ Pictures\n\nSample Pictures',
                    'music': '🎵 Music\n\nSample Music',
                    'games': '🎮 Games Explorer\n\nChess, Solitaire, Minesweeper...',
                    'computer': '💻 Computer\n\nLocal Disk (C:) | DVD Drive (D:)',
                    'control': '⚙️ Control Panel\n\n• System\n• Network\n• Programs\n• Appearance',
                    'help': '❓ Help and Support\n\nWelcome to Windows Vista!'
                };
                
                if (actions[action]) {
                    windowsAlert(actions[action], action.charAt(0).toUpperCase() + action.slice(1));
                }
            });
        });
        
        // Power buttons
        const powerBtns = startMenu.querySelectorAll('.power-btn');
        powerBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                startMenu.classList.add('hidden');
                startOrb.classList.remove('active');
                
                if (action === 'lock') {
                    windowsAlert('🔒 Computer Locked\n\nPress Ctrl+Alt+Delete to unlock.', 'Lock Computer');
                } else if (action === 'shutdown') {
                    // Shutdown is handled by windows-common.js
                }
            });
        });
        
        // Search box
        const searchInput = document.getElementById('startSearch');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && searchInput.value.trim()) {
                    windowsAlert(`🔍 Searching for: "${searchInput.value}"\n\nSearching programs and files...`, 'Search');
                    searchInput.value = '';
                }
            });
        }
    }

    // Desktop icons
    const desktopIcons = document.querySelectorAll('.desktop-icon:not([href])');
    desktopIcons.forEach(icon => {
        icon.addEventListener('dblclick', () => {
            const iconName = icon.querySelector('span').textContent;
            const messages = {
                'Computer': '💻 Computer\n\nLocal Disk (C:)\nDVD Drive (D:)\nNetwork\nControl Panel',
                'User': '👤 User Folder\n\nDocuments\nPictures\nMusic\nVideos\nDownloads',
                'Recycle Bin': '🗑️ Recycle Bin\n\nCoșul de reciclare este gol.'
            };
            if (messages[iconName]) {
                windowsAlert(messages[iconName], iconName);
            }
        });
    });

    // Gadget interactions
    const weatherGadget = document.querySelector('.weather-gadget');
    if (weatherGadget) {
        weatherGadget.addEventListener('click', () => {
            const temps = ['18°C', '22°C', '25°C', '20°C'];
            const icons = ['☀️', '⛅', '🌤️', '☁️'];
            const randomIndex = Math.floor(Math.random() * temps.length);
            
            const tempEl = weatherGadget.querySelector('.weather-temp');
            const iconEl = weatherGadget.querySelector('.weather-icon');
            
            if (tempEl) tempEl.textContent = temps[randomIndex];
            if (iconEl) iconEl.textContent = icons[randomIndex];
        });
    }

    // Aero demo animations
    const flip3dDemo = document.querySelector('.flip3d-demo');
    if (flip3dDemo) {
        let flipState = 0;
        flip3dDemo.addEventListener('click', () => {
            const windows = flip3dDemo.querySelectorAll('.flip-window');
            flipState = (flipState + 1) % 3;
            
            windows.forEach((w, i) => {
                w.style.transition = 'transform 0.3s';
                const offset = (i - flipState + 3) % 3 - 1;
                const scale = offset === 0 ? 1.1 : 1;
                const zIndex = offset === 0 ? 1 : 0;
                w.style.transform = `translateX(${offset * 30}px) rotateY(${offset * 20}deg) scale(${scale})`;
                w.style.zIndex = zIndex;
            });
        });
    }
});

