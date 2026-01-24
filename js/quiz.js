/* =====================================================
   QUIZ.JS - Sistem complet de quiz interactiv
   ===================================================== */

// Helper function for translations
function getTranslation(key) {
    if (window.i18n && typeof window.i18n.t === 'function') {
        return window.i18n.t(key);
    }
    return key;
}

function getCurrentLang() {
    if (window.i18n && typeof window.i18n.currentLang === 'function') {
        return window.i18n.currentLang();
    }
    return localStorage.getItem('language') || 'ro';
}

// ===== QUIZ DATA - ROMANIAN =====
const quizDataRO = [
    {
        question: "În ce an a fost creat Unix?",
        options: ["1969", "1981", "1995", "2001"],
        correct: 0
    },
    {
        question: "Care din următoarele e nucleul SO?",
        options: ["BIOS", "Kernel", "Driver", "Shell"],
        correct: 1
    },
    {
        question: "Care SO domină serverele web?",
        options: ["Windows", "macOS", "Linux", "ChromeOS"],
        correct: 2
    },
    {
        question: "Cine a creat Linux?",
        options: ["Bill Gates", "Steve Jobs", "Linus Torvalds", "Mark Zuckerberg"],
        correct: 2
    },
    {
        question: "Ce înseamnă GUI?",
        options: ["Graphical Unit Interface", "Graphical User Interface", "Global User Input", "Graphic Universal Item"],
        correct: 1
    },
    {
        question: "Care SO are piața de ~75% din desktop-uri?",
        options: ["macOS", "Linux", "Windows", "ChromeOS"],
        correct: 2
    },
    {
        question: "Care SO e cel mai popular pe smartphone-uri?",
        options: ["iOS", "Android", "Windows Mobile", "Symbian"],
        correct: 1
    },
    {
        question: "Care din acestea e mecanismul de synchronizare?",
        options: ["Driver", "Mutex", "Bootloader", "Interrupt"],
        correct: 1
    },
    {
        question: "Când s-a lansat Windows 95?",
        options: ["1991", "1995", "1998", "2001"],
        correct: 1
    },
    {
        question: "Care SO a introdus GUI pentru masele?",
        options: ["IBM System/360", "Apple Macintosh", "MS-DOS", "Unix"],
        correct: 1
    }
];

// ===== QUIZ DATA - ENGLISH =====
const quizDataEN = [
    {
        question: "In what year was Unix created?",
        options: ["1969", "1981", "1995", "2001"],
        correct: 0
    },
    {
        question: "Which of the following is the OS kernel?",
        options: ["BIOS", "Kernel", "Driver", "Shell"],
        correct: 1
    },
    {
        question: "Which OS dominates web servers?",
        options: ["Windows", "macOS", "Linux", "ChromeOS"],
        correct: 2
    },
    {
        question: "Who created Linux?",
        options: ["Bill Gates", "Steve Jobs", "Linus Torvalds", "Mark Zuckerberg"],
        correct: 2
    },
    {
        question: "What does GUI stand for?",
        options: ["Graphical Unit Interface", "Graphical User Interface", "Global User Input", "Graphic Universal Item"],
        correct: 1
    },
    {
        question: "Which OS has ~75% desktop market share?",
        options: ["macOS", "Linux", "Windows", "ChromeOS"],
        correct: 2
    },
    {
        question: "Which OS is the most popular on smartphones?",
        options: ["iOS", "Android", "Windows Mobile", "Symbian"],
        correct: 1
    },
    {
        question: "Which of these is a synchronization mechanism?",
        options: ["Driver", "Mutex", "Bootloader", "Interrupt"],
        correct: 1
    },
    {
        question: "When was Windows 95 released?",
        options: ["1991", "1995", "1998", "2001"],
        correct: 1
    },
    {
        question: "Which OS introduced GUI to the masses?",
        options: ["IBM System/360", "Apple Macintosh", "MS-DOS", "Unix"],
        correct: 1
    }
];

// Get current quiz data based on language
function getQuizData() {
    // If a quiz was selected for this session, use the runtime quizData array.
    if (Array.isArray(quizData) && quizData.length) return quizData;
    // Fallback to the default language-specific dataset (first set)
    return getCurrentLang() === 'en' ? quizDataEN : quizDataRO;
}

