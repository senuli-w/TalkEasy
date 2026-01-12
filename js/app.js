// ========================================
// TAB NAVIGATION
// ========================================

const tabs = document.querySelectorAll('[data-tab]');
const pages = document.querySelectorAll('[data-page]');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const tabName = tab.dataset.tab;

    // Remove active state from all tabs
    tabs.forEach((t) => t.classList.remove('is-active'));

    // Hide all pages
    pages.forEach((page) => {
      page.hidden = true;
    });

    // Add active state to clicked tab
    tab.classList.add('is-active');

    // Show corresponding page
    const page = document.querySelector(`[data-page="${tabName}"]`);
    if (page) {
      page.hidden = false;
    }
  });
});

// ========================================
// PWA INSTALL BUTTON
// ========================================

const installBtn = document.getElementById('installBtn');
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
});

installBtn?.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    deferredPrompt = null;
    installBtn.hidden = true;
  }
});

window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  deferredPrompt = null;
});

// ========================================
// SERVICE WORKER REGISTRATION
// ========================================

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then((registration) => {
      console.log('Service Worker registered:', registration);
    })
    .catch((error) => {
      console.log('Service Worker registration failed:', error);
    });
}
