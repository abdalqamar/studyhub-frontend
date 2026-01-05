import { errorToast, successToast } from "./toastUtils";

export const downloadNotesAsPDF = async ({
  userNotes,
  currentLesson,
  currentSection,
}) => {
  if (!userNotes?.trim()) {
    errorToast("No notes to download! Write something first.");
    return;
  }

  try {
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF();

    // Title
    pdf.setFontSize(16);
    pdf.text(currentLesson?.title || "Lesson Notes", 20, 20);

    // Section info
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Section: ${currentSection?.sectionName}`, 20, 30);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, 38);

    // Divider line
    pdf.setDrawColor(200, 200, 200);
    pdf.line(20, 42, 190, 42);

    // Notes content
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(11);
    const margin = 20;
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const textWidth = pageWidth - 2 * margin;

    const lines = pdf.splitTextToSize(userNotes, textWidth);
    let y = 50;

    lines.forEach((line) => {
      if (y > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(line, margin, y);
      y += 6;
    });

    // Save
    pdf.save(`${currentLesson?.title || "notes"}-${Date.now()}.pdf`);
    successToast(" Notes downloaded as PDF!");
  } catch (error) {
    errorToast("Failed to download PDF");
    console.error("PDF download error:", error);
  }
};
