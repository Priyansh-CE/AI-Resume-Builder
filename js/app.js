function generateResume() {
  document.getElementById("r-name").innerText =
    document.getElementById("name").value || "Your Name";

  document.getElementById("r-role").innerText =
    document.getElementById("role").value || "Job Role";

  document.getElementById("r-skills").innerText =
    document.getElementById("skills").value || "Skills";

  document.getElementById("r-projects").innerText =
    document.getElementById("projects").value || "Projects";
}
