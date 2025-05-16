// Loader fade out after page loads
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

// Handle form submission
document.getElementById("resumeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Collect data
  const inputs = this.querySelectorAll("input, textarea");
  const data = {};
  inputs.forEach(input => data[input.placeholder] = input.value);

  // Show loading or disable button
  const button = this.querySelector("button");
  button.disabled = true;
  button.innerText = "Generating...";

  fetch("/generate-resume", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  .then(res => {
    if (!res.ok) throw new Error("Failed to generate resume");
    return res.blob(); // Assuming backend sends PDF or file
  })
  .then(blob => {
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    button.innerText = "Generate Resume";
    button.disabled = false;
  })
  .catch(err => {
    alert("Something went wrong: " + err.message);
    console.error(err);
    button.innerText = "Generate Resume";
    button.disabled = false;
  });
});
