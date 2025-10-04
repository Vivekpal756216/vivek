// // script.js
// document.querySelectorAll(".copy-btn").forEach((btn) => {
//   btn.addEventListener("click", function () {
//     const code = this.nextElementSibling; // button ke next <code> element
//     navigator.clipboard
//       .writeText(code.innerText)
//       .then(() => alert("Code copied!"))
//       .catch((err) => console.error("Failed to copy: ", err));
//   });
// });


document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async function () {
    try {
      const code = this.nextElementSibling; // button ke next <code> element
      await navigator.clipboard.writeText(code.innerText);
      alert("Code copied!"); // optional, mobile pe feedback ke liye
    } catch (err) {
      console.error("Failed to copy:", err);
      // fallback for mobile:
      const range = document.createRange();
      range.selectNodeContents(code);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy"); // older mobile browsers support
      alert("Code copied using fallback!");
    }
  });
});
