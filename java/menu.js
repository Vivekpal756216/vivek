document.addEventListener("DOMContentLoaded", () => {

  // ── MOBILE MENU ──
  const menuBtn      = document.getElementById("mobileMenuBtn");
  const navContainer = document.getElementById("navContainer");
  if (!menuBtn || !navContainer) return;
  const openIcon  = menuBtn.querySelector(".close-icon-off");
  const closeIcon = menuBtn.querySelector(".close-icon-on");

  function openMenu() {
    navContainer.classList.add("active");
    if (openIcon)  openIcon.style.display  = "none";
    if (closeIcon) closeIcon.style.display = "block";
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    navContainer.classList.remove("active");
    if (openIcon)  openIcon.style.display  = "block";
    if (closeIcon) closeIcon.style.display = "none";
    document.body.style.overflow = "auto";
  }

  menuBtn.addEventListener("click", () => {
    navContainer.classList.contains("active") ? closeMenu() : openMenu();
  });

  navContainer.querySelectorAll(".nav a:not(.dropbtn), .btn-login")
    .forEach(link => link.addEventListener("click", closeMenu));

  document.addEventListener("click", (e) => {
    if (
      navContainer.classList.contains("active") &&
      !navContainer.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) closeMenu();
  });

  // ── DROPDOWN ──
  // Mobile (≤1024px): click se toggle, nav ke andar expand
  // Desktop (>1024px): hover se show, position:fixed
  document.querySelectorAll('.dropdown').forEach(function(dropdown) {
    var content = dropdown.querySelector('.dropdown-content');
    if (!content) return;

    var isMobile = function() { return window.innerWidth <= 1024; };

    // ── DESKTOP: hover ──
    var timeout;

    function positionDropdown() {
      var rect = dropdown.getBoundingClientRect();
      content.style.top  = (rect.bottom + 6) + 'px';
      content.style.left = rect.left + 'px';
    }

    function showDropdown() {
      if (isMobile()) return;
      clearTimeout(timeout);
      positionDropdown();
      content.style.display = 'block';
    }

    function hideDropdown() {
      if (isMobile()) return;
      timeout = setTimeout(function() {
        content.style.display = 'none';
      }, 200);
    }

    dropdown.addEventListener('mouseenter', showDropdown);
    dropdown.addEventListener('mouseleave', hideDropdown);
    content.addEventListener('mouseenter', function() {
      if (!isMobile()) clearTimeout(timeout);
    });
    content.addEventListener('mouseleave', hideDropdown);

    // ── MOBILE: dropbtn click se toggle ──
    var dropbtn = dropdown.querySelector('.dropbtn');
    if (dropbtn) {
      dropbtn.addEventListener('click', function(e) {
        if (!isMobile()) return;
        e.preventDefault();
        e.stopPropagation();
        var isOpen = content.classList.contains('open');
        // sare dropdowns band karo pehle
        document.querySelectorAll('.dropdown-content').forEach(function(c) {
          c.classList.remove('open');
          c.style.display = 'none';
        });
        if (!isOpen) {
          content.classList.add('open');
          content.style.display = 'block';
        }
      });
    }
  });

});