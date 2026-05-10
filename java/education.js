/* --- education.js --- */

window.addEventListener('scroll', () => {
    const items = document.querySelectorAll('.qual-item');
    const redLine = document.querySelector('.red-marker');
    const box = document.querySelector('.qual-box');

    // 1. Text Reveal Logic
    items.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        // Mobile pe thoda jaldi trigger (90%) aur desktop pe (85%)
        const triggerPoint = window.innerWidth < 768 ? window.innerHeight * 0.90 : window.innerHeight * 0.85;

        if (itemTop < triggerPoint) {
            item.classList.add('reveal-visible');
        } else {
            item.classList.remove('reveal-visible');
        }
    });

    // 2. Line Color/Height Fill Logic
    if (box && redLine) {
        const boxRect = box.getBoundingClientRect();
        
        // --- MOBILE FIX START ---
        // Phone pe scroll position thoda niche rakhte hain taaki line content ke saath chale
        const scrollPos = window.innerWidth < 768 ? window.innerHeight / 1.2 : window.innerHeight / 1.6; 
        // --- MOBILE FIX END ---
        
        let progress = (scrollPos - boxRect.top) / boxRect.height * 100;
        
        if (progress < 0) progress = 0;
        if (progress > 100) progress = 100;
        
        redLine.style.height = progress + '%';
    }
});