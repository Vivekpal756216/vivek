(function () {

  /* TYPEWRITER */
  const textEl = document.querySelector('.typewriter-text');
  if (textEl) {
    const NAME = 'Vivek Pal';
    const TYPE_SPEED = 115, ERASE_SPEED = 65, PAUSE_FULL = 2600, PAUSE_EMPTY = 450;
    let i = 0, erasing = false;
    function tick() {
      if (!erasing) {
        textEl.textContent = NAME.slice(0, ++i);
        if (i === NAME.length) { erasing = true; setTimeout(tick, PAUSE_FULL); }
        else setTimeout(tick, TYPE_SPEED);
      } else {
        textEl.textContent = NAME.slice(0, --i);
        if (i === 0) { erasing = false; setTimeout(tick, PAUSE_EMPTY); }
        else setTimeout(tick, ERASE_SPEED);
      }
    }
    setTimeout(tick, 750);
  }

  /* EDUCATION SCROLL FIX */
  document.querySelectorAll('a[href="#qualification"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var el = document.getElementById('qualification');
      if (!el) return;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
    });
  });

  /* ============================================================
     SCROLL ANIMATION
  ============================================================ */
  var container = document.querySelector('.hero-container');
  var photoBox  = document.querySelector('.photo-box');
  var card      = document.querySelector('.info-card-box');
  if (!container || !photoBox || !card) return;

  var isScrolled      = false;
  var ticking         = false;
  var animating       = false;  // ← NEW: animation chal rahi hai flag
  var restoreTimer    = null;   // ← NEW: goNormal ka timer
  var originalCardWidth = card.offsetWidth;

  var TRANS_TIME = 900; // ms — CSS transition se match karo
  var TRANS = 'left ' + TRANS_TIME + 'ms cubic-bezier(0.16,1,0.3,1), top ' + TRANS_TIME + 'ms cubic-bezier(0.16,1,0.3,1)';

  function setAbsolute() {
    var ch = container.offsetHeight;
    var photoRect = photoBox.getBoundingClientRect();
    var cardRect  = card.getBoundingClientRect();
    var contRect  = container.getBoundingClientRect();

    container.style.position = 'relative';
    container.style.height   = ch + 'px';

    photoBox.style.position   = 'absolute';
    photoBox.style.left       = (photoRect.left - contRect.left) + 'px';
    photoBox.style.top        = (photoRect.top  - contRect.top)  + 'px';
    photoBox.style.margin     = '0';
    photoBox.style.transition = 'none';

    card.style.position   = 'absolute';
    card.style.left       = (cardRect.left - contRect.left) + 'px';
    card.style.top        = (cardRect.top  - contRect.top)  + 'px';
    card.style.width      = originalCardWidth + 'px';
    card.style.margin     = '0';
    card.style.transition = 'none';
  }

  function goScrolled() {
    if (isScrolled) return;
    isScrolled = true;
    animating  = true;

    // ← Agar goNormal ka timer chal raha hai toh cancel karo
    if (restoreTimer) { clearTimeout(restoreTimer); restoreTimer = null; }

    setAbsolute();

    var cw   = container.offsetWidth;
    var pw   = photoBox.offsetWidth;
    var ph   = photoBox.offsetHeight;
    var cah  = card.offsetHeight;
    var caw  = originalCardWidth;
    var gap  = 150;

    var totalW    = pw + gap + caw;
    var startX    = (cw - totalW) / 2;
    var photoLeft = startX;
    var cardLeft  = startX + pw + gap;

    var maxH     = Math.max(ph, cah);
    var photoTop = (maxH - ph) / 2 + 160;
    var cardTop  = (maxH - cah) / 2 + 160;

    container.style.height = maxH + 'px';

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        photoBox.style.transition = TRANS;
        card.style.transition     = TRANS;

        photoBox.style.left = photoLeft + 'px';
        photoBox.style.top  = photoTop  + 'px';
        card.style.left     = cardLeft  + 'px';
        card.style.top      = cardTop   + 'px';

        // Animation khatam hone ke baad flag hatao
        setTimeout(function() { animating = false; }, TRANS_TIME);
      });
    });
  }

  function goNormal() {
    if (!isScrolled) return;
    isScrolled = false;
    animating  = true;

    // Pehle se chal raha restore timer cancel karo
    if (restoreTimer) { clearTimeout(restoreTimer); restoreTimer = null; }

    var cw  = container.offsetWidth;
    var pw  = photoBox.offsetWidth;
    var ph  = photoBox.offsetHeight;

    var photoLeft = (cw - pw) / 2;
    var cardLeft  = (cw - originalCardWidth) / 2;
    var cardTop   = ph + 65;

    photoBox.style.transition = TRANS;
    card.style.transition     = TRANS;

    requestAnimationFrame(function () {
      photoBox.style.left = photoLeft + 'px';
      photoBox.style.top  = '0px';
      card.style.left     = cardLeft  + 'px';
      card.style.top      = cardTop   + 'px';
    });

    // Normal flow restore — transition khatam hone ke baad
    restoreTimer = setTimeout(function () {
      restoreTimer = null;
      animating    = false;
      // Sirf tab restore karo jab abhi bhi normal state mein ho
      if (!isScrolled) {
        container.style.position = '';
        container.style.height   = '';
        photoBox.style.cssText   = '';
        card.style.cssText       = '';
      }
    }, TRANS_TIME + 50);
  }

  function update() {
    ticking = false;

    if (window.innerWidth <= 1024) {
      if (restoreTimer) { clearTimeout(restoreTimer); restoreTimer = null; }
      container.style.position = '';
      container.style.height   = '';
      photoBox.style.cssText   = '';
      card.style.cssText       = '';
      isScrolled = false;
      animating  = false;
      return;
    }

    if (window.scrollY > 10) goScrolled();
    else goNormal();
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });

  window.addEventListener('resize', function () {
    originalCardWidth = card.offsetWidth;
    if (restoreTimer) { clearTimeout(restoreTimer); restoreTimer = null; }
    container.style.position = '';
    container.style.height   = '';
    photoBox.style.cssText   = '';
    card.style.cssText       = '';
    isScrolled = false;
    animating  = false;
    update();
  });

  update();
})();