<<<<<<< HEAD
/**
 * OS-DETECT.JS - Detectare Sistem de Operare și Dispozitiv
 * Proiect Atestat - Evoluția Sistemelor de Operare
 * 
 * Acest script detectează:
 * - Sistemul de operare (Windows, macOS, Linux, Android, iOS)
 * - Tipul dispozitivului (desktop, tablet, mobil)
 * - Dimensiunea ecranului
 * - Capacitățile touch
 */

(function() {
    'use strict';

    // =========================================================================
    // DETECTARE SISTEM DE OPERARE
    // =========================================================================
    
    /**
     * Detectează sistemul de operare din userAgent
     * @returns {Object} Informații despre OS
     */
    function detectOS() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const platform = navigator.platform || '';
        
        // Rezultat implicit
        const result = {
            name: 'Unknown',
            version: '',
            isWindows: false,
            isMac: false,
            isLinux: false,
            isAndroid: false,
            isIOS: false,
            isChromeOS: false
        };
        
        // Detectare Windows
        if (/Windows/i.test(userAgent)) {
            result.name = 'Windows';
            result.isWindows = true;
            
            // Detectare versiune Windows
            if (/Windows NT 10/.test(userAgent)) {
                result.version = '10/11';
            } else if (/Windows NT 6.3/.test(userAgent)) {
                result.version = '8.1';
            } else if (/Windows NT 6.2/.test(userAgent)) {
                result.version = '8';
            } else if (/Windows NT 6.1/.test(userAgent)) {
                result.version = '7';
            } else if (/Windows NT 6.0/.test(userAgent)) {
                result.version = 'Vista';
            } else if (/Windows NT 5.1/.test(userAgent)) {
                result.version = 'XP';
            }
        }
        // Detectare macOS
        else if (/Mac OS X|Macintosh/i.test(userAgent) && !/iPad|iPhone|iPod/.test(userAgent)) {
            result.name = 'macOS';
            result.isMac = true;
        }
        // Detectare iOS
        else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            result.name = 'iOS';
            result.isIOS = true;
        }
        // Detectare Android
        else if (/Android/i.test(userAgent)) {
            result.name = 'Android';
            result.isAndroid = true;
        }
        // Detectare Chrome OS
        else if (/CrOS/i.test(userAgent)) {
            result.name = 'ChromeOS';
            result.isChromeOS = true;
        }
        // Detectare Linux
        else if (/Linux/i.test(platform)) {
            result.name = 'Linux';
            result.isLinux = true;
        }
        
        return result;
    }

    // =========================================================================
    // DETECTARE TIP DISPOZITIV
    // =========================================================================
    
    /**
     * Detectează tipul dispozitivului
     * @returns {Object} Informații despre dispozitiv
     */
    function detectDevice() {
        const userAgent = navigator.userAgent;
        const screenWidth = window.innerWidth || document.documentElement.clientWidth;
        const screenHeight = window.innerHeight || document.documentElement.clientHeight;
        
        const result = {
            type: 'desktop',
            isMobile: false,
            isTablet: false,
            isDesktop: true,
            hasTouch: false,
            screenWidth: screenWidth,
            screenHeight: screenHeight
        };
        
        // Detectare capacitate touch
        result.hasTouch = (
            ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0)
        );
        
        // Detectare mobil prin userAgent
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
        const tabletRegex = /iPad|Android(?!.*Mobile)|Tablet/i;
        
        if (tabletRegex.test(userAgent)) {
            result.type = 'tablet';
            result.isTablet = true;
            result.isDesktop = false;
        } else if (mobileRegex.test(userAgent)) {
            result.type = 'mobile';
            result.isMobile = true;
            result.isDesktop = false;
        }
        
        // Fallback bazat pe dimensiunea ecranului
        if (result.isDesktop) {
            if (screenWidth < 768) {
                result.type = 'mobile';
                result.isMobile = true;
                result.isDesktop = false;
            } else if (screenWidth < 1024) {
                result.type = 'tablet';
                result.isTablet = true;
                result.isDesktop = false;
            }
        }
        
        return result;
    }

    // =========================================================================
    // VERIFICARE PENTRU SECȚIUNEA WINDOWS
    // =========================================================================
    
    /**
     * Verifică dacă utilizatorul poate accesa secțiunea Windows
     * Condiții: Windows OS + ecran >= 1024px
     * @returns {Object} Status și informații
     */
    function canAccessWindowsSection() {
        const os = detectOS();
        const device = detectDevice();
        
        return {
            canAccess: os.isWindows && device.screenWidth >= 1024,
            os: os,
            device: device,
            reason: !os.isWindows 
                ? 'non-windows' 
                : device.screenWidth < 1024 
                    ? 'screen-too-small' 
                    : 'allowed'
        };
    }

    // =========================================================================
    // EXPORT GLOBAL - DISPONIBIL ÎN TOATE SCRIPTURILE
    // =========================================================================
    
    window.OSDetect = {
        // Funcții principale
        getOS: detectOS,
        getDevice: detectDevice,
        canAccessWindows: canAccessWindowsSection,
        
        // Shortcut-uri utile
        isWindows: function() { return detectOS().isWindows; },
        isMobile: function() { return detectDevice().isMobile; },
        isTablet: function() { return detectDevice().isTablet; },
        isDesktop: function() { return detectDevice().isDesktop; },
        hasTouch: function() { return detectDevice().hasTouch; },
        getScreenWidth: function() { return window.innerWidth || document.documentElement.clientWidth; },
        getScreenHeight: function() { return window.innerHeight || document.documentElement.clientHeight; },
        
        // Informații complete (pentru debugging)
        getFullInfo: function() {
            return {
                os: detectOS(),
                device: detectDevice(),
                windowsAccess: canAccessWindowsSection(),
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString()
            };
        }
    };

    // =========================================================================
    // ADĂUGARE CLASE CSS PE BODY
    // =========================================================================
    
    /**
     * Adaugă clase CSS pe body pentru stilizare condițională
     */
    function addBodyClasses() {
        const os = detectOS();
        const device = detectDevice();
        const body = document.body;
        
        // Clase OS
        if (os.isWindows) body.classList.add('os-windows');
        else if (os.isMac) body.classList.add('os-macos');
        else if (os.isLinux) body.classList.add('os-linux');
        else if (os.isAndroid) body.classList.add('os-android');
        else if (os.isIOS) body.classList.add('os-ios');
        else if (os.isChromeOS) body.classList.add('os-chromeos');
        
        // Clase dispozitiv
        body.classList.add('device-' + device.type);
        if (device.hasTouch) body.classList.add('has-touch');
        
        // Clase pentru dimensiunea ecranului
        if (device.screenWidth < 768) {
            body.classList.add('screen-small');
        } else if (device.screenWidth < 1024) {
            body.classList.add('screen-medium');
        } else {
            body.classList.add('screen-large');
        }
        
        // Clasă pentru acces Windows
        const windowsAccess = canAccessWindowsSection();
        if (windowsAccess.canAccess) {
            body.classList.add('windows-enabled');
        } else {
            body.classList.add('windows-disabled');
        }
    }

    // =========================================================================
    // INIȚIALIZARE LA ÎNCĂRCAREA PAGINII
    // =========================================================================
    
    // Adaugă clasele CSS când DOM-ul este gata
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addBodyClasses);
    } else {
        addBodyClasses();
    }

    // Actualizează clasele la redimensionare
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Elimină clasele vechi
            document.body.classList.remove(
                'screen-small', 'screen-medium', 'screen-large',
                'device-mobile', 'device-tablet', 'device-desktop',
                'windows-enabled', 'windows-disabled'
            );
            // Adaugă noile clase
            addBodyClasses();
            
            // Emite eveniment custom pentru alte scripturi
            window.dispatchEvent(new CustomEvent('osdetect:resize', {
                detail: window.OSDetect.getFullInfo()
            }));
        }, 150);
    });

    // Log pentru debugging (doar în development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🖥️ OS Detect Info:', window.OSDetect.getFullInfo());
    }

})();
=======
/**
 * OS-DETECT.JS - Detectare Sistem de Operare și Dispozitiv
 * Proiect Atestat - Evoluția Sistemelor de Operare
 * 
 * Acest script detectează:
 * - Sistemul de operare (Windows, macOS, Linux, Android, iOS)
 * - Tipul dispozitivului (desktop, tablet, mobil)
 * - Dimensiunea ecranului
 * - Capacitățile touch
 */

