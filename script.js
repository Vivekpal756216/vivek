// script.js
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const code = this.nextElementSibling; // button ke next <code> element
    navigator.clipboard
      .writeText(code.innerText)
      .then(() => alert("Code copied!"))
      .catch((err) => console.error("Failed to copy: ", err));
  });
});
