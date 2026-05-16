document.addEventListener("DOMContentLoaded", () => {
  const menuBtn     = document.getElementById("mobileMenuBtn");
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

  // Auto-close on link click
  navContainer.querySelectorAll(".nav a:not(.dropbtn), .btn-login")
    .forEach(link => link.addEventListener("click", closeMenu));

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (
      navContainer.classList.contains("active") &&
      !navContainer.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) closeMenu();
  });
});