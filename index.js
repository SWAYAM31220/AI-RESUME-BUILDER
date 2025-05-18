const express = require("express");
const cohere = require("cohere-ai");
const dotenv = require("dotenv");
const path = require("path");
const { jsPDF } = require("jspdf");  // Import jsPDF library

dotenv.config();
cohere.init(process.env.COHERE_API_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.status(200).send('API is live!');
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/generate-resume", async (req, res) => {
  try {
    const { name, position, details } = req.body;

    const prompt = `Create a professional resume for:
    Name: ${name}
    Position: ${position}
    Details: ${details}`;

    const response = await cohere.generate({
      model: "command",
      prompt,
      max_tokens: 500,
    });

    const resume = response.body.generations[0].text.trim();
    res.json({ resume });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Resume generation failed." });
  }
});

// New route to generate resume as PDF
app.post("/generate-pdf", async (req, res) => {
  try {
    const { name, position, details } = req.body;

    const prompt = `Create a professional resume for:
    Name: ${name}
    Position: ${position}
    Details: ${details}`;

    const response = await cohere.generate({
      model: "command",
      prompt,
      max_tokens: 500,
    });

    const resume = response.body.generations[0].text.trim();

    // Generate PDF from the resume content
    const doc = new jsPDF();
    doc.text(resume, 10, 10);
    
    // Send PDF as response
    const pdfOutput = doc.output('arraybuffer');
    res.contentType("application/pdf");
    res.send(pdfOutput);

  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Resume PDF generation failed." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
