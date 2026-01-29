function generateAI() {
  const role = document.getElementById("role").value;

  if (!role) {
    alert("Please enter Job Role");
    return;
  }

  const aiText = `Motivated ${role} with strong problem-solving skills and hands-on project experience. Passionate about building scalable, user-friendly applications and continuously learning new technologies.`;

  document.getElementById("r-projects").innerText = aiText;
}
