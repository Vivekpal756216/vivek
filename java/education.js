/* ================================================================
   education.js — Vivek Pal | RED LINE SMOOTH FIX
   ✅ Red line smooth chalegi — atak nahi karegi
   ✅ requestAnimationFrame use kiya — mobile pe smooth
   ✅ reveal-visible remove nahi hogi
   ================================================================ */

let ticking = false;

function updateScroll() {
  const items    = document.querySelectorAll('.qual-item');
  const redLine  = document.querySelector('.red-marker');
  const box      = document.querySelector('.qual-box');
  const isMobile = window.innerWidth <= 768;

  /* ── Card reveal — sirf add karo, remove mat karo ── */
  items.forEach(item => {
    const itemTop      = item.getBoundingClientRect().top;
    const triggerPoint = isMobile
      ? window.innerHeight * 0.92
      : window.innerHeight * 0.85;

    if (itemTop < triggerPoint) {
      item.classList.add('reveal-visible');
    }
  });

  /* ── Red line smooth fill ── */
  if (box && redLine) {
    const boxRect   = box.getBoundingClientRect();
    const scrollPos = isMobile
      ? window.innerHeight * 0.78
      : window.innerHeight / 1.6;

    let progress = (scrollPos - boxRect.top) / boxRect.height * 100;
    if (progress < 0)   progress = 0;
    if (progress > 100) progress = 100;

    redLine.style.height = progress + '%';
  }

  ticking = false;
}

window.addEventListener('scroll', () => {
  /* requestAnimationFrame — scroll event baar baar fire nahi hoga
     GPU ke saath sync hoga — line smooth chalegi */
  if (!ticking) {
    requestAnimationFrame(updateScroll);
    ticking = true;
  }
}, { passive: true }); /* passive: true — scroll block nahi hoga */

/* Page load pe ek baar */
updateScroll();