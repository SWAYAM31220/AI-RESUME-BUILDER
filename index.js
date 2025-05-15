const express = require("express");
const cohere = require("cohere-ai");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
cohere.init(process.env.COHERE_API_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
