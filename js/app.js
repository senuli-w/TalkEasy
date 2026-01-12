// ========================================
// DOM ELEMENTS
// ========================================

const app = document.getElementById('app');
const mainContent = document.getElementById('mainContent');
const bottomNav = document.getElementById('bottomNav');
const navBtns = document.querySelectorAll('.nav-btn');
const themeBtn = document.getElementById('themeBtn');
const installBtn = document.getElementById('installBtn');

// Pages
const pageLearn = document.getElementById('page-learn');
const pageTalk = document.getElementById('page-talk');
const pageProfile = document.getElementById('page-profile');
const pageChat = document.getElementById('page-chat');

// Containers
const lessonsPath = document.getElementById('lessonsPath');
const sessionsList = document.getElementById('sessionsList');
const xpChart = document.getElementById('xpChart');
const wordsChart = document.getElementById('wordsChart');
const achievementsList = document.getElementById('achievementsList');

// Chat elements
const chatMessages = document.getElementById('chatMessages');
const chatBackBtn = document.getElementById('chatBackBtn');
const chatSessionLabel = document.getElementById('chatSessionLabel');
const chatStatusText = document.getElementById('chatStatusText');
const chatStatusDot = document.querySelector('.chat-status__dot');
const micBtn = document.getElementById('micBtn');
const micPulse = document.getElementById('micPulse');
const textModeBtn = document.getElementById('textModeBtn');
const endChatBtn = document.getElementById('endChatBtn');
const textInputRow = document.getElementById('textInputRow');
const chatTextInput = document.getElementById('chatTextInput');
const sendBtn = document.getElementById('sendBtn');

// ========================================
// STATE
// ========================================

let isDarkMode = false;
let currentTab = 'learn';
let currentLesson = null;
let isRecording = false;
let isTextMode = false;
let messages = [];
let recognition = null;

// ========================================
// THEME TOGGLE
// ========================================

function toggleTheme() {
    isDarkMode = !isDarkMode;
    app.classList.toggle('dark', isDarkMode);
    
    const iconSun = themeBtn.querySelector('.icon-sun');
    const iconMoon = themeBtn.querySelector('.icon-moon');
    
    if (isDarkMode) {
        iconSun.style.display = 'none';
        iconMoon.style.display = 'block';
    } else {
        iconSun.style.display = 'block';
        iconMoon.style.display = 'none';
    }
    
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        toggleTheme();
    }
}

themeBtn.addEventListener('click', toggleTheme);

// ========================================
// NAVIGATION
// ========================================

function switchTab(tab) {
    currentTab = tab;
    
    // Update nav buttons
    navBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    // Update pages
    pageLearn.classList.toggle('active', tab === 'learn');
    pageTalk.classList.toggle('active', tab === 'talk');
    pageProfile.classList.toggle('active', tab === 'profile');
    pageChat.classList.remove('active');
    
    // Show bottom nav and header
    app.classList.remove('chat-open');
}

navBtns.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// ========================================
// RENDER LESSONS PATH
// ========================================

function renderLessons() {
    lessonsPath.innerHTML = LESSONS.map((lesson, index) => {
        const statusClass = `lesson-node--${lesson.status}`;
        const isDisabled = lesson.status === 'locked';
        
        let iconContent;
        if (lesson.status === 'done') {
            iconContent = `<svg class="lesson-node__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"><polyline points="20 6 9 17 4 12"/></svg>`;
        } else {
            iconContent = `<span class="lesson-node__icon">${lesson.icon}</span>`;
        }
        
        const badge = lesson.status === 'current' 
            ? '<div class="lesson-node__badge">Current</div>' 
            : '';
        
        return `
            <div class="lesson-node ${statusClass}">
                <button class="lesson-node__btn" ${isDisabled ? 'disabled' : ''} data-lesson-id="${lesson.id}">
                    ${badge}
                    ${iconContent}
                </button>
                <span class="lesson-node__label">${lesson.title}</span>
            </div>
        `;
    }).join('');
    
    // Add click handlers
    lessonsPath.querySelectorAll('.lesson-node__btn:not([disabled])').forEach(btn => {
        btn.addEventListener('click', () => {
            const lessonId = btn.dataset.lessonId;
            const lesson = LESSONS.find(l => l.id === lessonId);
            if (lesson) {
                openChat(lesson, lesson.title);
            }
        });
    });
}

// ========================================
// RENDER PRACTICE SESSIONS
// ========================================

function renderSessions() {
    sessionsList.innerHTML = PRACTICE_SESSIONS.map(session => {
        const isToday = session.label === 'Today';
        const todayClass = isToday ? 'session-card--today' : '';
        const arrow = isToday ? `
            <div class="session-card__arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
            </div>
        ` : '';
        
        return `
            <button class="session-card ${todayClass}" ${isToday ? `data-session-day="${session.day}"` : 'disabled'}>
                <div class="session-card__left">
                    <div class="session-card__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                            <line x1="16" x2="16" y1="2" y2="6"/>
                            <line x1="8" x2="8" y1="2" y2="6"/>
                            <line x1="3" x2="21" y1="10" y2="10"/>
                        </svg>
                    </div>
                    <div class="session-card__info">
                        <div class="session-card__day">
                            ${session.day}
                            ${session.label ? `<span class="session-card__label">(${session.label})</span>` : ''}
                        </div>
                        <div class="session-card__title">${session.title}</div>
                        <div class="session-card__subtitle">${session.subtitle}</div>
                    </div>
                </div>
                ${arrow}
            </button>
        `;
    }).join('');
    
    // Add click handlers for today's session
    sessionsList.querySelectorAll('.session-card--today').forEach(card => {
        card.addEventListener('click', () => {
            const session = PRACTICE_SESSIONS.find(s => s.label === 'Today');
            if (session) {
                openChat(session.lesson, session.day);
            }
        });
    });
}