// ===== MULTI-QUIZ DATA =====
// We provide multiple quiz sets (each quiz has exactly 10 questions). Each set
// contains language variations so we can pick based on current language.
const quizSets = [
    {
        id: 'os_basics',
        name: { en: 'OS Basics', ro: 'Bazele SO' },
        questions: {
            ro: quizDataRO,
            en: quizDataEN
        }
    },
    {
        id: 'history_windows',
        name: { en: 'Windows History', ro: 'Istoria Windows' },
        questions: {
            ro: [
                { question: 'Când a fost lansat MS-DOS?', options: ['1981','1980','1979','1985'], correct: 0 },
                { question: 'Cine a fondat Microsoft?', options: ['Steve Jobs','Bill Gates','Linus Torvalds','Mark Zuckerberg'], correct: 1 },
                { question: 'Ce interfaţă a făcut Windows popular?', options: ['CLI','GUI','Batch','BIOS'], correct: 1 },
                { question: 'Care a fost sistemul înainte de Windows?', options: ['macOS','MS-DOS','Linux','OS/2'], correct: 1 },
                { question: 'Windows 95 a introdus:', options: ['Start Menu','Dock','App Store','Terminal'], correct: 0 },
                { question: 'Cine a creat Windows NT?', options: ['Microsoft','Apple','IBM','Sun'], correct: 0 },
                { question: 'Lansarea Windows XP a fost în?', options: ['2001','1999','2003','1997'], correct: 0 },
                { question: 'Windows 7 a venit după?', options: ['Vista','XP','8','95'], correct: 0 },
                { question: 'Care este managerul de fișiere din Windows?', options: ['Finder','Explorer','Nautilus','Dolphin'], correct: 1 },
                { question: 'Caracteristica UAC protejează împotriva:', options: ['Rularea neautorizata','Design','Sunet','Grafică'], correct: 0 }
            ],
            en: [
                { question: 'When was MS-DOS released?', options: ['1981','1980','1979','1985'], correct: 0 },
                { question: 'Who founded Microsoft?', options: ['Steve Jobs','Bill Gates','Linus Torvalds','Mark Zuckerberg'], correct: 1 },
                { question: 'Which UI made Windows popular?', options: ['CLI','GUI','Batch','BIOS'], correct: 1 },
                { question: 'What preceded Windows?', options: ['macOS','MS-DOS','Linux','OS/2'], correct: 1 },
                { question: 'Windows 95 introduced:', options: ['Start Menu','Dock','App Store','Terminal'], correct: 0 },
                { question: 'Who created Windows NT?', options: ['Microsoft','Apple','IBM','Sun'], correct: 0 },
                { question: 'Windows XP was released in?', options: ['2001','1999','2003','1997'], correct: 0 },
                { question: 'Windows 7 followed which release?', options: ['Vista','XP','8','95'], correct: 0 },
                { question: 'Windows file manager is called?', options: ['Finder','Explorer','Nautilus','Dolphin'], correct: 1 },
                { question: 'UAC protects against:', options: ['Unauthorized actions','Design','Sound','Graphics'], correct: 0 }
            ]
        }
    },
    {
        id: 'linux_and_servers',
        name: { en: 'Linux & Servers', ro: 'Linux & Servere' },
        questions: {
            ro: [
                { question: 'Cine a creat Linux?', options: ['Bill Gates','Steve Jobs','Linus Torvalds','Richard Stallman'], correct: 2 },
                { question: 'Ce este un kernel?', options: ['UI','Nucleu','Aplicație','Driver'], correct: 1 },
                { question: 'Un server web popular este:', options: ['IIS','Apache','Finder','Explorer'], correct: 1 },
                { question: 'SSH folosește portul implicit:', options: ['22','80','443','21'], correct: 0 },
                { question: 'Sistemul de fișiere tipic Linux este:', options: ['NTFS','ext4','HFS+','FAT32'], correct: 1 },
                { question: 'Distribuție Linux populară:', options: ['Windows','Ubuntu','macOS','DOS'], correct: 1 },
                { question: 'Comanda pentru listare fișiere:', options: ['ls','dir','show','list'], correct: 0 },
                { question: 'Daemon în Linux este:', options: ['Proces background','Aplicație GUI','Driver','BIOS'], correct: 0 },
                { question: 'Sudo oferă:', options: ['Privilegii elevate','Design','Sunet','Email'], correct: 0 },
                { question: 'Init system modern:', options: ['systemd','init','launchd','upstart'], correct: 0 }
            ],
            en: [
                { question: 'Who created Linux?', options: ['Bill Gates','Steve Jobs','Linus Torvalds','Richard Stallman'], correct: 2 },
                { question: 'What is a kernel?', options: ['UI','Core','Application','Driver'], correct: 1 },
                { question: 'A popular web server is:', options: ['IIS','Apache','Finder','Explorer'], correct: 1 },
                { question: 'SSH default port is:', options: ['22','80','443','21'], correct: 0 },
                { question: 'Typical Linux filesystem is:', options: ['NTFS','ext4','HFS+','FAT32'], correct: 1 },
                { question: 'A popular Linux distro:', options: ['Windows','Ubuntu','macOS','DOS'], correct: 1 },
                { question: 'Command to list files:', options: ['ls','dir','show','list'], correct: 0 },
                { question: 'A daemon is a:', options: ['Background process','GUI app','Driver','BIOS'], correct: 0 },
                { question: 'Sudo provides:', options: ['Elevated privileges','Design','Sound','Email'], correct: 0 },
                { question: 'A modern init system:', options: ['systemd','init','launchd','upstart'], correct: 0 }
            ]
        }
    },
    {
        id: 'mobile_os',
        name: { en: 'Mobile OS', ro: 'SO Mobile' },
        questions: {
            ro: [
                { question: 'Care SO domină smartphone-urile?', options: ['iOS','Android','Symbian','Windows Mobile'], correct: 1 },
                { question: 'App store popular iOS:', options: ['App Store','Play Store','Store','Market'], correct: 0 },
                { question: 'Android este bazat pe:', options: ['Linux','Windows','macOS','Unix'], correct: 0 },
                { question: 'Comenzi prin gesturi apar în:', options: ['Mobile','Server','Desktop','BIOS'], correct: 0 },
                { question: 'APK este formatul pentru:', options: ['Android apps','iOS apps','macOS apps','Windows apps'], correct: 0 },
                { question: 'Firma care produce iPhone:', options: ['Samsung','Apple','Nokia','Microsoft'], correct: 1 },
                { question: 'Android are kernel:', options: ['NT','Linux','XNU','BSD'], correct: 1 },
                { question: 'Widgets sunt caracteristici ale:', options: ['Home screen','BIOS','Terminal','Explorer'], correct: 0 },
                { question: 'Push notifications sunt trimise de:', options: ['Server','BIOS','Client','Driver'], correct: 0 },
                { question: 'Aplicatii native sunt scrise în:', options: ['Kotlin/Swift','HTML','CSS','Shell'], correct: 0 }
            ],
            en: [
                { question: 'Which OS dominates smartphones?', options: ['iOS','Android','Symbian','Windows Mobile'], correct: 1 },
                { question: 'The iOS app store is called:', options: ['App Store','Play Store','Store','Market'], correct: 0 },
                { question: 'Android is based on:', options: ['Linux','Windows','macOS','Unix'], correct: 0 },
                { question: 'Gesture navigation is common on:', options: ['Mobile','Server','Desktop','BIOS'], correct: 0 },
                { question: 'APK is used for:', options: ['Android apps','iOS apps','macOS apps','Windows apps'], correct: 0 },
                { question: 'Company behind iPhone:', options: ['Samsung','Apple','Nokia','Microsoft'], correct: 1 },
                { question: 'Android kernel is:', options: ['NT','Linux','XNU','BSD'], correct: 1 },
                { question: 'Widgets typically live on the:', options: ['Home screen','BIOS','Terminal','Explorer'], correct: 0 },
                { question: 'Push notifications are sent by:', options: ['Server','BIOS','Client','Driver'], correct: 0 },
                { question: 'Native apps commonly use:', options: ['Kotlin/Swift','HTML','CSS','Shell'], correct: 0 }
            ]
        }
    },
    {
        id: 'computer_science',
        name: { en: 'Computer Science', ro: 'Informatică' },
        questions: {
            ro: [
                { question: 'Ce este un mutex?', options: ['Lock','UI','Driver','File'], correct: 0 },
                { question: 'Interrupt este folosit pentru:', options: ['Atenționări hardware','Design','Sunet','Grafică'], correct: 0 },
                { question: 'Algoritm Big-O pentru binsearch?', options: ['O(log n)','O(n)','O(n^2)','O(1)'], correct: 0 },
                { question: 'Structură FIFO este:', options: ['Queue','Stack','Tree','Graph'], correct: 0 },
                { question: 'HTML este limbaj de:', options: ['Markup','Programming','Binary','Database'], correct: 0 },
                { question: 'CSS se ocupă de:', options: ['Styling','Logic','Database','Compilation'], correct: 0 },
                { question: 'JavaScript rulează în:', options: ['Browser','BIOS','Kernel','DB'], correct: 0 },
                { question: 'Compilarea produce:', options: ['Binary','Markup','CSS','HTML'], correct: 0 },
                { question: 'Cloud oferă:', options: ['On-demand resources','Printer','Keyboard','Monitor'], correct: 0 },
                { question: 'Cache îmbunătățește:', options: ['Performanța','Design','Sunet','Grafică'], correct: 0 }
            ],
            en: [
                { question: 'What is a mutex?', options: ['Lock','UI','Driver','File'], correct: 0 },
                { question: 'An interrupt is used for:', options: ['Hardware signals','Design','Sound','Graphics'], correct: 0 },
                { question: 'Big-O for binary search?', options: ['O(log n)','O(n)','O(n^2)','O(1)'], correct: 0 },
                { question: 'FIFO structure is:', options: ['Queue','Stack','Tree','Graph'], correct: 0 },
                { question: 'HTML is a:', options: ['Markup','Programming','Binary','Database'], correct: 0 },
                { question: 'CSS handles:', options: ['Styling','Logic','Database','Compilation'], correct: 0 },
                { question: 'JavaScript runs in the:', options: ['Browser','BIOS','Kernel','DB'], correct: 0 },
                { question: 'Compilation produces:', options: ['Binary','Markup','CSS','HTML'], correct: 0 },
                { question: 'Cloud provides:', options: ['On-demand resources','Printer','Keyboard','Monitor'], correct: 0 },
                { question: 'Cache improves:', options: ['Performance','Design','Sound','Graphics'], correct: 0 }
            ]
        }
    }
];

