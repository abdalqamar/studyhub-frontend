interface CourseInstructor {
  firstName?: string;
  lastName?: string;
}

interface CourseCategory {
  name?: string;
}

interface ExportableCourse {
  title: string;
  instructor?: CourseInstructor;
  category?: CourseCategory;
  enrolledCount?: number;
  rating?: number | string;
  status?: string;
  price?: number | string;
  duration?: string;
}

export const generateExcelReport = (
  courses: ExportableCourse[],
  successToast: (msg: string) => void,
  errorToast: (msg: string) => void
) => {
  try {
    if (!courses || courses.length === 0) {
      errorToast("No courses available to generate report");
      return;
    }

    const data = courses.map((course) => ({
      Title: course.title || "N/A",
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
