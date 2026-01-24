// Windows 95 Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Update time in taskbar
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

    // Window dragging functionality
    const titleBar = document.querySelector('.title-bar');
    const window95 = document.querySelector('.window');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;

    if (titleBar && window95) {
        titleBar.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('title-btn')) return;
            isDragging = true;
            window95.style.transition = 'none';
            
            const rect = window95.getBoundingClientRect();
            initialX = e.clientX - rect.left;
            initialY = e.clientY - rect.top;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            
            window95.style.left = currentX + 'px';
            window95.style.top = currentY + 'px';
            window95.style.transform = 'none';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    // Close button functionality
    const closeBtn = document.querySelector('.title-btn.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            showWindowsDialog({
                title: 'Windows 95',
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

    // Minimize button (hide window temporarily)
    const minimizeBtn = document.querySelector('.title-btn.minimize');
    const programButton = document.querySelector('.program-button');
    
    if (minimizeBtn && window95 && programButton) {
        minimizeBtn.addEventListener('click', () => {
            window95.style.display = 'none';
            programButton.classList.remove('active');
        });

        programButton.addEventListener('click', () => {
            if (window95.style.display === 'none') {
                window95.style.display = 'flex';
                programButton.classList.add('active');
            }
        });
    }

    // Start button click effect
    const startButton = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');
    
    if (startButton && startMenu) {
        // Toggle Start Menu
        startButton.addEventListener('click', (e) => {
            e.stopPropagation();
            startMenu.classList.toggle('hidden');
            startButton.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!startMenu.contains(e.target) && e.target !== startButton) {
                startMenu.classList.add('hidden');
                startButton.classList.remove('active');
            }
        });
        
        // Menu item actions
        const menuItems = startMenu.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', async () => {
                const action = item.getAttribute('data-action');
                startMenu.classList.add('hidden');
                startButton.classList.remove('active');
                
                switch(action) {
                    case 'programs':
                        windowsAlert('📁 Programs\n\n• Accessories\n• Games\n• StartUp\n• MS-DOS Prompt\n• Windows Explorer', 'Programs');
                        break;
                    case 'documents':
                        windowsAlert('📄 Documents\n\nNo recent documents.', 'Documents');
                        break;
                    case 'settings':
                        windowsAlert('⚙️ Settings\n\n• Control Panel\n• Printers\n• Taskbar...', 'Settings');
                        break;
                    case 'find':
                        windowsAlert('🔍 Find\n\n• Files or Folders...\n• Computer...\n• On the Internet...', 'Find');
                        break;
                    case 'help':
                        windowsAlert('❓ Windows Help\n\nWelcome to Windows 95!\n\nPress F1 for help at any time.', 'Help');
                        break;
                    case 'run':
                        const cmd = await windowsPrompt('Type the name of a program:', '', 'Run');
                        if (cmd) windowsAlert(`Running: ${cmd}\n\n(This is a simulation)`, 'Run');
                        break;
                    case 'shutdown':
                        // Shutdown is handled by windows-common.js
                        break;
                }
            });
        });
    }

    // Desktop icon double-click
    const desktopIcons = document.querySelectorAll('.desktop-icon:not([href])');
    desktopIcons.forEach(icon => {
        icon.addEventListener('dblclick', () => {
            const iconName = icon.querySelector('span').textContent;
            if (iconName === 'My Computer') {
                windowsAlert('💻 My Computer\n\nDrive A:\nDrive C:\nDrive D:', 'My Computer');
            } else if (iconName === 'Recycle Bin') {
                windowsAlert('🗑️ Recycle Bin\n\nCoșul de reciclare este gol.', 'Recycle Bin');
            }
        });
    });
});
