// ===============================
// 🤖 GEMINI AI CONFIG
// ===============================

// ⚠️ DO NOT PUSH REAL KEY TO GITHUB
// Use real key locally only
const GEMINI_API_KEY = "YOUR_API_KEY_HERE";

// ===============================
// 🤖 AI IMPROVE FUNCTION
// ===============================
async function improveWithAI() {
  try {
    const textarea = document.getElementById("projects");
    const text = textarea.value.trim();

    if (!text) {
      alert("Please enter project/experience content first.");
      return;
    }

    const prompt = `
Improve the following resume content.
Make it professional, ATS-friendly, and concise.
Return bullet points only.

Content:
${text}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error(errText);
      alert("AI request failed. Check API key.");
      return;
    }

    const data = await response.json();

    const output =
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0].text;

    if (!output) {
      alert("AI response empty.");
      console.log(data);
      return;
    }

    textarea.value = output;
    generateResume(); // auto refresh preview

  } catch (error) {
    console.error(error);
    alert("AI error. Open console for details.");
  }
}
