/**
 * Generate and download Excel report
 * @param {Array} courses - Array of course objects
 * @param {Function} successToast - Success toast notification function
 * @param {Function} errorToast - Error toast notification function
 */
export const generateExcelReport = (courses, successToast, errorToast) => {
  try {
    if (!courses || courses.length === 0) {
      errorToast("No courses available to generate report");
      return;
    }

    // Prepare data
    const data = courses.map((course) => ({
      Title: course.courseName || "N/A",
      Instructor: course.instructor
        ? `${course.instructor.firstName || ""} ${course.instructor.lastName || ""}`.trim() ||
          "N/A"
        : "N/A",
      Category: course.category?.name || "N/A",
      Students: course.enrolledCount || 0,
      Rating: course.rating || "N/A",
      Status: course.status || "N/A",
      Price: course.price || "N/A",
      Duration: course.duration || "N/A",
    }));

    // Create Excel content (XML format)
    let excelContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head>
          <meta charset="UTF-8">
          <!--[if gte mso 9]>
            <xml>
              <x:ExcelWorkbook>
                <x:ExcelWorksheets>
                  <x:ExcelWorksheet>
                    <x:Name>Courses Report</x:Name>
                    <x:WorksheetOptions>
                      <x:DisplayGridlines/>
                    </x:WorksheetOptions>
                  </x:ExcelWorksheet>
                </x:ExcelWorksheets>
              </x:ExcelWorkbook>
            </xml>
          <![endif]-->
          <style>
            table { border-collapse: collapse; width: 100%; }
            th { background-color: #4285f4; color: white; font-weight: bold; padding: 10px; border: 1px solid #ddd; }
            td { padding: 8px; border: 1px solid #ddd; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Instructor</th>
                <th>Category</th>
                <th>Students</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Price</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
    `;

    // Add data rows
    data.forEach((row) => {
      excelContent += `
        <tr>
          <td>${row.Title}</td>
          <td>${row.Instructor}</td>
          <td>${row.Category}</td>
          <td>${row.Students}</td>
          <td>${row.Rating}</td>
          <td>${row.Status}</td>
          <td>${row.Price}</td>
          <td>${row.Duration}</td>
        </tr>
      `;
    });

    excelContent += `
            </tbody>
          </table>
        </body>
      </html>
    `;

    // Create blob and download
    const blob = new Blob([excelContent], {
      type: "application/vnd.ms-excel;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `courses-report-${new Date().toISOString().split("T")[0]}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    successToast("Excel report downloaded successfully");
  } catch (error) {
    console.error("Error generating Excel report:", error);
    errorToast("Failed to generate Excel report");
  }
};

/**
 * Generate and download CSV report
 * @param {Array} courses - Array of course objects
 * @param {Function} successToast - Success toast notification function
 * @param {Function} errorToast - Error toast notification function
 */
export const generateCSVReport = (courses, successToast, errorToast) => {
  try {
    if (!courses || courses.length === 0) {
      errorToast("No courses available to generate report");
      return;
    }

    const csvData = courses.map((course) => ({
      Title: course.courseName || "N/A",
      Instructor: course.instructor
        ? `${course.instructor.firstName || ""} ${course.instructor.lastName || ""}`.trim() ||
          "N/A"
        : "N/A",
      Category: course.category?.name || "N/A",
      Students: course.enrolledCount || 0,
      Rating: course.rating || "N/A",
      Status: course.status || "N/A",
      Price: course.price || "N/A",
      Duration: course.duration || "N/A",
    }));

    // Escape CSV values
    const escapeCSV = (value) => {
      const stringValue = String(value);
      if (
        stringValue.includes(",") ||
        stringValue.includes('"') ||
        stringValue.includes("\n")
      ) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };

    const headers = Object.keys(csvData[0]).join(",");
    const rows = csvData
      .map((row) => Object.values(row).map(escapeCSV).join(","))
      .join("\n");

    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `courses-report-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    successToast("CSV report downloaded successfully");
  } catch (error) {
    console.error("Error generating CSV report:", error);
    errorToast("Failed to generate CSV report");
  }
};
