// ========================================
// APP DATA
// ========================================

const LESSONS = [
    { id: 'basics', title: 'Basics', icon: '👋', status: 'done', topic: 'greetings and introductions' },
    { id: 'greetings', title: 'Greetings', icon: '☕', status: 'done', topic: 'daily greetings' },
    { id: 'work', title: 'Work', icon: '💼', status: 'current', topic: 'workplace conversations' },
    { id: 'travel', title: 'Travel', icon: '✈️', status: 'locked', topic: 'travel essentials' },
    { id: 'dining', title: 'Dining', icon: '🍕', status: 'locked', topic: 'ordering food' },
    { id: 'hobbies', title: 'Hobbies', icon: '🎸', status: 'locked', topic: 'hobbies and interests' },
];

const PRACTICE_SESSIONS = [
    { day: '12 Jan', label: 'Today', title: 'Coffee Shop Drill', subtitle: 'Practice ordering drinks', lesson: LESSONS[2] },
    { day: '11 Jan', label: null, title: 'Morning Routine', subtitle: 'Daily conversation practice', lesson: LESSONS[1] },
    { day: '10 Jan', label: null, title: 'Job Interview Prep', subtitle: 'Professional introductions', lesson: LESSONS[2] },
    { day: '9 Jan', label: null, title: 'Travel Essentials', subtitle: 'Airport and hotel phrases', lesson: LESSONS[3] },
    { day: '8 Jan', label: null, title: 'Introductions', subtitle: 'Meeting new people', lesson: LESSONS[0] },
];

const STATS = {
    xp: [40, 70, 45, 90, 35, 60, 85],
    words: [20, 50, 30, 80, 25, 55, 75],
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
};

const ACHIEVEMENTS = [
    { title: 'Early Bird', desc: 'Practiced before 8 AM', progress: 100, icon: 'zap', color: 'amber' },
    { title: 'Word Smith', desc: '500 unique words used', progress: 65, icon: 'book', color: 'purple' },
    { title: 'Chatty Cathy', desc: '30 mins AI talk', progress: 40, icon: 'message', color: 'rose' },
    { title: 'Streak Hero', desc: '14 day streak reached', progress: 85, icon: 'award', color: 'emerald' },
];

// SVG Icons for achievements
const ACHIEVEMENT_ICONS = {
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>',
    message: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>',
    award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
};