// runtime holds the currently selected quiz's question array (filled at start)
let quizData = [];

// ===== QUIZ STATE =====
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard')) || [];
let bonusPoints = 0;
let timeLeft = 15;
let timerInterval = null;
let totalQuizzes = parseInt(localStorage.getItem('totalQuizzes')) || 0;
let consecutiveQuizzes = parseInt(localStorage.getItem('consecutiveQuizzes')) || 0;
// track whether the quiz has been started by the user
let quizStarted = false;

// ===== ACHIEVEMENTS SYSTEM =====
function getAchievements() {
    const isEN = getCurrentLang() === 'en';
    return [
        { id: 'first_quiz', icon: '🎯', name: isEN ? 'First Step' : 'Primul Pas', desc: isEN ? 'Complete your first quiz' : 'Completează primul quiz', check: () => totalQuizzes >= 1 },
        { id: 'perfect', icon: '💯', name: isEN ? 'Perfectionist' : 'Perfecționist', desc: isEN ? 'Get a 100% score' : 'Obține scor de 100%', check: () => false },
        { id: 'fast', icon: '⚡', name: isEN ? 'Lightning' : 'Fulger', desc: isEN ? 'Answer in under 5 seconds' : 'Răspunde în sub 5 secunde', check: () => false },
        { id: 'five_streak', icon: '🔥', name: isEN ? 'On Fire' : 'În Serie', desc: isEN ? 'Complete 5 quizzes in a row' : 'Completează 5 quiz-uri la rând', check: () => consecutiveQuizzes >= 5 },
        { id: 'ten_quizzes', icon: '🎮', name: isEN ? 'Veteran' : 'Veteran', desc: isEN ? 'Complete 10 quizzes' : 'Completează 10 quiz-uri', check: () => totalQuizzes >= 10 },
        { id: 'speed_demon', icon: '🚀', name: 'Speed Demon', desc: isEN ? 'Total bonus > 50 points' : 'Bonus total > 50 puncte', check: () => false },
        { id: 'no_mistakes', icon: '✨', name: isEN ? 'Flawless' : 'Fără Greșeli', desc: isEN ? '5 correct answers in a row' : '5 răspunsuri corecte la rând', check: () => false },
        { id: 'night_owl', icon: '🦉', name: isEN ? 'Night Owl' : 'Bufniță de Noapte', desc: isEN ? 'Play after 10 PM' : 'Joacă după ora 22:00', check: () => new Date().getHours() >= 22 },
    ];
}

