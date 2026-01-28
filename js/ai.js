async function generateAI() {
  const role = document.getElementById("role").value;
  const skills = document.getElementById("skills").value;

  if (!role) {
    alert("Please enter Job Role");
    return;
  }

  document.getElementById("r-projects").innerText = "Generating AI content... 🤖";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY_HERE"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Write a professional resume summary for a ${role} with skills: ${skills}`
          }
        ]
      })
    });

    const data = await response.json();

    const aiText = data.choices[0].message.content;
    document.getElementById("r-projects").innerText = aiText;

  } catch (error) {
    console.error(error);
    alert("AI generation failed");
  }
}
