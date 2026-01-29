function generateResume() {
  document.getElementById("r-name").innerText =
    document.getElementById("name").value || "Your Name";

  document.getElementById("r-role").innerText =
    document.getElementById("role").value || "Job Role";

  document.getElementById("r-skills").innerText =
    document.getElementById("skills").value || "Skills";

  document.getElementById("r-projects").innerText =
    document.getElementById("projects").value || "Projects / Experience";
}

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