let allAchievements = getAchievements();

// Load and normalize unlocked achievements from localStorage.
// Older versions may have stored objects or mixed values — coerce to an array of id strings
let _rawUnlocked = JSON.parse(localStorage.getItem('achievements')) || [];
let unlockedAchievements = [];
if (Array.isArray(_rawUnlocked)) {
    unlockedAchievements = _rawUnlocked.map(x => {
        if (typeof x === 'string') return x;
        if (x && typeof x === 'object' && x.id) return String(x.id);
        // fallback to stringifying primitive values
        return String(x);
    }).filter(Boolean);
    // dedupe just in case
    unlockedAchievements = Array.from(new Set(unlockedAchievements));
    // Filter out any ids that do not exist in the current achievements list
    try {
        const validIds = new Set(getAchievements().map(a => a.id));
        unlockedAchievements = unlockedAchievements.filter(id => validIds.has(id));
    } catch (e) {
        // if getAchievements fails for any reason, keep the normalized list as-is
    }
    // persist normalized and validated shape back to storage
    try { localStorage.setItem('achievements', JSON.stringify(unlockedAchievements)); } catch (e) { /* ignore storage errors */ }
}
let correctStreak = 0;
let fastAnswer = false;

function toggleAchievements() {
    const panel = document.getElementById('achievementsPanel');
    if (!panel) return;
    const isShown = panel.classList.toggle('show');
    panel.setAttribute('aria-hidden', String(!isShown));
    renderAchievements();
    // focus management: focus close button when opened
    if (isShown) {
        const closeBtn = panel.querySelector('.achievements-close');
        if (closeBtn) closeBtn.focus();
    }
}

function renderAchievements() {
    const list = document.getElementById('achievementsList');
    if (!list) return;
    allAchievements = getAchievements();
    list.innerHTML = allAchievements.map(a => `
        <div class="achievement-item ${unlockedAchievements.includes(a.id) ? 'unlocked' : 'locked'}">
            <div class="achievement-icon">${a.icon}</div>
            <div class="achievement-info">
                <h4>${a.name}</h4>
                <p>${a.desc}</p>
            </div>
        </div>
    `).join('');
}

/* ===== LEADERBOARD PANEL (UI) ===== */
function toggleLeaderboard() {
    const panel = document.getElementById('leaderboardPanel');
    if (!panel) return;
    const isShown = panel.classList.toggle('show');
    panel.setAttribute('aria-hidden', String(!isShown));
    renderLeaderboard();
    if (isShown) {
        const closeBtn = panel.querySelector('.achievements-close');
        if (closeBtn) closeBtn.focus();
    }
}

function renderLeaderboard() {
    const list = document.getElementById('leaderboardList');
    if (!list) return;
    const isEN = getCurrentLang() === 'en';
    if (!leaderboard || !leaderboard.length) {
        list.innerHTML = `<div class="leaderboard-empty">${isEN ? 'No entries yet.' : 'Nicio înregistrare încă.'}</div>`;
        return;
    }
    list.innerHTML = leaderboard.map((entry, idx) => `
        <div class="leaderboard-entry">
            <span>${idx + 1}. ${entry.name}</span>
            <span>${entry.totalScore || entry.score * 10} pts (${entry.percentage}%)</span>
        </div>
    `).join('');
}

/**
 * Add the current quiz result to the leaderboard using the customPrompt UI.
 * This mirrors the saveScore flow but allows adding the current in-memory result
 * from the leaderboard panel.
 */
