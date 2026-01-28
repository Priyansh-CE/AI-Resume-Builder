function generateAI() {
  const role = document.getElementById("role").value;

  const aiSummary = `Motivated ${role} with strong problem-solving skills and hands-on project experience. Passionate about building scalable and user-friendly applications.`;

  document.getElementById("r-projects").innerText = aiSummary;
}
