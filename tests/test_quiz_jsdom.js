const { JSDOM } = require('jsdom');

(async () => {
  try {
    const url = 'http://localhost:8000/pages/quiz.html';
    console.log('Loading', url);
    const dom = await JSDOM.fromURL(url, {
      resources: 'usable',
      runScripts: 'dangerously',
      beforeParse(window) {
        // Polyfill missing browser APIs for jsdom environment
        window.IntersectionObserver = class {
          constructor() {}
          observe() {}
          unobserve() {}
          disconnect() {}
        };
      }
    });

    // wait for scripts to initialize (max 6s)
    await new Promise((resolve) => {
      const max = 6000; let waited = 0;
      const iv = setInterval(() => {
        if (dom.window.startQuizFromOverlay || dom.window.document.readyState === 'complete') {
          clearInterval(iv); resolve();
        }
        waited += 100;
        if (waited >= max) { clearInterval(iv); resolve(); }
      }, 100);
    });

    console.log('Attempting to call startQuizFromOverlay()');
    try {
      if (typeof dom.window.startQuizFromOverlay === 'function') {
        dom.window.startQuizFromOverlay();
      } else {
        console.warn('startQuizFromOverlay not defined');
      }
    } catch (e) {
      console.error('Error calling startQuizFromOverlay:', e);
    }

    const doc = dom.window.document;
    const overlay = doc.getElementById('quizOverlay');
    const quizContainer = doc.getElementById('quizContainer');
    const quizStage = doc.getElementById('quizStage');

    console.log('overlay exists:', !!overlay);
    console.log('overlay style.display:', overlay ? overlay.style.display : 'missing');
    console.log('quizContainer aria-hidden:', quizContainer ? quizContainer.getAttribute('aria-hidden') : 'missing');
    console.log('quizStage has quiz-locked:', quizStage ? quizStage.classList.contains('quiz-locked') : 'missing');
    console.log('quizStarted variable:', !!dom.window.quizStarted);
    console.log('timerDisplay text:', doc.getElementById('timerDisplay') ? doc.getElementById('timerDisplay').textContent : 'missing');

    process.exit(0);
  } catch (e) {
    console.error('Fatal error in test:', e);
    process.exit(2);
  }
})();