function addCurrentToLeaderboard() {
    const isEN = getCurrentLang() === 'en';
    // compute percentage and totalScore from current quiz state
    const questions = getQuizData().length;
    const percentage = Math.round((score / questions) * 100);
    const totalScore = (score * 10) + (typeof bonusPoints === 'number' ? bonusPoints : 0);

    const promptMsg = isEN ? 'Enter your name for the leaderboard:' : 'Introduceți-vă nume pentru leaderboard:';

    if (window.customPrompt) {
        window.customPrompt(promptMsg, '')
            .then((name) => {
                if (!name) return;
                leaderboard.push({ name, score, percentage, totalScore, date: new Date().toLocaleDateString() });
                leaderboard.sort((a, b) => (b.totalScore || b.percentage) - (a.totalScore || a.percentage));
                leaderboard = leaderboard.slice(0, 10);
                localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));
                renderLeaderboard();
            })
            .catch(() => {});
    } else {
        const name = prompt(promptMsg, '');
        if (!name) return;
        leaderboard.push({ name, score, percentage, totalScore, date: new Date().toLocaleDateString() });
        leaderboard.sort((a, b) => (b.totalScore || b.percentage) - (a.totalScore || a.percentage));
        leaderboard = leaderboard.slice(0, 10);
        localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));
        renderLeaderboard();
    }
}

function unlockAchievement(id) {
    if (unlockedAchievements.includes(id)) return;
    const achievement = allAchievements.find(a => a.id === id);
    if (!achievement) return;
    
    unlockedAchievements.push(id);
    localStorage.setItem('achievements', JSON.stringify(unlockedAchievements));
    
    // Show popup
    document.getElementById('popupIcon').textContent = achievement.icon;
    document.getElementById('popupText').textContent = achievement.name;
    const popup = document.getElementById('achievementPopup');
    popup.classList.add('show');
    playSound('victory');
    
    setTimeout(() => popup.classList.remove('show'), 3000);
    // update chip and panel render
    try { 
        // Ensure both the achievements panel and the chip reflect the new state immediately
        renderAchievements(); 
    } catch(e) { /* ignore */ }
    try { renderAchievementChip(); } catch(e) { /* ignore */ }
}

function checkAchievements() {
    if (totalQuizzes >= 1) unlockAchievement('first_quiz');
    if (totalQuizzes >= 10) unlockAchievement('ten_quizzes');
    if (consecutiveQuizzes >= 5) unlockAchievement('five_streak');
    if (new Date().getHours() >= 22) unlockAchievement('night_owl');
    if (fastAnswer) unlockAchievement('fast');
    if (bonusPoints > 50) unlockAchievement('speed_demon');
    if (correctStreak >= 5) unlockAchievement('no_mistakes');
}

// ===== CONFETTI SYSTEM =====
function createConfetti() {
    const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#ef4444'];
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

// ===== TIMER SYSTEM =====
function startTimer() {
    timeLeft = 15;
    updateTimerDisplay();
    clearInterval(timerInterval);
    // prevent duplicate quiz timers
    window.__sistemOS_intervals = window.__sistemOS_intervals || {};
    if (window.__sistemOS_intervals.quiz_timer) clearInterval(window.__sistemOS_intervals.quiz_timer);
    window.__sistemOS_intervals.quiz_timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 5) {
            document.getElementById('timerDisplay').classList.add('warning');
        }
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            playSound('wrong');
            correctStreak = 0;
            currentQuestion++;
            if (currentQuestion < getQuizData().length) {
                loadQuestion();
            } else {
                showResults();
            }
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timerDisplay');
    const bonusDisplay = document.getElementById('bonusDisplay');
    if (timerDisplay) {
        timerDisplay.textContent = timeLeft;
        timerDisplay.classList.remove('warning');
    }
    if (bonusDisplay) {
        const bonus = Math.max(0, timeLeft - 5);
        bonusDisplay.textContent = `+${bonus} bonus`;
    }
}

// ===== AUDIO SYSTEM =====
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
}

function playSound(type) {
    const ctx = initAudio();
    if (ctx.state === 'suspended') {
        ctx.resume();
    }
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    switch(type) {
        case 'click':
            oscillator.frequency.value = 600;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.1);
            break;
        case 'select':
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.15);
            break;
        case 'correct':
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523, ctx.currentTime);
            oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.4);
            break;
        case 'wrong':
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(200, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
            gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.3);
            break;
        case 'victory':
            const notes = [523, 587, 659, 698, 784, 880, 988, 1047];
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.15);
                osc.start(ctx.currentTime + i * 0.1);
                osc.stop(ctx.currentTime + i * 0.1 + 0.15);
            });
            return;
        case 'hover':
            oscillator.frequency.value = 400;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.05);
            break;
        case 'next':
            oscillator.frequency.value = 500;
            oscillator.type = 'triangle';
            gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.15);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.2);
            break;
    }
}

// ===== QUIZ FUNCTIONS =====
function initQuiz() {
    const currentQuizData = getQuizData();
    const totalQuestionsEl = document.getElementById('totalQuestions');
    if (totalQuestionsEl) {
        totalQuestionsEl.textContent = currentQuizData.length;
    }
    renderAchievements();
    // render the contextual achievement chip (under the page title)
    renderAchievementChip();
    loadQuestion();
}

