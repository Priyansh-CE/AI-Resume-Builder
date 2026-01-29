function generateResume() {
  document.getElementById("r-name").innerText =
    document.getElementById("name").value || "Your Name";

  document.getElementById("r-role").innerText =
    document.getElementById("role").value || "Job Role";

  document.getElementById("r-skills").innerText =
    document.getElementById("skills").value || "Skills";

  renderProjects(document.getElementById("projects").value);
}

/* AI CONTENT IMPROVER */
function improveWithAI() {
  const input = document.getElementById("projects").value;
  if (!input) {
    alert("Add project or experience text first");
    return;
  }

  const improved = input.split("\n").map(line => {
    if (!line.trim()) return "";
    return "• Developed " + line.replace(/made|created|worked on/i, "")
      + " using modern technologies with measurable impact.";
  });

  document.getElementById("projects").value = improved.join("\n");
  renderProjects(improved.join("\n"));
}

/* Render project bullets */
function renderProjects(text) {
  const ul = document.getElementById("r-projects");
  ul.innerHTML = "";

  text.split("\n").forEach(line => {
    if (line.trim()) {
      const li = document.createElement("li");
      li.innerText = line.replace("• ", "");
      ul.appendChild(li);
    }
  });
}

/* ATS SCORE */
function calculateATS() {
  const resumeText = (
    document.getElementById("skills").value +
    " " +
    document.getElementById("projects").value
  ).toLowerCase();

  const jdText = document.getElementById("jd").value.toLowerCase();
  if (!jdText) return alert("Paste job description");

  const jdWords = [...new Set(jdText.match(/\b[a-z]{3,}\b/g))];
  const matched = jdWords.filter(w => resumeText.includes(w));
  const score = Math.round((matched.length / jdWords.length) * 100);

  document.getElementById("atsScore").innerText = score + "%";
  document.getElementById("atsScore").style.color =
    score >= 70 ? "green" : "orange";

  document.getElementById("missing").innerText =
    "Missing keywords: " +
    jdWords.filter(w => !matched.includes(w)).slice(0, 10).join(", ");
}

/* PDF DOWNLOAD */
function downloadPDF() {
  const resume = document.getElementById("resume");

  const opt = {
    margin: 0.5,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(resume).save();
}
