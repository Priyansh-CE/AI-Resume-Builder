// 🔗 DOM ELEMENTS
const authBox = document.getElementById("authBox");
const app = document.getElementById("app");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

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

let currentUser = null;

/* 🔐 AUTH STATE */
auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    authBox.style.display = "none";
    app.style.display = "grid";
    loadVersions();
  } else {
    authBox.style.display = "block";
    app.style.display = "none";
  }
});

/* 🔑 LOGIN */
function login() {
  auth.signInWithEmailAndPassword(
    emailInput.value,
    passwordInput.value
  ).catch(err => alert(err.message));
}

/* 📝 SIGNUP */
function signup() {
  auth.createUserWithEmailAndPassword(
    emailInput.value,
    passwordInput.value
  ).catch(err => alert(err.message));
}

/* 🚪 LOGOUT */
function logout() {
  auth.signOut();
}

/* 👀 PREVIEW RESUME */
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

/* 💾 SAVE VERSION */
function saveResume() {
  if (!currentUser) return alert("Login first");

  db.collection("resumes")
    .doc(currentUser.uid)
    .collection("versions")
    .add({
      name: nameInput.value,
      role: roleInput.value,
      skills: skillsInput.value,
      projects: projectsInput.value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      alert("Resume saved ✅");
      loadVersions();
    })
    .catch(err => alert(err.message));
}

/* 📂 LOAD VERSIONS */
function loadVersions() {
  versions.innerHTML = `<option value="">Select version</option>`;

  db.collection("resumes")
    .doc(currentUser.uid)
    .collection("versions")
    .orderBy("createdAt", "desc")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const opt = document.createElement("option");
        opt.value = doc.id;
        opt.innerText = doc.id;
        versions.appendChild(opt);
      });
    });
}

/* ♻ LOAD SELECTED VERSION */
function loadVersion(id) {
  if (!id) return;

  db.collection("resumes")
    .doc(currentUser.uid)
    .collection("versions")
    .doc(id)
    .get()
    .then(doc => {
      const d = doc.data();
      nameInput.value = d.name;
      roleInput.value = d.role;
      skillsInput.value = d.skills;
      projectsInput.value = d.projects;
      generateResume();
    });
}

/* 📄 PDF */
function downloadPDF() {
  html2pdf().from(resume).save("resume.pdf");
}