function loadQuestion() {
    const currentQuizData = getQuizData();
    const quiz = currentQuizData[currentQuestion];
    const quizBody = document.getElementById('quizBody');
    const isEN = getCurrentLang() === 'en';
    
    if (!quizBody) return;
    
    startTimer();
    
    const questionLabel = isEN ? 'Question' : 'Întrebarea';
    
    let html = `
        <div class="quiz-question">
            <div class="question-number">${questionLabel} ${currentQuestion + 1}</div>
            ${quiz.image ? `<img src="${quiz.image}" class="question-image" alt="${isEN ? 'Question image' : 'Imagine întrebare'}">` : ''}
            <div class="question-text">${quiz.question}</div>
            <div class="quiz-options">
    `;
    
    quiz.options.forEach((option, index) => {
        // add touch-friendly triggers and make the whole label tappable; include a .option-text span so we
        // can style the selected state via CSS (input:checked + .option-text)
        html += `
            <label class="option" onclick="selectOption(${index})" onmouseenter="playSound('hover')" onpointerenter="playSound('hover')" ontouchstart="playSound('hover')">
                <input type="radio" name="answer" value="${index}" onchange="selectOption(${index})" aria-label="Option ${index + 1}">
                <span class="option-text">${option}</span>
            </label>
        `;
    });
    
    html += `</div></div>`;
    quizBody.innerHTML = html;
    
    updateProgress();
    selectedAnswer = null;
}

function selectOption(index) {
    selectedAnswer = index;
    playSound('select');
}

function nextQuestion() {
    const isEN = getCurrentLang() === 'en';
    const currentQuizData = getQuizData();
    
    if (selectedAnswer === null) {
        playSound('wrong');
        alert(isEN ? 'Please select an answer!' : 'Te rog selectează un răspuns!');
        return;
    }
    
    clearInterval(timerInterval);
    
    if (selectedAnswer === currentQuizData[currentQuestion].correct) {
        score++;
        const timeBonus = Math.max(0, timeLeft - 5);
        bonusPoints += timeBonus;
        if (timeLeft > 10) fastAnswer = true;
        correctStreak++;
        playSound('correct');
    } else {
        correctStreak = 0;
        playSound('wrong');
    }
    
    currentQuestion++;
    
    if (currentQuestion < getQuizData().length) {
        setTimeout(() => {
            playSound('next');
            loadQuestion();
        }, 300);
    } else {
        setTimeout(() => {
            playSound('victory');
            showResults();
        }, 300);
    }
}

function updateProgress() {
    const progress = ((currentQuestion) / getQuizData().length) * 100;
    const progressFill = document.getElementById('progressFill');
    const currentQuestionEl = document.getElementById('currentQuestion');
    
    if (progressFill) {
        progressFill.style.width = progress + '%';
    }
    if (currentQuestionEl) {
        currentQuestionEl.textContent = currentQuestion + 1;
    }
}

function showResults() {
    clearInterval(timerInterval);
    const isEN = getCurrentLang() === 'en';
    const currentQuizData = getQuizData();
    
    const quizContainer = document.getElementById('quizContainer');
    const resultsContainer = document.getElementById('resultsContainer');
    
    if (quizContainer) quizContainer.style.display = 'none';
    if (resultsContainer) resultsContainer.classList.add('show');
    
    // Update stats
    totalQuizzes++;
    consecutiveQuizzes++;
    localStorage.setItem('totalQuizzes', totalQuizzes);
    localStorage.setItem('consecutiveQuizzes', consecutiveQuizzes);
    
    const percentage = Math.round((score / currentQuizData.length) * 100);
    const totalScore = score * 10 + bonusPoints;
    
    // Check for perfect score achievement
    if (percentage === 100) unlockAchievement('perfect');
    
    checkAchievements();
    
    // Confetti for good scores
    if (percentage >= 70) {
        createConfetti();
    }
    
    const finalScore = document.getElementById('finalScore');
    if (finalScore) {
        const bonusText = isEN ? 'Time bonus' : 'Bonus timp';
        const totalText = isEN ? 'Total' : 'Total';
        const pointsText = isEN ? 'points' : 'puncte';
        finalScore.innerHTML = `
            ${score} / ${currentQuizData.length} (${percentage}%)<br>
            <span style="font-size: 1rem; color: #10b981;">⚡ ${bonusText}: +${bonusPoints} ${pointsText}</span><br>
            <span style="font-size: 1.2rem; color: #f59e0b;">🏆 ${totalText}: ${totalScore} ${pointsText}</span>
        `;
    }
    
    let message = '';
    if (percentage === 100) {
        message = isEN ? '🏆 Perfect! You are an OS expert!' : '🏆 Perfect! Ești expert în sistemele de operare!';
    } else if (percentage >= 80) {
        message = isEN ? '🎉 Excellent! You know OS very well!' : '🎉 Excelent! Cunoști foarte bine SO-urile!';
    } else if (percentage >= 60) {
        message = isEN ? '👍 Good! You know the main concepts.' : '👍 Bun! Cunoști conceptele principale.';
    } else if (percentage >= 40) {
        message = isEN ? '📚 You need to study more!' : '📚 Trebuie să studiezi mai mult!';
    } else {
        message = isEN ? '💪 Come back and try again after studying!' : '💪 Revino și reîncearcă după ce studiezi!';
    }
    
    const scoreMessage = document.getElementById('scoreMessage');
    if (scoreMessage) {
        scoreMessage.textContent = message;
    }
    
    // Adauga la leaderboard
    saveScore(percentage, totalScore);
    displayLeaderboard();
    // Quiz completed — clear the selected quiz so next Start picks a new one
    try { sessionStorage.removeItem('selectedQuizId'); } catch(e) {}
    window.selectedQuizId = null;
    quizData = [];
}

