/* =====================================================
   HISTORY.JS - Timeline 3D Controls pentru history.html
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Animation Observer for cards entry
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    
    // Observe all timeline cards and feature cards
    document.querySelectorAll('.timeline-3d-card, .feature-card').forEach(el => {
        animationObserver.observe(el);
    });
    
    // 3D Timeline Controls
    const timeline = document.getElementById('timeline3d');
    const cards = document.querySelectorAll('.timeline-3d-card');
    
    if (!timeline || cards.length === 0) return;
    
    let currentScale = 1;
    let currentCard = 0;
    let isDragging = false;
    let startX, scrollLeft;

    // Create indicators
    const indicator = document.getElementById('timelineIndicator');
    if (indicator) {
        cards.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'indicator-dot' + (i === 0 ? ' active' : '');
            dot.onclick = () => scrollToCard(i);
            indicator.appendChild(dot);
        });
    }

    // Scroll functions
    window.scrollTimeline = function(direction) {
        currentCard = Math.max(0, Math.min(cards.length - 1, currentCard + direction));
        scrollToCard(currentCard);
    };

    function scrollToCard(index) {
        currentCard = index;
        const card = cards[index];
        timeline.scrollTo({
            left: card.offsetLeft - timeline.offsetWidth / 2 + card.offsetWidth / 2,
            behavior: 'smooth'
        });
        updateIndicators();
        updateActiveCard();
    }

    function updateIndicators() {
        document.querySelectorAll('.indicator-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentCard);
        });
    }

    function updateActiveCard() {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === currentCard);
        });
    }

    // Drag to scroll
    timeline.addEventListener('mousedown', (e) => {
        isDragging = true;
        timeline.style.cursor = 'grabbing';
        startX = e.pageX - timeline.offsetLeft;
        scrollLeft = timeline.scrollLeft;
    });

    timeline.addEventListener('mouseleave', () => {
        isDragging = false;
        timeline.style.cursor = 'grab';
    });

    timeline.addEventListener('mouseup', () => {
        isDragging = false;
        timeline.style.cursor = 'grab';
    });

    timeline.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - timeline.offsetLeft;
        const walk = (x - startX) * 2;
        timeline.scrollLeft = scrollLeft - walk;
    });

    // Zoom functions
    window.zoomTimeline = function(factor) {
        currentScale *= factor;
        currentScale = Math.max(0.5, Math.min(2, currentScale));
        cards.forEach(card => {
            card.style.transform = `scale(${currentScale})`;
        });
    };

    window.resetZoom = function() {
        currentScale = 1;
        cards.forEach(card => {
            card.style.transform = '';
        });
    };

    // Scroll wheel zoom
    timeline.addEventListener('wheel', (e) => {
        if (e.ctrlKey) {
            e.preventDefault();
            zoomTimeline(e.deltaY > 0 ? 0.95 : 1.05);
        }
    });

    // Track scroll position
    timeline.addEventListener('scroll', () => {
        const scrollPos = timeline.scrollLeft + timeline.offsetWidth / 2;
        cards.forEach((card, i) => {
            if (scrollPos > card.offsetLeft && scrollPos < card.offsetLeft + card.offsetWidth) {
                if (currentCard !== i) {
                    currentCard = i;
                    updateIndicators();
                }
            }
        });
    });

    // Card click for details
    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            scrollToCard(i);
        });
    });

    // Initialize
    scrollToCard(0);
});