(function() {
    'use strict';

    // =========================================================================
    // DETECTARE SISTEM DE OPERARE
    // =========================================================================
    
    /**
     * Detectează sistemul de operare din userAgent
     * @returns {Object} Informații despre OS
     */
    function detectOS() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const platform = navigator.platform || '';
        
        // Rezultat implicit
        const result = {
            name: 'Unknown',
            version: '',
            isWindows: false,
            isMac: false,
            isLinux: false,
            isAndroid: false,
            isIOS: false,
            isChromeOS: false
        };
        
        // Detectare Windows
        if (/Windows/i.test(userAgent)) {
            result.name = 'Windows';
            result.isWindows = true;
            
            // Detectare versiune Windows
            if (/Windows NT 10/.test(userAgent)) {
                result.version = '10/11';
            } else if (/Windows NT 6.3/.test(userAgent)) {
                result.version = '8.1';
            } else if (/Windows NT 6.2/.test(userAgent)) {
                result.version = '8';
            } else if (/Windows NT 6.1/.test(userAgent)) {
                result.version = '7';
            } else if (/Windows NT 6.0/.test(userAgent)) {
                result.version = 'Vista';
            } else if (/Windows NT 5.1/.test(userAgent)) {
                result.version = 'XP';
            }
        }
        // Detectare macOS
        else if (/Mac OS X|Macintosh/i.test(userAgent) && !/iPad|iPhone|iPod/.test(userAgent)) {
            result.name = 'macOS';
            result.isMac = true;
        }
        // Detectare iOS
        else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            result.name = 'iOS';
            result.isIOS = true;
        }
        // Detectare Android
        else if (/Android/i.test(userAgent)) {
            result.name = 'Android';
            result.isAndroid = true;
        }
        // Detectare Chrome OS
        else if (/CrOS/i.test(userAgent)) {
            result.name = 'ChromeOS';
            result.isChromeOS = true;
        }
        // Detectare Linux
        else if (/Linux/i.test(platform)) {
            result.name = 'Linux';
            result.isLinux = true;
        }
        
        return result;
    }

    // =========================================================================
    // DETECTARE TIP DISPOZITIV
    // =========================================================================
    
    /**
     * Detectează tipul dispozitivului
     * @returns {Object} Informații despre dispozitiv
     */
    function detectDevice() {
        const userAgent = navigator.userAgent;
        const screenWidth = window.innerWidth || document.documentElement.clientWidth;
        const screenHeight = window.innerHeight || document.documentElement.clientHeight;
        
        const result = {
            type: 'desktop',
            isMobile: false,
            isTablet: false,
            isDesktop: true,
            hasTouch: false,
            screenWidth: screenWidth,
            screenHeight: screenHeight
        };
        
        // Detectare capacitate touch
        result.hasTouch = (
            ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0)
        );
        
        // Detectare mobil prin userAgent
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
        const tabletRegex = /iPad|Android(?!.*Mobile)|Tablet/i;
        
        if (tabletRegex.test(userAgent)) {
            result.type = 'tablet';
            result.isTablet = true;
            result.isDesktop = false;
        } else if (mobileRegex.test(userAgent)) {
            result.type = 'mobile';
            result.isMobile = true;
            result.isDesktop = false;
        }
        
        // Fallback bazat pe dimensiunea ecranului
        if (result.isDesktop) {
            if (screenWidth < 768) {
                result.type = 'mobile';
                result.isMobile = true;
                result.isDesktop = false;
            } else if (screenWidth < 1024) {
                result.type = 'tablet';
                result.isTablet = true;
                result.isDesktop = false;
            }
        }
        
        return result;
    }

    // =========================================================================
    // VERIFICARE PENTRU SECȚIUNEA WINDOWS
    // =========================================================================
    
    /**
     * Verifică dacă utilizatorul poate accesa secțiunea Windows
     * Condiții: Windows OS + ecran >= 1024px
     * @returns {Object} Status și informații
     */
    function canAccessWindowsSection() {
        const os = detectOS();
        const device = detectDevice();
        
        return {
            canAccess: os.isWindows && device.screenWidth >= 1024,
            os: os,
            device: device,
            reason: !os.isWindows 
                ? 'non-windows' 
                : device.screenWidth < 1024 
                    ? 'screen-too-small' 
                    : 'allowed'
        };
    }

    // =========================================================================
    // EXPORT GLOBAL - DISPONIBIL ÎN TOATE SCRIPTURILE
    // =========================================================================
    
    window.OSDetect = {
        // Funcții principale
        getOS: detectOS,
        getDevice: detectDevice,
        canAccessWindows: canAccessWindowsSection,
        
        // Shortcut-uri utile
        isWindows: function() { return detectOS().isWindows; },
        isMobile: function() { return detectDevice().isMobile; },
        isTablet: function() { return detectDevice().isTablet; },
        isDesktop: function() { return detectDevice().isDesktop; },
        hasTouch: function() { return detectDevice().hasTouch; },
        getScreenWidth: function() { return window.innerWidth || document.documentElement.clientWidth; },
        getScreenHeight: function() { return window.innerHeight || document.documentElement.clientHeight; },
        
        // Informații complete (pentru debugging)
        getFullInfo: function() {
            return {
                os: detectOS(),
                device: detectDevice(),
                windowsAccess: canAccessWindowsSection(),
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString()
            };
        }
    };

    // =========================================================================
    // ADĂUGARE CLASE CSS PE BODY
    // =========================================================================
    
    /**
     * Adaugă clase CSS pe body pentru stilizare condițională
     */
    function addBodyClasses() {
        const os = detectOS();
        const device = detectDevice();
        const body = document.body;
        
        // Clase OS
        if (os.isWindows) body.classList.add('os-windows');
        else if (os.isMac) body.classList.add('os-macos');
        else if (os.isLinux) body.classList.add('os-linux');
        else if (os.isAndroid) body.classList.add('os-android');
        else if (os.isIOS) body.classList.add('os-ios');
        else if (os.isChromeOS) body.classList.add('os-chromeos');
        
        // Clase dispozitiv
        body.classList.add('device-' + device.type);
        if (device.hasTouch) body.classList.add('has-touch');
        
        // Clase pentru dimensiunea ecranului
        if (device.screenWidth < 768) {
            body.classList.add('screen-small');
        } else if (device.screenWidth < 1024) {
            body.classList.add('screen-medium');
        } else {
            body.classList.add('screen-large');
        }
        
        // Clasă pentru acces Windows
        const windowsAccess = canAccessWindowsSection();
        if (windowsAccess.canAccess) {
            body.classList.add('windows-enabled');
        } else {
            body.classList.add('windows-disabled');
        }
    }

    // =========================================================================
    // INIȚIALIZARE LA ÎNCĂRCAREA PAGINII
    // =========================================================================
    
    // Adaugă clasele CSS când DOM-ul este gata
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addBodyClasses);
    } else {
        addBodyClasses();
    }

    // Actualizează clasele la redimensionare
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Elimină clasele vechi
            document.body.classList.remove(
                'screen-small', 'screen-medium', 'screen-large',
                'device-mobile', 'device-tablet', 'device-desktop',
                'windows-enabled', 'windows-disabled'
            );
            // Adaugă noile clase
            addBodyClasses();
            
            // Emite eveniment custom pentru alte scripturi
            window.dispatchEvent(new CustomEvent('osdetect:resize', {
                detail: window.OSDetect.getFullInfo()
            }));
        }, 150);
    });

    // Log pentru debugging (doar în development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🖥️ OS Detect Info:', window.OSDetect.getFullInfo());
    }

})();
>>>>>>> abcbb6b6a5fde656692021ce6d66fcfecfde8768
