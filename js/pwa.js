/* =====================================================
   PWA.JS - Service Worker și Install Prompt pentru PWA
   ===================================================== */

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('✓ Service Worker registered:', registration.scope);
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New version available
                            // Use customConfirm (returns a Promise) instead of native confirm
                            if (window.customConfirm) {
                                window.customConfirm('O nouă versiune este disponibilă! Reîncarcă pagina?').then((res) => {
                                    if (res) window.location.reload();
                                });
                            } else {
                                if (confirm('O nouă versiune este disponibilă! Reîncarcă pagina?')) {
                                    window.location.reload();
                                }
                            }
                        }
                    });
                });
            })
            .catch((error) => {
                console.log('✗ Service Worker registration failed:', error);
            });
    });
}

// PWA Install Prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button
    const installBtn = document.createElement('button');
    installBtn.id = 'installBtn';
    installBtn.innerHTML = '📲 Instalează App';
    installBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: linear-gradient(135deg, #2563eb, #7c3aed);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 30px;
        font-weight: 600;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 5px 20px rgba(37, 99, 235, 0.4);
        transition: all 0.3s;
    `;
    installBtn.onmouseenter = () => installBtn.style.transform = 'translateY(-3px)';
    installBtn.onmouseleave = () => installBtn.style.transform = '';
    installBtn.onclick = async () => {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            installBtn.remove();
        }
        deferredPrompt = null;
    };
    document.body.appendChild(installBtn);
});

// Hide install button if already installed
window.addEventListener('appinstalled', () => {
    const btn = document.getElementById('installBtn');
    if (btn) btn.remove();
    console.log('✓ PWA installed successfully!');
});