function saveScore(percentage, totalScore) {
    const isEN = getCurrentLang() === 'en';
    // Use customPrompt which returns a Promise
    if (window.customPrompt) {
        window.customPrompt(isEN ? 'Enter your name for the leaderboard:' : 'Introduceți-vă nume pentru leaderboard:', '')
            .then((name) => {
                if (name) {
                    leaderboard.push({ name, score, percentage, totalScore: totalScore || score * 10, date: new Date().toLocaleDateString() });
                    leaderboard.sort((a, b) => (b.totalScore || b.percentage) - (a.totalScore || a.percentage));
                    leaderboard = leaderboard.slice(0, 10); // Top 10
                    localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));
                    // Update visible leaderboard after entry saved
                    try { displayLeaderboard(); } catch (e) { /* ignore */ }
                }
            });
    } else {
        const name = prompt(isEN ? 'Enter your name for the leaderboard:' : 'Introduceți-vă nume pentru leaderboard:');
        if (name) {
            leaderboard.push({ name, score, percentage, totalScore: totalScore || score * 10, date: new Date().toLocaleDateString() });
            leaderboard.sort((a, b) => (b.totalScore || b.percentage) - (a.totalScore || a.percentage));
            leaderboard = leaderboard.slice(0, 10); // Top 10
            localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));
            // Update visible leaderboard after entry saved
            try { displayLeaderboard(); } catch (e) { /* ignore */ }
        }
    }
}

function displayLeaderboard() {
    const isEN = getCurrentLang() === 'en';
    let leaderboardHTML = `<h3>🏅 ${isEN ? 'Top 10 Players:' : 'Top 10 Jucători:'}</h3><div class="leaderboard">`;
    leaderboard.forEach((entry, index) => {
        leaderboardHTML += `
            <div class="leaderboard-entry">
                <span>${index + 1}. ${entry.name}</span>
                <span>${entry.totalScore || entry.score * 10} pts (${entry.percentage}%)</span>
            </div>
        `;
    });
    leaderboardHTML += '</div>';
    
    const resultDiv = document.getElementById('resultsContainer');
    if (resultDiv) {
        // Use a dedicated embed container to avoid mutating unrelated HTML repeatedly
        let embed = resultDiv.querySelector('.leaderboard-embed');
        if (!embed) {
            embed = document.createElement('div');
            embed.className = 'leaderboard-embed';
            // insert before any existing interactive controls at the end
            resultDiv.appendChild(embed);
        }
        embed.innerHTML = leaderboardHTML;

        // Defensive: remove any existing share buttons (handles edge cases where
        // the results container was replaced or multiple renders occurred).
        const existingShares = resultDiv.querySelectorAll('.quiz-button.share-result');
        existingShares.forEach(el => el.remove());

        // Create a single share button and append it to the results container.
        const shareBtn = document.createElement('button');
        shareBtn.className = 'quiz-button share-result';
        shareBtn.type = 'button';
        shareBtn.setAttribute('aria-label', isEN ? 'Share result' : 'Distribuie rezultatul');
        shareBtn.textContent = isEN ? '📤 Share result' : '📤 Distribuie rezultatul';
        shareBtn.onclick = shareResult;
        resultDiv.appendChild(shareBtn);
    }
}

