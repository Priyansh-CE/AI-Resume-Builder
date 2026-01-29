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

/* Template Switch */
function changeTemplate(template) {
  const resume = document.getElementById("resume");
  resume.className = "resume-section " + template;
}

/* Dark Mode with Save */
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

/* Load preference */
window.onload = () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }
};
