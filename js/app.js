let currentUser = null;

/* AUTH */
auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    authBox.style.display = "none";
    app.style.display = "flex";
  } else {
    authBox.style.display = "block";
    app.style.display = "none";
  }
});

function login() {
  auth.signInWithEmailAndPassword(email.value, password.value)
    .catch(e => alert(e.message));
}

function signup() {
  auth.createUserWithEmailAndPassword(email.value, password.value)
    .catch(e => alert(e.message));
}

function logout() {
  auth.signOut();
}

/* RESUME PREVIEW */
function generateResume() {
  document.getElementById("r-name").innerText = name.value || "Your Name";
  document.getElementById("r-role").innerText = role.value || "Job Role";
  document.getElementById("r-skills").innerText = skills.value || "Skills";

  const ul = document.getElementById("r-projects");
  ul.innerHTML = "";

  projects.value.split("\n").forEach(p => {
    if (p.trim()) {
      const li = document.createElement("li");
      li.innerText = p;
      ul.appendChild(li);
    }
  });
}

/* TEMPLATE */
function changeTemplate(t) {
  resume.className = "resume-section " + t;
}

/* SAVE / LOAD */
function saveResume() {
  if (!currentUser) return;
  db.collection("resumes").doc(currentUser.uid).set({
    name: name.value,
    role: role.value,
    skills: skills.value,
    projects: projects.value
  });
  alert("Resume Saved ✅");
}

function loadResume() {
  if (!currentUser) return;
  db.collection("resumes").doc(currentUser.uid).get()
    .then(doc => {
      if (doc.exists) {
        const d = doc.data();
        name.value = d.name;
        role.value = d.role;
        skills.value = d.skills;
        projects.value = d.projects;
        generateResume();
      }
    });
}

/* PDF (MULTI-PAGE AUTO) */
function downloadPDF() {
  const opt = {
    margin: 0.5,
    filename: "resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
  };
  html2pdf().set(opt).from(resume).save();
}
