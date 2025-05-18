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

  // Populate template options
  const templates = [
    { name: "Modern", templateId: "modern", previewHtml: `<h4>${name} - ${position}</h4><p>${experience}</p>` },
    { name: "Professional", templateId: "professional", previewHtml: `<h4>${name}</h4><p><strong>Position:</strong> ${position}</p><p>${experience}</p>` },
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
  
  document.getElementById('resumePreview').classList.remove('hidden');

  // Allow the user to download the resume
  document.getElementById('downloadBtn').addEventListener('click', function() {
    downloadResume(templateId);
  });
}

// Download the resume (functionality for creating the file will be added)
function downloadResume(templateId) {
  const resumeContent = document.getElementById('previewContent').innerHTML;
  const blob = new Blob([resumeContent], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${templateId}_resume.html`;
  link.click();
}
