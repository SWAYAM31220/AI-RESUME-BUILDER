// Loader fade out after page loads
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

// Handle form submission (backend integration placeholder)
document.getElementById("resumeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Collect data
  const inputs = this.querySelectorAll("input, textarea");
  const data = {};
  inputs.forEach(input => data[input.placeholder] = input.value);

  // Send to backend (future step)
  alert("Sending data to backend soon...");

 
  fetch("/generate-resume", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(response => {
    console.log(response);
    // Show resume or download logic here
  });
  */
});
