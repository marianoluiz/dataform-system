import * as studentModel from '../models/studentModel';
import * as refSexModel from '../models/refSexModel';
import { StudentInfo, RawStudentInfo } from '../models/studentModel';
// i put here business logic

export const getStudents = async (): Promise<StudentInfo[]> => {
  // get raw student info
  const studentInfos: RawStudentInfo[] = await studentModel.getStudents();
  // parses RawStudentInfo to StudentInfo
  const parsedStudents = parseRawStudent(studentInfos);


  return parsedStudents;
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

// receives RawStudentInfo then parses it into StudentInfo
const parseRawStudent = async (studentInfos: RawStudentInfo[]): Promise<StudentInfo[]> => {
  const studentsArray: StudentInfo[] = [];

  // row => a student object
  studentInfos.forEach((rawRow) => {
    let student = studentsArray.find(s => s.p_id === rawRow.p_id);
    // if there is no student found with same id, 
    // add a new children array in json
    if(!student) {
      // otherData excludes the 3 properties from the newly fetched rawRow in sql
      const {fam_ch_id, child_fullname, child_dob, ...otherData } = rawRow;

      student = {
        ...otherData,
        children: [],
      }

      studentsArray.push(student);
    }

    // if there is a student found with same id, 
    // add the children from raw data to the parsed data type
    if(rawRow.fam_ch_id) {
      student.children?.push({
        fam_ch_id: rawRow.fam_ch_id,
        child_fullname: rawRow.child_fullname || '',
        child_dob: rawRow.child_dob || new Date()
        // somehow making this like had || '' values fixed an error
        // that kept me up until 4 am, where it says i cant assign
        // RawStudentInfo to studentInfo
      })
    }

  })

  return studentsArray;
}

const parseId = async (parsedStudents: StudentInfo[]): Promise<StudentInfo[]> => {

  parsedStudents.forEach(async (student) => {
    
    // If you omit the await keyword when calling a function that returns a promise, the function will still return a promise,
    // but the code will not wait for the promise to resolve before moving on to the next line.
    const sexDesc = await refSexModel.getRefSexDesc(student.sex_id);

    
  });
  
}