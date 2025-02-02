import apiClient from './apiClient'

export const getStudentData = async () => {
  try {
    const res = await apiClient.get('/');
    return res.data;

  } catch (err) {
    console.error("Client: Error getting students data:", err);
    throw err;
  }
};

export const createStudent = async (student) => {
  try {
    console.log('\nClient: Creating Student: ', student);
    const res = await apiClient.post('/', student);
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
    console.error(`Client: Error updating student data with id ${student.p_id}`, err);
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