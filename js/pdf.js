function downloadPDF() {
  const resume = document.getElementById("resume");

  if (!resume) {
    alert("Resume section not found");
    return;
  }

  html2pdf()
    .from(resume)
    .set({
      margin: 10,
      filename: 'Resume.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    })
    .save();
}
