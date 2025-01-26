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