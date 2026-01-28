function downloadPDF() {
  const element = document.getElementById("resume");
  html2pdf().from(element).save("Resume.pdf");
}
