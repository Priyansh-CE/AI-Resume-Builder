// DOM ELEMENTS
const nameInput = document.getElementById("name");
const roleInput = document.getElementById("role");
const skillsInput = document.getElementById("skills");
const projectsInput = document.getElementById("projects");

const resume = document.getElementById("resume");
const versions = document.getElementById("versions");

const rName = document.getElementById("r-name");
const rRole = document.getElementById("r-role");
const rSkills = document.getElementById("r-skills");
const rProjects = document.getElementById("r-projects");

// STORAGE KEY
const STORAGE_KEY = "saved_resumes";

/* 👀 PREVIEW */
function generateResume() {
  rName.innerText = nameInput.value || "Your Name";
  rRole.innerText = roleInput.value || "";
  rSkills.innerText = skillsInput.value || "";

  rProjects.innerHTML = "";
  projectsInput.value.split("\n").forEach(p => {
    if (p.trim()) {
      const li = document.createElement("li");
      li.innerText = p;
      rProjects.appendChild(li);
    }
  });
}

/* 🎨 TEMPLATE */
function changeTemplate(template) {
  resume.className = "resume-section " + template;
}

/* 💾 SAVE RESUME (LOCALSTORAGE) */
function saveResume() {
  const resumes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const data = {
    name: nameInput.value,
    role: roleInput.value,
    skills: skillsInput.value,
    projects: projectsInput.value,
    time: new Date().toLocaleString()
  };

  resumes.unshift(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));

  alert("Resume saved locally ✅");
  loadVersions();
}

/* 📂 LOAD SAVED LIST */
function loadVersions() {
  versions.innerHTML = `<option value="">Select saved resume</option>`;

  const resumes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  resumes.forEach((r, index) => {
    const opt = document.createElement("option");
    opt.value = index;
    opt.innerText = r.time;
    versions.appendChild(opt);
  });
}

/* ♻ LOAD SELECTED */
function loadVersion(index) {
  if (index === "") return;

  const resumes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const r = resumes[index];

  nameInput.value = r.name;
  roleInput.value = r.role;
  skillsInput.value = r.skills;
  projectsInput.value = r.projects;

  generateResume();
}

/* 📄 PDF */
function downloadPDF() {
  html2pdf().from(resume).save("resume.pdf");
}

// Load saved resumes on start
loadVersions();
