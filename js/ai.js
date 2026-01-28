async function generateAI() {
  const role = document.getElementById("role").value;
  const skills = document.getElementById("skills").value;

  if (!role) {
    alert("Please enter Job Role");
    return;
  }

  document.getElementById("r-projects").innerText = "Generating AI content... 🤖";

  // MOCK AI Text (replace with real API later)
  const aiText = `Motivated ${role} with strong problem-solving skills and hands-on project experience. Passionate about building scalable, user-friendly applications and continuously learning new technologies.`;

  // Display AI result
  document.getElementById("r-projects").innerText = aiText;
}
