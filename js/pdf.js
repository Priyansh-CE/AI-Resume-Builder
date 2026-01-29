function downloadPDF() {
  const resume = document.getElementById("resume");

  html2pdf()
    .from(resume)
    .set({
      filename: "Resume.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { format: "a4", orientation: "portrait" }
    })
    .save();
}
