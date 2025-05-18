document.getElementById('resumeForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get user input
  const name = document.getElementById('name').value;
  const position = document.getElementById('position').value;
  const experience = document.getElementById('experience').value;

  // Show templates section
  document.getElementById('templates').classList.remove('hidden');

  // Generate resume data
  const resumeData = {
    name: name,
    position: position,
    experience: experience,
  };

  // Populate template options with 4 different templates
  const templates = [
    { name: "Modern", templateId: "modern", previewHtml: `<div class="modern-template"><h4>${name} - ${position}</h4><p>${experience}</p></div>` },
    { name: "Professional", templateId: "professional", previewHtml: `<div class="professional-template"><h4>${name}</h4><p><strong>Position:</strong> ${position}</p><p>${experience}</p></div>` },
    { name: "Creative", templateId: "creative", previewHtml: `<div class="creative-template"><h3>${name}</h3><p>${position}</p><p>${experience}</p></div>` },
    { name: "Minimalist", templateId: "minimalist", previewHtml: `<div class="minimalist-template"><h3>${name}</h3><p class="minimalist-position">${position}</p><p>${experience}</p></div>` },
  ];

  const templateCardsContainer = document.querySelector('.template-cards');
  templateCardsContainer.innerHTML = "";  // Clear previous templates

  templates.forEach(template => {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.innerHTML = `
      <h3>${template.name}</h3>
      <button onclick="showPreview('${template.templateId}', '${template.previewHtml}')">Preview</button>
    `;
    templateCardsContainer.appendChild(card);
  });
});

// Show the resume preview in selected template
function showPreview(templateId, previewHtml) {
  const previewContent = document.getElementById('previewContent');
  previewContent.innerHTML = previewHtml; // Insert preview content

  // Add template-specific styles
  document.getElementById('previewContent').classList.add(templateId);

  document.getElementById('resumePreview').classList.remove('hidden');

  // Allow the user to download the resume as PDF
  document.getElementById('downloadBtn').addEventListener('click', function() {
    downloadResumeAsPDF(templateId);
  });
}

// Function to generate the resume as PDF
function downloadResumeAsPDF(templateId) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const resumeContent = document.getElementById('previewContent').innerHTML;

  // Convert HTML to PDF content (using HTML2Canvas or directly if simple text)
  doc.html(resumeContent, {
    callback: function (doc) {
      doc.save(`${templateId}_resume.pdf`);
    },
    x: 10,
    y: 10
  });
}
