/* ================================================================
   education.js — Vivek Pal | FINAL FIXED
   ✅ Education scroll smooth — reveal-visible REMOVE nahi hogi
   ✅ Red line fill sahi
   ✅ Mobile aur Desktop dono pe sahi
   ================================================================ */

window.addEventListener('scroll', () => {
  const items    = document.querySelectorAll('.qual-item');
  const redLine  = document.querySelector('.red-marker');
  const box      = document.querySelector('.qual-box');
  const isMobile = window.innerWidth <= 768;

  /* ── Card reveal ──
     FIX: reveal-visible SIRF ADD karo, REMOVE MAT KARO
     Isse scroll pe items gayab nahi honge — atakna band */
  items.forEach(item => {
    const itemTop      = item.getBoundingClientRect().top;
    const triggerPoint = isMobile
      ? window.innerHeight * 0.92   /* mobile pe thoda jaldi dikhao */
      : window.innerHeight * 0.85;

    if (itemTop < triggerPoint) {
      item.classList.add('reveal-visible');
      /* INTENTIONALLY: classList.remove NAHI — ek baar dikhne ke baad rakho */
    }
  });

  /* ── Red line fill ── */
  if (box && redLine) {
    const boxRect  = box.getBoundingClientRect();
    const scrollPos = isMobile
      ? window.innerHeight * 0.78
      : window.innerHeight / 1.6;

    let progress = (scrollPos - boxRect.top) / boxRect.height * 100;
    if (progress < 0)   progress = 0;
    if (progress > 100) progress = 100;

    redLine.style.height = progress + '%';
  }
});

/* Page load pe ek baar chalao */
window.dispatchEvent(new Event('scroll'));