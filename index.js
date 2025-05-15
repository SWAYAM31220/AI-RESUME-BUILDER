const express = require("express");
const cohere = require("cohere-ai");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
cohere.init(process.env.COHERE_API_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Route: Resume generation
app.post("/generate-resume", async (req, res) => {
  try {
    const { Name, Position, "Your Experience, Skills, Projects": Details } = req.body;

    const prompt = `Create a professional resume for:
    Name: ${Name}
    Position: ${Position}
    Details: ${Details}`;

    const response = await cohere.generate({
      model: "command",
      prompt,
      max_tokens: 500,
    });

    const resume = response.body.generations[0].text.trim();
    res.json({ resume });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to generate resume" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
