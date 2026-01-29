function generateResume() {
  r-name.innerText = name.value;
  r-role.innerText = role.value;
  r-skills.innerText = skills.value;
  r-projects.innerText = projects.value;
}

function calculateATS() {
  const resumeText =
    (skills.value + " " + projects.value).toLowerCase();

  const jdText = jd.value.toLowerCase();

  if (!jdText) {
    alert("Paste job description");
    return;
  }

  const jdWords = [...new Set(jdText.match(/\b[a-z]{3,}\b/g))];

  let matched = [];
  jdWords.forEach(word => {
    if (resumeText.includes(word)) matched.push(word);
  });

  const score = Math.round((matched.length / jdWords.length) * 100);

  atsScore.innerText = score + "%";
  atsScore.style.color = score > 70 ? "green" : "orange";

  const missing = jdWords.filter(w => !matched.includes(w));
  missingText = missing.slice(0, 10).join(", ");

  document.getElementById("missing").innerText =
    "Missing keywords: " + missingText;
}
