function copyCode() {
  let code = document.querySelector("#codeBox code").innerText;
  navigator.clipboard.writeText(code).then(() => {
    alert("✅ Code copied to clipboard!");
  });
}
