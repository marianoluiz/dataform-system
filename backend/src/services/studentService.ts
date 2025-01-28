import * as studentModel from '../models/studentModel';
import { StudentInfo } from '../models/studentModel';
// i put here business logic

export const getStudents = async (): Promise<StudentInfo[]> => {
  const studentInfos = await studentModel.getStudents();
  return studentInfos;
}

export const addStudent = async (newStudent: StudentInfo): Promise<void> => {
  await studentModel.addNewStudent(newStudent);
}

export const updateStudent = async (student: StudentInfo) => {
  await studentModel.updateStudent(student);
}

export const deleteStudent = async (p_id: number) => {
  await studentModel.removeStudent(p_id);
}
