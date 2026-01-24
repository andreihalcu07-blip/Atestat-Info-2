<<<<<<< HEAD
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
    return getCurrentLang() === 'en' ? quizDataEN : quizDataRO;
}

// ===== QUIZ DATA (legacy support) =====
let quizData = [
    {
        question: "În ce an a fost creat Unix?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect fill='%232563eb' width='200' height='150'/%3E%3Crect x='40' y='30' width='120' height='80' fill='%231e40af' rx='5' stroke='%233b82f6' stroke-width='2'/%3E%3Crect x='50' y='40' width='100' height='60' fill='%23111827'/%3E%3Ctext x='60' y='60' font-size='10' fill='%2322c55e' font-family='monospace'%3E$ __%3C/text%3E%3Ctext x='60' y='75' font-size='10' fill='%2322c55e' font-family='monospace'%3E%3E login:%3C/text%3E%3Crect x='70' y='115' width='60' height='8' fill='%23374151' rx='2'/%3E%3C/svg%3E",
        options: ["1969", "1981", "1995", "2001"],
        correct: 0
    },
    {
        question: "Care din următoarele e nucleul SO?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect fill='%238b5cf6' width='200' height='150'/%3E%3Cellipse cx='100' cy='75' rx='70' ry='50' fill='%23c4b5fd' opacity='0.4'/%3E%3Cellipse cx='100' cy='75' rx='50' ry='35' fill='%23a78bfa' opacity='0.6'/%3E%3Cellipse cx='100' cy='75' rx='30' ry='20' fill='%238b5cf6'/%3E%3Ctext x='100' y='80' font-size='14' fill='white' text-anchor='middle'%3E?%3C/text%3E%3C/svg%3E",
        options: ["BIOS", "Kernel", "Driver", "Shell"],
        correct: 1
    },
    {
        question: "Care SO domină serverele web?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect fill='%23059669' width='200' height='150'/%3E%3Crect x='30' y='25' width='50' height='100' fill='%23064e3b' rx='3'/%3E%3Crect x='75' y='25' width='50' height='100' fill='%23064e3b' rx='3'/%3E%3Crect x='120' y='25' width='50' height='100' fill='%23064e3b' rx='3'/%3E%3Ccircle cx='55' cy='40' r='5' fill='%2322c55e'/%3E%3Ccircle cx='55' cy='55' r='5' fill='%2322c55e'/%3E%3Ccircle cx='100' cy='40' r='5' fill='%2322c55e'/%3E%3Ccircle cx='100' cy='55' r='5' fill='%2322c55e'/%3E%3Ccircle cx='145' cy='40' r='5' fill='%2322c55e'/%3E%3Ccircle cx='145' cy='55' r='5' fill='%2322c55e'/%3E%3Ctext x='100' y='145' font-size='12' fill='white' text-anchor='middle'%3EServere Web%3C/text%3E%3C/svg%3E",
        options: ["Windows", "macOS", "Linux", "ChromeOS"],
        correct: 2
    },
    {
        question: "Cine a creat Linux?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect fill='%23fbbf24' width='200' height='150'/%3E%3Cellipse cx='100' cy='85' rx='35' ry='45' fill='%23000'/%3E%3Cellipse cx='100' cy='50' r='25' fill='%23000'/%3E%3Cellipse cx='100' cy='90' rx='25' ry='30' fill='white'/%3E%3Ccircle cx='90' cy='45' r='5' fill='white'/%3E%3Ccircle cx='110' cy='45' r='5' fill='white'/%3E%3Ccircle cx='90' cy='45' r='2' fill='%23000'/%3E%3Ccircle cx='110' cy='45' r='2' fill='%23000'/%3E%3Cellipse cx='100' cy='58' rx='5' ry='3' fill='%23f97316'/%3E%3Ctext x='100' y='140' font-size='12' fill='%23000' text-anchor='middle'%3ECine e creatorul?%3C/text%3E%3C/svg%3E",
        options: ["Bill Gates", "Steve Jobs", "Linus Torvalds", "Mark Zuckerberg"],
        correct: 2
    },
    {
        question: "Ce înseamnă GUI?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect fill='%236366f1' width='200' height='150'/%3E%3Crect x='25' y='20' width='150' height='100' fill='%23e0e7ff' rx='5' stroke='%234f46e5' stroke-width='2'/%3E%3Crect x='30' y='25' width='140' height='15' fill='%234f46e5'/%3E%3Ccircle cx='40' cy='32' r='4' fill='%23ef4444'/%3E%3Ccircle cx='52' cy='32' r='4' fill='%23fbbf24'/%3E%3Ccircle cx='64' cy='32' r='4' fill='%2322c55e'/%3E%3Crect x='35' y='50' width='60' height='25' fill='%23c7d2fe' rx='3'/%3E%3Crect x='100' y='50' width='65' height='25' fill='%23c7d2fe' rx='3'/%3E%3Crect x='35' y='85' width='130' height='25' fill='%23c7d2fe' rx='3'/%3E%3Cpath d='M 100 125 L 90 140 L 110 140 Z' fill='%234f46e5'/%3E%3C/svg%3E",
        options: ["Graphical Unit Interface", "Graphical User Interface", "Global User Input", "Graphic Universal Item"],
        correct: 1
    },
    {
        question: "Care SO are piața de ~75% din desktop-uri?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect fill='%230ea5e9' width='200' height='150'/%3E%3Ccircle cx='100' cy='75' r='50' fill='%23bae6fd'/%3E%3Cpath d='M 100 75 L 100 25 A 50 50 0 1 1 35 100 Z' fill='%230284c7'/%3E%3Ctext x='100' y='80' font-size='20' fill='white' text-anchor='middle' font-weight='bold'%3E75%25%3C/text%3E%3Ctext x='100' y='140' font-size='12' fill='white' text-anchor='middle'%3ECota de piață desktop%3C/text%3E%3C/svg%3E",
        options: ["macOS", "Linux", "Windows", "ChromeOS"],
        correct: 2
    },
    {
        question: "Care SO e cel mai popular pe smartphone-uri?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect fill='%2310b981' width='200' height='150'/%3E%3Crect x='70' y='15' width='60' height='110' fill='%23064e3b' rx='8'/%3E%3Crect x='75' y='25' width='50' height='85' fill='%23d1fae5'/%3E%3Ccircle cx='100' cy='120' r='5' fill='%23047857'/%3E%3Crect x='90' y='18' width='20' height='3' fill='%23047857' rx='1'/%3E%3Ctext x='100' y='75' font-size='30' fill='%23059669' text-anchor='middle'%3E?%3C/text%3E%3Ctext x='100' y='145' font-size='10' fill='white' text-anchor='middle'%3ECel mai popular SO mobil%3C/text%3E%3C/svg%3E",
        options: ["iOS", "Android", "Windows Mobile", "Symbian"],
        correct: 1
    },
    {
        question: "Care din acestea e mecanismul de synchronizare?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect fill='%238b5cf6' width='200' height='150'/%3E%3Crect x='20' y='40' width='60' height='40' fill='%23c4b5fd' rx='5'/%3E%3Crect x='120' y='40' width='60' height='40' fill='%23c4b5fd' rx='5'/%3E%3Ctext x='50' y='65' font-size='12' fill='%235b21b6' text-anchor='middle'%3EProces A%3C/text%3E%3Ctext x='150' y='65' font-size='12' fill='%235b21b6' text-anchor='middle'%3EProces B%3C/text%3E%3Cpath d='M 85 60 L 115 60' stroke='%23fbbf24' stroke-width='4'/%3E%3Crect x='85' y='50' width='30' height='20' fill='%23fbbf24' rx='3'/%3E%3Ctext x='100' y='64' font-size='12' fill='%23000' text-anchor='middle'%3E🔒%3C/text%3E%3Ctext x='100' y='120' font-size='12' fill='white' text-anchor='middle'%3ESincronizare între procese%3C/text%3E%3C/svg%3E",
        options: ["Driver", "Mutex", "Bootloader", "Interrupt"],
        correct: 1
    },
    {
        question: "Când s-a lansat Windows 95?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect fill='%230284c7' width='200' height='150'/%3E%3Crect x='35' y='25' width='130' height='85' fill='%23bfdbfe' rx='5' stroke='%231e40af' stroke-width='3'/%3E%3Crect x='45' y='35' width='110' height='55' fill='%23008080'/%3E%3Crect x='50' y='40' width='100' height='12' fill='%23000080'/%3E%3Ctext x='55' y='50' font-size='10' fill='white'%3EMy Computer%3C/text%3E%3Crect x='50' y='55' width='30' height='30' fill='%23c0c0c0' stroke='%23808080'/%3E%3Crect x='85' y='55' width='30' height='30' fill='%23c0c0c0' stroke='%23808080'/%3E%3Crect x='55' y='115' width='90' height='15' fill='%23c0c0c0'/%3E%3Ctext x='65' y='126' font-size='10' fill='%23000'%3EStart%3C/text%3E%3C/svg%3E",
        options: ["1991", "1995", "1998", "2001"],
        correct: 1
    },
    {
        question: "Care SO a introdus GUI pentru masele?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect fill='%23555' width='200' height='150'/%3E%3Crect x='40' y='20' width='120' height='85' fill='%23d4d4d8' rx='8'/%3E%3Crect x='50' y='30' width='100' height='60' fill='%23000'/%3E%3Crect x='55' y='35' width='90' height='50' fill='white'/%3E%3Crect x='60' y='40' width='35' height='10' fill='%23e5e5e5' stroke='%23000'/%3E%3Crect x='60' y='52' width='80' height='8' fill='%23e5e5e5'/%3E%3Crect x='60' y='62' width='80' height='20' fill='%23f5f5f5'/%3E%3Cpath d='M 85 105 L 75 130 L 125 130 L 115 105' fill='%23a1a1aa'/%3E%3Crect x='70' y='130' width='60' height='5' fill='%23a1a1aa' rx='2'/%3E%3Ctext x='100' y='145' font-size='10' fill='white' text-anchor='middle'%3ERevoluția anilor '80%3C/text%3E%3C/svg%3E",
        options: ["IBM System/360", "Apple Macintosh", "MS-DOS", "Unix"],
        correct: 1
    }
];

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