// ========================================
// RENDER PROFILE CHARTS
// ========================================

function renderCharts() {
    // XP Chart
    xpChart.innerHTML = STATS.xp.map((value, i) => `
        <div class="chart-bar">
            <div class="chart-bar__fill" style="height: ${value}%"></div>
            <span class="chart-bar__label">${STATS.labels[i]}</span>
        </div>
    `).join('');
    
    // Words Chart
    wordsChart.innerHTML = STATS.words.map((value, i) => `
        <div class="chart-bar">
            <div class="chart-bar__fill" style="height: ${value}%"></div>
            <span class="chart-bar__label">${STATS.labels[i]}</span>
        </div>
    `).join('');
}

// ========================================
// RENDER ACHIEVEMENTS
// ========================================

function renderAchievements() {
    achievementsList.innerHTML = ACHIEVEMENTS.map(achievement => `
        <div class="achievement-card">
            <div class="achievement-card__icon achievement-card__icon--${achievement.color}">
                ${ACHIEVEMENT_ICONS[achievement.icon]}
            </div>
            <div class="achievement-card__content">
                <div class="achievement-card__header">
                    <span class="achievement-card__title">${achievement.title}</span>
                    <span class="achievement-card__progress-label">${achievement.progress}%</span>
                </div>
                <div class="achievement-card__progress-bar">
                    <div class="achievement-card__progress-fill" style="width: ${achievement.progress}%"></div>
                </div>
            </div>
        </div>
    `).join('');
}

// ========================================
// VOICE CHAT
// ========================================

function openChat(lesson, label) {
    currentLesson = lesson;
    
    // Update UI
    chatSessionLabel.textContent = label || 'Today';
    app.classList.add('chat-open');
    
    // Hide other pages, show chat
    pageLearn.classList.remove('active');
    pageTalk.classList.remove('active');
    pageProfile.classList.remove('active');
    pageChat.classList.add('active');
    
    // Reset chat state
    isTextMode = false;
    textInputRow.style.display = 'none';
    
    // Create greeting message
    const greeting = `Hi! I'm Sam, your English teacher. 😊 Today we talk about ${lesson.topic}. Let's start!`;
    messages = [{ role: 'ai', text: greeting }];
    renderMessages();
    
    // Speak greeting
    speak(greeting);
}

function closeChat() {
    app.classList.remove('chat-open');
    pageChat.classList.remove('active');
    
    // Return to talk tab
    switchTab('talk');
    
    // Stop any ongoing speech
    window.speechSynthesis?.cancel();
    stopRecording();
}

function renderMessages() {
    chatMessages.innerHTML = messages.map(msg => `
        <div class="message message--${msg.role}">
            ${msg.text}
        </div>
    `).join('');
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addMessage(role, text) {
    messages.push({ role, text });
    renderMessages();
    
    if (role === 'ai') {
        speak(text);
    }
}

// ========================================
// SPEECH SYNTHESIS (TTS)
// ========================================

function speak(text) {
    if (!window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    window.speechSynthesis.speak(utterance);
}

// ========================================
// SPEECH RECOGNITION (STT)
// ========================================

function isSpeechRecognitionSupported() {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}

function startRecording() {
    if (!isSpeechRecognitionSupported()) {
        addMessage('ai', 'Speech-to-text is not supported in this browser. Try Chrome or Edge.');
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        addMessage('user', text);
        
        // Simple AI response (no backend)
        setTimeout(() => {
            addMessage('ai', "Great job! Keep practicing. Can you tell me more?");
        }, 1000);
    };
    
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        stopRecording();
    };
    
    recognition.onend = () => {
        stopRecording();
    };
    
    recognition.start();
    isRecording = true;
    updateRecordingUI();
}

function stopRecording() {
    if (recognition) {
        try {
            recognition.stop();
        } catch (e) {}
        recognition = null;
    }
    isRecording = false;
    updateRecordingUI();
}

function toggleRecording() {
    if (isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
}

function updateRecordingUI() {
    micBtn.classList.toggle('recording', isRecording);
    micPulse.classList.toggle('active', isRecording);
    chatStatusDot.classList.toggle('recording', isRecording);
    chatStatusText.textContent = isRecording ? 'Listening...' : 'AI Partner Online';
}

// Chat button handlers
chatBackBtn.addEventListener('click', closeChat);
endChatBtn.addEventListener('click', closeChat);
micBtn.addEventListener('click', toggleRecording);

textModeBtn.addEventListener('click', () => {
    isTextMode = !isTextMode;
    textInputRow.style.display = isTextMode ? 'flex' : 'none';
    if (isTextMode) {
        chatTextInput.focus();
    }
});

sendBtn.addEventListener('click', () => {
    const text = chatTextInput.value.trim();
    if (text) {
        addMessage('user', text);
        chatTextInput.value = '';
        
        // Simple AI response
        setTimeout(() => {
            addMessage('ai', "Great job! Keep practicing. Can you tell me more?");
        }, 1000);
    }
});

chatTextInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

// ========================================
// PWA INSTALL
// ========================================

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'flex';
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`Install prompt outcome: ${outcome}`);
        deferredPrompt = null;
        installBtn.style.display = 'none';
    }
});

window.addEventListener('appinstalled', () => {
    console.log('App installed');
    installBtn.style.display = 'none';
});

// ========================================
// SERVICE WORKER
// ========================================

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('SW registered:', reg.scope))
        .catch(err => console.log('SW registration failed:', err));
}

// ========================================
// INITIALIZE APP
// ========================================

function init() {
    loadTheme();
    renderLessons();
    renderSessions();
    renderCharts();
    renderAchievements();
}

init();
