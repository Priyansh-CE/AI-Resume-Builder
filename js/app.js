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
    alert("Add some project or experience text first");
    return;
  }

  const lines = input.split("\n");

  const improved = lines.map(line => {
    if (!line.trim()) return "";

    return "• " + line
      .replace(/made|created|worked on/i, "Developed")
      .replace(/using/i, "using modern technologies like")
      .replace(/helped/i, "Contributed to")
      .replace(/improved/i, "Optimized")
      .replace(/app/i, "application")
      + " with measurable impact.";
  });

  document.getElementById("projects").value = improved.join("\n");
  renderProjects(improved.join("\n"));
}

/* Render bullet list */
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

  if (!jdText) {
    alert("Paste job description first");
    return;
  }

  const jdWords = [...new Set(jdText.match(/\b[a-z]{3,}\b/g))];

  let matched = [];
  jdWords.forEach(word => {
    if (resumeText.includes(word)) matched.push(word);
  });

  const score = Math.round((matched.length / jdWords.length) * 100);

  document.getElementById("atsScore").innerText = score + "%";
  document.getElementById("atsScore").style.color =
    score >= 70 ? "green" : "orange";

  const missing = jdWords.filter(w => !matched.includes(w));

  document.getElementById("missing").innerText =
    "Missing keywords: " + missing.slice(0, 10).join(", ");
}