let unlockedAchievements = JSON.parse(localStorage.getItem('achievements')) || [];
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
    timerInterval = setInterval(() => {
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
            if (currentQuestion < quizData.length) {
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
        html += `
            <label class="option" onmouseenter="playSound('hover')">
                <input type="radio" name="answer" value="${index}" onchange="selectOption(${index})">
                ${option}
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
    
    if (currentQuestion < quizData.length) {
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
    const progress = ((currentQuestion) / quizData.length) * 100;
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
                }
            });
    } else {
        const name = prompt(isEN ? 'Enter your name for the leaderboard:' : 'Introduceți-vă nume pentru leaderboard:');
        if (name) {
            leaderboard.push({ name, score, percentage, totalScore: totalScore || score * 10, date: new Date().toLocaleDateString() });
            leaderboard.sort((a, b) => (b.totalScore || b.percentage) - (a.totalScore || a.percentage));
            leaderboard = leaderboard.slice(0, 10); // Top 10
            localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));
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
        resultDiv.innerHTML = resultDiv.innerHTML.replace('</div>', leaderboardHTML + '</div>');
        
        // Buton share
        const shareBtn = document.createElement('button');
        shareBtn.className = 'quiz-button';
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

// Funcție pentru re-renderizarea achievment-urilor
function renderAchievements() {
    const list = document.getElementById('achievementsList');
    if (!list) return;
    
    const isEN = getCurrentLang() === 'en';
    const allAchievements = getAchievements();
    
    list.innerHTML = allAchievements.map(a => `
        <div class="achievement-item ${a.check() ? 'unlocked' : 'locked'}">
            <span class="achievement-icon">${a.icon}</span>
            <div class="achievement-info">
                <div class="achievement-name">${a.name}</div>
                <div class="achievement-desc">${a.desc}</div>
            </div>
            ${a.check() ? '<span class="achievement-check">✓</span>' : '<span class="achievement-lock">🔒</span>'}
        </div>
    `).join('');
}

// Render the small contextual achievement chip (shows X / Y) under the page title
function renderAchievementChip() {
    const countEl = document.getElementById('achievementCount');
    const chip = document.getElementById('achievementChip');
    if (!countEl || !chip) return;
    allAchievements = getAchievements();
    const total = allAchievements.length || 0;
    const unlocked = (unlockedAchievements && unlockedAchievements.length) || 0;
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
=======
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
    return getCurrentLang() === 'en' ? quizDataEN : quizDataRO;
}

// ===== QUIZ DATA (legacy support) =====
let quizData = [
    {
        question: "În ce an a fost creat Unix?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect fill='%232563eb' width='200' height='150'/%3E%3Crect x='40' y='30' width='120' height='80' fill='%231e40af' rx='5' stroke='%233b82f6' stroke-width='2'/%3E%3Crect x='50' y='40' width='100' height='60' fill='%23111827'/%3E%3Ctext x='60' y='60' font-size='10' fill='%2322c55e' font-family='monospace'%3E$ __%3C/text%3E%3Ctext x='60' y='75' font-size='10' fill='%2322c55e' font-family='monospace'%3E%3E login:%3C/text%3E%3Crect x='70' y='115' width='60' height='8' fill='%23374151' rx='2'/%3E%3C/svg%3E",
        options: ["1969", "1981", "1995", "2001"],
        correct: 0
    },
    {
        question: "Care din următoarele e nucleul SO?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect fill='%238b5cf6' width='200' height='150'/%3E%3Cellipse cx='100' cy='75' rx='70' ry='50' fill='%23c4b5fd' opacity='0.4'/%3E%3Cellipse cx='100' cy='75' rx='50' ry='35' fill='%23a78bfa' opacity='0.6'/%3E%3Cellipse cx='100' cy='75' rx='30' ry='20' fill='%238b5cf6'/%3E%3Ctext x='100' y='80' font-size='14' fill='white' text-anchor='middle'%3E?%3C/text%3E%3C/svg%3E",
        options: ["BIOS", "Kernel", "Driver", "Shell"],
        correct: 1
    },
    {
        question: "Care SO domină serverele web?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect fill='%23059669' width='200' height='150'/%3E%3Crect x='30' y='25' width='50' height='100' fill='%23064e3b' rx='3'/%3E%3Crect x='75' y='25' width='50' height='100' fill='%23064e3b' rx='3'/%3E%3Crect x='120' y='25' width='50' height='100' fill='%23064e3b' rx='3'/%3E%3Ccircle cx='55' cy='40' r='5' fill='%2322c55e'/%3E%3Ccircle cx='55' cy='55' r='5' fill='%2322c55e'/%3E%3Ccircle cx='100' cy='40' r='5' fill='%2322c55e'/%3E%3Ccircle cx='100' cy='55' r='5' fill='%2322c55e'/%3E%3Ccircle cx='145' cy='40' r='5' fill='%2322c55e'/%3E%3Ccircle cx='145' cy='55' r='5' fill='%2322c55e'/%3E%3Ctext x='100' y='145' font-size='12' fill='white' text-anchor='middle'%3EServere Web%3C/text%3E%3C/svg%3E",
        options: ["Windows", "macOS", "Linux", "ChromeOS"],
        correct: 2
    },
    {
        question: "Cine a creat Linux?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect fill='%23fbbf24' width='200' height='150'/%3E%3Cellipse cx='100' cy='85' rx='35' ry='45' fill='%23000'/%3E%3Cellipse cx='100' cy='50' r='25' fill='%23000'/%3E%3Cellipse cx='100' cy='90' rx='25' ry='30' fill='white'/%3E%3Ccircle cx='90' cy='45' r='5' fill='white'/%3E%3Ccircle cx='110' cy='45' r='5' fill='white'/%3E%3Ccircle cx='90' cy='45' r='2' fill='%23000'/%3E%3Ccircle cx='110' cy='45' r='2' fill='%23000'/%3E%3Cellipse cx='100' cy='58' rx='5' ry='3' fill='%23f97316'/%3E%3Ctext x='100' y='140' font-size='12' fill='%23000' text-anchor='middle'%3ECine e creatorul?%3C/text%3E%3C/svg%3E",
        options: ["Bill Gates", "Steve Jobs", "Linus Torvalds", "Mark Zuckerberg"],
        correct: 2
    },
    {
        question: "Ce înseamnă GUI?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect fill='%236366f1' width='200' height='150'/%3E%3Crect x='25' y='20' width='150' height='100' fill='%23e0e7ff' rx='5' stroke='%234f46e5' stroke-width='2'/%3E%3Crect x='30' y='25' width='140' height='15' fill='%234f46e5'/%3E%3Ccircle cx='40' cy='32' r='4' fill='%23ef4444'/%3E%3Ccircle cx='52' cy='32' r='4' fill='%23fbbf24'/%3E%3Ccircle cx='64' cy='32' r='4' fill='%2322c55e'/%3E%3Crect x='35' y='50' width='60' height='25' fill='%23c7d2fe' rx='3'/%3E%3Crect x='100' y='50' width='65' height='25' fill='%23c7d2fe' rx='3'/%3E%3Crect x='35' y='85' width='130' height='25' fill='%23c7d2fe' rx='3'/%3E%3Cpath d='M 100 125 L 90 140 L 110 140 Z' fill='%234f46e5'/%3E%3C/svg%3E",
        options: ["Graphical Unit Interface", "Graphical User Interface", "Global User Input", "Graphic Universal Item"],
        correct: 1
    },
    {
        question: "Care SO are piața de ~75% din desktop-uri?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect fill='%230ea5e9' width='200' height='150'/%3E%3Ccircle cx='100' cy='75' r='50' fill='%23bae6fd'/%3E%3Cpath d='M 100 75 L 100 25 A 50 50 0 1 1 35 100 Z' fill='%230284c7'/%3E%3Ctext x='100' y='80' font-size='20' fill='white' text-anchor='middle' font-weight='bold'%3E75%25%3C/text%3E%3Ctext x='100' y='140' font-size='12' fill='white' text-anchor='middle'%3ECota de piață desktop%3C/text%3E%3C/svg%3E",
        options: ["macOS", "Linux", "Windows", "ChromeOS"],
        correct: 2
    },
    {
        question: "Care SO e cel mai popular pe smartphone-uri?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect fill='%2310b981' width='200' height='150'/%3E%3Crect x='70' y='15' width='60' height='110' fill='%23064e3b' rx='8'/%3E%3Crect x='75' y='25' width='50' height='85' fill='%23d1fae5'/%3E%3Ccircle cx='100' cy='120' r='5' fill='%23047857'/%3E%3Crect x='90' y='18' width='20' height='3' fill='%23047857' rx='1'/%3E%3Ctext x='100' y='75' font-size='30' fill='%23059669' text-anchor='middle'%3E?%3C/text%3E%3Ctext x='100' y='145' font-size='10' fill='white' text-anchor='middle'%3ECel mai popular SO mobil%3C/text%3E%3C/svg%3E",
        options: ["iOS", "Android", "Windows Mobile", "Symbian"],
        correct: 1
    },
    {
        question: "Care din acestea e mecanismul de synchronizare?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect fill='%238b5cf6' width='200' height='150'/%3E%3Crect x='20' y='40' width='60' height='40' fill='%23c4b5fd' rx='5'/%3E%3Crect x='120' y='40' width='60' height='40' fill='%23c4b5fd' rx='5'/%3E%3Ctext x='50' y='65' font-size='12' fill='%235b21b6' text-anchor='middle'%3EProces A%3C/text%3E%3Ctext x='150' y='65' font-size='12' fill='%235b21b6' text-anchor='middle'%3EProces B%3C/text%3E%3Cpath d='M 85 60 L 115 60' stroke='%23fbbf24' stroke-width='4'/%3E%3Crect x='85' y='50' width='30' height='20' fill='%23fbbf24' rx='3'/%3E%3Ctext x='100' y='64' font-size='12' fill='%23000' text-anchor='middle'%3E🔒%3C/text%3E%3Ctext x='100' y='120' font-size='12' fill='white' text-anchor='middle'%3ESincronizare între procese%3C/text%3E%3C/svg%3E",
        options: ["Driver", "Mutex", "Bootloader", "Interrupt"],
        correct: 1
    },
    {
        question: "Când s-a lansat Windows 95?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect fill='%230284c7' width='200' height='150'/%3E%3Crect x='35' y='25' width='130' height='85' fill='%23bfdbfe' rx='5' stroke='%231e40af' stroke-width='3'/%3E%3Crect x='45' y='35' width='110' height='55' fill='%23008080'/%3E%3Crect x='50' y='40' width='100' height='12' fill='%23000080'/%3E%3Ctext x='55' y='50' font-size='10' fill='white'%3EMy Computer%3C/text%3E%3Crect x='50' y='55' width='30' height='30' fill='%23c0c0c0' stroke='%23808080'/%3E%3Crect x='85' y='55' width='30' height='30' fill='%23c0c0c0' stroke='%23808080'/%3E%3Crect x='55' y='115' width='90' height='15' fill='%23c0c0c0'/%3E%3Ctext x='65' y='126' font-size='10' fill='%23000'%3EStart%3C/text%3E%3C/svg%3E",
        options: ["1991", "1995", "1998", "2001"],
        correct: 1
    },
    {
        question: "Care SO a introdus GUI pentru masele?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect fill='%23555' width='200' height='150'/%3E%3Crect x='40' y='20' width='120' height='85' fill='%23d4d4d8' rx='8'/%3E%3Crect x='50' y='30' width='100' height='60' fill='%23000'/%3E%3Crect x='55' y='35' width='90' height='50' fill='white'/%3E%3Crect x='60' y='40' width='35' height='10' fill='%23e5e5e5' stroke='%23000'/%3E%3Crect x='60' y='52' width='80' height='8' fill='%23e5e5e5'/%3E%3Crect x='60' y='62' width='80' height='20' fill='%23f5f5f5'/%3E%3Cpath d='M 85 105 L 75 130 L 125 130 L 115 105' fill='%23a1a1aa'/%3E%3Crect x='70' y='130' width='60' height='5' fill='%23a1a1aa' rx='2'/%3E%3Ctext x='100' y='145' font-size='10' fill='white' text-anchor='middle'%3ERevoluția anilor '80%3C/text%3E%3C/svg%3E",
        options: ["IBM System/360", "Apple Macintosh", "MS-DOS", "Unix"],
        correct: 1
    }
];

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

let unlockedAchievements = JSON.parse(localStorage.getItem('achievements')) || [];
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
    timerInterval = setInterval(() => {
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
            if (currentQuestion < quizData.length) {
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
        html += `
            <label class="option" onmouseenter="playSound('hover')">
                <input type="radio" name="answer" value="${index}" onchange="selectOption(${index})">
                ${option}
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
    
    if (currentQuestion < quizData.length) {
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
    const progress = ((currentQuestion) / quizData.length) * 100;
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
                }
            });
    } else {
        const name = prompt(isEN ? 'Enter your name for the leaderboard:' : 'Introduceți-vă nume pentru leaderboard:');
        if (name) {
            leaderboard.push({ name, score, percentage, totalScore: totalScore || score * 10, date: new Date().toLocaleDateString() });
            leaderboard.sort((a, b) => (b.totalScore || b.percentage) - (a.totalScore || a.percentage));
            leaderboard = leaderboard.slice(0, 10); // Top 10
            localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));
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
        resultDiv.innerHTML = resultDiv.innerHTML.replace('</div>', leaderboardHTML + '</div>');
        
        // Buton share
        const shareBtn = document.createElement('button');
        shareBtn.className = 'quiz-button';
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

// Funcție pentru re-renderizarea achievment-urilor
function renderAchievements() {
    const list = document.getElementById('achievementsList');
    if (!list) return;
    
    const isEN = getCurrentLang() === 'en';
    const allAchievements = getAchievements();
    
    list.innerHTML = allAchievements.map(a => `
        <div class="achievement-item ${a.check() ? 'unlocked' : 'locked'}">
            <span class="achievement-icon">${a.icon}</span>
            <div class="achievement-info">
                <div class="achievement-name">${a.name}</div>
                <div class="achievement-desc">${a.desc}</div>
            </div>
            ${a.check() ? '<span class="achievement-check">✓</span>' : '<span class="achievement-lock">🔒</span>'}
        </div>
    `).join('');
}

// Render the small contextual achievement chip (shows X / Y) under the page title
function renderAchievementChip() {
    const countEl = document.getElementById('achievementCount');
    const chip = document.getElementById('achievementChip');
    if (!countEl || !chip) return;
    allAchievements = getAchievements();
    const total = allAchievements.length || 0;
    const unlocked = (unlockedAchievements && unlockedAchievements.length) || 0;
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
>>>>>>> abcbb6b6a5fde656692021ce6d66fcfecfde8768
