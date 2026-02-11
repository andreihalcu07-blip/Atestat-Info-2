/* =====================================================
   COMPARISON.JS - Charts și animații pentru comparison.html
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Animate charts when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate bar charts
                const barFills = document.querySelectorAll('.bar-fill');
                if (barFills.length >= 3) {
                    barFills[0].style.height = '71%';
                    barFills[1].style.height = '28%';
                    barFills[2].style.height = '1%';
                }
                
                // Animate horizontal bars
                const hBarFills = document.querySelectorAll('.h-bar-fill');
                if (hBarFills.length >= 2) {
                    hBarFills[0].style.width = '96.3%';
                    hBarFills[1].style.width = '3.7%';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.chart-container').forEach(chart => observer.observe(chart));

    // Highlight segment on hover
    window.highlightSegment = function(osName) {
        document.querySelectorAll('.chart-segment').forEach(seg => {
            if (seg.dataset.os === osName) {
                seg.style.strokeWidth = '50';
                seg.style.filter = 'brightness(1.2)';
            } else {
                seg.style.opacity = '0.3';
            }
        });
        
        // Show tooltip
        const segment = document.querySelector(`[data-os="${osName}"]`);
        const tooltip = document.getElementById('chartTooltip');
        if (segment && tooltip) {
            tooltip.textContent = `${osName}: ${segment.dataset.percent}%`;
            tooltip.style.opacity = '1';
        }
    };

    window.resetSegments = function() {
        document.querySelectorAll('.chart-segment').forEach(seg => {
            seg.style.strokeWidth = '40';
            seg.style.opacity = '1';
            seg.style.filter = 'none';
        });
        const tooltip = document.getElementById('chartTooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
        }
    };

    // Track mouse for tooltip
    document.addEventListener('mousemove', (e) => {
        const tooltip = document.getElementById('chartTooltip');
        if (tooltip) {
            tooltip.style.left = e.pageX + 15 + 'px';
            tooltip.style.top = e.pageY + 15 + 'px';
        }
    });

    // Add hover to segments
    document.querySelectorAll('.chart-segment').forEach(seg => {
        seg.addEventListener('mouseenter', () => highlightSegment(seg.dataset.os));
        seg.addEventListener('mouseleave', resetSegments);
    });
});
