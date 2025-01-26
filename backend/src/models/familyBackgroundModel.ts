import { Connection } from "mysql";
import { StudentInfo } from "./studentModel";

// this is called from studentModel
export const addFamilyBackground = (p_id: number, connection: Connection, newStudent: StudentInfo): Promise<void> => {
  return new Promise((resolve, reject) => {
    // query template
    const familyBackgroundQuery = `
      INSERT INTO family_background (
        p_id, spouse_lname, spouse_fname, spouse_mname, spouse_occupation, spouse_employer, spouse_emp_address, father_lname, father_fname, father_mname, mother_mn_lname, mother_mn_fname, mother_mn_mname
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const familyBackgroundValues = [
      p_id, newStudent.spouse_lname, newStudent.spouse_fname, newStudent.spouse_mname, newStudent.spouse_occupation, newStudent.spouse_employer, newStudent.spouse_emp_address, newStudent.father_lname, newStudent.father_fname, newStudent.father_mname, newStudent.mother_mn_lname, newStudent.mother_mn_fname, newStudent.mother_mn_mname
    ]

    connection.query(familyBackgroundQuery, familyBackgroundValues, (err: Error | null, result: any) => {
      if(err) {
        reject(err);
        return;
      } else {
        resolve();
      }
    })

  });


}