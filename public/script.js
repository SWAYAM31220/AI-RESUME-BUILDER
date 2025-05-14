const form       = document.getElementById('resume-form');
const preview    = document.getElementById('preview');
const loadingDiv = document.getElementById('loading');
const download   = document.getElementById('download-btn');
const classicBtn = document.getElementById('tpl-classic');
const modernBtn  = document.getElementById('tpl-modern');
let tpl = 'classic';

// template toggle
[classicBtn, modernBtn].forEach(btn => {
  btn.addEventListener('click', () => {
    classicBtn.classList.remove('active');
    modernBtn.classList.remove('active');
    btn.classList.add('active');
    tpl = btn === classicBtn ? 'classic' : 'modern';
  });
});

// form submit
form.addEventListener('submit', async e => {
  e.preventDefault();
  download.disabled = true;
  preview.innerHTML = '';
  loadingDiv.classList.remove('hidden');

  const data = {
    name: form.name.value.trim(),
    experience: form.experience.value.trim(),
    skills: form.skills.value.trim(),
    education: form.education.value.trim(),
  };

  const res = await fetch('/api/generate-resume', {
    method: 'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify(data)
  });
  const { resume } = await res.json();

  // build HTML
  const icon = (name) => `<i data-feather="${name}" class="w-5 h-5"></i>`;
  let html = `<h1>${data.name}</h1>`;

  if (tpl === 'classic') {
    html += `
      ${icon('briefcase')}<h2>Experience</h2>
      <p>${data.experience}</p>
      ${icon('settings')}<h2>Skills</h2>
      <p>${data.skills}</p>
      ${icon('book-open')}<h2>Education</h2>
      <p>${data.education}</p>`;
  } else {
    html += `
      ${icon('briefcase')}<h2>Experience</h2>
      <pre>${data.experience}</pre>
      ${icon('settings')}<h2>Skills</h2>
      <pre>${data.skills}</pre>
      ${icon('book-open')}<h2>Education</h2>
      <pre>${data.education}</pre>`;
  }

  html += `<h2>${icon('file-text')}Summary</h2><pre>${resume}</pre>`;

  preview.innerHTML = html;
  feather.replace();        // re-init icons
  loadingDiv.classList.add('hidden');
  download.disabled = false;
});

// PDF download
download.addEventListener('click', () => {
  html2pdf().set({ margin:0.5, filename:'resume.pdf', html2canvas:{ scale:2 } })
           .from(preview).save();
});
