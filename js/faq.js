<<<<<<< HEAD
/* =====================================================
   FAQ.JS - Toggle pentru întrebări frecvente
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Toggle
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
        });
    });
});
=======
/* =====================================================
   FAQ.JS - Toggle pentru întrebări frecvente
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Toggle
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
        });
    });
});
>>>>>>> abcbb6b6a5fde656692021ce6d66fcfecfde8768
