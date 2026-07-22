import axiosInstance from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/endpoints";

export const assignmentService = {
  submit: async ({ assignmentId, file, notes }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("notes", notes);

    const { data } = await axiosInstance.post(
      API_ENDPOINTS.ASSIGNMENT_SUBMIT(assignmentId),
      formData
    );

    return data;
  },
};
