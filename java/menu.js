document.addEventListener("DOMContentLoaded", () => {

  // ══════════════════════════════════════
  // MOBILE MENU
  // ══════════════════════════════════════
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
    document.body.style.overflow = "";
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

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) closeMenu();
  });

  // ══════════════════════════════════════
  // DROPDOWN
  // ══════════════════════════════════════
  const isMobile = () => window.innerWidth <= 1024;

  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    const content = dropdown.querySelector(".dropdown-content");
    const dropbtn = dropdown.querySelector(".dropbtn");
    if (!content || !dropbtn) return;

    // ✅ HTML mein jo <i class="fa-caret-down"> hai usse hide karo — JS arrow use karenge
    const oldIcon = dropbtn.querySelector("i");
    if (oldIcon) oldIcon.style.display = "none";

    let timeout;

    function positionDropdown() {
      const rect = dropdown.getBoundingClientRect();
      content.style.position = "fixed";
      content.style.top      = (rect.bottom + 4) + "px";
      content.style.left     = rect.left + "px";
      content.style.minWidth = "190px";
    }

    function showDropdown() {
      if (isMobile()) return;
      clearTimeout(timeout);
      positionDropdown();
      content.style.display = "block";
    }

    function hideDropdown() {
      if (isMobile()) return;
      timeout = setTimeout(() => { content.style.display = "none"; }, 200);
    }

    dropdown.addEventListener("mouseenter", showDropdown);
    dropdown.addEventListener("mouseleave", hideDropdown);
    content.addEventListener("mouseenter", () => { if (!isMobile()) clearTimeout(timeout); });
    content.addEventListener("mouseleave", hideDropdown);

    // ✅ Sirf EK arrow — right side pe inject karo
    if (!dropbtn.querySelector('.drop-arrow')) {
      const arrow = document.createElement('span');
      arrow.className = 'drop-arrow';
      arrow.innerHTML = ' &#9660;';
      arrow.style.cssText = `
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        font-size: 11px;
        cursor: pointer;
        margin-left: 4px;
        flex-shrink: 0;
      `;

      // Arrow click = dropdown toggle (mobile only)
      arrow.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isMobile()) return;

        const isOpen = content.classList.contains("open");

        document.querySelectorAll(".dropdown-content").forEach((c) => {
          c.classList.remove("open");
          c.style.display  = "none";
          c.style.position = "";
        });

        if (!isOpen) {
          content.classList.add("open");
          content.style.display  = "block";
          content.style.position = "static";
          content.style.top      = "";
          content.style.left     = "";
          content.style.width    = "100%";
          content.style.minWidth = "100%";
        }
      });

      // Arrow append karo end mein (right side)
      dropbtn.appendChild(arrow);
    }

    window.addEventListener("scroll", () => {
      if (!isMobile() && content.style.display === "block") positionDropdown();
    }, { passive: true });

    window.addEventListener("resize", () => {
      if (content.style.display === "block") {
        if (isMobile()) {
          content.style.display = "none";
          content.classList.remove("open");
        } else {
          positionDropdown();
        }
      }
    });
  });

});