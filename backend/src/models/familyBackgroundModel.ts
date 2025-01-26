import { Connection } from "mysql";
import { StudentInfo } from "./studentModel";

// this is called from studentModel
export const addFamilyBackground = (p_id: number, connection: Connection, newStudent: StudentInfo): Promise<void> => {
  return new Promise((resolve, reject) => {
    // query template
    const familyBackgroundQuery = `
      INSERT INTO family_background (
        spouse_lname, spouse_fname, spouse_mname, spouse_ename, spouse_occupation, spouse_employer, spouse_emp_address, father_lname, father_fname, father_mname, father_ename, mother_mn_lname, mother_mn_fname, mother_mn_mname, mother_mn_ename
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const familyBackgroundValues = [
      newStudent.spouse_lname, newStudent.spouse_fname, newStudent.spouse_mname, newStudent.spouse_ename, newStudent.spouse_occupation, newStudent.spouse_employer, newStudent.spouse_emp_address, newStudent.father_lname, newStudent.father_fname, newStudent.father_mname, newStudent.father_ename, newStudent.mother_mn_lname, newStudent.mother_mn_fname, newStudent.mother_mn_mname, newStudent.mother_mn_ename
    ]

    connection.query(familyBackgroundQuery, familyBackgroundValues, (err: Error | null, result: any) => {
      if(err) {
        reject(err);
        return;
      } else {
        console.log(`Family Background added of ${p_id}`);
        resolve();
      }

    })

  });


}

export const updateFamilyBackground = (connection: Connection, student: StudentInfo): Promise<void> => {
  return new Promise((resolve, reject) => {

    const familyBackgroundQuery = `
      UPDATE family_background
         SET spouse_lname = ?
         , spouse_fname = ?
         , spouse_mname = ?
         , spouse_ename = ?
         , spouse_occupation = ?
         , spouse_employer = ?
         , spouse_emp_address = ?
         , father_lname = ?
         , father_fname = ?
         , father_mname = ?
         , father_ename = ?
         , mother_mn_lname = ?
         , mother_mn_fname = ?
         , mother_mn_mname = ?
         , mother_mn_ename = ?
       WHERE p_id = ?
    `;

    const familyBackgroundValues = [
      student.spouse_lname, student.spouse_fname, student.spouse_mname, student.spouse_occupation, student.spouse_employer, student.spouse_emp_address, student.father_lname, student.father_fname, student.father_mname, student.mother_mn_lname, student.mother_mn_fname, student.mother_mn_mname, student.p_id
    ]

    connection.query(familyBackgroundQuery, familyBackgroundValues, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })

  });
}


export const deleteFamilyBackground = async (p_id: number, connection: Connection): Promise<void> => {
  return new Promise((resolve, reject) => {
    
    const deleteQuery = `
      DELETE FROM family_background
       WHERE p_id = ?
    `;

    connection.query(deleteQuery, [p_id], (err) => {
      if (err) {
        console.error("Failed to delete family background");
        reject(err);
      } else {
        resolve();
      }
    })

  })

}