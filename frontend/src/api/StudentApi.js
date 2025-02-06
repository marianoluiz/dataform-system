import apiClient from "./apiClient";
import dummyData from "./dummyData.json";

export const getStudentData = async () => {

  if (import.meta.env.VITE_NODE_ENV === "production") {
    return dummyData;
  }

  try {
    const res = await apiClient.get("/");
    const studentsData = res.data;

    studentsData.forEach((student) => {
      if (student.dob) {
        student.dob = formatDateToInput(student.dob);
      }

      if(student.children)
        student.children.forEach((child) => {
          if (child.child_dob)
            child.child_dob = formatDateToInput(child.child_dob);
        })
        
    });
    
    return res.data;
  } catch (err) {
    console.error("Client: Error getting students data:", err);
    throw err;
  }
};

export const createStudent = async (student) => {
  try {
    console.log("\nClient: Creating Student: ", student);
    const res = await apiClient.post("/", student);
    return res.data;
  } catch (err) {
    console.error(`Client: Error Creating Student`, err);
    throw err;
  }
};

export const updateStudent = async (student) => {
  try {
    const res = await apiClient.put("/", student);
    return res.data;
  } catch (err) {
    console.error(
      `Client: Error updating student data with id ${student.p_id}`,
      err
    );
    throw err;
  }
};

export const deleteStudent = async (p_id) => {
  try {
    const res = await apiClient.delete(`/${p_id}`);
    return res.data;
  } catch (err) {
    console.error(`Client: Error deleting student data with id ${p_id}`, err);
    throw err;
  }
};

  const formatDateToInput = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };