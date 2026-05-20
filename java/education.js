/* --- education.js --- MOBILE FIXED */
window.addEventListener('scroll', () => {
  const items   = document.querySelectorAll('.qual-item');
  const redLine = document.querySelector('.red-marker');
  const box     = document.querySelector('.qual-box');
  const isMobile = window.innerWidth <= 768;

  /* 1. Card reveal */
  items.forEach(item => {
    const itemTop      = item.getBoundingClientRect().top;
    const triggerPoint = isMobile
      ? window.innerHeight * 0.88
      : window.innerHeight * 0.85;

    if (itemTop < triggerPoint) {
      item.classList.add('reveal-visible');
    } else {
      item.classList.remove('reveal-visible');
    }
  });

  /* 2. Red line fill */
  if (box && redLine) {
    const boxRect = box.getBoundingClientRect();

    /* Mobile pe line thodi jaldi chalti hai content ke saath */
    const scrollPos = isMobile
      ? window.innerHeight * 0.75
      : window.innerHeight / 1.6;

    let progress = (scrollPos - boxRect.top) / boxRect.height * 100;
    if (progress < 0)   progress = 0;
    if (progress > 100) progress = 100;

    redLine.style.height = progress + '%';
  }
});

/* Page load pe ek baar bhi chalao — top pe jo items hain vo immediately dikhein */
window.dispatchEvent(new Event('scroll'));