function shareResult() {
    const isEN = getCurrentLang() === 'en';
    const currentQuizData = getQuizData();
    const percentage = Math.round((score / currentQuizData.length) * 100);
    const totalScore = score * 10 + bonusPoints;
    const text = isEN 
        ? `I got ${totalScore} points (${percentage}%) on the Evolution of Operating Systems quiz! 🎯⚡`
        : `Am obținut ${totalScore} puncte (${percentage}%) la quiz-ul Evoluția Sistemelor de Operare! 🎯⚡`;
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({ title: 'Quiz SO', text, url });
    } else {
        const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)} ${url}`;
        window.open(shareUrl, '_blank');
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    bonusPoints = 0;
    correctStreak = 0;
    fastAnswer = false;
    selectedAnswer = null;
    
    const quizContainer = document.getElementById('quizContainer');
    const resultsContainer = document.getElementById('resultsContainer');
    
    if (quizContainer) quizContainer.style.display = 'block';
    if (resultsContainer) {
        resultsContainer.classList.remove('show');
        const isEN = getCurrentLang() === 'en';
        resultsContainer.innerHTML = `
            <h2>${isEN ? 'Your Results' : 'Rezultatele Tale'}</h2>
            <div class="score" id="finalScore"></div>
            <p class="score-message" id="scoreMessage"></p>
            <button class="restart-btn" onclick="restartQuiz()">${isEN ? 'Restart Quiz' : 'Reia Quiz-ul'}</button>
        `;
    }
    loadQuestion();
}

// Start the quiz when user clicks Start on the overlay
function startQuizFromOverlay() {
    const quizStage = document.getElementById('quizStage');
    const quizContainerEl = document.getElementById('quizContainer');
    const resultsContainer = document.getElementById('resultsContainer');
    const overlay = document.getElementById('quizOverlay');
    if (!quizStage || !quizContainerEl) return;
    // Select a random quiz for this session if none is selected yet.
    try {
        const existing = sessionStorage.getItem('selectedQuizId');
        if (existing) {
            window.selectedQuizId = existing;
            const set = quizSets.find(s => s.id === existing);
            if (set) {
                quizData = (getCurrentLang() === 'en') ? set.questions.en.slice() : set.questions.ro.slice();
            }
        } else {
            const idx = Math.floor(Math.random() * quizSets.length);
            const set = quizSets[idx];
            if (set) {
                sessionStorage.setItem('selectedQuizId', set.id);
                window.selectedQuizId = set.id;
                quizData = (getCurrentLang() === 'en') ? set.questions.en.slice() : set.questions.ro.slice();
            }
        }
        // ensure selected quiz has exactly 10 questions; if not, fall back to first set
        if (!Array.isArray(quizData) || quizData.length !== 10) {
            const fallback = quizSets[0];
            quizData = (getCurrentLang() === 'en') ? fallback.questions.en.slice() : fallback.questions.ro.slice();
            sessionStorage.setItem('selectedQuizId', fallback.id);
            window.selectedQuizId = fallback.id;
        }
    } catch (e) {
        // sessionStorage may be unavailable in some contexts; fall back silently
        quizData = (getCurrentLang() === 'en') ? quizDataEN.slice() : quizDataRO.slice();
    }
    // Reset state
    currentQuestion = 0;
    score = 0;
    bonusPoints = 0;
    selectedAnswer = null;
    correctStreak = 0;
    fastAnswer = false;
    timeLeft = 15;
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }

    // Mark started and remove locked overlay
    quizStarted = true;
    quizStage.classList.remove('quiz-locked');
    // Hide overlay explicitly to ensure it's removed from the flow
    if (overlay) {
        overlay.classList.add('hidden');
        overlay.style.display = 'none';
    }
    // Make quiz content accessible
    quizContainerEl.setAttribute('aria-hidden', 'false');
    if (resultsContainer) resultsContainer.setAttribute('aria-hidden', 'false');
    // Also clear inline filters in case any remain (and clear inner element if present)
    quizContainerEl.style.filter = '';
    const inner = quizContainerEl.querySelector('.quiz-inner');
    if (inner) inner.style.filter = '';
    if (resultsContainer) resultsContainer.style.filter = '';

    // Initialize quiz (this will call loadQuestion and start timer)
    initQuiz();
}

// Initialize quiz when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // If quiz exists on page, do NOT start automatically.
    // Show the overlay and keep the quiz locked until the user presses Start.
    const quizContainerEl = document.getElementById('quizContainer');
    const quizStage = document.getElementById('quizStage');
    const startBtn = document.getElementById('startQuizBtn');
    if (quizContainerEl && quizStage) {
        // ensure locked state (HTML is pre-marked with quiz-locked)
        quizStage.classList.add('quiz-locked');
        // render achievements and chip but don't load questions or start timer
        renderAchievements();
        try { renderAchievementChip(); } catch(e) {}
        // set start button handler
        if (startBtn) {
            startBtn.addEventListener('click', function() {
                startQuizFromOverlay();
            });
        }
    }
    
    // Re-initialize quiz when language changes (event is dispatched on window)
    window.addEventListener('languageChanged', function() {
        if (document.getElementById('quizContainer')) {
            // If a quiz was selected for this session, update its language variant
            try {
                const sel = sessionStorage.getItem('selectedQuizId');
                if (sel) {
                    const set = quizSets.find(s => s.id === sel);
                    if (set) quizData = (getCurrentLang() === 'en') ? set.questions.en.slice() : set.questions.ro.slice();
                }
            } catch (e) {
                // ignore sessionStorage issues
            }
            // If quiz already started, re-initialize it with the new language
            if (quizStarted) {
                // Reset quiz state
                currentQuestion = 0;
                score = 0;
                selectedAnswer = null;
                bonusPoints = 0;
                timeLeft = 15;
                if (timerInterval) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                }
                initQuiz();
            }
            // Always re-render achievements panel (language changed)
            renderAchievements();
            try { renderAchievementChip(); } catch(e) {}
        }
    });
    
    // Înregistrează și în noul sistem de callback (dacă există)
    if (typeof window.onLanguageChange === 'function') {
        window.onLanguageChange(function(lang) {
            if (document.getElementById('quizContainer')) {
                // Quiz-ul este deja re-inițializat prin evenimentul languageChanged
                // Acest callback asigură compatibilitate cu sistemul nou
                console.log('[Quiz] Limba schimbată la:', lang);
            }
        });
    }
});


// Render the small contextual achievement chip (shows X / Y) under the page title
function renderAchievementChip() {
    const countEl = document.getElementById('achievementCount');
    const chip = document.getElementById('achievementChip');
    if (!countEl || !chip) return;
    allAchievements = getAchievements();
    const total = allAchievements.length || 0;
    // Count actual unlocked achievements by matching ids against the defined achievements
    const unlocked = allAchievements.filter(a => unlockedAchievements.includes(a.id)).length || 0;
    countEl.textContent = `${unlocked} / ${total}`;
    chip.setAttribute('aria-label', `${unlocked} of ${total} achievements`);
    // ensure chip is visible
    chip.style.display = 'inline-flex';
}

// Make functions available globally
window.toggleAchievements = toggleAchievements;
window.selectOption = selectOption;
window.nextQuestion = nextQuestion;
window.restartQuiz = restartQuiz;
window.shareResult = shareResult;
window.playSound = playSound;
window.renderAchievements = renderAchievements;
window.toggleLeaderboard = toggleLeaderboard;
window.renderLeaderboard = renderLeaderboard;
window.addCurrentToLeaderboard = addCurrentToLeaderboard;