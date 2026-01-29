let currentUser = null;

/* AUTH */
auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    authBox.style.display = "none";
    app.style.display = "flex";
    loadVersions();
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

/* PREVIEW */
function generateResume() {
  r-name.innerText = name.value;
  r-role.innerText = role.value;
  r-skills.innerText = skills.value;

  r-projects.innerHTML = "";
  projects.value.split("\n").forEach(p => {
    if (p.trim()) {
      const li = document.createElement("li");
      li.innerText = p;
      r-projects.appendChild(li);
    }
  });
}

/* TEMPLATE */
function changeTemplate(t) {
  resume.className = "resume-section " + t;
}

/* SAVE VERSION */
function saveResume() {
  if (!currentUser) return;

  db.collection("resumes")
    .doc(currentUser.uid)
    .collection("versions")
    .add({
      name: name.value,
      role: role.value,
      skills: skills.value,
      projects: projects.value,
      createdAt: new Date()
    });

  alert("Version saved ✅");
  loadVersions();
}

/* LOAD VERSION LIST */
function loadVersions() {
  versions.innerHTML = '<option value="">Select version</option>';

  db.collection("resumes")
    .doc(currentUser.uid)
    .collection("versions")
    .orderBy("createdAt", "desc")
    .get()
    .then(snap => {
      snap.forEach(doc => {
        const opt = document.createElement("option");
        opt.value = doc.id;
        opt.innerText = doc.data().createdAt.toDate().toLocaleString();
        versions.appendChild(opt);
      });
    });
}

/* LOAD SELECTED VERSION */
function loadVersion(id) {
  if (!id) return;

  db.collection("resumes")
    .doc(currentUser.uid)
    .collection("versions")
    .doc(id)
    .get()
    .then(doc => {
      const d = doc.data();
      name.value = d.name;
      role.value = d.role;
      skills.value = d.skills;
      projects.value = d.projects;
      generateResume();
    });
}

/* PDF */
function downloadPDF() {
  html2pdf().from(resume).save("resume.pdf");
}
