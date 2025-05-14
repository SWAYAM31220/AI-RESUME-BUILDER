require('dotenv').config();
const express = require('express');
const cohere = require('cohere-ai');
const path = require('path');
const API_KEY = process.env.COHERE_API_KEY;
if (!API_KEY) {
  console.error('❌  Missing COHERE_API_KEY – make sure you set it under Replit Secrets');
  process.exit(1);
}

cohere.init(process.env.COHERE_API_KEY);
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/generate-resume', async (req, res) => {
  try {
    const { name, experience, skills, education } = req.body;
    console.log('🔎 Prompt inputs:', { name, experience, skills, education });

    const response = await cohere.generate({
      model: 'command',  // <-- ✅ works for you!
      prompt: ` Generate a professional resume for a candidate with the following             details: 
      Name: ${name} 
      Experience: ${experience} 
      Skills: ${skills} 
      Education: ${education} Resume:`,
      max_tokens: 300,
      temperature: 0.75
    });


    console.log('📦 Cohere raw response:', JSON.stringify(response, null, 2));

    // Safe‐guard against missing generations
    const gens = response.body?.generations;
    if (!Array.isArray(gens) || gens.length === 0) {
      throw new Error('No generations returned from Cohere');
    }

    res.json({ resume: gens[0].text.trim() });
  } catch (err) {
    console.error('❌ Error in /api/generate-resume:', err);
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

